import { youtubeChannels } from "@/data/youtube-channels"

const REVALIDATE_SECONDS = 3600
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"
const VIDEOS_PER_CHANNEL = 8
const MAX_VIDEOS_OUTPUT = 24
/** Max videos from a single channel in the final feed. */
const MAX_VIDEOS_PER_CHANNEL = 3
/** Exclude Shorts and very short clips (under 90 seconds). */
const MIN_DURATION_SECONDS = 90
const TITLE_BOOST_KEYWORDS = [
  "cursor",
  "codex",
  "claude",
  "ai coding",
  "agents",
  "llm",
  "openhands",
  "windsurf",
  "rag",
  "vector db",
  "copilot",
  "gpt",
  "openai",
  "anthropic",
]

function getApiKey(): string | undefined {
  return process.env.YOUTUBE_API_KEY
}

interface ChannelContentDetails {
  relatedPlaylists?: { uploads?: string }
}

interface ChannelsListResponse {
  items?: Array<{ contentDetails?: ChannelContentDetails }>
}

interface PlaylistItem {
  contentDetails?: { videoId?: string }
  snippet?: { publishedAt?: string }
}

interface PlaylistItemsResponse {
  items?: PlaylistItem[]
}

interface VideoSnippet {
  title?: string
  channelTitle?: string
  channelId?: string
  publishedAt?: string
  thumbnails?: {
    high?: { url?: string }
    medium?: { url?: string }
    default?: { url?: string }
  }
}

interface VideoContentDetails {
  duration?: string
}

interface VideoStatistics {
  viewCount?: string
}

interface VideoItem {
  id?: string
  snippet?: VideoSnippet
  contentDetails?: VideoContentDetails
  statistics?: VideoStatistics
}

interface VideosListResponse {
  items?: VideoItem[]
}

export interface CuratedVideo {
  id: string
  title: string
  channelName: string
  channelId: string
  publishedAt: string
  thumbnailUrl: string
  viewCount: number | null
  duration: string | null
  url: string
}

async function fetchYt<T>(
  path: string,
  params: Record<string, string>
): Promise<T> {
  const key = getApiKey()
  if (!key) {
    throw new Error("YOUTUBE_API_KEY is not set")
  }
  const searchParams = new URLSearchParams({ ...params, key })
  const url = `${YOUTUBE_API_BASE}${path}?${searchParams.toString()}`
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`YouTube API error ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

/** Parse ISO 8601 duration to total seconds (e.g. PT1M30S -> 90). */
function parseDurationToSeconds(duration: string | undefined): number | null {
  if (!duration) return null
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return null
  const hours = parseInt(match[1] ?? "0", 10)
  const minutes = parseInt(match[2] ?? "0", 10)
  const seconds = parseInt(match[3] ?? "0", 10)
  return hours * 3600 + minutes * 60 + seconds
}

function parseIsoDuration(duration: string | undefined): string | null {
  const totalSeconds = parseDurationToSeconds(duration)
  if (totalSeconds == null) return null
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  const parts: string[] = []
  if (hours > 0) parts.push(`${hours}:`)
  parts.push(
    `${minutes.toString().padStart(hours > 0 ? 2 : 1, "0")}:${secs.toString().padStart(2, "0")}`
  )
  return parts.join("")
}

function scoreTitle(title: string): number {
  const lower = title.toLowerCase()
  let score = 0
  for (const kw of TITLE_BOOST_KEYWORDS) {
    if (lower.includes(kw)) score += 1
  }
  return score
}

/** Lower number = higher trust (e.g. 1 is top tier). Used in combined score. */
function getChannelPriorityBoost(priority: number | undefined): number {
  if (priority == null) return 0
  return Math.max(0, 3 - priority)
}

/** Recency score: newer = higher. 0–30 scale over roughly 30 days. */
function getRecencyScore(publishedAt: string): number {
  const days = Math.floor(
    (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24)
  )
  return Math.max(0, 30 - Math.min(days, 30))
}

function getRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffWeeks === 1) return "1 week ago"
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`
  if (diffMonths === 1) return "1 month ago"
  if (diffMonths < 12) return `${diffMonths} months ago`
  const years = Math.floor(diffMonths / 12)
  return years === 1 ? "1 year ago" : `${years} years ago`
}

export async function fetchCuratedVideos(): Promise<CuratedVideo[]> {
  const key = getApiKey()
  if (!key) {
    return []
  }

  const channelIds = youtubeChannels.map((c) => c.id).join(",")
  const priorityByChannelId = new Map(
    youtubeChannels.map((c) => [c.id, c.priority])
  )

  const channelsRes = await fetchYt<ChannelsListResponse>("/channels", {
    part: "contentDetails",
    id: channelIds,
  })

  const uploadsPlaylistIds: string[] = []
  for (const item of channelsRes.items ?? []) {
    const uploadsId = item.contentDetails?.relatedPlaylists?.uploads
    if (uploadsId) uploadsPlaylistIds.push(uploadsId)
  }

  const allVideoIds: string[] = []
  for (const playlistId of uploadsPlaylistIds) {
    const listRes = await fetchYt<PlaylistItemsResponse>("/playlistItems", {
      part: "contentDetails,snippet",
      playlistId,
      maxResults: String(VIDEOS_PER_CHANNEL),
    })
    for (const item of listRes.items ?? []) {
      const videoId = item.contentDetails?.videoId
      if (videoId) allVideoIds.push(videoId)
    }
  }

  if (allVideoIds.length === 0) return []

  const uniqueIds = [...new Set(allVideoIds)]

  const videoDetails: CuratedVideo[] = []
  for (let i = 0; i < uniqueIds.length; i += 50) {
    const batch = uniqueIds.slice(i, i + 50)
    const idsParam = batch.join(",")
    const videosRes = await fetchYt<VideosListResponse>("/videos", {
      part: "snippet,contentDetails,statistics",
      id: idsParam,
    })
    for (const item of videosRes.items ?? []) {
      const id = item.id
      const snippet = item.snippet
      if (!id || !snippet) continue
      const thumbnails = snippet.thumbnails
      const thumbnailUrl =
        thumbnails?.high?.url ??
        thumbnails?.medium?.url ??
        thumbnails?.default?.url ??
        ""
      const rawViews = item.statistics?.viewCount
      const viewCount =
        rawViews != null
          ? (() => {
              const n = parseInt(rawViews, 10)
              return Number.isNaN(n) ? null : n
            })()
          : null
      const rawDuration = item.contentDetails?.duration
      const durationSeconds = parseDurationToSeconds(rawDuration)
      if (
        durationSeconds != null &&
        durationSeconds < MIN_DURATION_SECONDS
      ) {
        continue
      }
      const duration = parseIsoDuration(rawDuration)
      const channelId = snippet.channelId ?? ""
      videoDetails.push({
        id,
        title: snippet.title ?? "",
        channelName: snippet.channelTitle ?? "",
        channelId,
        publishedAt: snippet.publishedAt ?? "",
        thumbnailUrl,
        viewCount,
        duration,
        url: `https://www.youtube.com/watch?v=${id}`,
      })
    }
  }

  videoDetails.sort((a, b) => {
    const keywordA = scoreTitle(a.title)
    const keywordB = scoreTitle(b.title)
    const boostA = getChannelPriorityBoost(priorityByChannelId.get(a.channelId))
    const boostB = getChannelPriorityBoost(priorityByChannelId.get(b.channelId))
    const recencyA = getRecencyScore(a.publishedAt)
    const recencyB = getRecencyScore(b.publishedAt)
    const scoreA = keywordA * 10 + boostA * 4 + recencyA
    const scoreB = keywordB * 10 + boostB * 4 + recencyB
    if (scoreB !== scoreA) return scoreB - scoreA
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  })

  const result: CuratedVideo[] = []
  const countByChannel = new Map<string, number>()
  for (const video of videoDetails) {
    if (result.length >= MAX_VIDEOS_OUTPUT) break
    const n = countByChannel.get(video.channelId) ?? 0
    if (n >= MAX_VIDEOS_PER_CHANNEL) continue
    countByChannel.set(video.channelId, n + 1)
    result.push(video)
  }
  return result
}

export { getRelativeTime }

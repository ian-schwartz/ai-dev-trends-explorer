import { fetchCuratedVideos, type CuratedVideo } from "@/lib/youtube"
import { VideoGrid } from "@/components/videos/VideoGrid"
import { SectionGlow } from "@/components/layout/SectionGlow"

// ISR: page is generated at build/first request and revalidated at most every hour so the feed updates.
// Do not wrap fetchCuratedVideos in React cache() or the data will not refresh on revalidate.
export const revalidate = 3600

export default async function VideosPage() {
  let videos: CuratedVideo[] = []
  let error: string | null = null

  try {
    videos = await fetchCuratedVideos()
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load videos"
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SectionGlow colorClass="bg-amber-500/6" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Videos
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Curated videos about AI coding tools, agents, and developer workflows. Updated hourly.
        </p>

        {error != null && (
          <p className="mt-10 rounded-lg border border-amber-500/30 bg-amber-500/10 py-4 px-4 text-sm text-amber-200">
            {error}
          </p>
        )}

        {videos.length === 0 && error == null && (
          <p className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/50 py-12 text-center text-zinc-500">
            No videos available right now. Check back later or ensure
            YOUTUBE_API_KEY is set.
          </p>
        )}

        {videos.length > 0 && (
          <div className="mt-10">
            <VideoGrid videos={videos} />
          </div>
        )}
      </div>
    </main>
  )
}

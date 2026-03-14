import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { CuratedVideo } from "@/lib/youtube"
import { getRelativeTime } from "@/lib/youtube"

interface VideoCardProps {
  video: CuratedVideo
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`
  return `${n} views`
}

export function VideoCard({ video }: VideoCardProps) {
  const relativeTime = getRelativeTime(video.publishedAt)

  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-violet-500/20 hover:shadow-md hover:shadow-zinc-900/20">
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-inset"
      >
        <div className="relative aspect-video w-full bg-zinc-800">
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-600" />
          )}
          {video.duration != null && (
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/85 px-2 py-0.5 font-mono text-xs font-medium tabular-nums text-zinc-200">
              {video.duration}
            </span>
          )}
        </div>
      </a>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            {video.title}
          </a>
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 text-xs text-zinc-500">
          <span>{video.channelName}</span>
          <span aria-hidden> · </span>
          <span>{relativeTime}</span>
          {video.viewCount != null && (
            <>
              <span aria-hidden> · </span>
              <span>{formatViews(video.viewCount)}</span>
            </>
          )}
        </div>
        <Link
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
        >
          Watch on YouTube
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

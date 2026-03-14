import type { CuratedVideo } from "@/lib/youtube"
import { VideoCard } from "./VideoCard"

interface VideoGridProps {
  videos: CuratedVideo[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

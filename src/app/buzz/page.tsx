import { ExternalLink, MessageCircle } from "lucide-react";
import { getBuzzPageStories } from "@/lib/hacker-news";

const HN_ITEM_URL = (id: number) => `https://news.ycombinator.com/item?id=${id}`;

function formatTimeAgo(unixSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixSeconds;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(unixSeconds * 1000).toLocaleDateString();
}

export const revalidate = 600;

export default async function BuzzPage() {
  const stories = await getBuzzPageStories();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          AI Dev Buzz
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Recent Hacker News stories about AI-assisted development, coding tools,
          and developer workflows. Refreshed about every 10 minutes.
        </p>

        {stories.length === 0 ? (
          <p className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/50 py-12 text-center text-zinc-500">
            No matching stories right now. Try again later.
          </p>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {stories.map((story) => (
              <li key={story.id}>
                <article className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20 sm:p-5">
                  <h2 className="font-semibold leading-snug text-foreground">
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-violet-200"
                    >
                      {story.title}
                    </a>
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                    {story.domain != null && (
                      <span className="text-zinc-400">{story.domain}</span>
                    )}
                    <span>{story.score} pts</span>
                    <span>{story.commentCount} comments</span>
                    <span>{formatTimeAgo(story.time)}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-600 bg-transparent px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-200 ease-out hover:border-violet-500/50 hover:bg-violet-500/5"
                    >
                      Article
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={HN_ITEM_URL(story.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-600 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors duration-200 ease-out hover:border-zinc-500 hover:text-foreground"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Discussion
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

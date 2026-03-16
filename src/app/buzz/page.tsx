import { getBuzzPageStories } from "@/lib/hacker-news";
import { StoryCard } from "./StoryCard";

export const revalidate = 600;

export default async function BuzzPage() {
  const stories = await getBuzzPageStories();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Buzz
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Hacker News stories about AI-assisted development, coding tools, and developer workflows. Updated every 10 minutes.
        </p>

        {stories.length === 0 ? (
          <p className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/50 py-12 text-center text-zinc-500">
            No matching stories right now. Try again later.
          </p>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {stories.map((story) => (
              <li key={story.id}>
                <StoryCard story={story} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

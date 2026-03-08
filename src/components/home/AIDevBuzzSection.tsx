import type { AIDevBuzzStory } from "@/lib/hacker-news";

interface AIDevBuzzSectionProps {
  stories: AIDevBuzzStory[];
}

function StoryCard({ story }: { story: AIDevBuzzStory }) {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/80 hover:shadow-md hover:shadow-zinc-900/20 sm:p-4"
    >
      <h3 className="font-medium leading-snug text-foreground transition-colors group-hover:text-violet-200">
        {story.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        {story.domain != null && (
          <span className="text-zinc-400">{story.domain}</span>
        )}
        <span>{story.author}</span>
        <span>{story.score} pts</span>
        <span>{story.commentCount} comments</span>
      </div>
    </a>
  );
}

export function AIDevBuzzSection({ stories }: AIDevBuzzSectionProps) {
  if (stories.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          AI Dev Buzz
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Recent Hacker News stories about AI coding tools and developer
          workflows.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
          {stories.map((story) => (
            <li key={story.id}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

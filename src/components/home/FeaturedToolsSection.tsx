import Link from "next/link";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";

function getFeaturedTools() {
  return tools
    .filter(
      (t) => t.trend === "rising" || t.trend === "established"
    )
    .slice(0, 3);
}

export function FeaturedToolsSection() {
  const featuredTools = getFeaturedTools();

  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 py-16 sm:py-20">
      {/* Subtle blue radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-blue-100">
          Featured AI Development Tools
        </h2>
        <p className="mt-2 text-zinc-400">
          Some of the most popular tools shaping the AI-native development
          workflow.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>a:hover]:border-blue-500/25 [&>a:hover]:shadow-blue-500/10 [&>article:hover]:border-blue-500/25 [&>article:hover]:shadow-blue-500/10">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-600 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            View All Tools
          </Link>
        </div>
      </div>
    </section>
  );
}

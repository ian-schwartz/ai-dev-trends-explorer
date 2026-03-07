import type { ToolItem, ToolCategory, TrendLevel } from "@/types/tool";

const categoryLabels: Record<ToolCategory, string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  "assistant": "Assistant",
  "terminal-tool": "Terminal tool",
};

const trendStyles: Record<TrendLevel, string> = {
  rising: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  established: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  experimental: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  overhyped: "bg-zinc-600/15 text-zinc-500 border-zinc-600/30",
};

interface ToolCardProps {
  tool: ToolItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article
      className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80"
      data-tool-slug={tool.slug}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold tracking-tight text-foreground">
            {tool.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
            {categoryLabels[tool.category]}
          </p>
        </div>
        <span
          className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium ${trendStyles[tool.trend]}`}
        >
          {tool.trend}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {tool.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-3">
        {tool.repoAware && (
          <span className="text-xs text-zinc-500" title="Repo-aware">
            Repo
          </span>
        )}
        {tool.terminalAccess && (
          <span className="text-xs text-zinc-500" title="Terminal access">
            Terminal
          </span>
        )}
        {!tool.repoAware && !tool.terminalAccess && (
          <span className="text-xs text-zinc-600">—</span>
        )}
      </div>
    </article>
  );
}

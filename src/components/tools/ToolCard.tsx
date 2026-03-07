import {
  Code2,
  Bot,
  Wand2,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ToolItem, ToolCategory, TrendLevel } from "@/types/tool";

const categoryLabels: Record<ToolCategory, string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  "assistant": "Assistant",
  "terminal-tool": "Terminal tool",
};

const categoryIcons: Record<ToolCategory, LucideIcon> = {
  "ai-ide": Code2,
  "coding-agent": Bot,
  "ui-generator": Wand2,
  "assistant": Sparkles,
  "terminal-tool": Terminal,
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
  const Icon = categoryIcons[tool.category];
  const href = tool.website;
  const isClickable = Boolean(href);

  const cardContent = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Icon
              className="h-5 w-5 shrink-0 text-zinc-500"
              aria-hidden
            />
            <h3 className="font-semibold tracking-tight text-foreground">
              {tool.name}
            </h3>
          </div>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-zinc-600">
            {categoryLabels[tool.category]}
          </p>
        </div>
        <span
          className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium ${trendStyles[tool.trend]}`}
        >
          {tool.trend}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {tool.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
        {tool.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">
        {tool.repoAware && <span title="Repo-aware">Repo</span>}
        {tool.terminalAccess && <span title="Terminal access">Terminal</span>}
        {!tool.repoAware && !tool.terminalAccess && <span>—</span>}
      </div>
    </>
  );

  const interactiveHover =
    "hover:border-zinc-600 hover:bg-zinc-900/80 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:-translate-y-0.5 cursor-pointer";
  const baseClasses = `group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 text-left transition-all duration-200 ${isClickable ? interactiveHover : "hover:border-zinc-700"}`;

  if (isClickable && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        data-tool-slug={tool.slug}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article className={baseClasses} data-tool-slug={tool.slug}>
      {cardContent}
    </article>
  );
}

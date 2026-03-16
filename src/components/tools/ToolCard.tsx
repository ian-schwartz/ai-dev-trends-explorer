import Link from "next/link";
import type { ToolItem, ToolCategory, TrendLevel } from "@/types/tool";
import { ToolLogo } from "./ToolLogo";

const categoryLabels: Record<ToolCategory, string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  "assistant": "Assistant",
  "terminal-tool": "Terminal tool",
};

const categoryColors: Record<ToolCategory, { label: string; icon: string; tag: string }> = {
  "ai-ide": { label: "text-blue-400", icon: "text-blue-400/90", tag: "bg-blue-500/10 text-blue-300" },
  "coding-agent": { label: "text-violet-400", icon: "text-violet-400/90", tag: "bg-violet-500/10 text-violet-300" },
  "ui-generator": { label: "text-emerald-400", icon: "text-emerald-400/90", tag: "bg-emerald-500/10 text-emerald-300" },
  "assistant": { label: "text-amber-400", icon: "text-amber-400/90", tag: "bg-amber-500/10 text-amber-300" },
  "terminal-tool": { label: "text-cyan-400", icon: "text-cyan-400/90", tag: "bg-cyan-500/10 text-cyan-300" },
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
  const colors = categoryColors[tool.category];

  const cardContent = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <ToolLogo
              slug={tool.slug}
              category={tool.category}
              logoUrl={tool.logo}
              size="sm"
              name={tool.name}
            />
            <h3 className="font-semibold tracking-tight text-foreground">
              {tool.name}
            </h3>
          </div>
          <p className={`mt-1.5 text-xs font-medium uppercase tracking-wider ${colors.label}`}>
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
      {tool.whyItMatters != null && (
        <p className="mt-2 text-xs text-zinc-500">
          {tool.whyItMatters}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
        {tool.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className={`rounded-md px-2 py-0.5 text-xs ${colors.tag}`}
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

  const baseClasses =
    "group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 text-left shadow-sm transition-all duration-200 ease-out hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer";

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={baseClasses}
      data-tool-slug={tool.slug}
    >
      {cardContent}
    </Link>
  );
}

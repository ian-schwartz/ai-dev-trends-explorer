import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Code2,
  Bot,
  Wand2,
  Sparkles,
  Terminal,
  ExternalLink,
  ArrowLeft,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import { tools } from "@/data/tools";
import { trends } from "@/data/trends";
import { ToolLogo } from "@/components/tools/ToolLogo";
import type { ToolItem, ToolCategory, TrendLevel } from "@/types/tool";

const categoryLabels: Record<ToolCategory, string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  assistant: "Assistant",
  "terminal-tool": "Terminal tool",
};

const categoryIcons: Record<ToolCategory, LucideIcon> = {
  "ai-ide": Code2,
  "coding-agent": Bot,
  "ui-generator": Wand2,
  assistant: Sparkles,
  "terminal-tool": Terminal,
};

const categoryColors: Record<ToolCategory, string> = {
  "ai-ide": "text-blue-400 border-blue-500/30 bg-blue-500/10",
  "coding-agent": "text-violet-400 border-violet-500/30 bg-violet-500/10",
  "ui-generator": "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  assistant: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  "terminal-tool": "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
};

const trendStyles: Record<TrendLevel, string> = {
  rising: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  established: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  experimental: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  overhyped: "bg-zinc-600/15 text-zinc-500 border-zinc-600/30",
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

function getToolBySlug(slug: string): ToolItem | undefined {
  return tools.find((t) => t.slug === slug);
}

function getRelatedTrends(toolName: string) {
  return trends.filter((t) => t.relatedTools.includes(toolName));
}

function getRelatedTools(tool: ToolItem, limit = 4): ToolItem[] {
  return tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const Icon = categoryIcons[tool.category];
  const relatedTrends = getRelatedTrends(tool.name);
  const relatedTools = getRelatedTools(tool);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors duration-200 ease-out hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Tools directory
        </Link>

        {/* Header */}
        <header className="mt-6 border-b border-zinc-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <ToolLogo
              slug={tool.slug}
              category={tool.category}
              logoUrl={tool.logo}
              size="md"
              name={tool.name}
            />
            <span
              className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium ${categoryColors[tool.category]}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {categoryLabels[tool.category]}
            </span>
            <span
              className={`rounded border px-2 py-0.5 text-xs font-medium capitalize ${trendStyles[tool.trend]}`}
            >
              {tool.trend}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            {tool.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-zinc-400">
            {tool.summary}
          </p>
          {tool.website && (
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:border-violet-500/50 hover:bg-violet-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Visit website
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </header>

        {/* Why it matters */}
        {tool.whyItMatters && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Why it matters
            </h2>
            <p className="mt-2 leading-relaxed text-zinc-300">
              {tool.whyItMatters}
            </p>
          </section>
        )}

        {/* Best for */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Best for
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-300">
            {tool.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Strengths and Weaknesses */}
        <section className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Strengths
            </h2>
            <ul className="mt-3 space-y-2">
              {tool.strengths.map((s) => (
                <li
                  key={s}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                >
                  <Check className="h-4 w-4 shrink-0 text-emerald-500/80" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Weaknesses
            </h2>
            <ul className="mt-3 space-y-2">
              {tool.weaknesses.map((w) => (
                <li
                  key={w}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                >
                  <X className="h-4 w-4 shrink-0 text-zinc-500" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Capabilities
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-1.5 text-sm ${
                tool.beginnerFriendly
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }`}
            >
              {tool.beginnerFriendly ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Beginner friendly
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-1.5 text-sm ${
                tool.productionFriendly ? "text-emerald-400" : "text-zinc-500"
              }`}
            >
              {tool.productionFriendly ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Production friendly
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-1.5 text-sm ${
                tool.repoAware ? "text-emerald-400" : "text-zinc-500"
              }`}
            >
              {tool.repoAware ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Repo aware
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-1.5 text-sm ${
                tool.terminalAccess ? "text-emerald-400" : "text-zinc-500"
              }`}
            >
              {tool.terminalAccess ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Terminal access
            </span>
          </div>
        </section>

        {/* Related trends */}
        {relatedTrends.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Related trends
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedTrends.map((trend) => (
                <Link
                  key={trend.slug}
                  href="/#trend-radar"
                  className="rounded-lg border border-zinc-700/80 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 ease-out hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-foreground"
                >
                  {trend.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Related tools
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-md hover:shadow-zinc-900/20"
                >
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    {categoryLabels[t.category]}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {t.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

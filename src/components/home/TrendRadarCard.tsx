import type { TrendItem, TrendStatus } from "@/types/trend";

const statusStyles: Record<
  TrendStatus,
  { badge: string; border: string }
> = {
  rising: {
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    border: "border-emerald-500/20",
  },
  established: {
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    border: "border-blue-500/20",
  },
  experimental: {
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    border: "border-violet-500/20",
  },
  overhyped: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    border: "border-amber-500/20",
  },
};

const statusLabels: Record<TrendStatus, string> = {
  rising: "rising",
  established: "established",
  experimental: "experimental",
  overhyped: "use with caution",
};

interface TrendRadarCardProps {
  trend: TrendItem;
}

export function TrendRadarCard({ trend }: TrendRadarCardProps) {
  const styles = statusStyles[trend.status];

  return (
    <article
      className={`rounded-lg border bg-zinc-900/50 p-4 sm:p-5 ${styles.border} border-zinc-800/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-zinc-900/70 hover:shadow-md hover:shadow-zinc-900/20`}
      data-trend-slug={trend.slug}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 line-clamp-2 font-semibold tracking-tight text-foreground">
          {trend.title}
        </h3>
        <span
          className={`shrink-0 whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium ${styles.badge}`}
        >
          {statusLabels[trend.status]}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {trend.summary}
      </p>
      {trend.relatedTools.length > 0 && (
        <p className="mt-3 text-xs text-zinc-500">
          Related: {trend.relatedTools.join(", ")}
        </p>
      )}
      {trend.signalLabel != null && (
        <p className="mt-1 text-xs font-medium text-zinc-500">
          {trend.signalLabel}
        </p>
      )}
    </article>
  );
}

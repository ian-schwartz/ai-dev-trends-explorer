import { trends } from "@/data/trends";
import { TrendRadarCard } from "./TrendRadarCard";

export function TrendRadarSection() {
  return (
    <section id="trend-radar" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Trend Radar
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Key movements in the AI developer ecosystem. Where the market is
          heading and what to watch.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => (
            <TrendRadarCard key={trend.slug} trend={trend} />
          ))}
        </div>
      </div>
    </section>
  );
}

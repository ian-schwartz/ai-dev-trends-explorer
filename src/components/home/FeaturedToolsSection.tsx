export function FeaturedToolsSection() {
  return (
    <section className="border-b border-zinc-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Featured tools
        </h2>
        <p className="mt-2 text-zinc-400">
          Placeholder — tool cards and filtering coming in Milestone 2.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
              aria-hidden
            >
              <div className="h-4 w-24 rounded bg-zinc-700" />
              <div className="mt-3 h-3 w-full rounded bg-zinc-800" />
              <div className="mt-2 h-3 w-4/5 rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

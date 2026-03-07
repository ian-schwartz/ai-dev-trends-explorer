export function WorkflowPreviewSection() {
  return (
    <section className="border-b border-zinc-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Workflow preview
        </h2>
        <p className="mt-2 text-zinc-400">
          Placeholder — workflow visuals (pair programming, agent loop, etc.) in Milestone 3.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {["AI pair programming", "Agent loop", "UI-first prototyping", "Refactor/test loop"].map(
            (label) => (
              <div
                key={label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-400"
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

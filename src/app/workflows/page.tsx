import { WorkflowGrid } from "@/components/workflows/WorkflowGrid";

export default function WorkflowsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Very subtle emerald glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/6 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-100">
          Workflows
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Common AI development workflows: from pair programming and agent loops
          to UI-first prototyping and refactor/test cycles.
        </p>
        <div className="mt-10 [&_article:hover]:shadow-emerald-500/5">
          <WorkflowGrid />
        </div>
      </div>
    </main>
  );
}

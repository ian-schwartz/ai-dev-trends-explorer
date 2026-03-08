import Link from "next/link";
import { workflows } from "@/data/workflows";
import { MiniWorkflow } from "@/components/workflows/MiniWorkflow";

const PREVIEW_COUNT = 3;

export function WorkflowPreviewSection() {
  const previewWorkflows = workflows.slice(0, PREVIEW_COUNT).map((w) => ({
    name: w.name,
    description: w.description,
    steps: w.steps.map((s) => s.title),
  }));

  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 py-16 sm:py-20">
      {/* Very subtle emerald glow behind workflow cards */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100">
          Workflow preview
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Practical AI-assisted development workflows: from pair programming and
          agent loops to UI-first prototyping and refactor-and-validate.
        </p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>div:hover]:shadow-emerald-500/5">
          {previewWorkflows.map((workflow) => (
            <MiniWorkflow
              key={workflow.name}
              name={workflow.name}
              description={workflow.description}
              steps={workflow.steps}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/workflows"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-600 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            View All Workflows
          </Link>
        </div>
      </div>
    </section>
  );
}

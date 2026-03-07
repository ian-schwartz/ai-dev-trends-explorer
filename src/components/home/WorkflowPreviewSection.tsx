import Link from "next/link";
import { MiniWorkflow } from "@/components/workflows/MiniWorkflow";

const PREVIEW_WORKFLOWS: {
  name: string;
  description: string;
  steps: string[];
}[] = [
  {
    name: "AI Pair Programming",
    description:
      "Iterative cycle of prompting for code, reviewing suggestions, and refactoring. Fits daily feature work and small fixes.",
    steps: ["Prompt", "Generate", "Review", "Refactor"],
  },
  {
    name: "Agent Loop",
    description:
      "Autonomous loop: set a goal, the agent plans, edits files, runs the app, and fixes errors until done or stuck.",
    steps: ["Goal", "Plan", "Edit", "Run", "Fix"],
  },
  {
    name: "UI-First Prototyping",
    description:
      "Start with generated UI, then refine layout, wire up mock data, and polish. Good for landing pages and dashboards.",
    steps: ["Generate UI", "Refine", "Connect Data", "Polish"],
  },
];

export function WorkflowPreviewSection() {
  return (
    <section className="border-b border-zinc-800/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Workflow preview
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Common AI development workflows: from pair programming to agent loops
          and UI-first prototyping.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_WORKFLOWS.map((workflow) => (
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

import { WorkflowGrid } from "@/components/workflows/WorkflowGrid";

export default function WorkflowsPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Workflows
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Common AI development workflows: from pair programming and agent loops
          to UI-first prototyping and refactor/test cycles.
        </p>
        <div className="mt-10">
          <WorkflowGrid />
        </div>
      </div>
    </main>
  );
}

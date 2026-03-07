import { ToolGrid } from "@/components/tools/ToolGrid";

export default function ToolsPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tools directory
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          AI development tools: IDEs, coding agents, UI generators, and
          assistants. Compare options and find what fits your workflow.
        </p>
        <div className="mt-10">
          <ToolGrid />
        </div>
      </div>
    </main>
  );
}

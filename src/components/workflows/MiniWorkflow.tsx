import { ChevronRight } from "lucide-react";

interface MiniWorkflowProps {
  name: string;
  steps: string[];
}

export function MiniWorkflow({ name, steps }: MiniWorkflowProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-wrap items-center gap-x-1 gap-y-2">
            <span className="rounded-md border border-zinc-700/80 bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-300">
              {step}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-zinc-600"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

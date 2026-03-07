import { ChevronRight } from "lucide-react";

interface MiniWorkflowProps {
  name: string;
  description: string;
  steps: string[];
}

export function MiniWorkflow({ name, description, steps }: MiniWorkflowProps) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-sm transition-all duration-200 hover:border-violet-500/20 hover:bg-zinc-900/70 hover:shadow-md hover:shadow-violet-500/5">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-0 gap-y-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center gap-x-0 gap-y-2"
          >
            <span className="rounded-lg border border-zinc-700/80 bg-zinc-800/70 px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-sm">
              {step}
            </span>
            {i < steps.length - 1 && (
              <span className="flex shrink-0 items-center px-1" aria-hidden>
                <span className="h-px w-2 bg-zinc-600" />
                <ChevronRight className="h-4 w-4 text-zinc-600" />
                <span className="h-px w-2 bg-zinc-600" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

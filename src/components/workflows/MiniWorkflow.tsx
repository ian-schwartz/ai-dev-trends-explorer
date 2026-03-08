import { ChevronRight } from "lucide-react";

interface MiniWorkflowProps {
  name: string;
  description: string;
  steps: string[];
}

export function MiniWorkflow({ name, description, steps }: MiniWorkflowProps) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 hover:border-violet-500/20 hover:bg-zinc-900/70 hover:shadow-md hover:shadow-violet-500/5 sm:p-5">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex min-w-0 shrink-0 basis-auto items-center gap-x-1.5"
          >
            <span className="min-w-[4.5rem] rounded-lg border border-zinc-700/80 bg-zinc-800/70 px-2.5 py-1.5 text-xs font-medium text-zinc-300 shadow-sm sm:min-w-0 sm:px-3">
              {step}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-zinc-500"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

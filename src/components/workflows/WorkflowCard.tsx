import { ChevronRight } from "lucide-react";
import type { Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
}

function StepCard({
  step,
  stepIndex,
}: {
  step: { title: string; description: string };
  stepIndex: number;
}) {
  return (
    <div
      className="min-w-[7rem] max-w-[10rem] rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 sm:min-w-[8rem] sm:max-w-[12rem]"
      data-step={stepIndex + 1}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {step.title}
      </p>
      <p className="mt-0.5 line-clamp-2 text-sm text-zinc-400">
        {step.description}
      </p>
    </div>
  );
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <article
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
      data-workflow-slug={workflow.slug}
    >
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {workflow.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {workflow.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
        {workflow.steps.flatMap((step, i) => [
          <StepCard key={`step-${i}`} step={step} stepIndex={i} />,
          ...(i < workflow.steps.length - 1
            ? [
                <ChevronRight
                  key={`conn-${i}`}
                  className="h-4 w-4 shrink-0 text-zinc-600"
                  aria-hidden
                />,
              ]
            : []),
        ])}
      </div>
    </article>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.div
      className="min-w-[7rem] max-w-[10rem] rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-800/80 sm:min-w-[8rem] sm:max-w-[12rem]"
      data-step={stepIndex + 1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: stepIndex * 0.06,
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {step.title}
      </p>
      <p className="mt-0.5 line-clamp-2 text-sm text-zinc-400">
        {step.description}
      </p>
    </motion.div>
  );
}

function Connector() {
  return (
    <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
      <span className="h-px w-2 bg-zinc-700" />
      <ChevronRight className="h-4 w-4 text-zinc-600" />
      <span className="h-px w-2 bg-zinc-700" />
    </div>
  );
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <motion.article
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
      data-workflow-slug={workflow.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {workflow.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {workflow.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-3 sm:gap-x-2">
        {workflow.steps.flatMap((step, i) => [
          <StepCard key={`step-${i}`} step={step} stepIndex={i} />,
          ...(i < workflow.steps.length - 1
            ? [<Connector key={`conn-${i}`} />]
            : []),
        ])}
      </div>
    </motion.article>
  );
}

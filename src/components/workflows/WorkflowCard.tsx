"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
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
      className="w-full min-w-0 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-2.5 shadow-sm transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800/80 sm:min-w-[8rem] sm:max-w-[12rem] sm:w-auto"
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

function ConnectorHorizontal() {
  return (
    <div
      className="hidden shrink-0 items-center gap-0.5 sm:flex"
      aria-hidden
    >
      <span className="h-px w-2 bg-zinc-700" />
      <ChevronRight className="h-4 w-4 text-zinc-600" />
      <span className="h-px w-2 bg-zinc-700" />
    </div>
  );
}

function ConnectorVertical() {
  return (
    <div
      className="flex shrink-0 flex-col items-center py-0.5 sm:hidden"
      aria-hidden
    >
      <span className="h-2 w-px bg-zinc-600" />
      <ChevronDown className="h-4 w-4 text-zinc-600" />
      <span className="h-2 w-px bg-zinc-600" />
    </div>
  );
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <motion.article
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 hover:border-violet-500/20 hover:shadow-md hover:shadow-violet-500/5 sm:p-5"
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
      <div className="mt-4 flex flex-col gap-0 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-3">
        {workflow.steps.flatMap((step, i) => [
          <StepCard key={`step-${i}`} step={step} stepIndex={i} />,
          ...(i < workflow.steps.length - 1
            ? [
                <ConnectorVertical key={`conn-v-${i}`} />,
                <ConnectorHorizontal key={`conn-h-${i}`} />,
              ]
            : []),
        ])}
      </div>
    </motion.article>
  );
}

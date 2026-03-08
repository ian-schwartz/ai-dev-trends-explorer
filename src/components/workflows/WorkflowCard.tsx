"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { Workflow, MaturityLevel } from "@/types/workflow";

const maturityStyles: Record<
  MaturityLevel,
  string
> = {
  beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  advanced: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  experimental: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

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

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <motion.article
      className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 hover:border-violet-500/20 hover:shadow-md hover:shadow-violet-500/5 sm:p-5"
      data-workflow-slug={workflow.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {workflow.name}
        </h3>
        <span
          className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium capitalize ${maturityStyles[workflow.maturityLevel]}`}
        >
          {workflow.maturityLevel}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {workflow.description}
      </p>
      <p className="mt-2 text-xs font-medium text-zinc-500">
        When to use: {workflow.whenToUse}
      </p>
      {workflow.relatedTools.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {workflow.relatedTools.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-zinc-700/80 bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-400"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
      {/* Mobile: vertical stack with chevron-down between steps */}
      <div className="mt-4 flex flex-col gap-0 sm:hidden sm:mt-5">
        {workflow.steps.map((step, i) => (
          <div key={i} className="flex flex-col gap-0">
            <StepCard step={step} stepIndex={i} />
            {i < workflow.steps.length - 1 && (
              <div className="flex justify-center py-0.5" aria-hidden>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Desktop: horizontal flow; step+chevron grouped so wrap keeps pairs */}
      <div className="mt-4 hidden flex-wrap items-center gap-x-1.5 gap-y-3 sm:mt-5 sm:flex">
        {workflow.steps.map((step, i) => (
          <div
            key={i}
            className="flex min-w-0 shrink-0 basis-auto items-center gap-x-1.5"
          >
            <StepCard step={step} stepIndex={i} />
            {i < workflow.steps.length - 1 && (
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-zinc-500"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </motion.article>
  );
}

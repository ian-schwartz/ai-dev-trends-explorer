"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 py-24 sm:py-32">
      {/* Subtle gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600/20 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Explore the Modern{" "}
          <span className="bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
            AI Developer Stack
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Tools, workflows, and trends for AI-augmented development. Find the
          right setup for your team.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/tools"
            className="inline-flex w-full items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-zinc-200 sm:w-auto"
          >
            Explore Tools
          </Link>
          <Link
            href="/workflows"
            className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-600 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-zinc-500 hover:bg-zinc-800/50 sm:w-auto"
          >
            View Workflows
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

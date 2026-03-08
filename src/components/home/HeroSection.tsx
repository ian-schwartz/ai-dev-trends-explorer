"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 py-24 sm:py-32">
      {/* Stronger radial gradient glow (violet/blue accent) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Explore the Modern{" "}
          <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">
            AI Developer Stack
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Compare tools, understand workflows, and track trends shaping
          AI-assisted software development.
        </p>
        <p className="mx-auto mt-3 text-sm text-zinc-500">
          Tools directory • practical workflows • ecosystem signals
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/tools"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 hover:shadow-violet-500/25 sm:w-auto"
          >
            Explore Tools
          </Link>
          <Link
            href="/workflows"
            className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-600 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-violet-500/50 hover:bg-violet-500/5 sm:w-auto"
          >
            View Workflows
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

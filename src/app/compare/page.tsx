"use client";

import { useState } from "react";
import { tools } from "@/data/tools";
import type { ToolItem } from "@/types/tool";
import {
  CompareSelector,
  type CompareSelection,
} from "@/components/compare/CompareSelector";
import { CompareTable } from "@/components/compare/CompareTable";

const emptySelection: CompareSelection = [null, null, null];

export default function ComparePage() {
  const [selection, setSelection] = useState<CompareSelection>(emptySelection);

  function handleSelectionChange(index: 0 | 1 | 2, tool: ToolItem | null) {
    setSelection((prev) => {
      const next: CompareSelection = [...prev];
      next[index] = tool;
      return next;
    });
  }

  const selectedTools = selection.filter((t): t is ToolItem => t !== null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Compare tools
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Select up to three tools to compare categories, strengths, weaknesses,
          and features side by side.
        </p>
        <div className="mt-10 space-y-8">
          <CompareSelector
            tools={tools}
            selection={selection}
            onSelectionChange={handleSelectionChange}
          />
          <CompareTable tools={selectedTools} />
        </div>
      </div>
    </main>
  );
}

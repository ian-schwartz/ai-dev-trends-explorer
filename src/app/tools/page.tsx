"use client";

import { useMemo, useState } from "react";
import { tools } from "@/data/tools";
import type { ToolItem } from "@/types/tool";
import { ToolFilters, type ToolFilterState } from "@/components/tools/ToolFilters";
import { ToolGrid } from "@/components/tools/ToolGrid";

const initialFilters: ToolFilterState = {
  search: "",
  category: "all",
  beginnerFriendly: false,
  productionFriendly: false,
};

function filterTools(toolsList: ToolItem[], filters: ToolFilterState): ToolItem[] {
  return toolsList.filter((tool) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!tool.name.toLowerCase().includes(q)) return false;
    }
    if (filters.category !== "all" && tool.category !== filters.category) {
      return false;
    }
    if (filters.beginnerFriendly && !tool.beginnerFriendly) return false;
    if (filters.productionFriendly && !tool.productionFriendly) return false;
    return true;
  });
}

export default function ToolsPage() {
  const [filters, setFilters] = useState<ToolFilterState>(initialFilters);

  const filteredTools = useMemo(
    () => filterTools(tools, filters),
    [filters]
  );

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tools Directory
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          AI development tools include IDEs, coding agents, UI generators, and
          assistants. Compare options and find what fits your workflow.
        </p>
        <div className="mt-10 space-y-6">
          <ToolFilters filters={filters} onFiltersChange={setFilters} />
          {filteredTools.length > 0 ? (
            <>
              <p className="text-sm text-zinc-500">
                {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
              </p>
              <ToolGrid tools={filteredTools} />
            </>
          ) : (
            <p className="rounded-lg border border-zinc-800 bg-zinc-900/50 py-8 text-center text-zinc-500">
              No tools match the current filters.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

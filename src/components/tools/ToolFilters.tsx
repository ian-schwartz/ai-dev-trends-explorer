import type { ToolCategory } from "@/types/tool";

const CATEGORY_OPTIONS: { value: ToolCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-ide", label: "AI IDE" },
  { value: "coding-agent", label: "Coding agent" },
  { value: "ui-generator", label: "UI generator" },
  { value: "assistant", label: "Assistant" },
  { value: "terminal-tool", label: "Terminal tool" },
];

export interface ToolFilterState {
  search: string;
  category: ToolCategory | "all";
  beginnerFriendly: boolean;
  productionFriendly: boolean;
}

interface ToolFiltersProps {
  filters: ToolFilterState;
  onFiltersChange: (filters: ToolFilterState) => void;
}

export function ToolFilters({ filters, onFiltersChange }: ToolFiltersProps) {
  function update(partial: Partial<ToolFilterState>) {
    onFiltersChange({ ...filters, ...partial });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value.trimStart() })}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-foreground placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 sm:max-w-xs"
          aria-label="Search tools by name"
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={filters.beginnerFriendly}
              onChange={(e) => update({ beginnerFriendly: e.target.checked })}
              className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-zinc-900 focus:ring-zinc-500"
            />
            Beginner-friendly
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={filters.productionFriendly}
              onChange={(e) => update({ productionFriendly: e.target.checked })}
              className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-zinc-900 focus:ring-zinc-500"
            />
            Production-friendly
          </label>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => update({ category: value })}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              filters.category === value
                ? "border-violet-500/40 bg-violet-500/10 text-violet-200"
                : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

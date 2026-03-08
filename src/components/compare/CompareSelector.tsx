"use client";

import type { ToolItem } from "@/types/tool";

const categoryLabels: Record<ToolItem["category"], string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  "assistant": "Assistant",
  "terminal-tool": "Terminal tool",
};

export type CompareSelection = [ToolItem | null, ToolItem | null, ToolItem | null];

interface CompareSelectorProps {
  tools: ToolItem[];
  selection: CompareSelection;
  onSelectionChange: (index: 0 | 1 | 2, tool: ToolItem | null) => void;
}

export function CompareSelector({
  tools,
  selection,
  onSelectionChange,
}: CompareSelectorProps) {
  function getOptionsForSlot(slotIndex: 0 | 1 | 2) {
    const selectedSlugs = selection
      .filter((t, i) => i !== slotIndex && t !== null)
      .map((t) => t!.slug);
    const currentSlug = selection[slotIndex]?.slug ?? null;
    return tools.filter(
      (t) => t.slug === currentSlug || !selectedSlugs.includes(t.slug)
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {([0, 1, 2] as const).map((index) => (
        <div key={index} className="flex flex-col gap-1.5">
          <label
            htmlFor={`compare-select-${index}`}
            className="text-sm font-medium text-zinc-400"
          >
            Tool {index + 1}
          </label>
          <select
            id={`compare-select-${index}`}
            value={selection[index]?.slug ?? ""}
            onChange={(e) => {
              const slug = e.target.value;
              const tool = slug ? tools.find((t) => t.slug === slug) ?? null : null;
              onSelectionChange(index, tool);
            }}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-foreground focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          >
            <option value="">Select a tool</option>
            {getOptionsForSlot(index).map((tool) => (
              <option key={tool.slug} value={tool.slug}>
                {tool.name} ({categoryLabels[tool.category]})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

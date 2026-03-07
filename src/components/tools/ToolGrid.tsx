import type { ToolItem } from "@/types/tool";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: ToolItem[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}

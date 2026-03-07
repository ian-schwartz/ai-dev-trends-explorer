import type { ToolItem } from "@/types/tool";

const categoryLabels: Record<ToolItem["category"], string> = {
  "ai-ide": "AI IDE",
  "coding-agent": "Coding agent",
  "ui-generator": "UI generator",
  "assistant": "Assistant",
  "terminal-tool": "Terminal tool",
};

interface CompareTableProps {
  tools: ToolItem[];
}

function ListCell({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-0.5 text-sm text-zinc-400">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function BoolCell({ value }: { value: boolean }) {
  return (
    <span className={value ? "text-emerald-400" : "text-zinc-500"}>
      {value ? "Yes" : "No"}
    </span>
  );
}

export function CompareTable({ tools }: CompareTableProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 py-12 text-center text-zinc-500">
        Select one to three tools above to compare.
      </div>
    );
  }

  const rows: { label: string; render: (t: ToolItem) => React.ReactNode }[] = [
    { label: "Category", render: (t) => categoryLabels[t.category] },
    { label: "Trend", render: (t) => t.trend },
    {
      label: "Best use cases",
      render: (t) => <ListCell items={t.bestFor} />,
    },
    {
      label: "Strengths",
      render: (t) => <ListCell items={t.strengths} />,
    },
    {
      label: "Weaknesses",
      render: (t) => <ListCell items={t.weaknesses} />,
    },
    {
      label: "Beginner friendly",
      render: (t) => <BoolCell value={t.beginnerFriendly} />,
    },
    {
      label: "Production friendly",
      render: (t) => <BoolCell value={t.productionFriendly} />,
    },
    {
      label: "Repo aware",
      render: (t) => <BoolCell value={t.repoAware} />,
    },
    {
      label: "Terminal access",
      render: (t) => <BoolCell value={t.terminalAccess} />,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="bg-zinc-900/80 px-4 py-3 text-sm font-semibold text-zinc-400">
              —
            </th>
            {tools.map((tool) => (
              <th
                key={tool.slug}
                className="bg-zinc-900/80 px-4 py-3 text-sm font-semibold text-foreground"
              >
                {tool.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.label}
              className={
                rowIndex < rows.length - 1
                  ? "border-b border-zinc-800/80"
                  : undefined
              }
            >
              <td className="w-40 shrink-0 bg-zinc-900/40 px-4 py-3 text-sm font-medium text-zinc-500">
                {row.label}
              </td>
              {tools.map((tool) => (
                <td
                  key={tool.slug}
                  className="max-w-[20rem] px-4 py-3 text-sm text-zinc-300"
                >
                  {row.render(tool)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

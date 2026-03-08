import { workflows } from "@/data/workflows";
import { WorkflowCard } from "./WorkflowCard";

export function WorkflowGrid() {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.slug} workflow={workflow} />
      ))}
    </div>
  );
}

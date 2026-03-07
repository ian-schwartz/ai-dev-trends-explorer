export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  slug: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

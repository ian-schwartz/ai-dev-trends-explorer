export type MaturityLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "experimental";

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  slug: string;
  name: string;
  description: string;
  whenToUse: string;
  maturityLevel: MaturityLevel;
  relatedTools: string[];
  steps: WorkflowStep[];
}

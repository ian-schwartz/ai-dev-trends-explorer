export type ToolCategory =
  | "ai-ide"
  | "coding-agent"
  | "ui-generator"
  | "assistant"
  | "terminal-tool";

export type TrendLevel =
  | "rising"
  | "established"
  | "experimental"
  | "overhyped";

export interface ToolItem {
  slug: string;
  name: string;
  category: ToolCategory;
  summary: string;
  bestFor: string[];
  strengths: string[];
  weaknesses: string[];
  tags: string[];
  trend: TrendLevel;
  beginnerFriendly: boolean;
  productionFriendly: boolean;
  repoAware: boolean;
  terminalAccess: boolean;
  website?: string;
  whyItMatters?: string;
  logo?: string;
  screenshot?: string;
}

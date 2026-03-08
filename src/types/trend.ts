export type TrendStatus =
  | "rising"
  | "established"
  | "experimental"
  | "overhyped";

export interface TrendItem {
  slug: string;
  title: string;
  status: TrendStatus;
  summary: string;
  relatedTools: string[];
  signalLabel?: string;
}

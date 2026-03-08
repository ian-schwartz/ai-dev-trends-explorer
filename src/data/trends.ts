import type { TrendItem } from "@/types/trend";

export const trends: TrendItem[] = [
  {
    slug: "ai-native-ides",
    title: "AI-native IDEs",
    status: "established",
    summary:
      "Editors built around LLMs and project context are becoming the default for many developers. Inline completion, chat, and multi-file edits in one place.",
    relatedTools: ["Cursor", "Windsurf"],
    signalLabel: "Default for early adopters",
  },
  {
    slug: "agentic-coding-loops",
    title: "Agentic coding loops",
    status: "rising",
    summary:
      "Agents that plan, edit, run, and fix in a loop are moving from research to early product. Best for bounded tasks; human review still recommended.",
    relatedTools: ["Devin", "OpenDevin"],
    signalLabel: "Early product",
  },
  {
    slug: "repo-aware-assistants",
    title: "Repo-aware assistants",
    status: "established",
    summary:
      "Assistants that index and reason over full codebases are table stakes. Long context and RAG over repo structure improve suggestion quality.",
    relatedTools: ["Cursor", "Claude Code", "Windsurf"],
  },
  {
    slug: "prompt-to-app-ui",
    title: "Prompt-to-app UI generation",
    status: "rising",
    summary:
      "Describe a screen or flow and get React or other UI code. Speeds up prototyping and landing pages; hand-off to backend and state still common.",
    relatedTools: ["v0"],
    signalLabel: "Strong for greenfield UI",
  },
  {
    slug: "autonomous-software-engineers",
    title: "Autonomous software engineers",
    status: "experimental",
    summary:
      "Agents that own full tasks end-to-end are in limited access. High variance; best for well-scoped work and teams that can supervise and correct.",
    relatedTools: ["Devin", "OpenDevin"],
    signalLabel: "Limited access",
  },
  {
    slug: "prompt-only-coding",
    title: "Prompt-only coding without review",
    status: "overhyped",
    summary:
      "Relying on AI output without review is risky for production. Best practice: treat suggestions as drafts and keep human review in the loop.",
    relatedTools: ["Cursor", "Claude Code", "Replit Ghostwriter"],
    signalLabel: "Use with caution",
  },
];

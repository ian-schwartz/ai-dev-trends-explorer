import type { TrendItem } from "@/types/trend";

export const trends: TrendItem[] = [
  {
    slug: "ai-native-ides",
    title: "AI-native IDEs",
    status: "established",
    summary:
      "Editors built around LLMs and project context are becoming the default for many developers. Inline completion, chat, and multi-file edits in one place.",
    relatedTools: ["Cursor", "Windsurf", "Zed"],
    signalLabel: "Default for early adopters",
  },
  {
    slug: "agentic-coding-loops",
    title: "Agentic coding loops",
    status: "rising",
    summary:
      "Agents that plan, edit, run, and fix in a loop are moving from research to early product. This approach works best for bounded tasks. Human review is still recommended.",
    relatedTools: ["Devin", "OpenHands", "OpenClaw"],
    signalLabel: "Early product",
  },
  {
    slug: "repo-aware-assistants",
    title: "Repo-aware assistants",
    status: "established",
    summary:
      "Assistants that index and reason over full codebases are table stakes. Long context and RAG over repo structure improve suggestion quality.",
    relatedTools: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Tabnine"],
  },
  {
    slug: "prompt-to-app-ui",
    title: "Prompt-to-app UI generation",
    status: "rising",
    summary:
      "Describe a screen or flow and get React or other UI code. It speeds up prototyping and landing pages. Hand-off to backend and state is still common.",
    relatedTools: ["v0", "Builder.io"],
    signalLabel: "Strong for greenfield UI",
  },
  {
    slug: "autonomous-software-engineers",
    title: "Autonomous software engineers",
    status: "experimental",
    summary:
      "Agents that own full tasks end-to-end are in limited access. Results vary. This approach works best for well-scoped work and teams that can supervise and correct.",
    relatedTools: ["Devin", "OpenHands", "OpenClaw"],
    signalLabel: "Limited access",
  },
  {
    slug: "prompt-only-coding",
    title: "AI coding without human review",
    status: "overhyped",
    summary:
      "Skipping human review of AI-generated code increases risk in production. Treat AI output as draft material and keep review in the loop for important changes.",
    relatedTools: ["Cursor", "Claude Code", "Replit Ghostwriter", "GitHub Copilot"],
  },
];

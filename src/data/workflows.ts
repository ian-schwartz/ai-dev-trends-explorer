import type { Workflow } from "@/types/workflow";

export const workflows: Workflow[] = [
  {
    slug: "ai-pair-programming",
    name: "AI Pair Programming",
    description:
      "A human-guided workflow where the developer stays in control while the AI helps implement, explain, and refine code.",
    whenToUse:
      "Best for everyday feature work, bug fixes, and targeted improvements.",
    maturityLevel: "beginner",
    relatedTools: ["Cursor", "Claude Code", "Codex"],
    steps: [
      { title: "Define Feature", description: "Clarify the change or feature you want." },
      { title: "AI Drafts Changes", description: "AI suggests code edits or new code." },
      { title: "Review Diff", description: "Inspect the suggestion and adjust as needed." },
      { title: "Refine or Correct", description: "Clean up style, naming, or fix mistakes." },
      { title: "Validate Locally", description: "Run the app or tests to confirm behavior." },
      { title: "Commit", description: "Commit the change and move to the next task." },
    ],
  },
  {
    slug: "agent-development-loop",
    name: "Agent Development Loop",
    description:
      "A higher-autonomy workflow where the developer defines the goal and the agent plans, edits files, runs commands, and iterates.",
    whenToUse:
      "Best for larger scoped tasks, multi-file updates, and implementation loops.",
    maturityLevel: "advanced",
    relatedTools: ["Codex", "Claude Code", "OpenHands", "OpenClaw"],
    steps: [
      { title: "Define Goal", description: "State the task or outcome clearly." },
      { title: "AI Plans Work", description: "Agent breaks the task into steps." },
      { title: "Edit Files", description: "Agent applies code changes." },
      { title: "Run App or Tests", description: "Execute build or test suite." },
      { title: "Fix Failures", description: "Address errors and adjust code." },
      { title: "Repeat Until Done", description: "Loop until goal is met or intervention needed." },
      { title: "Human Review", description: "Review and approve before merging." },
    ],
  },
  {
    slug: "ui-first-prototyping",
    name: "UI-First Prototyping",
    description:
      "Start from generated interface concepts, then convert them into a clean component structure and wire them into real data.",
    whenToUse:
      "Best for landing pages, dashboards, internal tools, and frontend experiments.",
    maturityLevel: "beginner",
    relatedTools: ["v0", "Cursor", "Codex"],
    steps: [
      { title: "Generate UI", description: "Create initial layout and components from a prompt." },
      { title: "Refine Layout", description: "Adjust structure, spacing, and components." },
      { title: "Break Into Components", description: "Split into reusable pieces and clear boundaries." },
      { title: "Connect Data", description: "Wire in sample data, state, or API." },
      { title: "Polish UX", description: "Finalize styling, responsiveness, and interactions." },
    ],
  },
  {
    slug: "ai-assisted-refactor-validation",
    name: "AI-Assisted Refactor and Validation",
    description:
      "Use AI to understand existing code, restructure it safely, and validate behavior before merging.",
    whenToUse:
      "Best for cleanup, maintainability improvements, migration work, and reducing complexity.",
    maturityLevel: "intermediate",
    relatedTools: ["Cursor", "Claude Code", "Codex"],
    steps: [
      { title: "Inspect Existing Code", description: "Identify areas to simplify or improve." },
      { title: "Explain Risks", description: "Use AI to surface dependencies and impact." },
      { title: "Refactor Structure", description: "Apply structural or stylistic changes." },
      { title: "Run Tests or Build", description: "Execute the test suite or build." },
      { title: "Fix Regressions", description: "Address any failing tests or breakage." },
      { title: "Approve Changes", description: "Review diff and approve before merge." },
    ],
  },
];

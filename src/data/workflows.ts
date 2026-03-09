import type { Workflow } from "@/types/workflow";

export const workflows: Workflow[] = [
  {
    slug: "ai-pair-programming",
    name: "AI Pair Programming",
    description:
      "A human-guided workflow where the developer stays in control while the AI helps implement, explain, and refine code.",
    whenToUse:
      "This workflow is best for everyday feature work, bug fixes, and targeted improvements.",
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
    slug: "two-agent-development-loop",
    name: "Two-Agent Development Loop",
    description:
      "A planning AI defines architecture and tasks while an execution agent edits files and runs commands.",
    whenToUse:
      "This workflow is best for larger scoped tasks, multi-file updates, and implementation loops.",
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
    slug: "spec-driven-agent-development",
    name: "Spec-Driven Agent Development",
    description:
      "Define a clear spec up front; an agent implements it and you review and refine until the result is correct.",
    whenToUse:
      "This workflow is best when you want controlled scope and clear acceptance criteria before the agent edits code.",
    maturityLevel: "intermediate",
    relatedTools: ["Cursor", "Claude Code", "Codex"],
    steps: [
      { title: "Write Spec", description: "Define goal, files, constraints, and acceptance criteria." },
      { title: "Agent Implements", description: "Agent edits files according to the spec." },
      { title: "Review Output", description: "Human reviews changes and verifies correctness." },
      { title: "Refine", description: "Agent improves implementation or fixes issues." },
      { title: "Merge", description: "Commit or merge once validated." },
    ],
  },
  {
    slug: "pr-scoped-ai-development",
    name: "PR-Scoped AI Development",
    description:
      "Keep changes small and PR-sized: define the task, give context, let the agent implement, then review and validate.",
    whenToUse:
      "This workflow is best for incremental changes, safe rollouts, and clear review boundaries.",
    maturityLevel: "intermediate",
    relatedTools: ["Cursor", "Claude Code", "GitHub Copilot"],
    steps: [
      { title: "Define Small Task", description: "Choose a pull-request sized change." },
      { title: "Provide Context", description: "List files, constraints, and requirements." },
      { title: "Agent Implements", description: "Agent performs focused edits." },
      { title: "Review Diff", description: "Human verifies the change." },
      { title: "Validate", description: "Run tests or build." },
      { title: "Merge", description: "Commit the change." },
    ],
  },
  {
    slug: "ui-first-prototyping",
    name: "UI-First Prototyping",
    description:
      "Start from generated interface concepts, then convert them into a clean component structure and wire them into real data.",
    whenToUse:
      "This workflow is best for landing pages, dashboards, internal tools, and frontend experiments.",
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
      "This workflow is best for cleanup, maintainability improvements, migration work, and reducing complexity.",
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

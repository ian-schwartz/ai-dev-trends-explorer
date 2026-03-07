import type { Workflow } from "@/types/workflow";

export const workflows: Workflow[] = [
  {
    slug: "ai-pair-programming",
    name: "AI Pair Programming",
    description:
      "Iterative cycle of prompting for code, reviewing suggestions, refactoring, and committing. Fits daily feature work and small fixes.",
    steps: [
      { title: "Prompt", description: "Describe the change or feature you want." },
      { title: "Generate Code", description: "AI suggests code edits or new code." },
      { title: "Review", description: "Inspect the suggestion and adjust as needed." },
      { title: "Refactor", description: "Clean up style, naming, and structure." },
      { title: "Commit", description: "Commit the change and move to the next task." },
    ],
  },
  {
    slug: "agent-loop",
    name: "Agent Loop",
    description:
      "Autonomous loop: set a goal, the agent plans, edits files, runs the app, detects errors, and fixes until done or stuck.",
    steps: [
      { title: "Goal", description: "Define the task or outcome." },
      { title: "Plan", description: "Agent breaks the task into steps." },
      { title: "Edit Files", description: "Agent applies code changes." },
      { title: "Run App", description: "Execute or build the application." },
      { title: "Detect Errors", description: "Check output, tests, or logs." },
      { title: "Fix", description: "Address errors and adjust code." },
      { title: "Repeat", description: "Loop until goal is met or intervention needed." },
    ],
  },
  {
    slug: "ui-first-prototyping",
    name: "UI-First Prototyping",
    description:
      "Start with generated UI, then refine layout, wire up mock data, and polish. Good for landing pages and dashboards.",
    steps: [
      { title: "Generate UI", description: "Create initial layout and components from a prompt." },
      { title: "Refine Layout", description: "Adjust structure, spacing, and components." },
      { title: "Connect Mock Data", description: "Wire in sample data and state." },
      { title: "Polish UI", description: "Finalize styling, responsiveness, and interactions." },
    ],
  },
  {
    slug: "refactor-test-loop",
    name: "Refactor/Test Loop",
    description:
      "Improve existing code by analyzing, refactoring, running tests, and fixing failures in a loop until tests pass.",
    steps: [
      { title: "Analyze Code", description: "Identify areas to simplify or improve." },
      { title: "Refactor", description: "Apply structural or stylistic changes." },
      { title: "Run Tests", description: "Execute the test suite." },
      { title: "Fix Issues", description: "Address any failing tests or regressions." },
      { title: "Repeat", description: "Continue until refactor is complete and green." },
    ],
  },
];

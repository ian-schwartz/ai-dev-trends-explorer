import Link from "next/link"
import { SectionGlow } from "@/components/layout/SectionGlow"
import {
  SectionHeading,
  SectionCard,
  PromptBlock,
  CopyablePromptBlock,
  PromptPatternCard,
} from "@/components/prompting"

const executionBriefExample = `Goal
Add a dark mode toggle to the settings screen.

Scope
- src/app/settings/page.tsx
- src/components/SettingsToggle.tsx
- use existing theme context

Constraints
- No new dependencies
- Prefer CSS variables for theme tokens

Acceptance Criteria
1. Toggle persists across reloads (localStorage).
2. No flash of wrong theme on first paint.
3. Accessible (aria-label, focus visible).

Validation
- Run lint and build
- Manual check in Chrome and Safari`

const featurePrompt = `Implement a "Save as template" action for the dashboard widget.

Scope: src/components/DashboardWidget.tsx and the existing template API in src/api/templates.ts.
Constraints: No new dependencies. Follow existing patterns for API calls.
Acceptance: Button in widget menu, success toast, list of saved templates in settings.`

const refactorPrompt = `Refactor the auth module to use a single AuthProvider and remove the duplicate session logic.

Scope: src/lib/auth/* and src/components/ProtectedRoute.tsx.
Constraints: Keep the same public API (useAuth hook). No behavior change, only structure.
Acceptance: All existing auth tests pass. No new dependencies.`

const debugPrompt = `The /api/export endpoint returns 500 when the request includes more than 50 IDs.

Context: Next.js API route in src/app/api/export/route.ts. The error appears in production only.
What I tried: Increasing serverless timeout. No change.
Please: Identify the likely cause and suggest a minimal fix with a code snippet.`

const explorationPrompt = `Where is user subscription status checked before allowing access to premium features?

I need to add a new gate for feature X and want to follow the same pattern. List the relevant files and the exact checks used.`

const prScopedPrompt = `Add pagination to the /api/users list endpoint. Page size 50, cursor-based. Keep the current response shape for the first page. Add a DB index on the sort column.

Scope: src/app/api/users/route.ts and the existing User model. No changes to the frontend.
Constraints: Backward compatible. No new dependencies.
Acceptance: Existing tests pass. Manual test with 10k rows shows under 200ms.`

const specDrivenPrompt = `Goal: Improve /api/search performance. Currently slow with 10k+ documents.

Scope: src/app/api/search/route.ts and src/lib/search.ts only.
Constraints: No new dependencies. Keep the same request/response contract.
Acceptance: Response time under 100ms at 10k docs. Add an index or caching as needed. Unit test for search logic.`

const vaguePrompt = `Make the app better and fix the bugs.`

const structuredPrompt = `Goal: Fix the checkout flow so completed orders show the correct total.
Scope: src/app/checkout/page.tsx and src/lib/orderTotal.ts.
Constraints: No API changes. Backward compatible with existing orders.
Acceptance: Unit test for orderTotal. Manual test with 3 items and a discount code.`

const templateFeature = `Goal
[One sentence describing the desired outcome.]

Scope
- [File or module 1]
- [File or module 2]

Constraints
- [e.g. No new dependencies, follow existing patterns]

Acceptance Criteria
1. [Testable outcome 1]
2. [Testable outcome 2]

Validation
- [How you will verify: lint, build, manual test]`

const templateRefactor = `Refactor [component/module name] to [specific improvement].

Scope: [files or directories]
Constraints: [e.g. Same public API, no behavior change]
Acceptance: [How to verify, e.g. existing tests pass]`

const templateDebug = `[What is broken]: [Brief description]

Context: [File or route, environment if relevant]
What I tried: [Steps already taken]
Please: [Specific ask, e.g. suggest a fix with code snippet]`

const frameworkItems = [
  {
    term: "Goal",
    body: "What should be true when done.",
  },
  {
    term: "Scope",
    body: "Files, modules, or areas to touch. What to leave alone.",
  },
  {
    term: "Constraints",
    body: "Dependencies, patterns, performance limits.",
  },
  {
    term: "Acceptance Criteria",
    body: "Testable outcomes.",
  },
  {
    term: "Validation",
    body: "How you will verify. Lint, build, tests, or manual check.",
  },
] as const

export default function PromptingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <SectionGlow colorClass="bg-violet-500/6" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Prompting for AI Development
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Get reliable, scoped results from AI coding tools and agents. This page covers practical prompt structures you can use in your IDE or in chat.
          </p>
        </div>

        {/* Execution Brief Framework */}
        <SectionCard className="mt-10">
          <SectionHeading
            id="execution-brief"
            title="Execution Brief Framework"
          >
            <p>
              Give the agent a clear contract. Define the goal, scope, constraints, and how you will validate. Reduces back-and-forth and keeps changes focused. Works well with <Link href="/tools/cursor" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Cursor</Link> and other <Link href="/tools" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">coding agents</Link>.
            </p>
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frameworkItems.map(({ term, body }) => (
              <div key={term} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">
                  {term}
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <CopyablePromptBlock>{executionBriefExample}</CopyablePromptBlock>
          </div>
        </SectionCard>

        {/* Prompt Patterns */}
        <SectionCard className="mt-10">
          <SectionHeading
            id="patterns"
            title="Prompt Patterns"
          >
            <p>
              Pick the pattern that fits your task. Each recipe shows when to use it, a short explanation, and an example.
            </p>
          </SectionHeading>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-2 [&>*]:min-w-0">
            <PromptPatternCard
              title="Feature Implementation"
              whenToUse="Adding a new feature, button, or API integration within existing code."
              description="Add or extend behavior in a bounded way. Specify scope and acceptance so the agent does not over-engineer."
              examplePrompt={featurePrompt}
            />
            <PromptPatternCard
              title="Refactor"
              whenToUse="Cleaning up duplication, renaming, or reorganizing modules."
              description="Improve structure or clarity without changing behavior. State the public API or contract that must stay the same."
              examplePrompt={refactorPrompt}
            />
            <PromptPatternCard
              title="Debugging"
              whenToUse="Unexpected errors, wrong output, or production-only issues."
              description="Include what is broken, where (file or route), what you already tried, and what you want (e.g. a minimal fix with code)."
              examplePrompt={debugPrompt}
            />
            <PromptPatternCard
              title="Codebase Exploration"
              whenToUse="Onboarding, adding a feature that must match existing patterns, or understanding flow."
              description="Ask where something is implemented or how a pattern is used. Request file names and concrete examples."
              examplePrompt={explorationPrompt}
            />
            <PromptPatternCard
              title="PR-Scoped AI Development"
              whenToUse="When you want one reviewable change. Keeps the agent from wandering across the repo."
              description="Agents perform best on pull-request sized tasks with clearly bounded scope. One goal, a short list of files, and clear acceptance criteria."
              examplePrompt={prScopedPrompt}
            />
            <PromptPatternCard
              title="Spec-Driven Agent Development"
              whenToUse="When you need consistent, repeatable results from an agent."
              description="Structured specs improve reliability. Define goal, scope, constraints, and acceptance criteria up front. The agent has a complete contract before it edits."
              examplePrompt={specDrivenPrompt}
            />
          </div>
        </SectionCard>

        {/* Weak vs Strong Prompts */}
        <SectionCard className="mt-10">
          <SectionHeading
            id="weak-vs-strong"
            title="Weak vs Strong Prompts"
          >
            <p>
              Vague prompts produce generic or wrong edits. Strong prompts give the agent a clear target and boundaries so you get a focused change.
            </p>
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400/90">
                Weak
              </p>
              <PromptBlock>{vaguePrompt}</PromptBlock>
              <p className="mt-2 text-xs text-zinc-500">
                No goal, scope, or way to validate. The agent may touch the wrong files or add unnecessary work.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                Strong
              </p>
              <CopyablePromptBlock>{structuredPrompt}</CopyablePromptBlock>
              <p className="mt-2 text-xs text-zinc-500">
                Goal, scope, constraints, and acceptance are clear. The agent can deliver a focused change.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Another comparison
            </p>
            <p className="mb-2 text-sm text-zinc-400">
              <strong className="text-zinc-300">Weak:</strong> &quot;Optimize the database queries.&quot;
            </p>
            <p className="text-sm text-zinc-400">
              <strong className="text-zinc-300">Strong:</strong> &quot;The /api/users list endpoint is slow with 10k rows. Add pagination (page size 50) and an index on the sort column. Keep the response shape the same for the first page.&quot;
            </p>
          </div>
        </SectionCard>

        {/* Planner vs Executor Roles */}
        <SectionCard className="mt-10">
          <SectionHeading
            id="planner-executor"
            title="Planner vs Executor Roles"
          >
            <p>
              Some tools are for planning and design. Others run inside your repo and make edits. Use the right one for the step you are on. A common workflow is to plan in ChatGPT or Claude, then execute in <Link href="/tools/cursor" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Cursor</Link> or another coding agent.
            </p>
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground">
                Planner
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Chat-first tools for architecture, task breakdown, and prompt drafting. No direct access to your codebase. Use them to clarify the goal and acceptance criteria before you hand off to an executor.
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Examples: ChatGPT, Claude (in browser), or similar chat interfaces.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground">
                Executor
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                IDE-integrated or CLI tools that read and edit your repo. They run commands and apply patches. Use your execution brief and pattern prompts here. Pair with <Link href="/workflows" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">workflows</Link> like human-in-the-loop or refactor-and-validate.
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Examples include Cursor, Codex, OpenHands, and other coding agents in the <Link href="/tools" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">tools directory</Link>.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Reusable Templates */}
        <SectionCard className="mt-10">
          <SectionHeading
            id="templates"
            title="Reusable Templates"
          >
            <p>
              Copy and fill in the placeholders. Adapt to your stack and conventions.
            </p>
          </SectionHeading>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Feature implementation
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Use for new features or small enhancements with clear scope.
              </p>
              <CopyablePromptBlock className="mt-3">{templateFeature}</CopyablePromptBlock>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Refactor
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Use when restructuring code without changing behavior.
              </p>
              <CopyablePromptBlock className="mt-3">{templateRefactor}</CopyablePromptBlock>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Debugging
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Use when describing a bug and asking for a fix or diagnosis.
              </p>
              <CopyablePromptBlock className="mt-3">{templateDebug}</CopyablePromptBlock>
            </div>
          </div>
        </SectionCard>
      </div>
    </main>
  )
}

import Link from "next/link"
import {
  SectionHeading,
  PromptBlock,
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

export default function PromptingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/6 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* A. Hero */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Prompting for AI Development
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Practical prompting patterns for AI coding tools and agents. Use these structures to get consistent, scoped results when working with assistants in your IDE or in separate chat.
        </p>

        {/* B. Execution Brief Framework */}
        <section className="mt-12">
          <SectionHeading
            id="execution-brief"
            title="Execution Brief Framework"
          >
            <p>
              Give the agent a clear contract. Define the goal, what is in and out of scope, constraints, and how you will validate. This reduces back-and-forth and keeps changes focused. Works well with tools like <Link href="/tools" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Cursor</Link> and <Link href="/compare" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">coding agents</Link>.
            </p>
          </SectionHeading>
          <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-zinc-400">
            <li><strong className="text-zinc-300">Goal</strong> – What should be true when done</li>
            <li><strong className="text-zinc-300">Scope</strong> – Files, modules, or areas to touch (and what to leave alone)</li>
            <li><strong className="text-zinc-300">Constraints</strong> – Dependencies, patterns, performance limits</li>
            <li><strong className="text-zinc-300">Acceptance Criteria</strong> – Testable outcomes</li>
            <li><strong className="text-zinc-300">Validation</strong> – How you will verify (lint, build, tests, manual check)</li>
          </ul>
          <PromptBlock>{executionBriefExample}</PromptBlock>
        </section>

        {/* C. Prompt Patterns */}
        <section className="mt-12">
          <SectionHeading
            id="patterns"
            title="Prompt Patterns"
          >
            <p>
              Different tasks need different prompt shapes. Use the pattern that matches what you are asking for.
            </p>
          </SectionHeading>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <PromptPatternCard
              title="Feature Implementation"
              description="Add or extend behavior in a bounded way. Specify scope and acceptance so the agent does not over-engineer."
              whenToUse="Adding a new feature, button, or API integration within existing code."
              examplePrompt={featurePrompt}
            />
            <PromptPatternCard
              title="Refactor"
              description="Improve structure or clarity without changing behavior. State the public API or contract that must stay the same."
              whenToUse="Cleaning up duplication, renaming, or reorganizing modules."
              examplePrompt={refactorPrompt}
            />
            <PromptPatternCard
              title="Debugging"
              description="Include what is broken, where (file/route), what you already tried, and what you want (e.g. a minimal fix with code)."
              whenToUse="Unexpected errors, wrong output, or production-only issues."
              examplePrompt={debugPrompt}
            />
            <PromptPatternCard
              title="Codebase Exploration"
              description="Ask where something is implemented or how a pattern is used. Request file names and concrete examples."
              whenToUse="Onboarding, adding a feature that must match existing patterns, or understanding flow."
              examplePrompt={explorationPrompt}
            />
          </div>
        </section>

        {/* D. Good vs Weak Prompting */}
        <section className="mt-12">
          <SectionHeading
            id="good-vs-weak"
            title="Good vs Weak Prompting"
          >
            <p>
              Vague prompts lead to generic or wrong edits. Structured prompts give the agent a clear target and boundaries.
            </p>
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400/90">
                Vague
              </p>
              <PromptBlock>{vaguePrompt}</PromptBlock>
              <p className="mt-2 text-xs text-zinc-500">
                No goal, scope, or way to validate. The agent may change the wrong files or add unnecessary work.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                Structured
              </p>
              <PromptBlock>{structuredPrompt}</PromptBlock>
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
        </section>

        {/* E. Planner vs Executor Roles */}
        <section className="mt-12">
          <SectionHeading
            id="planner-executor"
            title="Planner vs Executor Roles"
          >
            <p>
              Some tools are best for planning and design. Others run inside your repo and make edits. Use the right one for the step you are on.
            </p>
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground">
                Planner
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Chat-first tools for architecture, task breakdown, and prompt drafting. No direct access to your codebase. Good for clarifying the goal and acceptance criteria before you hand off to an executor.
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
                Examples: Cursor, Codex, OpenHands, and other coding agents in <Link href="/tools" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Tools</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* F. Reusable Templates */}
        <section className="mt-12">
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
              <h3 className="text-sm font-semibold text-foreground">
                Feature implementation
              </h3>
              <PromptBlock className="mt-2">{templateFeature}</PromptBlock>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Refactor
              </h3>
              <PromptBlock className="mt-2">{templateRefactor}</PromptBlock>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Debugging
              </h3>
              <PromptBlock className="mt-2">{templateDebug}</PromptBlock>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

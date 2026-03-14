import { PromptBlock } from "./PromptBlock"

interface PromptPatternCardProps {
  title: string
  description: string
  whenToUse: string
  examplePrompt: string
}

export function PromptPatternCard({
  title,
  description,
  whenToUse,
  examplePrompt,
}: PromptPatternCardProps) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 ease-out hover:border-violet-500/20 hover:shadow-md hover:shadow-zinc-900/20 sm:p-5">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        When to use
      </p>
      <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
        {whenToUse}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="mt-4">
        <PromptBlock>{examplePrompt}</PromptBlock>
      </div>
    </article>
  )
}

interface PromptBlockProps {
  children: string
  className?: string
}

export function PromptBlock({ children, className = "" }: PromptBlockProps) {
  return (
    <pre
      className={`rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3.5 font-mono text-sm leading-relaxed text-zinc-300 overflow-x-auto whitespace-pre-wrap ${className}`}
    >
      {children.trim()}
    </pre>
  )
}

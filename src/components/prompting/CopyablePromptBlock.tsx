"use client"

import { useState, useCallback } from "react"

interface CopyablePromptBlockProps {
  children: string
  className?: string
}

const blockClasses =
  "w-full max-w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3.5 pr-20 font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap break-words [overflow-wrap:anywhere] sm:pr-24"

export function CopyablePromptBlock({
  children,
  className = "",
}: CopyablePromptBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const text = children.trim()
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }, [children])

  return (
    <div className={`relative min-w-0 max-w-full ${className}`}>
      <pre className={blockClasses}>{children.trim()}</pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded border border-zinc-700 bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}

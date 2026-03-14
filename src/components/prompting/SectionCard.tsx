interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <section
      className={`rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-5 ${className}`}
    >
      {children}
    </section>
  )
}

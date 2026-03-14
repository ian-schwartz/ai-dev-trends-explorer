interface SectionHeadingProps {
  id?: string
  title: string
  children?: React.ReactNode
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-4" id={id}>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children && (
        <div className="mt-2 text-sm leading-relaxed text-zinc-400">
          {children}
        </div>
      )}
    </div>
  )
}

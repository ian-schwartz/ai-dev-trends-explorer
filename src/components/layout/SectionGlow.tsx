interface SectionGlowProps {
  /** Tailwind background color class, e.g. "bg-blue-500/6". */
  colorClass: string;
}

export function SectionGlow({ colorClass }: SectionGlowProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      <div
        className={`absolute left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl ${colorClass}`}
      />
    </div>
  );
}


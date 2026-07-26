/**
 * Mono eyebrow / kicker with a short gold rule. tone: 'light' on dark bg.
 */
export default function Eyebrow({ children, tone = 'dark', className = '' }) {
  const text = tone === 'light' ? 'text-gold-400' : 'text-gold-deep'
  const rule = tone === 'light' ? 'bg-gold-400/70' : 'bg-gold-deep/60'
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${text} ${className}`}>
      <span className={`h-px w-7 ${rule}`} aria-hidden="true" />
      {children}
    </span>
  )
}

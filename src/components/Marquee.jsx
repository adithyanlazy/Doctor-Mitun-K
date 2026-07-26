import { recognition } from '../lib/data'

export default function Marquee() {
  const items = [...recognition, ...recognition]
  return (
    <section className="bg-cream relative border-y border-line py-7" aria-label="Recognitions">
      <div className="container-x mb-5">
        <span className="eyebrow text-gold-deep/80">Qualified, appointed &amp; recognised by</span>
      </div>
      <div className="marquee-track relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
        <ul className="animate-marquee flex w-max items-center gap-10">
          {items.map((r, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-ink/70 text-lg md:text-xl">{r}</span>
              <span className="text-gold/70" aria-hidden="true">
                ◆
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

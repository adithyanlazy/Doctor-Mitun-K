import Reveal from './ui/Reveal'
import { credentialTiles } from '../lib/data'

/**
 * Credential tiles — deliberately not animated counters. A real clinician's
 * site should not carry invented case counts or years-in-practice, so this band
 * shows verifiable qualifications instead.
 */
export default function Stats() {
  return (
    <section className="bg-cream relative">
      <div className="container-x">
        <div className="hairline" />
        <div className="md:divide-line grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:divide-x">
          {credentialTiles.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="px-4 text-center md:px-8">
              <div className="font-display text-emerald text-3xl leading-none md:text-4xl">
                {s.value}
              </div>
              <div className="eyebrow text-gold-deep mt-3">{s.label}</div>
            </Reveal>
          ))}
        </div>
        <div className="hairline" />
      </div>
    </section>
  )
}

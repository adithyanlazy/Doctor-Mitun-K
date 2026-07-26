import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import { journey } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

export default function Journey() {
  const { openBooking } = useBooking()
  return (
    <section id="process" className="bg-emerald mesh-emerald grain relative scroll-mt-20 section">
      <div className="container-x relative z-[2] grid gap-14 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone="light">The process</Eyebrow>
          <h2 className="d-section text-cream mt-6">
            Nine steps to a{' '}
            <span className="italic-fraunces text-gold-grad">finished smile.</span>
          </h2>
          <p className="text-emerald-200 mt-5 max-w-sm leading-relaxed">
            Precise, digital and paced around your life — from first scan to the retainer
            that keeps it forever.
          </p>
          <button type="button" onClick={() => openBooking()} className="btn btn-gold mt-8">
            Start with a scan <ArrowRight size={16} />
          </button>
        </div>

        {/* steps */}
        <ol className="relative">
          <div className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-cream/15" aria-hidden="true" />
          {journey.map((s, i) => (
            <motion.li
              key={s.t}
              className="relative flex gap-6 pb-9 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative z-[2] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-emerald">
                <span className="font-mono text-sm font-medium text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="pt-1.5">
                <h3 className="font-display text-cream text-xl">{s.t}</h3>
                <p className="text-emerald-200/85 mt-1.5 max-w-md leading-relaxed">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

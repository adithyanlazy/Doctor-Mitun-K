import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import { brand, academics } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

/**
 * Academic & speaking record. Deliberately undated: the client has confirmed
 * the roles but not individual conference years or venues, and inventing them
 * on a real clinician's site is not an option. Add dated entries to
 * `academics` as they are supplied and this renders them unchanged.
 */
export default function Academics() {
  const { openBooking } = useBooking()
  return (
    <section id="academics" className="bg-cream section relative scroll-mt-20">
      <div className="bg-gold/8 pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full blur-3xl" />
      <div className="container-x relative z-[2] grid gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
        {/* intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>03 — Academics &amp; research</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            He also teaches{' '}
            <span className="italic-fraunces text-gold-grad">the next orthodontists.</span>
          </h2>
          <p className="text-ink/65 mt-5 max-w-sm leading-relaxed">
            {brand.short} is a Reader in the Department of Orthodontics &amp; Dentofacial
            Orthopaedics at Yenepoya Dental College, and an International Advisor to the
            Royal College of Physicians &amp; Surgeons of Glasgow. Teaching, research and
            clinical practice feed each other — which is why patients get current
            technique rather than habit.
          </p>

          <button type="button" onClick={() => openBooking()} className="btn btn-gold mt-9">
            Book a consultation <ArrowRight size={16} />
          </button>
        </div>

        {/* record */}
        <ol className="relative">
          <div className="bg-line absolute bottom-3 left-[0.6rem] top-3 w-px" aria-hidden="true" />
          {academics.map((a, i) => (
            <motion.li
              key={a.title}
              className="relative flex gap-6 pb-8 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-gold ring-cream relative z-[2] mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4" />
              <div className="pt-0.5">
                <div className="flex items-center gap-3">
                  <GraduationCap size={15} className="text-gold-deep" />
                  <span className="font-mono text-gold-deep text-xs tracking-wide">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-ink mt-2 text-xl leading-snug">{a.title}</h3>
                <p className="text-ink/70 mt-1 text-sm font-medium">{a.venue}</p>
                <p className="text-ink/55 mt-1.5 text-sm leading-relaxed">{a.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

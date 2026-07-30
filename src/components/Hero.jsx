import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDownRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import { img, brand, heroCredentials, locationsCount } from '../lib/data'
import { useBooking } from '../lib/bookingContext'
import { useAppReady } from '../lib/appReady'

/**
 * The portrait's entrance, written to read as part of the same sequence as the
 * headline: the frame is masked out and the mask clears upward from the bottom
 * edge — the panel's own resting edge — rather than the block fading in.
 */
const panelReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineRise = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.85, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

/** Everything else in the hero: it lifts and fades in on its own beat. */
const fadeRise = {
  hidden: { opacity: 0, y: 16 },
  show: ({ delay = 0, duration = 0.7 }) => ({ opacity: 1, y: 0, transition: { delay, duration } }),
}

/** The credential line stays put and only fades — it sits tight under the name. */
const fadeIn = {
  hidden: { opacity: 0 },
  show: ({ delay = 0, duration = 0.6 }) => ({ opacity: 1, transition: { delay, duration } }),
}

export default function Hero() {
  const { openBooking } = useBooking()
  // The whole entrance waits for the preloader — otherwise it plays out behind
  // the curtain and the visitor is handed a hero that has already arrived.
  const ready = useAppReady()
  const reduce = useReducedMotion()
  // If the preloader handshake is missed, never leave copy clipped off-screen.
  const play = ready || reduce ? 'show' : 'hidden'
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])

  return (
    <section id="top" ref={ref} className="bg-cream relative min-h-[100svh] overflow-hidden">
      {/* framed B&W portrait — right-hand column on desktop only; hidden on mobile so the
          ink-on-bone text column stays full-width and legible, no photo-over-text risk */}
      {/* starts below the 74px header so the bar never sits over his face */}
      <motion.div
        style={{ y: yImg, scale }}
        className="hidden will-change-transform lg:absolute lg:bottom-0 lg:right-0 lg:top-[74px] lg:flex lg:w-[46%] lg:items-end lg:justify-center lg:pl-6"
      >
        {/* The photograph keeps its own 3:4 aspect rather than being forced to
            fill a much wider column — object-cover was cropping it to a tight
            head shot. Panel rises from the bottom edge of the section. */}
        {/* Same entrance as the headline: a mask that clears upward from the
            bottom edge, on the beat after the first line of the name. The
            photograph settles out of a slight over-scale as the mask clears. */}
        <motion.div
          variants={panelReveal}
          initial="hidden"
          animate={play}
          className="border-ink/10 relative h-[calc(100%-1.25rem)] max-w-full overflow-hidden rounded-t-[1.75rem] border border-b-0 shadow-[0_40px_90px_-50px_rgba(11,31,58,0.5)]"
        >
          <motion.img
            src={img.doctor}
            alt={`${brand.doctor}, ${brand.role}`}
            className="h-full w-auto max-w-none object-cover"
            initial={{ scale: 1.12 }}
            animate={ready ? { scale: 1 } : { scale: 1.12 }}
            transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* soft blend into the page background along the inner edge */}
          <div className="from-cream/20 pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      <div className="grain absolute inset-0 opacity-60" />

      {/* content — vertical rhythm is clamped against viewport height so the
          whole block still fits on a short laptop screen (~580px usable) */}
      <div className="container-x relative z-[2] flex min-h-[100svh] items-center pb-[clamp(2rem,7vh,4.5rem)] pt-[clamp(5.75rem,12vh,8.5rem)]">
        <div className="max-w-2xl lg:max-w-lg">
          <motion.div
            variants={fadeRise}
            custom={{ delay: 0.25, duration: 0.6 }}
            initial="hidden"
            animate={play}
          >
            <Eyebrow>Internationally Qualified Orthodontist · {brand.city}</Eyebrow>
          </motion.div>

          <h1 className="d-hero text-ink mt-[clamp(0.75rem,2.5vh,1.5rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={lineRise} custom={0} initial="hidden" animate={play}>
                Dr. Mithun
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="text-gold-grad italic-fraunces block"
                variants={lineRise}
                custom={1}
                initial="hidden"
                animate={play}
              >
                K.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="font-mono text-gold-deep mt-[clamp(0.5rem,2vh,1.25rem)] text-[0.82rem] tracking-wide"
            variants={fadeIn}
            custom={{ delay: 0.75 }}
            initial="hidden"
            animate={play}
          >
            {brand.credential}
          </motion.p>

          <motion.p
            className="text-ink/70 mt-[clamp(0.5rem,1.8vh,1rem)] max-w-md text-lg leading-relaxed"
            variants={fadeRise}
            custom={{ delay: 0.9 }}
            initial="hidden"
            animate={play}
          >
            <span className="text-ink">Evidence-based orthodontics</span>, planned digitally
            and written for one face — children, adolescents and adults, across{' '}
            {locationsCount} clinics in {brand.city}.
          </motion.p>

          <motion.div
            className="mt-[clamp(1.25rem,3.5vh,2.25rem)] flex flex-wrap items-center gap-3"
            variants={fadeRise}
            custom={{ delay: 1 }}
            initial="hidden"
            animate={play}
          >
            <button type="button" onClick={() => openBooking()} className="btn btn-gold">
              Book a consultation <ArrowRight size={17} />
            </button>
            <a href="#results" className="btn btn-outline">
              See the work <ArrowDownRight size={17} />
            </a>
          </motion.div>

          {/* qualifications, not counters — every line here is documented */}
          <motion.ul
            className="mt-[clamp(1rem,3vh,2.5rem)] flex flex-wrap items-center gap-x-2.5 gap-y-2.5"
            variants={fadeIn}
            custom={{ delay: 1.2, duration: 0.8 }}
            initial="hidden"
            animate={play}
          >
            {heroCredentials.map((c) => (
              <li
                key={c}
                className="border-line bg-ivory text-ink/75 rounded-full border px-3.5 py-1.5 text-xs font-medium"
              >
                {c}
              </li>
            ))}
          </motion.ul>

          {/* mobile/tablet portrait — stacked, framed, in normal document flow.
              Desktop's absolute right-column portrait is hidden below lg, so this
              is the only portrait rendered at these widths (no parallax, kept simple). */}
          <motion.div
            variants={panelReveal}
            initial="hidden"
            animate={play}
            className="border-ink/10 relative mt-10 aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border lg:hidden"
          >
            <img
              src={img.doctor}
              alt={`${brand.doctor}, ${brand.role}`}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 15%' }}
            />
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 lg:block">
        <span className="eyebrow text-ink/40">Scroll</span>
      </div>
    </section>
  )
}

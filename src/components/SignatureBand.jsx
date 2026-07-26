import { motion } from 'framer-motion'
import SmileArc from './SmileArc'
import Eyebrow from './ui/Eyebrow'

export default function SignatureBand() {
  return (
    <section className="mesh-emerald grain relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="container-x relative z-[2] flex flex-col items-center text-center">
        <Eyebrow tone="light">Engineered, not guessed</Eyebrow>

        <h2 className="d-section text-cream mt-6 max-w-2xl">
          Crooked becomes{' '}
          <span className="text-gold-grad italic-fraunces">aligned.</span>
        </h2>
        <p className="text-emerald-200 mt-5 max-w-lg text-lg">
          Every movement is planned digitally before a single appliance is fitted.
          Scroll and watch a smile fall into place — tooth by tooth, in sequence.
        </p>

        <motion.div
          className="mt-10 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SmileArc className="h-auto w-full" teeth={12} once={false} />
        </motion.div>

        <div className="mt-4 flex items-center gap-6">
          <span className="eyebrow text-emerald-200/60">Before</span>
          <span className="h-px w-16 bg-gold/40" />
          <span className="eyebrow text-gold-400">After</span>
        </div>
      </div>
    </section>
  )
}

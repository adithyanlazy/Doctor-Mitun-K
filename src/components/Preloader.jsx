import { motion } from 'framer-motion'
import Monogram from './ui/Monogram'
import { brand } from '../lib/data'

export default function Preloader() {
  return (
    <motion.div
      className="mesh-emerald grain fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative z-[2] flex flex-col items-center">
        {/* Static mark with a scale/fade reveal. A stroke-draw was tried here and
            dropped: on a slow first paint it can be captured mid-animation and
            reads as three stray dots. */}
        <motion.div
          className="text-gold-400 mb-6"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Monogram size={64} strokeWidth={2.2} />
        </motion.div>

        <motion.span
          className="text-cream text-center text-sm font-semibold uppercase leading-none tracking-[0.3em] sm:text-base"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {brand.doctor}
        </motion.span>

        <motion.div
          className="mt-4 h-px bg-gold-400/70"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="eyebrow text-emerald-200 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Orthodontist · {brand.city}
        </motion.span>
      </div>
    </motion.div>
  )
}

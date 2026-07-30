import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'

export default function PageHero({ eyebrow, title, titleEm, sub, crumb }) {
  return (
    <section className="mesh-emerald grain relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute -right-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative z-[2]">
        <nav
          className="mb-7 flex items-center gap-1.5 text-sm text-emerald-200/70 max-sm:-mt-2"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition-colors hover:text-cream max-sm:py-2.5">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gold-400">{crumb}</span>
        </nav>

        <Eyebrow tone="light">{eyebrow}</Eyebrow>

        <motion.h1
          className="d-section text-cream mt-5 max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {title} {titleEm && <span className="italic-fraunces text-gold-400">{titleEm}</span>}
        </motion.h1>

        {sub && (
          <motion.p
            className="text-emerald-200 mt-5 max-w-xl text-lg leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  )
}

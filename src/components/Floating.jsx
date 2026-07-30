import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, X } from 'lucide-react'
import { WhatsApp } from './ui/social'
import { brand } from '../lib/data'

export default function Floating() {
  const [showTop, setShowTop] = useState(false)
  const [bubble, setBubble] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setTimeout(() => setBubble(true), 3200)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-cream text-emerald shadow-lg transition-colors hover:bg-ivory"
          >
            <ArrowUp size={19} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="glass-light relative flex items-center gap-2 rounded-full border border-white/50 py-2.5 pl-4 pr-9 shadow-xl"
            >
              <span className="text-sm font-medium text-ink">Questions? Chat with us</span>
              <button
                type="button"
                onClick={() => setBubble(false)}
                aria-label="Dismiss"
                className="absolute right-2.5 text-ink/40 hover:text-ink"
              >
                <X size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${brand.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.55)] ring-1 ring-white/30 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" style={{ animationDuration: '2.6s' }} />
          <WhatsApp size={26} className="relative" />
        </a>
      </div>
    </div>
  )
}

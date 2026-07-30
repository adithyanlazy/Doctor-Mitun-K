import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import { WhatsApp } from './ui/social'
import { faqs, brand } from '../lib/data'

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-ink text-xl md:text-[1.35rem]">{q}</span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open ? 'rotate-45 border-emerald bg-emerald text-cream' : 'border-line text-emerald'
          }`}
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-ink/65 max-w-2xl pb-6 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-cream section scroll-mt-20">
      <div className="container-x grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Questions, answered</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            Everything you want{' '}
            <span className="italic-fraunces text-gold-deep">to know.</span>
          </h2>
          <p className="text-ink/65 mt-5 max-w-sm leading-relaxed">
            Still unsure? Send a question to the booking desk — you will get an answer
            from {brand.short}&rsquo;s team, not a sales script.
          </p>
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp mt-8"
          >
            <WhatsApp size={18} />
            Ask on WhatsApp
          </a>
        </div>

        <div>
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

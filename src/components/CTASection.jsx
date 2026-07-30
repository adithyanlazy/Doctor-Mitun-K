import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import { WhatsApp } from './ui/social'
import { brand, locationsCount } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

export default function CTASection() {
  const { openBooking } = useBooking()
  return (
    <section id="book" className="bg-cream scroll-mt-20 pb-6">
      <div className="container-x">
        <div className="mesh-emerald grain relative overflow-hidden rounded-[2rem] px-6 py-20 text-center md:px-16 md:py-28">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-[2] mx-auto max-w-2xl">
            <Eyebrow tone="light" className="justify-center">
              Ready when you are
            </Eyebrow>
            <motion.h2
              className="d-section text-cream mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Start your smile journey{' '}
              <span className="italic-fraunces text-gold-grad">today.</span>
            </motion.h2>
            <p className="text-emerald-200 mx-auto mt-5 max-w-lg text-lg">
              Consultation, intraoral scan and 3D smile simulation. Book once — you
              are placed at whichever of {brand.doctor}&rsquo;s {locationsCount} partner
              clinics in {brand.city} suits you best.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={() => openBooking()} className="btn btn-gold">
                Book consultation <ArrowRight size={17} />
              </button>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp size={17} /> WhatsApp us
              </a>
            </div>

            <p className="eyebrow text-emerald-200/60 mt-8">
              Digital scan · 3D simulation · Personalised plan
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

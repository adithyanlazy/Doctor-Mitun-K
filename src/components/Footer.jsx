import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail } from 'lucide-react'
import { socialLinks } from './ui/social'
import Monogram from './ui/Monogram'
import { brand, nav, treatmentTypes, locationsCount } from '../lib/data'

const badges = [
  '◆ M.Orth RCPS (Glasgow)',
  '◆ M.Orth RCSEd (Edinburgh)',
  'Reader — Yenepoya Dental College',
  'Fully digital workflow',
]

export default function Footer() {
  return (
    <footer className="mesh-emerald grain relative overflow-hidden pt-20">
      <div className="container-x relative z-[2]">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <Monogram size={34} className="text-cream" />
              <span className="text-cream text-[0.85rem] font-semibold uppercase leading-none tracking-[0.2em]">
                {brand.doctor}
              </span>
            </div>
            <p className="text-emerald-200/80 mt-5 max-w-xs text-sm leading-relaxed">
              Internationally qualified orthodontist and academic — dual Royal College
              memberships, Reader at Yenepoya Dental College, consulting across{' '}
              {locationsCount} partner clinics in {brand.city}.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ Icon, label, className }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`${brand.doctor} on ${label}`}
                  className={`grid h-11 w-11 place-items-center rounded-full transition sm:h-9 sm:w-9 ${className}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="eyebrow text-gold-400">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-emerald-200/85 inline-block transition-colors hover:text-cream max-sm:py-1.5"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* treatments */}
          <div>
            <h4 className="eyebrow text-gold-400">Treatments</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {treatmentTypes.map((t) => (
                <li key={t.name}>
                  <Link
                    to="/treatments"
                    className="text-emerald-200/85 inline-block transition-colors hover:text-cream max-sm:py-1.5"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="eyebrow text-gold-400">Where he consults</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-emerald-200/85">
              <li>{brand.city}, Karnataka</li>
              <li>Yenepoya Dental College</li>
              <li className="text-emerald-200/60">
                {locationsCount} partner clinics · by appointment
              </li>
            </ul>
            <h4 className="eyebrow text-gold-400 mt-8">Contact</h4>
            {/* Call, WhatsApp and email are the three things a visitor on a phone
                actually reaches for — each row is a full-height tap target. */}
            <ul className="mt-4 space-y-1 text-sm text-emerald-200/85 sm:mt-5 sm:space-y-4">
              <li>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="tabular flex min-h-11 items-center gap-3 hover:text-cream sm:min-h-0"
                >
                  <Phone size={17} className="shrink-0 text-gold-400" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  className="flex min-h-11 items-center gap-3 hover:text-cream sm:min-h-0"
                >
                  <MessageCircle size={17} className="shrink-0 text-gold-400" />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex min-h-11 items-center gap-3 break-all hover:text-cream sm:min-h-0"
                >
                  <Mail size={17} className="shrink-0 text-gold-400" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* badges */}
        <div className="flex flex-wrap gap-3 border-t border-cream/10 py-6">
          {badges.map((b) => (
            <span key={b} className="eyebrow rounded-full border border-cream/15 px-4 py-2 text-emerald-200/80">
              {b}
            </span>
          ))}
        </div>

        {/* bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-7 text-center text-sm text-emerald-200/60 md:flex-row md:text-left">
          <p>© 2026 {brand.doctor}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Terms</a>
            <span className="text-emerald-200/40">Demo site · placeholder content</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

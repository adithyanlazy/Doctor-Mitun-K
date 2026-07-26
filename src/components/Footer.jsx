import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail } from 'lucide-react'
import { Instagram, Facebook, Youtube, Linkedin } from './ui/social'
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
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold-400"
                >
                  <Icon size={16} />
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
                  <Link to={n.to} className="text-emerald-200/85 transition-colors hover:text-cream">
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
                  <Link to="/treatments" className="text-emerald-200/85 transition-colors hover:text-cream">
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
            <ul className="mt-5 space-y-4 text-sm text-emerald-200/85">
              <li className="flex gap-3">
                <Phone size={17} className="shrink-0 text-gold-400" />
                <a href={`tel:${brand.phoneHref}`} className="tabular hover:text-cream">{brand.phone}</a>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={17} className="shrink-0 text-gold-400" />
                <a href={`https://wa.me/${brand.whatsapp}`} className="hover:text-cream">WhatsApp us</a>
              </li>
              <li className="flex gap-3">
                <Mail size={17} className="shrink-0 text-gold-400" />
                <a href={`mailto:${brand.email}`} className="hover:text-cream">{brand.email}</a>
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

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Monogram from './ui/Monogram'
import { brand, nav } from '../lib/data'
import { useBooking } from '../lib/bookingContext'
import { lockScroll } from '../lib/useLenis'

/** Mark + wordmark, set to match the supplied logo lockup: wide-tracked caps. */
function Logo({ dark }) {
  const tone = dark ? 'text-ink' : 'text-cream'
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${brand.doctor} — home`}>
      <Monogram size={30} className={tone} />
      <span className={`text-[0.78rem] font-semibold uppercase leading-none tracking-[0.2em] sm:text-[0.85rem] ${tone}`}>
        {brand.doctor}
      </span>
    </Link>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { openBooking } = useBooking()

  // Home opens on a light hero; every inner page opens on the dark PageHero.
  // `dark` here means "draw the bar in dark ink" — i.e. the surface behind it is light.
  const isHome = pathname === '/'
  const dark = scrolled || isHome
  // The hero portrait starts below the header, so at the top of Home the bar
  // sits on plain cream and can stay transparent.
  const solid = scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lenis keeps driving the page behind the drawer unless it is stopped too —
  // hiding body overflow alone left the page scrolling under the open menu.
  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
          solid ? 'glass-light' : 'bg-transparent'
        } ${scrolled ? 'border-b border-line/70 shadow-[0_10px_40px_-24px_rgba(11,31,58,0.3)]' : ''}`}
      >
        <nav className="container-x flex h-[74px] items-center justify-between">
          <Logo dark={dark} />

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `group relative whitespace-nowrap text-[0.92rem] font-medium transition-colors ${
                      dark ? 'text-ink/75' : 'text-cream/85'
                    } ${isActive ? (dark ? '!text-gold-deep' : '!text-gold-400') : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {n.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${brand.phoneHref}`}
              className={`hidden items-center gap-2 text-sm font-medium xl:flex ${
                dark ? 'text-ink/70' : 'text-cream/80'
              } hover:text-gold-deep`}
            >
              <Phone size={15} />
              <span className="tabular">{brand.phone}</span>
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn btn-gold btn-nav inline-flex shrink-0 whitespace-nowrap"
            >
              Book now
            </button>
            {/* Dial shortcut only on mid-width mobile — on the narrowest screens the
                bar keeps Book now + menu; calling stays in the drawer and footer. */}
            <a
              href={`tel:${brand.phoneHref}`}
              aria-label={`Call ${brand.doctor}`}
              className={`hidden h-11 w-11 place-items-center rounded-full border transition-colors sm:grid lg:hidden ${
                dark
                  ? 'border-line bg-ivory/80 text-emerald'
                  : 'border-cream/25 bg-cream/10 text-cream'
              }`}
            >
              <Phone size={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open index"
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
                dark ? 'text-emerald' : 'text-cream'
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mesh-emerald grain fixed inset-0 z-[110] flex flex-col lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x relative z-[2] flex h-[74px] items-center justify-between">
              <Logo dark={false} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full text-cream"
              >
                <X size={26} />
              </button>
            </div>
            {/* Eight entries plus the CTA do not fit between the header and the
                bottom of a short phone (an iPhone SE is 568px of usable height),
                so the index scrolls on its own and the booking button is parked
                below it — the one action worth keeping in reach is never the
                thing that scrolls off. */}
            <div
              data-lenis-prevent
              className="container-x relative z-[2] flex flex-1 flex-col justify-center gap-1 overflow-y-auto overscroll-contain py-6"
            >
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <NavLink
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display flex items-baseline gap-4 border-b border-cream/10 py-3.5 text-[1.75rem] sm:py-4 sm:text-3xl ${isActive ? 'text-gold-400' : 'text-cream'}`
                    }
                  >
                    <span className="font-mono text-sm text-gold-400/80">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="container-x relative z-[2] pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openBooking()
                }}
                className="btn btn-gold w-full py-4 text-base"
              >
                Book a consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

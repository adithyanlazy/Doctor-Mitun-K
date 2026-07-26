import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import ClinicCard from '../components/ClinicCard'
import CTASection from '../components/CTASection'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import { scrollToEl } from '../lib/useLenis'
import { brand, locations, locationsCount } from '../lib/data'

/**
 * Every partner clinic on one page. The home list links in as /clinics#<slug>,
 * which opens that clinic's card, highlights it and scrolls it into view.
 *
 * The scroll is deliberately deferred: Layout pins a fresh route to the top,
 * and on a cold load the preloader holds the page for two seconds and pins it
 * again afterwards. So we wait for the preloader to release the body before
 * scrolling, otherwise the deep link is undone the moment it lands.
 */
export default function ClinicsPage() {
  const { hash } = useLocation()
  const [open, setOpen] = useState(null)
  const [q, setQ] = useState('')
  const [highlight, setHighlight] = useState(null)
  const pending = useRef(null)

  useEffect(() => {
    const slug = decodeURIComponent(hash.replace('#', ''))
    if (!slug || !locations.some((l) => l.slug === slug)) return

    setOpen(slug)
    setHighlight(slug)
    setQ('')

    let raf
    const started = performance.now()
    const tick = () => {
      const held = document.body.style.overflow === 'hidden'
      if (held && performance.now() - started < 6000) {
        raf = requestAnimationFrame(tick)
        return
      }
      // one frame past Layout's own scroll reset
      pending.current = setTimeout(() => scrollToEl(document.getElementById(slug)), 120)
    }
    raf = requestAnimationFrame(tick)

    const fade = setTimeout(() => setHighlight(null), 4000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(pending.current)
      clearTimeout(fade)
    }
  }, [hash])

  const needle = q.trim().toLowerCase()
  const shown = needle
    ? locations.filter((l) =>
        [l.name, l.area, l.note].filter(Boolean).join(' ').toLowerCase().includes(needle),
      )
    : locations

  return (
    <>
      <PageHero
        crumb="Clinics"
        eyebrow="Where he consults"
        title="One orthodontist."
        titleEm={`${locationsCount} clinics.`}
        sub={`${brand.short} consults at partner clinics across ${brand.city} and the Kasaragod belt, alongside his academic post at Yenepoya Dental College. Open any clinic below for directions and to book there directly on WhatsApp.`}
      />

      <section className="bg-cream section">
        <div className="container-x">
          <div className="border-line flex flex-col items-start justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
            <div>
              <Eyebrow>All locations</Eyebrow>
              <h2 className="d-section text-ink mt-5 max-w-xl">
                Book at the chair{' '}
                <span className="italic-fraunces text-gold-deep">nearest you.</span>
              </h2>
            </div>

            <label className="relative w-full max-w-xs">
              <span className="sr-only">Search clinics</span>
              <Search
                size={16}
                className="text-ink/40 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or area…"
                className="border-line bg-ivory text-ink placeholder:text-ink/40 focus:border-emerald focus:ring-emerald/20 w-full rounded-full border py-3 pl-11 pr-10 text-sm transition focus:outline-none focus:ring-2"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ('')}
                  aria-label="Clear search"
                  className="text-ink/40 hover:text-ink absolute right-3 top-1/2 -translate-y-1/2 p-1"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          {shown.length === 0 ? (
            <p className="text-ink/55 py-16 text-center text-sm">
              No clinic matches “{q}”. Try an area name, or{' '}
              <button type="button" onClick={() => setQ('')} className="text-gold-deep underline">
                clear the search
              </button>
              .
            </p>
          ) : (
            <ul className="mt-8 space-y-3">
              {shown.map((l) => (
                <Reveal as="li" key={l.slug} y={16} amount={0.15}>
                  <ClinicCard
                    clinic={l}
                    index={locations.indexOf(l)}
                    open={open === l.slug}
                    highlighted={highlight === l.slug}
                    onToggle={() => setOpen(open === l.slug ? null : l.slug)}
                  />
                </Reveal>
              ))}
            </ul>
          )}

          {/* TODO(client): consulting days, full addresses and clinic reception
              numbers are not supplied yet — those lines stay hidden until they are. */}
          <p className="text-ink/45 mt-8 max-w-2xl text-sm leading-relaxed">
            Consulting days vary by location. Send a booking request from any clinic above and the
            desk will confirm the next available slot there.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  )
}

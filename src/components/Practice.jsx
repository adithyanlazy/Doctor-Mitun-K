import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight, ArrowRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import { brand, locations, locationsCount } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

/**
 * Where he consults, two columns. Each clinic links through to its own card on
 * /clinics — directions, detail and a booking form that names that location.
 */
export default function Practice() {
  const { openBooking } = useBooking()
  return (
    <section id="practice" className="bg-cream section">
      <div className="container-x">
        <div className="border-line flex flex-col items-start justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>04 — Where he consults</Eyebrow>
            <h2 className="d-section text-ink mt-5 max-w-2xl">
              One orthodontist.{' '}
              <span className="italic-fraunces text-gold-deep">{locationsCount} clinics.</span>
            </h2>
          </div>
          <p className="text-ink/55 max-w-xs text-sm leading-relaxed">
            {brand.short} consults at partner clinics across {brand.city} and the Kasaragod
            belt, alongside his academic post at Yenepoya Dental College. Book once — you
            are placed at the location most convenient for you.
          </p>
        </div>

        <ul className="mt-2 grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          {locations.map((l, i) => {
            const sub = l.area || l.note
            return (
              <Reveal
                as="li"
                key={l.slug}
                delay={(i % 2) * 0.06}
                className="border-line group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 border-b py-5"
              >
                <span className="font-mono text-gold-deep/70 pt-1 text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0">
                  <Link
                    to={`/clinics#${l.slug}`}
                    className="font-display text-ink hover:text-gold-deep block text-lg leading-snug transition-colors max-sm:py-1.5"
                  >
                    {l.name}
                  </Link>
                  {sub && (
                    <p className="text-ink/55 mt-1 flex items-start gap-1.5 text-sm">
                      {l.area && <MapPin size={13} className="text-gold-deep mt-1 shrink-0" />}
                      {sub}
                    </p>
                  )}

                  {/* The three actions are plain text links; on a phone they need
                      padded hit areas to be thumb-sized, pulled back with a
                      negative margin so the row keeps its printed rhythm. */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 max-sm:-my-1.5">
                    <button
                      type="button"
                      onClick={() => openBooking(l.slug)}
                      className="text-gold-deep inline-flex items-center gap-1.5 text-sm font-medium hover:underline max-sm:py-2.5"
                    >
                      Book here
                    </button>
                    <Link
                      to={`/clinics#${l.slug}`}
                      className="text-ink hover:text-gold-deep inline-flex items-center gap-1.5 text-sm font-medium transition-colors max-sm:py-2.5"
                    >
                      Details &amp; directions
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    {l.mapUrl && (
                      <a
                        href={l.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink/45 hover:text-gold-deep text-sm transition-colors max-sm:py-2.5"
                      >
                        View on map
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>

        <Link
          to="/clinics"
          className="text-gold-deep group mt-8 inline-flex items-center gap-2 text-sm font-medium max-sm:py-2.5"
        >
          All {locationsCount} clinics, with directions and booking
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

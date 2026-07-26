import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoveHorizontal, Star, ArrowRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import { brand, cases } from '../lib/data'

/**
 * One case, one slider. Panes are 4:3 to match the source intraoral
 * photographs, so nothing is cropped away — all three sit in a row and each
 * drags independently.
 */
function CasePane({ c }) {
  const [pct, setPct] = useState(50)

  return (
    <figure className="flex h-full flex-col">
      <div className="border-line relative select-none overflow-hidden rounded-[1.25rem] border shadow-[0_30px_70px_-40px_rgba(11,31,58,0.5)]">
        {/* base = after */}
        <img
          src={c.after}
          alt={`${c.label} — after treatment`}
          className="block aspect-[4/3] w-full object-cover"
          draggable={false}
        />
        {/* top = before, clipped to the left of the handle */}
        <img
          src={c.before}
          alt={`${c.label} — before treatment`}
          className="pointer-events-none absolute inset-0 block aspect-[4/3] w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          draggable={false}
        />

        {/* labels */}
        <span className="eyebrow bg-ink/55 text-cream absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.6rem] backdrop-blur-sm">
          Before
        </span>
        <span className="eyebrow bg-gold text-cream absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.6rem] backdrop-blur-sm">
          After
        </span>

        {/* handle */}
        <div
          className="bg-cream/90 pointer-events-none absolute inset-y-0 z-[3] w-px"
          style={{ left: `${pct}%` }}
        >
          <div className="border-gold bg-cream text-emerald absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-lg">
            <MoveHorizontal size={15} />
          </div>
        </div>

        {/* the input drives it: mouse, touch and keyboard */}
        <input
          type="range"
          min="0"
          max="100"
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label={`${c.label} — reveal before and after`}
          className="absolute inset-0 z-[4] h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="mt-4">
        <p className="font-display text-ink text-lg leading-snug">{c.label}</p>
        <p className="text-ink/60 mt-1.5 text-sm leading-relaxed">{c.note}</p>
      </figcaption>
    </figure>
  )
}

/**
 * `withViewMore` is for the home page only — on /results the same section is
 * the page itself, so a link through to it would point at where you already are.
 */
export default function BeforeAfter({ withViewMore = false }) {
  return (
    <section id="results" className="bg-ivory section scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>02 — Selected work</Eyebrow>
            <h2 className="d-section text-ink mt-6">
              Drag to see the{' '}
              <span className="italic-fraunces text-gold-deep">difference.</span>
            </h2>
          </div>
          <p className="text-ink/55 max-w-xs text-sm leading-relaxed">
            Orthodontic outcomes in {brand.city}. Slide any handle to reveal the before
            and after for that case.
          </p>
          {/* TODO(client): replace with the doctor's own documented cases, with consent. */}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <CasePane c={c} />
            </Reveal>
          ))}
        </div>

        {withViewMore && (
          <div className="mt-10 flex justify-center">
            <Link to="/results" className="btn btn-outline group">
              View more results
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {['Internationally qualified', 'Fully digital workflow', 'Retention planned from day one'].map(
            (t) => (
              <div key={t} className="text-ink/60 flex items-center gap-2 text-sm">
                <Star size={14} className="text-gold" fill="currentColor" strokeWidth={0} />
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

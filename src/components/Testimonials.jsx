import { Quote } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import SwipeCarousel from './ui/SwipeCarousel'
import { testimonials } from '../lib/data'

function TestimonialCard({ t }) {
  return (
    <figure className="card-cream flex h-full flex-col p-7">
      <Quote size={30} className="text-gold/50" fill="currentColor" strokeWidth={0} />
      <blockquote className="text-ink/75 mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <img
          src={t.avatar}
          alt={t.name}
          className="portrait-bw h-12 w-12 rounded-full object-cover ring-1 ring-gold/40"
        />
        <div>
          <div className="font-display text-ink text-lg leading-none">{t.name}</div>
          <div className="text-ink/50 mt-1 text-sm">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-sage section scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>In their words</Eyebrow>
            <h2 className="d-section text-ink mt-6">
              What patients say{' '}
              <span className="italic-fraunces text-gold-deep">afterwards.</span>
            </h2>
          </div>
          {/* TODO(client): swap for real, consented patient feedback + video testimonials. */}
        </div>

        <div className="mt-12">
          <SwipeCarousel
            items={testimonials}
            ariaLabel="Patient reviews"
            idPrefix="review-slide"
            getItemKey={(t) => t.name}
            getDotLabel={(t) => `Show review from ${t.name}`}
            renderSlide={(t) => <TestimonialCard t={t} />}
          />
        </div>
      </div>
    </section>
  )
}

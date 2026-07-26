import { Check } from 'lucide-react'
import Reveal from './ui/Reveal'
import Eyebrow from './ui/Eyebrow'
import { brand, whyChoose } from '../lib/data'

export default function WhyChoose() {
  return (
    <section id="why" className="bg-sage section scroll-mt-20">
      <div className="container-x">
        <div className="max-w-2xl">
          <Eyebrow>Why patients choose him</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            Qualified twice over,{' '}
            <span className="italic-fraunces text-gold-deep">and still teaching.</span>
          </h2>
          <p className="text-ink/65 mt-5 leading-relaxed">
            {brand.short} combines international orthodontic qualifications, an active
            academic post and modern digital workflows — so the plan you get is built on
            current evidence, not on what the practice happens to stock.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {whyChoose.map((w, i) => (
            <Reveal as="li" key={w} delay={(i % 2) * 0.06} y={14}>
              <div className="border-line/70 flex items-center gap-3.5 border-b py-3.5">
                <span className="bg-gold/12 text-gold-deep grid h-7 w-7 shrink-0 place-items-center rounded-full">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-ink/80">{w}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

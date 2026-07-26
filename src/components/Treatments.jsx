import { Check, ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import Eyebrow from './ui/Eyebrow'
import { advantages, eligibility, brand, img } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

export default function Treatments() {
  const { openBooking } = useBooking()
  return (
    <section id="treatments" className="bg-cream section scroll-mt-20">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <div>
          <Eyebrow>Digital orthodontics</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            Every case starts on{' '}
            <span className="italic-fraunces text-gold-deep">screen.</span>
          </h2>
          <p className="text-ink/65 mt-5 max-w-md leading-relaxed">
            Before an appliance is fitted, your teeth are scanned, your treatment is planned
            digitally and your projected result is simulated in 3D. You see where the plan is
            going — and so does {brand.short}, movement by movement.
          </p>

          <div className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <Reveal key={a} delay={i * 0.05} y={14}>
                <div className="flex items-center gap-3">
                  <span className="bg-emerald text-gold-400 grid h-6 w-6 shrink-0 place-items-center rounded-full">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-ink/80">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-9">
            <p className="eyebrow text-gold-deep mb-3">Treated here</p>
            <div className="flex flex-wrap gap-2.5">
              {eligibility.map((e) => (
                <span
                  key={e}
                  className="border-line bg-ivory text-ink/75 rounded-full border px-4 py-1.5 text-sm"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => openBooking()} className="btn btn-gold mt-9">
            Book a consultation &amp; scan <ArrowRight size={16} />
          </button>
        </div>

        {/* image */}
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-45px_rgba(11,31,58,0.45)]">
              <img
                src={img.treatment}
                alt="Digitally planned orthodontic treatment"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="card-cream absolute -bottom-6 -left-4 max-w-[13rem] p-4 shadow-xl sm:-left-8">
              <p className="font-display text-emerald text-lg leading-tight">
                See it before you start
              </p>
              <p className="text-ink/55 mt-1 text-sm">
                3D simulation of your projected result at the planning stage.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

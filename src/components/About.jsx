import { Check, ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import Eyebrow from './ui/Eyebrow'
import { honorIconMap } from './ui/honorIcons'
import { socialLinks } from './ui/social'
import { brand, img, credentials, honors } from '../lib/data'
import { useBooking } from '../lib/bookingContext'

export default function About() {
  const { openBooking } = useBooking()
  return (
    <section id="about" className="bg-ivory section scroll-mt-20 [padding-bottom:clamp(2rem,5vw,4.5rem)]">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-t-[9rem] rounded-b-[1.5rem] border border-gold/40" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-t-[9rem] rounded-b-[1.5rem] shadow-[0_40px_90px_-45px_rgba(20,17,15,0.6)]">
              <img
                src={img.doctor}
                alt={`${brand.doctor}, ${brand.role}`}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="bg-emerald absolute -bottom-5 -right-3 rounded-2xl px-5 py-4 text-center shadow-xl sm:-right-6">
              <div className="font-display text-cream text-2xl leading-none">M.Orth ×2</div>
              <div className="eyebrow text-gold-400 mt-1.5">Glasgow · Edinburgh</div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <Eyebrow>01 — About</Eyebrow>
          <h2 className="d-section text-ink mt-6">{brand.doctor}</h2>
          <p className="font-mono text-gold-deep mt-3 text-sm tracking-wide">{brand.title}</p>

          <div className="text-ink/70 mt-7 space-y-4 leading-relaxed">
            <p>
              After his BDS and an MDS in Orthodontics &amp; Dentofacial Orthopaedics,
              Dr. Mithun went on to earn Membership in Orthodontics from both the Royal
              College of Physicians and Surgeons of Glasgow and the Royal College of
              Surgeons of Edinburgh — a dual international qualification held by few
              orthodontists in India.
            </p>
            <p>
              He is a Reader in the Department of Orthodontics &amp; Dentofacial
              Orthopaedics at Yenepoya Dental College, where he teaches postgraduate
              residents, conducts clinical research and works on digital orthodontics
              and clear aligner therapy. That academic grounding is what patients
              actually feel in the chair: every plan is built on facial analysis,
              dental health and long-term stability — not on a default protocol.
            </p>
            <blockquote className="border-gold-deep/40 text-ink/80 italic-fraunces border-l-2 pl-5 text-lg leading-snug">
              Every smile deserves an individualised treatment plan built on science,
              precision and compassion.
            </blockquote>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-ink/75">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald/10 text-emerald-600">
                  <Check size={13} strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button type="button" onClick={() => openBooking()} className="btn btn-gold">
              Book with {brand.short} <ArrowRight size={16} />
            </button>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, label, className }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`${brand.doctor} on ${label}`}
                  className={`grid h-10 w-10 place-items-center rounded-full transition ${className}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* awards & recognition */}
      <div className="container-x mt-10 sm:mt-14 lg:mt-20">
        <div className="hairline mb-5 sm:mb-6" />
        <Eyebrow>Awards &amp; recognition</Eyebrow>
        <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {honors.map((h, i) => {
            const Icon = honorIconMap[h.icon]
            return (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="card-cream h-full p-5 sm:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald text-gold-400">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-ink mt-4 text-lg leading-snug sm:mt-5">{h.title}</h3>
                  <p className="text-ink/55 mt-1.5 text-sm">{h.note}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

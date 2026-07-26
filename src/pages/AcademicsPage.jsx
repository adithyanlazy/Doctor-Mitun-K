import PageHero from '../components/PageHero'
import Academics from '../components/Academics'
import Marquee from '../components/Marquee'
import CTASection from '../components/CTASection'
import Reveal from '../components/ui/Reveal'
import Eyebrow from '../components/ui/Eyebrow'
import { brand, credentials, researchAreas } from '../lib/data'

function Qualifications() {
  return (
    <section className="bg-sage section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
        <div>
          <Eyebrow>Qualifications</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            The full{' '}
            <span className="italic-fraunces text-gold-deep">record.</span>
          </h2>
          <p className="text-ink/65 mt-5 max-w-sm leading-relaxed">
            Degrees, memberships and appointments — the training behind every treatment
            plan {brand.short} writes.
          </p>
        </div>

        <ol className="border-line divide-line divide-y border-t">
          {credentials.map((c, i) => (
            <Reveal as="li" key={c} delay={i * 0.05} className="flex items-baseline gap-5 py-5">
              <span className="font-mono text-gold-deep/70 text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-ink/85 leading-relaxed">{c}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section className="mesh-emerald grain relative overflow-hidden py-24 md:py-28">
      <div className="container-x relative z-[2]">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Research &amp; innovation</Eyebrow>
          <h2 className="d-section text-cream mt-6">
            Work that moves the{' '}
            <span className="italic-fraunces text-gold-grad">field forward.</span>
          </h2>
          <p className="text-emerald-200 mt-5 leading-relaxed">
            Alongside clinical practice and teaching, {brand.short} contributes to the
            advancement of orthodontics through active research and postgraduate
            education.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((r, i) => (
            <Reveal key={r} delay={i * 0.06}>
              <div className="bg-emerald flex h-full items-center gap-4 p-7">
                <span className="font-mono text-gold-400 text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-cream leading-snug">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TODO(client): a publications list goes here once titles/journals are supplied. */}
      </div>
    </section>
  )
}

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        crumb="Academics"
        eyebrow="Educator · Researcher · Speaker"
        title="Orthodontics taught,"
        titleEm="not just practised."
        sub={`${brand.doctor} teaches postgraduate orthodontics at Yenepoya Dental College, advises the Royal College of Physicians & Surgeons of Glasgow internationally, and lectures at national and international scientific conferences.`}
      />
      <Academics />
      <Qualifications />
      <Research />
      <Marquee />
      <CTASection />
    </>
  )
}

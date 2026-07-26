import PageHero from '../components/PageHero'
import Treatments from '../components/Treatments'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Reveal from '../components/ui/Reveal'
import Eyebrow from '../components/ui/Eyebrow'
import { brand, img, treatmentTypes, digitalWorkflow } from '../lib/data'

function Aligners() {
  return (
    <section className="mesh-emerald grain relative overflow-hidden">
      <div className="container-x relative z-[2] grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="border-cream/10 overflow-hidden rounded-[2rem] border">
            <img
              src={img.aligner}
              alt="A clear orthodontic aligner tray"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Eyebrow tone="light">Clear aligners</Eyebrow>
          <h2 className="d-section text-cream mt-6">
            Discreet, but only when it is{' '}
            <span className="italic-fraunces text-gold-grad">the right answer.</span>
          </h2>
          <p className="text-emerald-200 mt-5 leading-relaxed">
            Aligners suit a great many cases — mild, moderate and, with careful staging,
            complex ones too. {brand.short} plans each set digitally and stages the
            movements himself. Where a fixed appliance would finish the case better, he
            will tell you so rather than sell you the quieter option.
          </p>
        </div>
      </div>
    </section>
  )
}

function Types() {
  return (
    <section className="bg-sage section">
      <div className="container-x">
        <div className="max-w-2xl">
          <Eyebrow>Areas of expertise</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            Six disciplines, one{' '}
            <span className="italic-fraunces text-gold-deep">diagnosis first.</span>
          </h2>
          <p className="text-ink/65 mt-5">
            The appliance follows the diagnosis — never the other way around. {brand.short}{' '}
            treats children, adolescents and adults across the full range of orthodontic
            care, including the complex cases many practices refer on.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentTypes.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <article className="card-cream hover:border-gold/50 flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-1.5">
                <span className="eyebrow text-gold-deep">{t.for}</span>
                <h3 className="font-display text-ink mt-3 text-xl leading-snug">{t.name}</h3>
                <p className="text-ink/60 mt-3 text-sm leading-relaxed">{t.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Workflow() {
  return (
    <section className="bg-cream section">
      <div className="container-x">
        <div className="border-line flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>The digital workflow</Eyebrow>
            <h2 className="d-section text-ink mt-5">
              What “digital” actually{' '}
              <span className="italic-fraunces text-gold-deep">means here.</span>
            </h2>
          </div>
          <p className="text-ink/55 max-w-xs text-sm leading-relaxed">
            Five stages that run before and behind every case — aligners and fixed
            appliances alike.
          </p>
        </div>

        <ol className="mt-4">
          {digitalWorkflow.map((w, i) => (
            <Reveal
              as="li"
              key={w.t}
              delay={i * 0.05}
              className="border-line grid grid-cols-[auto_1fr] items-start gap-5 border-b py-7 md:grid-cols-[auto_0.9fr_1.1fr] md:gap-10"
            >
              <span className="font-mono text-gold-deep/70 pt-1 text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-ink text-xl leading-tight md:text-2xl">{w.t}</h3>
              <p className="text-ink/60 col-span-2 leading-relaxed md:col-span-1">{w.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        crumb="Treatments"
        eyebrow="Areas of expertise"
        title="Comprehensive"
        titleEm="orthodontic care."
        sub="Clear aligners, metal and ceramic braces, early treatment, adult orthodontics, surgical cases and impacted teeth — each planned around facial aesthetics, function and long-term stability."
      />
      <Treatments />
      <Types />
      <Aligners />
      <Workflow />
      <FAQ />
      <CTASection />
    </>
  )
}

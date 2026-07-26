import PageHero from '../components/PageHero'
import About from '../components/About'
import Stats from '../components/Stats'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import Reveal from '../components/ui/Reveal'
import Eyebrow from '../components/ui/Eyebrow'
import { brand, img, locationsCount } from '../lib/data'

function Approach() {
  return (
    <section className="bg-cream section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-45px_rgba(11,31,58,0.45)]">
            <img
              src={img.clinic}
              alt="Inside one of the partner clinics"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Eyebrow>One workflow, everywhere</Eyebrow>
          <h2 className="d-section text-ink mt-6">
            Same standard at every{' '}
            <span className="italic-fraunces text-gold-deep">chair.</span>
          </h2>
          <p className="text-ink/65 mt-5 leading-relaxed">
            {brand.short} consults at {locationsCount} partner clinics across {brand.city}{' '}
            alongside his teaching post. Each one runs the same digital protocol — intraoral
            scanning, digital planning, simulation and precision appliance design — so the
            location changes but the standard does not.
          </p>
          <ul className="text-ink/75 mt-7 space-y-3">
            {[
              'Intraoral digital scanning — no impression trays',
              'Digital treatment planning reviewed with you on screen',
              'Facial-aesthetic analysis, not just tooth alignment',
              'Retention and long-term stability planned from the start',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="bg-gold mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Meet your orthodontist"
        title="Science, precision"
        titleEm="and compassion."
        sub={`${brand.doctor} is an internationally qualified orthodontist and academic, dedicated to creating healthy, functional and aesthetically pleasing smiles for children, adolescents and adults.`}
      />
      <About />
      <Approach />
      <Stats />
      <WhyChoose />
      <Testimonials />
      <CTASection />
    </>
  )
}

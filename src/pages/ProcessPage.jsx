import PageHero from '../components/PageHero'
import Journey from '../components/Journey'
import CTASection from '../components/CTASection'

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="Your treatment journey"
        title="From first consultation to"
        titleEm="lasting result."
        sub="Nine clear stages — diagnosis, digital planning, active treatment and retention. Here is exactly what to expect, and why each step exists."
      />
      <Journey />
      <CTASection />
    </>
  )
}

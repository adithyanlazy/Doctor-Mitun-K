import PageHero from '../components/PageHero'
import BeforeAfter from '../components/BeforeAfter'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

/**
 * The case grid that used to live here duplicated BeforeAfter once that
 * became a three-up row, so it was removed rather than shown twice.
 */
export default function ResultsPage() {
  return (
    <>
      <PageHero
        crumb="Results"
        eyebrow="Real results"
        title="Before, after,"
        titleEm="and held there."
        sub="Orthodontic outcomes across a range of case types — drag the handle to compare, and see what a properly finished and retained result looks like."
      />
      <BeforeAfter />
      <Testimonials />
      <CTASection />
    </>
  )
}

import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import BeforeAfter from '../components/BeforeAfter'
import Academics from '../components/Academics'
import SignatureBand from '../components/SignatureBand'
import Treatments from '../components/Treatments'
import WhyChoose from '../components/WhyChoose'
import Journey from '../components/Journey'
import Practice from '../components/Practice'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <BeforeAfter withViewMore />
      <Academics />
      <SignatureBand />
      <Treatments />
      <WhyChoose />
      <Journey />
      <Practice />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}

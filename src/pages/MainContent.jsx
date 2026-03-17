import Hero from '../components/hero/hero'
import About from '../components/about/about'
import Services from '../components/services/services'
import Works from '../components/works/works'
import Together from '../components/together/together'
import FAQ from '../components/faq/faq'
import Testimonials from '../components/testimonials/testimonials'

function MainContent() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Works />
      <Together />
      <FAQ />
      <Testimonials />
    </>
  )
}

export default MainContent

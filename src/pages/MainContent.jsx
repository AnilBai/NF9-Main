import Hero from '../components/hero/hero'
import About from '../components/about/about'
import Services from '../components/services/services'
import Works from '../components/works/works'
import Together from '../components/together/together'
import FAQ from '../components/faq/faq'
import Testimonials from '../components/testimonials/testimonials'
import { Helmet } from 'react-helmet-async'

function MainContent() {
  return (
    <>
      <Helmet>
        <title>NF9 - Creative Web Design & Development Studio</title>
        <meta name="description" content="NF9 is a India-based digital studio crafting modern, high-performing web experiences. UI/UX design, web development, eCommerce, and mobile apps." />
        <meta property="og:title" content="NF9 — Creative Web Design & Development Studio" />
        <meta property="og:url" content="https://nf9.in/" />
      </Helmet>
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

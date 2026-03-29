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
        <title>Contact NF9 — Web Design Studio Hyderabad</title>
        <meta name="description" content="Get in touch with NF9, a web design and development studio based in Hyderabad. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:title" content="Contact NF9 — Web Design Studio Hyderabad" />
        <meta property="og:description" content="Get in touch with NF9, a web design and development studio based in Hyderabad. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:url" content="https://nf9.in/contact-us" />
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

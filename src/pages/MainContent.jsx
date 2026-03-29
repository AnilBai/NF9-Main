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
        <title>NF9 — Digital Studio for Web Design & Development</title>
        <meta name="description" content="NF9 is a digital studio crafting smooth, modern, and high-performing web experiences. Strategy, UX design, and development — all under one roof." />
        <meta property="og:title" content="NF9 — Digital Studio for Web Design & Development" />
        <meta property="og:description" content="NF9 is a digital studio crafting smooth, modern, and high-performing web experiences." />
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

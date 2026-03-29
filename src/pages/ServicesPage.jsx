import OurProcess from '../components/ourprocess/ourprocess'
import ServicesList from '../components/serviceslist/serviceslist'
import TechStack from '../components/techstack/techstack'
import Together from '../components/together/together'
import { Helmet } from 'react-helmet-async'

function ServicesPage() {
  return (
    <div>
      <Helmet>
        <title>Services — NF9 Digital Studio</title>
        <meta name="description" content="Explore NF9's full range of services — UI/UX design, web development, eCommerce, mobile apps, cloud infrastructure, and branding." />
        <meta property="og:title" content="Services — NF9 Digital Studio" />
        <meta property="og:description" content="Explore NF9's full range of services — UI/UX design, web development, eCommerce, mobile apps, cloud infrastructure, and branding." />
        <meta property="og:url" content="https://nf9.in/services" />
      </Helmet>
      <ServicesList />
      <OurProcess />
      <TechStack />
      <Together />
    </div>
  )
}

export default ServicesPage

import OurProcess from '../components/ourprocess/ourprocess'
import ServicesList from '../components/serviceslist/serviceslist'
import TechStack from '../components/techstack/techstack'
import Together from '../components/together/together'
import { Helmet } from 'react-helmet-async'

function ServicesPage() {
  return (
    <div>
      <Helmet>
        <title>Web Design, Development & Digital Services — NF9 Hyderabad</title>
        <meta name="description" content="NF9 offers end-to-end digital services in Hyderabad — UI/UX design, website development, eCommerce, mobile apps, cloud infrastructure, and branding. Serving clients across India." />
        <meta property="og:title" content="Web Design, Development & Digital Services — NF9 Hyderabad" />
        <meta property="og:description" content="NF9 offers end-to-end digital services — UI/UX design, website development, eCommerce, mobile apps, cloud infrastructure, and branding. Based in Hyderabad, India." />
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

import OurProcess from '../components/ourprocess/ourprocess'
import ServicesList from '../components/serviceslist/serviceslist'
import TechStack from '../components/techstack/techstack'
import Together from '../components/together/together'

function ServicesPage() {
  return (
    <div>
      <ServicesList />
      <OurProcess />
      <TechStack />
      <Together />
    </div>
  )
}

export default ServicesPage

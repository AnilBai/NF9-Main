import Contact from '../components/ContactUs/contactus'
import SocialMedia from '../components/socialmedia/socialmedia'
import { Helmet } from 'react-helmet-async'

function ContactUs() {
  return (
    <div>
      <Helmet>
        <title>Contact NF9 — Web Design Studio Hyderabad</title>
        <meta name="description" content="Get in touch with NF9, a web design and development studio based in Hyderabad. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:title" content="Contact NF9 — Web Design Studio Hyderabad" />
        <meta property="og:description" content="Get in touch with NF9, a web design and development studio based in Hyderabad. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:url" content="https://nf9.in/contact-us" />
      </Helmet>
      <Contact />
      <SocialMedia />
    </div>
  )
}

export default ContactUs

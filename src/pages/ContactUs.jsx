import Contact from '../components/ContactUs/contactus'
import SocialMedia from '../components/socialmedia/socialmedia'
import { Helmet } from 'react-helmet-async'

function ContactUs() {
  return (
    <div>
      <Helmet>
        <title>Contact Us — NF9 Digital Studio</title>
        <meta name="description" content="Get in touch with NF9. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:title" content="Contact Us — NF9 Digital Studio" />
        <meta property="og:description" content="Get in touch with NF9. Tell us about your project and we'll get back to you shortly." />
        <meta property="og:url" content="https://nf9.in/contact-us" />
      </Helmet>
      <Contact />
      <SocialMedia />
    </div>
  )
}

export default ContactUs

import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import MainContent from './pages/MainContent'
import ContactUs from './pages/ContactUs'
import ServicesPage from './pages/ServicesPage'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  useEffect(() => {
    const scrollToHash = () => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0 })
        return
      }

      const id = location.hash.substring(1)
      const attemptScroll = () => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }

      if (attemptScroll()) return

      // Retry briefly in case the element is still mounting
      let attempts = 0
      const maxAttempts = 20
      const intervalMs = 25
      const timer = window.setInterval(() => {
        attempts += 1
        if (attemptScroll() || attempts >= maxAttempts) {
          window.clearInterval(timer)
        }
      }, intervalMs)
    }

    scrollToHash()
  }, [location.pathname, location.hash])

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<MainContent />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="services" element={<ServicesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

// test deploy 19 march
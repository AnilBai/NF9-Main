import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Preloader from '../components/preloader'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import BackToTop from '../components/backtotop/backtotop'

function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(() => {
    return Boolean(window?.__nf9PreloaderHasShown)
  })
  const location = useLocation()

  const handlePreloaderComplete = () => {
    try {
      window.__nf9PreloaderHasShown = true
    } catch {
      // ignore
    }
    setPreloaderComplete(true)
  }

  // Fail-safe: if preloader animation never completes, force show after 5s
  useEffect(() => {
    if (preloaderComplete) return
    const timeout = window.setTimeout(() => {
      try {
        window.__nf9PreloaderHasShown = true
      } catch {
        // ignore
      }
      setPreloaderComplete(true)
    }, 5000)
    return () => window.clearTimeout(timeout)
  }, [preloaderComplete])

  useEffect(() => {
    if (!preloaderComplete) return
    if (location.pathname !== '/') return

    const hash = location.hash || '#hero'
    const id = hash.startsWith('#') ? hash.slice(1) : hash
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location, preloaderComplete])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />


      {!preloaderComplete && <Preloader onComplete={handlePreloaderComplete} />}
    </>
  )
}

export default Home
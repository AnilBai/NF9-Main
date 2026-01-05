import { useState } from 'react'
import './App.css'
import Preloader from './components/preloader'
import Header from './components/header/header'
import Hero from './components/hero/hero'
import About from './components/about/about'
import Services from './components/services/services'
import Works from './components/works/works'
import FAQ from './components/faq/faq'
import Footer from './components/footer/footer'
import Together from './components/together/together';



function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false)
  
  const handlePreloaderComplete = () => {
    setPreloaderComplete(true)
  }

  return (
    <>
      {!preloaderComplete && <Preloader onComplete={handlePreloaderComplete} />}

      <div style={{ opacity: preloaderComplete ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
        <Header />

        {/* Main content area - add your content here */}
        <main>
          <Hero />
          <About />
          <Services />
          <Works />
          <Together/>
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

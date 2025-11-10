import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import SocialProof from './components/SocialProof'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Loader from './components/Loader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="app">
        <Header />
        <main>
          <Hero />
          <Features />
          <SocialProof />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App


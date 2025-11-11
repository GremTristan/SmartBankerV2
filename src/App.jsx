import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import SocialProof from './components/SocialProof'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ToastNotification from './components/ToastNotification'
import SignupModal from './components/SignupModal'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSignup = (email) => {
    console.log('Nouvelle inscription:', email)
    // Ici vous pouvez ajouter la logique pour envoyer l'email à votre backend
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <ToastNotification />
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignup={handleSignup}
      />
      <div className="app">
        <Header />
        <main>
          <Hero onSignupClick={() => setIsSignupModalOpen(true)} />
          <Features />
          <SocialProof />
          <Pricing onSignupClick={() => setIsSignupModalOpen(true)} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App


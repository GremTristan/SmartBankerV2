import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import SocialProof from './components/SocialProof'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ToastNotification from './components/ToastNotification'
import SignupModal from './components/SignupModal'
import Documentation from './components/Documentation'
import RoadmapViewer from './components/RoadmapViewer'
import EBusinessCard from './components/EBusinessCard'
import Manifeste from './components/Manifeste'
import './App.css'

function HomePage({ 
  isLoading, 
  isSignupModalOpen, 
  setIsSignupModalOpen, 
  showDocumentation, 
  setShowDocumentation,
  showRoadmap,
  setShowRoadmap,
  showEBusinessCard,
  setShowEBusinessCard,
  handleSignup 
}) {
  if (showRoadmap) {
    return <RoadmapViewer onClose={() => setShowRoadmap(false)} />
  }
  
  if (showDocumentation) {
    return <Documentation onClose={() => setShowDocumentation(false)} />
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
      {showEBusinessCard && (
        <EBusinessCard onClose={() => setShowEBusinessCard(false)} />
      )}
      <div className="app">
        <Header 
          onDocumentationClick={() => setShowDocumentation(true)}
          onRoadmapClick={() => setShowRoadmap(true)}
          onEBusinessCardClick={() => setShowEBusinessCard(true)}
        />
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

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [showDocumentation, setShowDocumentation] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showEBusinessCard, setShowEBusinessCard] = useState(false)

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
    <Routes>
      <Route 
        path="/" 
        element={
          <HomePage
            isLoading={isLoading}
            isSignupModalOpen={isSignupModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
            showDocumentation={showDocumentation}
            setShowDocumentation={setShowDocumentation}
            showRoadmap={showRoadmap}
            setShowRoadmap={setShowRoadmap}
            showEBusinessCard={showEBusinessCard}
            setShowEBusinessCard={setShowEBusinessCard}
            handleSignup={handleSignup}
          />
        } 
      />
      <Route 
        path="/manifeste" 
        element={
          <>
            <Loader isLoading={isLoading} />
            <Manifeste onSignupClick={() => setIsSignupModalOpen(true)} />
            <SignupModal 
              isOpen={isSignupModalOpen}
              onClose={() => setIsSignupModalOpen(false)}
              onSignup={handleSignup}
            />
          </>
        } 
      />
    </Routes>
  )
}

export default App


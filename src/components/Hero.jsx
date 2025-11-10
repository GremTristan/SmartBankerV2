import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setImageLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              L'IA exploite vos données.
              <br />
              <span className="hero__title--accent">Vous perdez votre travail.</span>
            </h1>
            <p className="hero__subtitle">
              Les solutions d'intelligence artificielle se développent en exploitant gratuitement 
              vos données personnelles et professionnelles. Pendant ce temps, des milliers de 
              salariés voient leurs emplois disparaître au profit de l'automatisation.
            </p>
            <div className="hero__cta-group">
              <a href="#pricing" className="hero__cta hero__cta--primary">
                Prendre conscience
              </a>
              <a href="#features" className="hero__cta hero__cta--secondary">
                En savoir plus
              </a>
            </div>
          </div>
          <div className={`hero__image-wrapper ${imageLoaded ? 'hero__image-wrapper--loaded' : ''}`}>
            <div className="hero__image-placeholder">
              <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="400" fill="#F5F5F5"/>
                <path d="M300 50L550 200L300 350L50 200L300 50Z" stroke="#000" strokeWidth="3" fill="none" opacity="0.1"/>
                <circle cx="300" cy="200" r="80" stroke="#000" strokeWidth="2" fill="none" opacity="0.2"/>
                <line x1="300" y1="120" x2="300" y2="280" stroke="#000" strokeWidth="2" opacity="0.2"/>
                <line x1="220" y1="200" x2="380" y2="200" stroke="#000" strokeWidth="2" opacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


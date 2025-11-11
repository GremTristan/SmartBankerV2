import { useState, useEffect } from 'react'
import './Pricing.css'

function Pricing({ onSignupClick }) {
  const [signupsToday, setSignupsToday] = useState(47)
  const [progress, setProgress] = useState(68)

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      setSignupsToday(prev => prev + Math.floor(Math.random() * 2))
      setProgress(prev => Math.min(95, prev + Math.random() * 0.5))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="pricing__content">
          <div className="pricing__text">
            <h2 className="pricing__title">Il est temps d'agir</h2>
            <p className="pricing__subtitle">
              Rejoignez le mouvement pour une IA éthique, transparente et respectueuse 
              des droits des travailleurs et de la vie privée.
            </p>
            <div className="pricing__stats">
              <div className="pricing-stat">
                <span className="pricing-stat__number">{signupsToday}+</span>
                <span className="pricing-stat__label">inscriptions aujourd'hui</span>
              </div>
            </div>
            <ul className="pricing__benefits">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L7 14L4 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sensibilisation aux enjeux de l'IA
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L7 14L4 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Protection de vos données
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L7 14L4 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Soutien aux travailleurs impactés
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L7 14L4 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Plaidoyer pour une régulation
              </li>
            </ul>
          </div>
          <div className="pricing__cta-box">
            <div className="cta-box">
              <div className="cta-box__badge">
                <span className="badge badge--popular">Populaire</span>
              </div>
              <h3 className="cta-box__title">Rejoignez-nous</h3>
              <p className="cta-box__description">
                Inscrivez-vous pour recevoir des informations et participer au mouvement
              </p>
              <div className="cta-box__progress">
                <div className="progress-bar">
                  <div className="progress-bar__label">
                    <span>Places disponibles</span>
                    <span className="progress-bar__percentage">{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-bar__track">
                    <div 
                      className="progress-bar__fill" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onSignupClick?.()}
                className="cta-box__button"
              >
                S'inscrire maintenant
              </button>
              <p className="cta-box__note">Gratuit • Sans engagement • Respect de la vie privée</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing


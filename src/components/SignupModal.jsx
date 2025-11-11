import { useState, useEffect } from 'react'
import './SignupModal.css'

function SignupModal({ isOpen, onClose, onSignup }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setIsSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      return
    }

    setIsSubmitting(true)

    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Appeler la callback si fournie
    if (onSignup) {
      onSignup(email)
    }

    // Fermer après 2 secondes
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 2000)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="signup-modal__backdrop" onClick={handleBackdropClick}>
      <div className="signup-modal">
        <button 
          className="signup-modal__close" 
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!isSuccess ? (
          <>
            <div className="signup-modal__header">
              <h2 className="signup-modal__title">Rejoignez le mouvement</h2>
              <p className="signup-modal__subtitle">
                Inscrivez-vous pour recevoir des informations et participer au mouvement pour une IA éthique
              </p>
            </div>

            <form className="signup-modal__form" onSubmit={handleSubmit}>
              <div className="signup-modal__input-group">
                <label htmlFor="email" className="signup-modal__label">
                  Votre adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  className="signup-modal__input"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="signup-modal__submit"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? (
                  <>
                    <span className="signup-modal__spinner"></span>
                    Inscription en cours...
                  </>
                ) : (
                  'S\'inscrire maintenant'
                )}
              </button>
            </form>

            <p className="signup-modal__note">
              Gratuit • Sans engagement • Respect de la vie privée
            </p>
          </>
        ) : (
          <div className="signup-modal__success">
            <div className="signup-modal__success-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#22c55e" opacity="0.1"/>
                <path d="M16 24L22 30L32 18" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="signup-modal__success-title">Inscription réussie !</h3>
            <p className="signup-modal__success-text">
              Merci de nous avoir rejoint. Vous recevrez bientôt nos informations.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignupModal


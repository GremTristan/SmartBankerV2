import './SocialProof.css'

function SocialProof() {
  const testimonials = [
    {
      quote: "J'ai perdu mon emploi de développeur après que l'entreprise ait adopté une solution d'IA pour automatiser mon travail. Personne ne m'a averti.",
      author: "Marie D.",
      role: "Ex-développeuse"
    },
    {
      quote: "Mes données personnelles ont été utilisées pour entraîner un modèle sans mon consentement. Je me sens violée.",
      author: "Thomas L.",
      role: "Consultant"
    },
    {
      quote: "L'IA remplace progressivement notre équipe. Nous sommes 15, dans 6 mois nous ne serons plus que 3.",
      author: "Sophie M.",
      role: "Chef de projet"
    }
  ]

  const logos = [
    { name: "TechCorp", id: 1 },
    { name: "DataFlow", id: 2 },
    { name: "AutoSys", id: 3 },
    { name: "SmartAI", id: 4 }
  ]

  return (
    <section id="testimonials" className="social-proof">
      <div className="container">
        <div className="social-proof__testimonials">
          <h2 className="social-proof__title">Ils témoignent</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <svg className="testimonial-card__quote" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12C8 8 10 6 14 6C18 6 20 8 20 12C20 16 18 18 14 18V22C18 22 22 20 22 16H20C20 20 18 22 14 22C10 22 8 20 8 16V12Z" fill="black" opacity="0.2"/>
                </svg>
                <p className="testimonial-card__quote-text">"{testimonial.quote}"</p>
                <div className="testimonial-card__author">
                  <span className="testimonial-card__author-name">{testimonial.author}</span>
                  <span className="testimonial-card__author-role">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="social-proof__logos">
          <p className="social-proof__logos-title">Entreprises concernées</p>
          <div className="logos-grid">
            {logos.map((logo) => (
              <div key={logo.id} className="logo-item">
                <div className="logo-item__placeholder">
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof


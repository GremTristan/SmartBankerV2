import './Features.css'

function Features() {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M24 12V36M12 24H36" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="8" stroke="black" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      title: "Exploitation des données",
      description: "Vos données personnelles et professionnelles sont collectées et utilisées gratuitement pour entraîner les modèles d'IA, sans votre consentement éclairé ni compensation."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="32" height="24" stroke="black" strokeWidth="2" fill="none"/>
          <line x1="8" y1="20" x2="40" y2="20" stroke="black" strokeWidth="2"/>
          <line x1="8" y1="28" x2="40" y2="28" stroke="black" strokeWidth="2"/>
          <circle cx="16" cy="16" r="2" fill="black"/>
        </svg>
      ),
      title: "Disparition des emplois",
      description: "L'automatisation croissante remplace progressivement les travailleurs dans de nombreux secteurs, créant une précarité économique sans solution de transition."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 8L30 18H42L33 26L36 38L24 32L12 38L15 26L6 18H18L24 8Z" stroke="black" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="4" fill="black"/>
        </svg>
      ),
      title: "Manque de transparence",
      description: "Les entreprises développant l'IA opèrent dans l'opacité, sans révéler leurs méthodes, leurs sources de données ou leurs impacts réels sur la société."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="24" height="24" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M18 24L22 28L30 20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="24" r="2" fill="black"/>
        </svg>
      ),
      title: "Absence de régulation",
      description: "Aucun cadre légal solide n'encadre le développement et l'utilisation de l'IA, laissant libre cours aux abus et aux dérives."
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features__header">
          <h2 className="features__title">Les enjeux invisibles</h2>
          <p className="features__subtitle">
            Quatre réalités que l'industrie de l'IA préfère ignorer
          </p>
        </div>
        <div className="features__grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features


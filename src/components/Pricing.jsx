import './Pricing.css'

function Pricing() {
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
              <h3 className="cta-box__title">Rejoignez-nous</h3>
              <p className="cta-box__description">
                Inscrivez-vous pour recevoir des informations et participer au mouvement
              </p>
              <a href="#contact" className="cta-box__button">
                S'inscrire maintenant
              </a>
              <p className="cta-box__note">Gratuit • Sans engagement • Respect de la vie privée</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing


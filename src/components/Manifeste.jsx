import { useState } from 'react'
import './Manifeste.css'

function Manifeste({ onSignupClick }) {
  return (
    <div className="manifeste">
      <div className="manifeste__container">
        <header className="manifeste__header">
          <div className="manifeste__logo">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" fill="black"/>
              <path d="M16 8L24 16L16 24L8 16L16 8Z" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h1 className="manifeste__title">Manifeste SmartBankers</h1>
          <p className="manifeste__subtitle">MyDigiSelf SN - Section 1</p>
        </header>

        <main className="manifeste__content">
          <section className="manifeste__section">
            <h2 className="manifeste__section-title">Notre Vision</h2>
            <p className="manifeste__text">
              Dans un monde où l'intelligence artificielle transforme radicalement notre société, 
              nous, SmartBankers, nous engageons à défendre les droits fondamentaux des individus 
              face à l'exploitation massive de leurs données personnelles et professionnelles.
            </p>
          </section>

          <section className="manifeste__section">
            <h2 className="manifeste__section-title">Les Enjeux</h2>
            <div className="manifeste__enjeux">
              <div className="manifeste__enjeu">
                <h3 className="manifeste__enjeu-title">Protection des Données</h3>
                <p className="manifeste__enjeu-text">
                  Vos données personnelles sont exploitées sans votre consentement éclairé. 
                  Nous exigeons la transparence totale sur l'utilisation de ces données.
                </p>
              </div>
              <div className="manifeste__enjeu">
                <h3 className="manifeste__enjeu-title">Transparence de l'IA</h3>
                <p className="manifeste__enjeu-text">
                  Les algorithmes d'IA prennent des décisions qui affectent nos vies sans que 
                  nous comprenions leurs mécanismes. Nous réclamons l'explicabilité.
                </p>
              </div>
              <div className="manifeste__enjeu">
                <h3 className="manifeste__enjeu-title">Exploitation des Données</h3>
                <p className="manifeste__enjeu-text">
                  Les entreprises s'enrichissent en exploitant gratuitement vos données. 
                  Nous revendiquons une juste rémunération pour vos contributions.
                </p>
              </div>
              <div className="manifeste__enjeu">
                <h3 className="manifeste__enjeu-title">Impact sur l'Emploi</h3>
                <p className="manifeste__enjeu-text">
                  Des milliers d'emplois disparaissent au profit de l'automatisation. 
                  Nous demandons une transition juste et équitable.
                </p>
              </div>
            </div>
          </section>

          <section className="manifeste__section">
            <h2 className="manifeste__section-title">Nos Engagements</h2>
            <ul className="manifeste__engagements">
              <li className="manifeste__engagement">
                <strong>Sensibilisation</strong> : Informer le public sur les enjeux de l'IA et de la protection des données
              </li>
              <li className="manifeste__engagement">
                <strong>Transparence</strong> : Exiger la transparence totale des algorithmes et de leur utilisation
              </li>
              <li className="manifeste__engagement">
                <strong>Protection</strong> : Défendre les droits à la vie privée et à la protection des données personnelles
              </li>
              <li className="manifeste__engagement">
                <strong>Éthique</strong> : Promouvoir une IA éthique, responsable et respectueuse des droits humains
              </li>
              <li className="manifeste__engagement">
                <strong>Action</strong> : Mobiliser les acteurs financiers et technologiques pour un changement durable
              </li>
            </ul>
          </section>

          <section className="manifeste__section">
            <h2 className="manifeste__section-title">Rejoignez le Mouvement</h2>
            <p className="manifeste__text">
              Le lancement de SmartBankers dans les centres financiers (Hong Kong, Genève, Zurich) 
              marque le début d'une mobilisation internationale pour une IA éthique et transparente.
            </p>
            <div className="manifeste__cta">
              <button 
                onClick={() => onSignupClick?.()}
                className="manifeste__cta-button"
              >
                S'inscrire maintenant
              </button>
              <a href="/" className="manifeste__cta-link">
                Retour à l'accueil
              </a>
            </div>
          </section>
        </main>

        <footer className="manifeste__footer">
          <p className="manifeste__footer-text">
            Connecté au système <strong>MyDigiSelf</strong>
          </p>
          <p className="manifeste__footer-text">
            SmartBankers - Section 1 du lancement MyDigiSelf SN
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Manifeste


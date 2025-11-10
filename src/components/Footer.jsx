import './Footer.css'

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">SmartBanker</h3>
            <p className="footer__description">
              Un mouvement pour une intelligence artificielle éthique, transparente 
              et respectueuse des droits fondamentaux.
            </p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Navigation</h4>
            <ul className="footer__links">
              <li><a href="#features">Enjeux</a></li>
              <li><a href="#testimonials">Témoignages</a></li>
              <li><a href="#pricing">Agir</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Contact</h4>
            <ul className="footer__links">
              <li><a href="mailto:contact@smartbanker.org">contact@smartbanker.org</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__subtitle">Réseaux</h4>
            <div className="footer__social">
              <a href="#" aria-label="Twitter" className="footer__social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 4C21 4 20 4 19 5C18 4 17 3.5 16 4C16.5 3 17 2 17 1C16.5 1.5 16 2 15 2C14 1 12.5 1 11 2C9.5 1 8 1 7 2C6 2 5.5 2.5 5 3C5 2 4.5 1 4 1C3.5 1.5 3 2 2 3C2 4 2.5 5 3 6C2 6 1 5.5 0 5V6C1 7 2 8 3 8C2.5 9 2 10 2 11C2 12 2.5 13 3 14C3.5 15 4 16 5 17C6 18 7 19 8 20C9 21 10 22 11 22C12 22 13 21 14 20C15 19 16 18 17 17C18 16 19 15 20 14C21 13 22 12 22 11C22 10 22 9 22 8C23 7 24 6 24 5C23 5 22.5 4.5 22 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="footer__social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 10V21M8 10V7C8 6.5 8.5 6 9 6H10C10.5 6 11 6.5 11 7V10M8 10H11M11 10V21M11 10H14C15.5 10 16.5 11 16.5 12.5V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 SmartBanker. Tous droits réservés.
          </p>
          <div className="footer__legal">
            <a href="#privacy">Confidentialité</a>
            <a href="#terms">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


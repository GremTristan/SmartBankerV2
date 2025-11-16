import { useState, useEffect } from 'react'
import './Header.css'

function Header({ onDocumentationClick, onRoadmapClick, onEBusinessCardClick }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <nav className="header__nav">
          <div className="header__logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" fill="black"/>
              <path d="M16 8L24 16L16 24L8 16L16 8Z" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
            <span>SmartBanker</span>
          </div>
          <ul className="header__menu">
            <li><a href="#features">Enjeux</a></li>
            <li><a href="#testimonials">Témoignages</a></li>
            <li><a href="#pricing">Agir</a></li>
            <li><button onClick={onDocumentationClick} className="header__doc-link">Documentation</button></li>
            <li><button onClick={onRoadmapClick} className="header__doc-link">Roadmap</button></li>
            <li><button onClick={onEBusinessCardClick} className="header__ebusiness-link" title="E-Business Card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </button></li>
            <li><a href="#contact" className="header__cta">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


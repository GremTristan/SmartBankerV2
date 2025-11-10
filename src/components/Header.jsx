import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
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
            <li><a href="#contact" className="header__cta">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


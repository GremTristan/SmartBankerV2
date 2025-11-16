import { useState, useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import './RoadmapViewer.css'

function RoadmapViewer({ onClose }) {
  const [markdown, setMarkdown] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toc, setToc] = useState([])

  // Charger le fichier markdown
  useEffect(() => {
    fetch('/doc/ROADMAP_GROWTH_AUTOMATION.md')
      .then(res => res.text())
      .then(text => {
        setMarkdown(text)
        // Extraire la table des matières
        const headings = extractHeadings(text)
        setToc(headings)
        if (headings.length > 0) {
          setActiveSection(headings[0].id)
        }
      })
      .catch(err => console.error('Erreur chargement markdown:', err))
  }, [])

  // Normaliser un ID pour la correspondance (enlever accents, caractères spéciaux)
  const normalizeId = (id) => {
    return id
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Enlever accents
      .replace(/[^\w\s-]/g, '') // Enlever caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer espaces par tirets
      .replace(/-+/g, '-') // Remplacer tirets multiples par un seul
      .replace(/^-+|-+$/g, '') // Enlever tirets en début/fin
  }

  // Extraire les titres pour la table des matières
  // Utilise la même logique que rehype-slug pour générer les IDs
  function extractHeadings(text) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings = []
    let match

    while ((match = headingRegex.exec(text)) !== null) {
      const level = match[1].length
      const title = match[2].trim()
      // Générer l'ID de la même manière que rehype-slug (avec normalisation)
      const id = normalizeId(title)

      headings.push({ level, title, id })
    }

    return headings
  }

  // Filtrer la table des matières selon la recherche
  const filteredToc = useMemo(() => {
    if (!searchQuery) return toc
    const query = searchQuery.toLowerCase()
    return toc.filter(item => 
      item.title.toLowerCase().includes(query)
    )
  }, [toc, searchQuery])

  // Scroll vers une section
  const scrollToSection = (sectionId) => {
    if (!sectionId) return
    
    // Normaliser l'ID pour la correspondance
    const normalizedId = normalizeId(sectionId)
    setActiveSection(normalizedId)
    
    // Fonction pour effectuer le scroll
    const performScroll = () => {
      const contentElement = document.querySelector('.roadmap-viewer__content')
      if (!contentElement) return false
      
      // Essayer d'abord avec l'ID exact
      let element = document.getElementById(sectionId) || document.getElementById(normalizedId)
      
      // Si pas trouvé, chercher dans tous les éléments avec un ID qui correspond
      if (!element) {
        const allElements = contentElement.querySelectorAll('[id]')
        for (const el of allElements) {
          if (normalizeId(el.id) === normalizedId) {
            element = el
            break
          }
        }
      }
      
      if (element) {
        const offset = 100
        const elementRect = element.getBoundingClientRect()
        const contentRect = contentElement.getBoundingClientRect()
        const elementPosition = elementRect.top - contentRect.top + contentElement.scrollTop - offset
        
        contentElement.scrollTo({
          top: Math.max(0, elementPosition),
          behavior: 'smooth'
        })
        return true
      }
      return false
    }
    
    // Essayer immédiatement
    if (!performScroll()) {
      // Si l'élément n'est pas trouvé, réessayer après un court délai
      // (au cas où le DOM n'est pas encore complètement rendu)
      setTimeout(() => {
        if (!performScroll()) {
          console.warn(`Section "${sectionId}" (normalisé: "${normalizedId}") non trouvée`)
        }
      }, 200)
    }
  }

  // Mettre à jour la section active au scroll
  useEffect(() => {
    const contentElement = document.querySelector('.roadmap-viewer__content')
    if (!contentElement) return

    const handleScroll = () => {
      const sections = toc.map(h => ({
        id: h.id,
        element: document.getElementById(h.id)
      })).filter(s => s.element)

      const scrollPosition = contentElement.scrollTop + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const rect = section.element.getBoundingClientRect()
        const contentRect = contentElement.getBoundingClientRect()
        const sectionTop = rect.top - contentRect.top + contentElement.scrollTop

        if (scrollPosition >= sectionTop) {
          setActiveSection(section.id)
          break
        }
      }
    }

    contentElement.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      contentElement.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  return (
    <div className="roadmap-viewer">
      {/* Sidebar */}
      <aside className={`roadmap-viewer__sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="roadmap-viewer__sidebar-header">
          <div className="roadmap-viewer__logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" fill="black"/>
              <path d="M16 8L24 16L16 24L8 16L16 8Z" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
            <span>SmartBankers</span>
          </div>
          <button 
            className="roadmap-viewer__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="roadmap-viewer__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="roadmap-viewer__nav">
          <div className="roadmap-viewer__nav-title">Table des matières</div>
          <ul>
            {filteredToc.map((item, index) => (
              <li key={index} className={`level-${item.level}`}>
                <button
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.id)}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
          {filteredToc.length === 0 && searchQuery && (
            <div className="roadmap-viewer__no-results">
              Aucun résultat pour "{searchQuery}"
            </div>
          )}
        </nav>
      </aside>

      {/* Toggle sidebar button (mobile) */}
      <button
        className="roadmap-viewer__sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Main content */}
      <main className="roadmap-viewer__content">
        <div className="roadmap-viewer__container">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeRaw, rehypeSanitize]}
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <pre className="roadmap-viewer__code-block">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="roadmap-viewer__code-inline" {...props}>
                    {children}
                  </code>
                )
              },
              table: ({ node, ...props }) => (
                <div className="roadmap-viewer__table-wrapper">
                  <table {...props} />
                </div>
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="roadmap-viewer__blockquote" {...props} />
              ),
              a: ({ node, href, ...props }) => {
                // Détecter si c'est un lien interne (ancre)
                const isInternalLink = href && (href.startsWith('#') || (!href.startsWith('http') && !href.startsWith('mailto:')))
                
                if (isInternalLink) {
                  // Extraire l'ID de la section (enlever le # si présent)
                  const sectionId = href.startsWith('#') ? href.substring(1) : href.replace(/^.*#/, '')
                  
                  return (
                    <a
                      className="roadmap-viewer__link roadmap-viewer__link--internal"
                      href={`#${sectionId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        // Attendre un peu pour que le DOM soit prêt
                        setTimeout(() => {
                          scrollToSection(sectionId)
                        }, 100)
                      }}
                      {...props}
                    />
                  )
                }
                
                // Lien externe
                return (
                  <a
                    className="roadmap-viewer__link roadmap-viewer__link--external"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                )
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  )
}

export default RoadmapViewer


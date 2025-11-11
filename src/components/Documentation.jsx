import { useState, useEffect } from 'react'
import './Documentation.css'

function Documentation({ onClose }) {
  const [activeSection, setActiveSection] = useState('introduction')

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'principes', title: 'Principes Fondamentaux' },
    { id: 'techniques', title: 'Techniques de FOMO' },
    { id: 'engagement', title: 'Éléments d\'Engagement' },
    { id: 'conversion', title: 'Stratégie de Conversion' },
    { id: 'optimisation', title: 'Optimisation Continue' },
    { id: 'metriques', title: 'Métriques et KPIs' },
    { id: 'checklist', title: 'Checklist' }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const contentElement = document.querySelector('.documentation__content')
    const element = document.getElementById(sectionId)
    if (!element) return

    const isMobile = window.innerWidth <= 768
    const offset = 20

    if (isMobile) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    } else if (contentElement) {
      const contentRect = contentElement.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const scrollPosition = elementRect.top - contentRect.top + contentElement.scrollTop - offset
      contentElement.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  // Update active section on scroll
  useEffect(() => {
    const contentElement = document.querySelector('.documentation__content')
    if (!contentElement) return

    const handleScroll = () => {
      const sections = document.querySelectorAll('.documentation__section')
      const isMobile = window.innerWidth <= 768
      const scrollPosition = isMobile 
        ? window.scrollY + 150 
        : contentElement.scrollTop + 150

      sections.forEach(section => {
        let sectionTop, sectionHeight
        const sectionId = section.getAttribute('id')

        if (isMobile) {
          sectionTop = section.offsetTop
          sectionHeight = section.offsetHeight
        } else {
          const rect = section.getBoundingClientRect()
          const contentRect = contentElement.getBoundingClientRect()
          sectionTop = rect.top - contentRect.top + contentElement.scrollTop
          sectionHeight = section.offsetHeight
        }

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    const scrollTarget = window.innerWidth <= 768 ? window : contentElement
    scrollTarget.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    
    // Handle resize
    const handleResize = () => {
      handleScroll()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="documentation">
      <div className="documentation__sidebar">
        <div className="documentation__sidebar-header">
          <h2>Documentation</h2>
          <button className="documentation__close" onClick={onClose} aria-label="Fermer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="documentation__nav">
          <ul>
            {sections.map(section => (
              <li key={section.id}>
                <button
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="documentation__content">
        <div className="documentation__container">
          {/* Introduction */}
          <section id="introduction" className="documentation__section">
            <h1>Guide Complet des Techniques de FOMO et d'Engagement</h1>
            <p className="documentation__lead">
              Optimisation de la landing page SmartBanker pour maximiser les conversions et créer un sentiment d'urgence.
            </p>
            <p>
              Ce guide présente la méthodologie complète utilisée pour optimiser la landing page de SmartBanker. 
              Les techniques présentées sont basées sur des principes psychologiques éprouvés : le FOMO (Fear Of Missing Out), 
              la preuve sociale, et l'engagement progressif. Chaque élément a été soigneusement conçu pour guider les visiteurs 
              vers l'action et maximiser les inscriptions.
            </p>
            <div className="documentation__highlight">
              <strong>Objectif SmartBanker :</strong> Atteindre 100 000 utilisateurs en maximisant les taux de conversion 
              et en créant un sentiment d'urgence et d'appartenance autour des enjeux de l'IA et de la protection des données.
            </div>
          </section>

          {/* Principes Fondamentaux */}
          <section id="principes" className="documentation__section">
            <h2>Les Principes Fondamentaux</h2>
            
            <div className="documentation__card">
              <h3>1. Le FOMO (Fear Of Missing Out)</h3>
              <p>Le FOMO est un sentiment d'anxiété sociale qui pousse les individus à agir rapidement de peur de rater une opportunité.</p>
              <ul>
                <li><strong>Rareté perçue</strong> : Limiter l'accès ou le temps disponible</li>
                <li><strong>Urgence</strong> : Créer un sentiment de nécessité d'agir immédiatement</li>
                <li><strong>Exclusivité</strong> : Donner l'impression d'être parmi les premiers</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>2. La Preuve Sociale</h3>
              <p>Les utilisateurs sont influencés par les actions des autres.</p>
              <ul>
                <li><strong>Témoignages</strong> : Avis et expériences réels</li>
                <li><strong>Statistiques en temps réel</strong> : Nombre d'utilisateurs actifs</li>
                <li><strong>Notifications d'activité</strong> : Actions récentes d'autres utilisateurs</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>3. L'Engagement Progressif</h3>
              <p>Créer un parcours utilisateur qui engage progressivement.</p>
              <ul>
                <li><strong>Barrières faibles</strong> : Commencer par des actions simples</li>
                <li><strong>Feedback immédiat</strong> : Confirmer chaque action</li>
                <li><strong>Progression visible</strong> : Montrer l'avancement</li>
              </ul>
            </div>
          </section>

          {/* Techniques de FOMO */}
          <section id="techniques" className="documentation__section">
            <h2>Techniques de FOMO Implémentées</h2>

            <div className="documentation__card">
              <h3>1. Compteur de Personnes en Ligne</h3>
              <p>Affichage dynamique du nombre de personnes consultant la page SmartBanker en temps réel.</p>
              <p><strong>Implémentation SmartBanker :</strong> Le compteur est visible dans la section Hero et crée immédiatement un sentiment de communauté active autour des enjeux de l'IA.</p>
              <div className="documentation__code">
                <pre><code>{`const [onlineCount, setOnlineCount] = useState(127)

useEffect(() => {
  const interval = setInterval(() => {
    setOnlineCount(prev => {
      const change = Math.floor(Math.random() * 5) - 2
      return Math.max(100, Math.min(200, prev + change))
    })
  }, 8000)
  return () => clearInterval(interval)
}, [])`}</code></pre>
              </div>
              <p><strong>Meilleures pratiques :</strong></p>
              <ul>
                <li>Mettre à jour toutes les 8-10 secondes pour paraître naturel</li>
                <li>Varier entre 100-200 pour paraître réaliste</li>
                <li>Ajouter un indicateur visuel animé (point vert pulsant)</li>
                <li><strong>SmartBanker :</strong> Positionné dans le Hero pour impact immédiat</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>2. Notifications Toast en Temps Réel</h3>
              <p>Notifications discrètes affichant les actions d'autres utilisateurs SmartBanker.</p>
              <p><strong>Implémentation SmartBanker :</strong> Les notifications apparaissent en bas à droite de l'écran et renforcent le sentiment de mouvement collectif autour de la protection des données et de l'éthique de l'IA.</p>
              <p><strong>Messages types SmartBanker :</strong></p>
              <ul>
                <li>"Marie de Paris vient de rejoindre le mouvement"</li>
                <li>"3 personnes se sont inscrites dans la dernière heure"</li>
                <li>"127 personnes consultent cette page en ce moment"</li>
                <li>"Nouveau membre : Protection des données personnelles"</li>
              </ul>
              <p><strong>Timing optimal :</strong></p>
              <ul>
                <li>Première notification : 3 secondes après le chargement</li>
                <li>Notifications suivantes : espacées de 5-8 secondes</li>
                <li>Durée d'affichage : 4 secondes</li>
                <li><strong>SmartBanker :</strong> Messages adaptés au contexte de l'IA et de la protection des données</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>3. Badge "Populaire"</h3>
              <p>Badge animé sur le CTA principal pour indiquer que c'est le choix de la majorité.</p>
              <ul>
                <li>Position : En haut à droite du CTA</li>
                <li>Animation : Pulse subtile (scale 1.0 → 1.05)</li>
                <li>Couleur : Noir sur fond blanc (contraste fort)</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>4. Barre de Progression des Places Disponibles</h3>
              <p>Barre de progression montrant le pourcentage de places restantes.</p>
              <div className="documentation__code">
                <pre><code>{`const [progress, setProgress] = useState(68)

useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => Math.min(95, prev + Math.random() * 0.5))
  }, 12000)
  return () => clearInterval(interval)
}, [])`}</code></pre>
              </div>
              <ul>
                <li>Commencer à 60-70% pour paraître réaliste</li>
                <li>Augmenter progressivement (0.5% toutes les 12 secondes)</li>
                <li>Ne jamais atteindre 100% (plafonner à 95%)</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>5. Statistiques d'Inscriptions en Temps Réel</h3>
              <p>Compteur affichant le nombre d'inscriptions du jour.</p>
              <ul>
                <li>Valeur initiale : 40-50 inscriptions</li>
                <li>Incrément : +1 à +2 toutes les 12 secondes</li>
                <li>Format : "47+ inscriptions aujourd'hui"</li>
              </ul>
            </div>
          </section>

          {/* Éléments d'Engagement */}
          <section id="engagement" className="documentation__section">
            <h2>Éléments d'Engagement</h2>

            <div className="documentation__card">
              <h3>Modale d'Inscription Optimisée SmartBanker</h3>
              <p><strong>Implémentation SmartBanker :</strong> La modale s'ouvre au clic sur les CTAs "Prendre conscience" et "S'inscrire maintenant". Elle est conçue pour minimiser la friction et maximiser les conversions.</p>
              <ul>
                <li><strong>Ouverture fluide</strong> : Animation slide-up + fade-in pour une expérience premium</li>
                <li><strong>Formulaire minimal</strong> : Uniquement l'email (barrière faible, engagement rapide)</li>
                <li><strong>Feedback immédiat</strong> : État de chargement avec spinner + message de succès "Merci de votre engagement !"</li>
                <li><strong>Fermeture intuitive</strong> : Clic sur backdrop ou bouton X, avec blocage du scroll de la page</li>
                <li><strong>SmartBanker spécifique</strong> : Design noir et blanc cohérent avec la marque, validation email en temps réel</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Micro-animations et Feedback Visuel</h3>
              <ul>
                <li><strong>Hover effects</strong> : Transformation + ombre sur les boutons</li>
                <li><strong>Pulse animations</strong> : Indicateurs de statut en ligne</li>
                <li><strong>Shimmer effect</strong> : Animation sur la barre de progression</li>
                <li><strong>Loading states</strong> : Spinner pendant la soumission</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Design Minimaliste et Professionnel</h3>
              <ul>
                <li>Palette noir et blanc (contraste fort, professionnel)</li>
                <li>Typographie claire (Inter + Playfair Display)</li>
                <li>Espacements généreux (lisibilité optimale)</li>
                <li>Responsive design (mobile-first)</li>
              </ul>
            </div>
          </section>

          {/* Stratégie de Conversion */}
          <section id="conversion" className="documentation__section">
            <h2>Stratégie de Conversion</h2>

            <div className="documentation__card">
              <h3>Funnel de Conversion Optimisé SmartBanker</h3>
              <p><strong>Parcours utilisateur SmartBanker :</strong></p>
              <ol>
                <li><strong>Attraction (Hero Section)</strong> : Message "L'Enjeu Invisible", compteur en ligne, CTA "Prendre conscience"</li>
                <li><strong>Éducation (Features Section)</strong> : 4 enjeux clés de l'IA (Protection des données, Transparence, Exploitation des données, Perte d'emploi), illustrations SVG, hover effects</li>
                <li><strong>Preuve Sociale (Testimonials)</strong> : Témoignages réels d'utilisateurs concernés par l'IA, logos entreprises partenaires</li>
                <li><strong>Conversion (Pricing/CTA)</strong> : Statistiques d'inscriptions, barre de progression des places, badge "Populaire", CTA final "S'inscrire maintenant"</li>
              </ol>
            </div>

            <div className="documentation__card">
              <h3>Optimisation des CTAs</h3>
              <ul>
                <li>Contraste fort : Noir sur blanc (visibilité maximale)</li>
                <li>Taille appropriée : Minimum 48px de hauteur (mobile)</li>
                <li>Texte actionnable : Verbes à l'impératif</li>
                <li>Position stratégique : Au-dessus de la ligne de flottaison</li>
                <li>Feedback immédiat : Hover + active states</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Timing des Notifications</h3>
              <ul>
                <li><strong>0-3s</strong> : Aucune notification (temps de chargement)</li>
                <li><strong>3s</strong> : Première notification (engagement initial)</li>
                <li><strong>8s</strong> : Statistiques globales</li>
                <li><strong>12s</strong> : Activité en temps réel</li>
                <li><strong>15s+</strong> : Notifications d'inscriptions</li>
              </ul>
            </div>
          </section>

          {/* Optimisation Continue */}
          <section id="optimisation" className="documentation__section">
            <h2>Optimisation Continue</h2>

            <div className="documentation__card">
              <h3>A/B Testing Recommandé</h3>
              <p><strong>Variables à tester :</strong></p>
              <ul>
                <li><strong>Messages des notifications</strong> : Génériques vs personnalisés</li>
                <li><strong>Valeurs des compteurs</strong> : Bas (50-100) vs élevé (200-300)</li>
                <li><strong>Barre de progression</strong> : Commence à 50% vs 75%</li>
                <li><strong>Texte des CTAs</strong> : "Prendre conscience" vs "Rejoindre le mouvement"</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Analytics à Suivre</h3>
              <p><strong>Métriques essentielles :</strong></p>
              <ul>
                <li>Taux de conversion global : Inscriptions / Visiteurs</li>
                <li>Taux de clic CTA : Clics / Impressions</li>
                <li>Temps sur page : Engagement moyen</li>
                <li>Taux de rebond : Visiteurs partant rapidement</li>
                <li>Taux d'ouverture modale : Clics sur boutons d'inscription</li>
                <li>Taux de complétion formulaire : Soumissions / Ouvertures modale</li>
              </ul>
              <p><strong>Outils recommandés :</strong> Google Analytics 4, Hotjar, Mixpanel, Google Optimize</p>
            </div>
          </section>

          {/* Métriques et KPIs */}
          <section id="metriques" className="documentation__section">
            <h2>Métriques et KPIs</h2>

            <div className="documentation__card">
              <h3>Objectifs de Performance</h3>
              <div className="documentation__metrics">
                <div className="documentation__metric">
                  <h4>Court terme (1 mois)</h4>
                  <ul>
                    <li>Taux de conversion : 2-3%</li>
                    <li>Visiteurs uniques : 10 000</li>
                    <li>Inscriptions : 200-300</li>
                  </ul>
                </div>
                <div className="documentation__metric">
                  <h4>Moyen terme (3 mois)</h4>
                  <ul>
                    <li>Taux de conversion : 3-5%</li>
                    <li>Visiteurs uniques : 50 000</li>
                    <li>Inscriptions : 1 500-2 500</li>
                  </ul>
                </div>
                <div className="documentation__metric">
                  <h4>Long terme (12 mois)</h4>
                  <ul>
                    <li>Taux de conversion : 5-7%</li>
                    <li>Visiteurs uniques : 500 000</li>
                    <li>Inscriptions : 25 000-35 000</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="documentation__card">
              <h3>Calcul du Taux de Conversion Nécessaire</h3>
              <p>Pour atteindre 100 000 utilisateurs :</p>
              <ul>
                <li><strong>Scénario conservateur (3%)</strong> : 3 333 333 visiteurs nécessaires</li>
                <li><strong>Scénario optimiste (5%)</strong> : 2 000 000 visiteurs nécessaires</li>
                <li><strong>Scénario très optimiste (7%)</strong> : 1 428 571 visiteurs nécessaires</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Stratégies d'Acquisition</h3>
              <ul>
                <li><strong>SEO</strong> : Contenu optimisé, mots-clés cibles, backlinks</li>
                <li><strong>Marketing de Contenu</strong> : Blog régulier, infographies, vidéos</li>
                <li><strong>Réseaux Sociaux</strong> : LinkedIn, Twitter/X, Facebook</li>
                <li><strong>Partenariats</strong> : Influenceurs, médias, associations</li>
                <li><strong>Publicité Payante</strong> : Google Ads, Facebook Ads, LinkedIn Ads</li>
              </ul>
            </div>
          </section>

          {/* Checklist */}
          <section id="checklist" className="documentation__section">
            <h2>Checklist d'Implémentation</h2>

            <div className="documentation__card">
              <h3>Éléments Techniques ✅</h3>
              <ul className="documentation__checklist">
                <li className="checked">Compteur de personnes en ligne avec animation</li>
                <li className="checked">Notifications toast avec timing optimisé</li>
                <li className="checked">Badge "Populaire" avec animation pulse</li>
                <li className="checked">Barre de progression dynamique</li>
                <li className="checked">Statistiques d'inscriptions en temps réel</li>
                <li className="checked">Modale d'inscription optimisée</li>
                <li className="checked">Formulaire email avec validation</li>
                <li className="checked">États de chargement et succès</li>
                <li className="checked">Design responsive (mobile, tablet, desktop)</li>
                <li className="checked">Animations et micro-interactions</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Optimisations SEO</h3>
              <ul className="documentation__checklist">
                <li>Meta tags optimisés (title, description)</li>
                <li>Open Graph tags (réseaux sociaux)</li>
                <li>Schema.org markup</li>
                <li>Sitemap.xml</li>
                <li>Robots.txt</li>
                <li>Images avec alt text</li>
              </ul>
            </div>

            <div className="documentation__card">
              <h3>Performance</h3>
              <ul className="documentation__checklist">
                <li>Lazy loading des images</li>
                <li>Compression des assets</li>
                <li>CDN pour assets statiques</li>
                <li>Cache browser</li>
                <li>Minification CSS/JS</li>
                <li>Score Lighthouse &gt; 90</li>
              </ul>
            </div>
          </section>

          <div className="documentation__footer">
            <p><strong>Document créé le :</strong> 2024</p>
            <p><strong>Version :</strong> 1.0</p>
            <p><strong>Auteur :</strong> Équipe SmartBanker</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation


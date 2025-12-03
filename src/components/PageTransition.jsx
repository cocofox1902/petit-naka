import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageTransition } from '../contexts/PageTransitionContext'
import logo from '../assets/images/logo-optimized.png'
import logoWebp from '../assets/images/logo.webp'

function PageTransition({ children }) {
  const location = useLocation()
  const { isTransitioning, endTransition } = usePageTransition()
  const [showLogo, setShowLogo] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [logoPhase, setLogoPhase] = useState('entrance')
  const [logoContainerFade, setLogoContainerFade] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Animation au premier chargement ou rechargement
  useEffect(() => {
    // Vérifier si c'est un rechargement de page
    const navigationEntry = performance.getEntriesByType('navigation')[0]
    const isReload = navigationEntry?.type === 'reload'
    
    // Vérifier si c'est le premier chargement (navigation type 'navigate' ou pas de sessionStorage)
    const isFirstLoad = navigationEntry?.type === 'navigate' || !sessionStorage.getItem('hasVisited')

    // Activer l'animation si :
    // 1. C'est un rechargement de page
    // 2. C'est le premier chargement
    const shouldAnimate = isReload || isFirstLoad

    if (shouldAnimate) {
      // Marquer que l'utilisateur a visité le site
      sessionStorage.setItem('hasVisited', 'true')
      
      // Réinitialiser l'animation
      setShowLogo(true)
      setShowContent(false)
      setLogoPhase('entrance')
      setLogoContainerFade(false)

      // Phase 1 : Logo apparaît (opacité 0->1, scale 1->1.3)
      const timer1 = setTimeout(() => {
        setLogoPhase('exit')
        // Le contenu apparaît d'un coup quand le logo commence à partir
        setShowContent(true)
        // Commencer à faire disparaître le container lentement
        setLogoContainerFade(true)
      }, 1000) // Après 1 seconde, commencer la sortie du logo et afficher le contenu

      // Phase 2 : Logo disparaît lentement (opacité 1->0, scale 1.3->1)
      const timer2 = setTimeout(() => {
        setShowLogo(false)
        setIsInitialLoad(false)
      }, 2000) // Après 2 secondes au total (1s entrance + 1s exit), cacher le logo

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      // Pas d'animation, afficher le contenu directement
      setShowLogo(false)
      setShowContent(true)
      setIsInitialLoad(false)
    }
  }, [])

  // Animation lors des changements de page (hors navbar)
  useEffect(() => {
    // Ne pas déclencher l'animation au premier chargement
    if (isInitialLoad) return

    // Si une transition est en cours
    if (isTransitioning) {
      // Cacher le contenu
      setShowContent(false)
      // Afficher le logo
      setShowLogo(true)
      setLogoPhase('entrance')
      setLogoContainerFade(false)

      // Phase 1 : Logo apparaît
      const timer1 = setTimeout(() => {
        setLogoPhase('exit')
        setShowContent(true)
        setLogoContainerFade(true)
      }, 800) // Plus rapide pour les transitions entre pages

      // Phase 2 : Logo disparaît
      const timer2 = setTimeout(() => {
        setShowLogo(false)
        endTransition()
      }, 1600) // 800ms entrance + 800ms exit

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [location.pathname, isTransitioning, isInitialLoad, endTransition])

  return (
    <>
      {/* Animation du logo en plein écran */}
      {showLogo && (
        <div 
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center transition-opacity duration-1000"
          style={{ opacity: logoContainerFade ? 0 : 1 }}
        >
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img 
              src={logo} 
              alt="Petit Naka" 
              className={`w-64 h-64 md:w-96 md:h-96 object-contain ${
                logoPhase === 'entrance' ? 'animate-logoEntrance' : 'animate-logoExit'
              }`}
              width="512"
              height="477"
              loading="eager"
            />
          </picture>
        </div>
      )}

      {/* Contenu avec transition d'opacité */}
      <div 
        style={{ 
          opacity: showContent ? 1 : 0,
          transition: showContent ? 'opacity 0s' : 'none'
        }}
      >
        {children}
      </div>
    </>
  )
}

export default PageTransition


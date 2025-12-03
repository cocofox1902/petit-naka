import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { usePageTransition } from '../contexts/PageTransitionContext'
import logo from '../assets/images/logo-optimized.png'
import logoWebp from '../assets/images/logo.webp'

function Layout({ children }) {
  const location = useLocation()
  const { startTransition } = usePageTransition()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleMenuToggle = () => {
    if (isButtonDisabled) return // Bloquer si une animation est en cours
    
    if (!isMenuOpen) {
      // Ouverture : commencer l'animation
      setIsButtonDisabled(true)
      setIsAnimating(true)
      setIsClosing(false)
      setShowLinks(false)
      // Petit délai pour permettre au DOM de rendre le cercle petit avant l'animation
      setTimeout(() => {
        setIsMenuOpen(true)
        // Afficher les liens après l'ouverture du cercle
        setTimeout(() => {
          setShowLinks(true)
        }, 800)
        // Réactiver le bouton après l'animation du cercle
        setTimeout(() => {
          setIsButtonDisabled(false)
        }, 800)
      }, 10)
    } else {
      // Fermeture : d'abord cacher les liens, puis fermer le cercle
      setIsButtonDisabled(true)
      setIsClosing(true)
      setShowLinks(false)
      setTimeout(() => {
        // Activer l'animation avant de fermer pour que la transition fonctionne
        setIsAnimating(true)
        // Petit délai pour permettre à isAnimating d'être appliqué
        setTimeout(() => {
          setIsMenuOpen(false)
          // Réactiver le bouton après l'animation du cercle
          setTimeout(() => {
            setIsAnimating(false)
            setIsClosing(false)
            setIsButtonDisabled(false)
          }, 800) // Attendre que l'animation de fermeture soit terminée
        }, 10)
      }, 300) // Délai pour laisser l'animation d'opacité des liens se terminer avant de fermer le cercle
    }
  }

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="min-h-screen bg-black">
      {/* Header - Avec animations */}
      <header className="fixed top-0 left-0 right-0 bg-transparent z-50 transition-all duration-300" role="banner">
        <nav className="mx-auto px-4 md:px-6 max-w-7xl bg-black/50" aria-label="Navigation principale">
          <div className="flex justify-between items-center h-20 overflow-hidden">
            <Link 
              to="/" 
              onClick={(e) => {
                if (isMenuOpen) {
                  e.preventDefault()
                  return
                }
                startTransition()
              }}
              className={`flex items-center gap-2 transition-all duration-300 z-50 flex-shrink-0 ${
                isMenuOpen ? 'pointer-events-none' : 'hover:scale-110'
              }`}
              aria-label="Retour à l'accueil - Petit Naka"
              aria-disabled={isMenuOpen}
            >
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img 
                  src={logo} 
                  alt="Petit Naka - Logo" 
                  className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain max-w-full max-h-full"
                  width="512"
                  height="477"
                  loading="eager"
                />
              </picture>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 relative z-50" role="navigation" aria-label="Menu principal">
              <Link
                to="/"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
              <Link
                to="/carte"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/carte') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/carte') ? 'page' : undefined}
              >
                Carte
              </Link>
              <Link
                to="/a-emporter"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/a-emporter') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/a-emporter') ? 'page' : undefined}
              >
                À emporter
              </Link>
              <Link
                to="/reservation"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/reservation') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/reservation') ? 'page' : undefined}
              >
                Réservation
              </Link>
              <Link
                to="/histoire"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/histoire') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/histoire') ? 'page' : undefined}
              >
                Histoire
              </Link>
              <Link
                to="/contact"
                className={`text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black rounded ${
                  isActive('/contact') ? 'text-red-600' : 'text-gray-400 hover:text-white hover:scale-110'
                }`}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button avec overlay animé */}
            <div className="md:hidden relative">
              {/* Overlay qui s'agrandit - vrai cercle */}
              {(isMenuOpen || isAnimating) && (
                <div 
                  className="fixed bg-gray-600 rounded-full z-40"
                  style={{
                    width: isMenuOpen ? '200vmax' : '40px',
                    height: isMenuOpen ? '200vmax' : '40px',
                    top: isMenuOpen ? '50%' : '32px',
                    right: isMenuOpen ? '50%' : '35px',
                    transform: 'translate(50%, -50%)',
                    transformOrigin: 'center center',
                    transition: 'width 0.8s ease-in-out, height 0.8s ease-in-out, top 0.8s ease-in-out, right 0.8s ease-in-out, opacity 0.8s ease-in-out',
                    borderRadius: '50%',
                    opacity: (isMenuOpen || isAnimating) ? 1 : 0,
                    pointerEvents: isMenuOpen ? 'auto' : 'none'
                  }}
                  aria-hidden="true"
                >
                {/* Navigation à l'intérieur de l'overlay */}
                {isMenuOpen && (
                  <nav 
                    id="mobile-menu"
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 z-50 w-full max-w-md"
                    style={{ 
                      pointerEvents: 'auto'
                    }}
                    aria-label="Menu de navigation mobile"
                  >
                    <div className="space-y-2 pt-4" role="menu">
                      {[
                        { to: "/", name: "Home" },
                        { to: "/carte", name: "Carte" },
                        { to: "/a-emporter", name: "À emporter" },
                        { to: "/reservation", name: "Réservation" },
                        { to: "/histoire", name: "Histoire" },
                        { to: "/contact", name: "Contact" },
                      ].map((link, index) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={handleMenuToggle}
                          className={`block py-3 px-4 text-xl text-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-600 ${
                            isActive(link.to) 
                              ? 'text-white bg-red-600 font-semibold shadow-lg' 
                              : 'text-white hover:bg-gray-700'
                          }`}
                          style={{
                            opacity: showLinks ? 1 : 0,
                            transform: showLinks ? 'translateY(0)' : (isClosing ? 'translateY(-20px)' : 'translateY(20px)'),
                            transitionDelay: showLinks ? `${index * 0.1}s` : `${index * 0.1}s`
                          }}
                          role="menuitem"
                          aria-current={isActive(link.to) ? 'page' : undefined}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                )}
                </div>
              )}

              {/* Bouton hamburger */}
              <button
                className={`relative w-10 h-10 flex flex-col justify-center items-center group rounded-full bg-gray-600 hover:bg-gray-500 border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black ${
                  isMenuOpen ? 'bg-transparent border-transparent' : ''
                } ${
                  isButtonDisabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
                }`}
                onClick={handleMenuToggle}
                disabled={isButtonDisabled}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {/* Barre du haut - disparaît vers le milieu (width passe à 0) */}
                <span 
                  className={`absolute h-0.5 bg-white transition-all duration-300 origin-center -translate-y-2 ${
                    isMenuOpen ? 'w-0' : 'w-5 delay-150'
                  }`}
                ></span>
                {/* Barre du milieu - première partie de la croix (pivote 45°) */}
                <span className={`absolute w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 delay-150' : 'rotate-0 delay-0'
                }`}></span>
                {/* Barre du milieu - deuxième partie de la croix (pivote -45°) */}
                <span className={`absolute w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 delay-150' : 'rotate-0 opacity-0 delay-0'
                }`}></span>
                {/* Barre du bas - disparaît vers le milieu (width passe à 0) */}
                <span 
                  className={`absolute h-0.5 bg-white transition-all duration-300 origin-center translate-y-2 ${
                    isMenuOpen ? 'w-0' : 'w-5 delay-150'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16" role="main">
        {children}
      </main>

      {/* Footer - Avec animation - Caché sur la page Carte */}
      {location.pathname !== '/carte' && (
      <footer className="bg-black text-gray-400 py-6 transition-all duration-300" role="contentinfo">
        <div className="mx-auto px-4 md:px-6 max-w-7xl">
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="mb-2 transition-all duration-300 hover:text-white">
              Petit Naka - Cuisine Japonaise authentique
            </p>
            <p className="text-xs mb-4">© Petit Naka 2025</p>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              En utilisant ce site, vous acceptez notre utilisation des cookies. Nous utilisons des cookies pour vous fournir une expérience améliorée et pour optimiser le bon fonctionnement de notre site web.
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  )
}

export default Layout

import { useEffect, useState, useRef } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'
import { ANIMATION_DELAYS, ERROR_MESSAGES, Z_INDEX } from '../constants'

function RestaurantModal() {
  const { showModal, restaurants, selectRestaurant } = useRestaurant()
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef(null)
  const firstButtonRef = useRef(null)


  // Gérer la navigation au clavier (Escape pour fermer)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        // Ne pas fermer la modal si aucun restaurant n'est sélectionné
        // L'utilisateur doit en choisir un
      }
    }
    
    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      // Trapper le focus dans la modal
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        
        const handleTab = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
        
        modalRef.current.addEventListener('keydown', handleTab)
        return () => {
          document.removeEventListener('keydown', handleEscape)
          modalRef.current?.removeEventListener('keydown', handleTab)
        }
      }
    }
  }, [showModal])

  // Désactiver le scroll quand la modal est visible
  useEffect(() => {
    if (showModal) {
      // Sauvegarder la position du scroll
      const scrollY = window.scrollY
      // Désactiver le scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Réactiver le scroll
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        // Restaurer la position du scroll
        window.scrollTo(0, scrollY)
      }
    }
  }, [showModal])

  // Animation avec délai
  useEffect(() => {
    if (!showModal) {
      // Réinitialiser l'état de manière asynchrone pour éviter les cascading renders
      const resetTimer = setTimeout(() => {
        setIsVisible(false)
      }, 0)
      return () => clearTimeout(resetTimer)
    }
    
    // Délai avant l'apparition
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Focus sur le premier bouton pour l'accessibilité
      if (firstButtonRef.current) {
        firstButtonRef.current.focus()
      }
    }, ANIMATION_DELAYS.MODAL_APPEARANCE)
    
    return () => {
      clearTimeout(timer)
    }
  }, [showModal])

  if (!showModal) {
    return null
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center p-4" 
        style={{ zIndex: Z_INDEX.MODAL }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-title"
      >
        <div className="bg-gray-900 rounded-lg max-w-lg w-full p-6 border border-red-600">
          <h2 id="error-title" className="text-2xl font-bold text-white mb-2 text-center">
            Erreur
          </h2>
          <p className="text-gray-400 text-center" role="alert">
            {ERROR_MESSAGES.NO_RESTAURANTS_AVAILABLE}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4" 
      style={{ zIndex: Z_INDEX.MODAL }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        ref={modalRef}
        className={`bg-gray-900 rounded-lg max-w-lg w-full p-4 md:p-6 border border-gray-700 transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
      >
        <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          Choisissez votre restaurant
        </h2>
        <p id="modal-description" className="text-gray-400 text-center mb-6 text-sm">
          Sélectionnez le restaurant Petit Naka que vous souhaitez visiter
        </p>
        
        <div className="grid grid-cols-1 gap-3" role="listbox" aria-label="Liste des restaurants disponibles">
          {restaurants.map((restaurant, index) => (
            <button
              key={restaurant.id}
              ref={index === 0 ? firstButtonRef : null}
              onClick={() => selectRestaurant(restaurant.id)}
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-red-600 rounded-lg p-4 text-left transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              role="option"
              aria-label={`Sélectionner ${restaurant.name} situé au ${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full shrink-0 mt-2" aria-hidden="true"></div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-0.5">
                    {restaurant.address}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {restaurant.postalCode} {restaurant.city}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RestaurantModal


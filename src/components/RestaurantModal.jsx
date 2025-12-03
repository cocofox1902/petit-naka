import { useEffect, useState } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'

function RestaurantModal() {
  const { showModal, restaurants, selectRestaurant } = useRestaurant()
  const [isVisible, setIsVisible] = useState(false)

  // Debug: afficher l'état de la modal
  useEffect(() => {
    console.log('RestaurantModal - showModal:', showModal)
    console.log('RestaurantModal - restaurants:', restaurants)
    console.log('RestaurantModal - localStorage:', localStorage.getItem('selectedRestaurantId'))
  }, [showModal, restaurants])

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
    }, 1500) // Délai de 1.5 secondes
    
    return () => {
      clearTimeout(timer)
    }
  }, [showModal])

  if (!showModal) {
    return null
  }

  if (!restaurants || restaurants.length === 0) {
    console.error('RestaurantModal - No restaurants available')
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
      <div 
        className={`bg-gray-900 rounded-lg max-w-lg w-full p-4 md:p-6 border border-gray-700 transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          Choisissez votre restaurant
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Sélectionnez le restaurant Petit Naka que vous souhaitez visiter
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => selectRestaurant(restaurant.id)}
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-red-600 rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full shrink-0 mt-2"></div>
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


import { useEffect } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'

function RestaurantModal() {
  const { showModal, restaurants, selectRestaurant } = useRestaurant()

  // Debug: afficher l'état de la modal
  useEffect(() => {
    console.log('RestaurantModal - showModal:', showModal)
    console.log('RestaurantModal - restaurants:', restaurants)
    console.log('RestaurantModal - localStorage:', localStorage.getItem('selectedRestaurantId'))
  }, [showModal, restaurants])

  if (!showModal) {
    return null
  }

  if (!restaurants || restaurants.length === 0) {
    console.error('RestaurantModal - No restaurants available')
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6 md:p-8 border border-gray-700">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Choisissez votre restaurant
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sélectionnez le restaurant Petit Naka que vous souhaitez visiter
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => selectRestaurant(restaurant.id)}
              className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-red-600 rounded-lg p-6 text-left transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-1">
                    {restaurant.address}
                  </p>
                  <p className="text-gray-400 text-sm">
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


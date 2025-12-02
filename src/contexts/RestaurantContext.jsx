import { createContext, useContext, useState, useEffect } from 'react'
import restaurantsData from '../data/restaurants.json'

const RestaurantContext = createContext()

export const useRestaurant = () => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }
  return context
}

export const RestaurantProvider = ({ children }) => {
  // Initialiser directement depuis localStorage pour éviter le flash
  // Utiliser une fonction lazy pour ne calculer qu'une seule fois
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() => {
    const savedRestaurantId = localStorage.getItem('selectedRestaurantId')
    // Vérifier que le restaurant existe dans la liste
    if (savedRestaurantId) {
      const restaurantExists = restaurantsData.restaurants.some(r => r.id === savedRestaurantId)
      if (restaurantExists) {
        return savedRestaurantId
      }
    }
    // Si aucun restaurant valide n'est trouvé, retourner null
    return null
  })

  const [showModal, setShowModal] = useState(() => {
    const savedRestaurantId = localStorage.getItem('selectedRestaurantId')
    console.log('RestaurantContext - Initializing showModal, savedRestaurantId:', savedRestaurantId)
    // Vérifier que le restaurant existe dans la liste
    if (savedRestaurantId) {
      const restaurantExists = restaurantsData.restaurants.some(r => r.id === savedRestaurantId)
      console.log('RestaurantContext - Restaurant exists:', restaurantExists)
      if (restaurantExists) {
        return false // Ne pas afficher la modal si un restaurant valide est trouvé
      }
    }
    // Si aucun restaurant valide n'est trouvé, afficher la modal
    console.log('RestaurantContext - No valid restaurant found, showing modal')
    return true
  })

  // Sauvegarder dans localStorage quand le restaurant change
  useEffect(() => {
    if (selectedRestaurantId) {
      localStorage.setItem('selectedRestaurantId', selectedRestaurantId)
    }
  }, [selectedRestaurantId])

  const selectRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId)
    setShowModal(false)
  }

  const getSelectedRestaurant = () => {
    if (!selectedRestaurantId) return null
    return restaurantsData.restaurants.find(r => r.id === selectedRestaurantId)
  }

  const openRestaurantModal = () => {
    setShowModal(true)
  }

  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurantId,
        selectedRestaurant: getSelectedRestaurant(),
        selectRestaurant,
        showModal,
        setShowModal,
        openRestaurantModal,
        restaurants: restaurantsData.restaurants
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}


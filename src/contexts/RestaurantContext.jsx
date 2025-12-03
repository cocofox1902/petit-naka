import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import restaurantsData from '../data/restaurants.json'
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants'
import { validateRestaurantsData } from '../utils/validation'

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
    try {
      const savedRestaurantId = localStorage.getItem(STORAGE_KEYS.SELECTED_RESTAURANT_ID)
      // Vérifier que le restaurant existe dans la liste
      if (savedRestaurantId) {
        const restaurantExists = restaurantsData.restaurants.some(r => r.id === savedRestaurantId)
        if (restaurantExists) {
          return savedRestaurantId
        }
      }
      // Si aucun restaurant valide n'est trouvé, retourner null
      return null
    } catch {
      // Si localStorage n'est pas disponible, retourner null
      return null
    }
  })

  const [showModal, setShowModal] = useState(() => {
    try {
      const savedRestaurantId = localStorage.getItem(STORAGE_KEYS.SELECTED_RESTAURANT_ID)
      // Vérifier que le restaurant existe dans la liste
      if (savedRestaurantId) {
        const restaurantExists = restaurantsData.restaurants.some(r => r.id === savedRestaurantId)
        if (restaurantExists) {
          return false // Ne pas afficher la modal si un restaurant valide est trouvé
        }
      }
      // Si aucun restaurant valide n'est trouvé, afficher la modal
      return true
    } catch {
      // Si localStorage n'est pas disponible, afficher la modal
      return true
    }
  })

  // Sauvegarder dans localStorage quand le restaurant change
  useEffect(() => {
    if (selectedRestaurantId) {
      try {
        localStorage.setItem(STORAGE_KEYS.SELECTED_RESTAURANT_ID, selectedRestaurantId)
      } catch {
        // localStorage peut être désactivé ou plein, on ignore silencieusement
        // L'application fonctionnera toujours mais sans persistance
      }
    }
  }, [selectedRestaurantId])

  const selectRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId)
    setShowModal(false)
  }

  // Utiliser useMemo pour éviter les recalculs inutiles
  const selectedRestaurant = useMemo(() => {
    if (!selectedRestaurantId) return null
    return restaurantsData.restaurants.find(r => r.id === selectedRestaurantId)
  }, [selectedRestaurantId])

  // Gérer les erreurs de chargement des données avec validation
  const restaurants = useMemo(() => {
    try {
      if (!restaurantsData || !restaurantsData.restaurants) {
        if (import.meta.env.DEV) {
          console.error('RestaurantContext: Données de restaurants invalides')
        }
        return []
      }
      
      // Valider les données
      if (!validateRestaurantsData(restaurantsData)) {
        if (import.meta.env.DEV) {
          console.error('RestaurantContext: Structure des données de restaurants invalide')
        }
        return []
      }
      
      return restaurantsData.restaurants
    } catch {
      // Erreur silencieuse en production
      return []
    }
  }, [])

  const openRestaurantModal = () => {
    setShowModal(true)
  }

  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurantId,
        selectedRestaurant,
        selectRestaurant,
        showModal,
        setShowModal,
        openRestaurantModal,
        restaurants
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}


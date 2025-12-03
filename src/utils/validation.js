// Utilitaires de validation pour les données JSON

/**
 * Valide la structure d'un restaurant
 */
export function validateRestaurant(restaurant) {
  if (!restaurant) return false
  
  const requiredFields = ['id', 'name', 'address', 'postalCode', 'city', 'phone', 'googleMapsUrl']
  const hasAllFields = requiredFields.every(field => restaurant[field] !== undefined && restaurant[field] !== null)
  
  if (!hasAllFields) return false
  
  // Valider que openingHours existe et est un objet
  if (restaurant.openingHours && typeof restaurant.openingHours !== 'object') {
    return false
  }
  
  return true
}

/**
 * Valide la structure d'un menu item
 */
export function validateMenuItem(item) {
  if (!item) return false
  
  const requiredFields = ['name', 'price']
  const hasAllFields = requiredFields.every(field => item[field] !== undefined && item[field] !== null)
  
  if (!hasAllFields) return false
  
  // Valider que price est un nombre positif
  if (typeof item.price !== 'number' || item.price < 0) {
    return false
  }
  
  return true
}

/**
 * Valide la structure complète des restaurants
 */
export function validateRestaurantsData(data) {
  if (!data || !data.restaurants) return false
  if (!Array.isArray(data.restaurants)) return false
  
  return data.restaurants.every(validateRestaurant)
}

/**
 * Valide la structure complète du menu
 */
export function validateMenuData(data) {
  if (!data || typeof data !== 'object') return false
  
  // Vérifier que chaque restaurant a au moins une catégorie
  const restaurantIds = Object.keys(data)
  if (restaurantIds.length === 0) return false
  
  // Valider chaque catégorie de chaque restaurant
  for (const restaurantId of restaurantIds) {
    const restaurantMenu = data[restaurantId]
    if (!restaurantMenu || typeof restaurantMenu !== 'object') return false
    
    // Vérifier que chaque catégorie est un tableau
    for (const categoryId in restaurantMenu) {
      const category = restaurantMenu[categoryId]
      if (!Array.isArray(category)) return false
      
      // Valider chaque item de la catégorie
      if (!category.every(validateMenuItem)) {
        return false
      }
    }
  }
  
  return true
}


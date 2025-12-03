// Constantes de l'application

// Noms des jours de la semaine
export const DAY_NAMES = {
  'lundi': 'Lundi',
  'mardi': 'Mardi',
  'mercredi': 'Mercredi',
  'jeudi': 'Jeudi',
  'vendredi': 'Vendredi',
  'samedi': 'Samedi',
  'dimanche': 'Dimanche'
}

// Délais d'animation (en millisecondes)
export const ANIMATION_DELAYS = {
  MODAL_APPEARANCE: 1500,
  MENU_OPEN: 800,
  MENU_CLOSE: 300,
  LINK_DELAY: 100
}

// Tailles et dimensions
export const SIZES = {
  LOGO_HEIGHT_MOBILE: 64,
  LOGO_WIDTH_MOBILE: 64,
  LOGO_HEIGHT_DESKTOP: 96,
  LOGO_WIDTH_DESKTOP: 96,
  NAVBAR_HEIGHT: 80
}

// Couleurs principales
export const COLORS = {
  PRIMARY: '#dc2626', // red-600
  PRIMARY_HOVER: '#b91c1c', // red-700
  BACKGROUND: '#000000', // black
  CARD_BACKGROUND: '#1f2937', // gray-800
  TEXT_PRIMARY: '#ffffff', // white
  TEXT_SECONDARY: '#9ca3af', // gray-400
  TEXT_TERTIARY: '#6b7280' // gray-500
}

// Z-index
export const Z_INDEX = {
  MODAL: 99999,
  NAVBAR: 50,
  DROPDOWN: 40
}

// Breakpoints (pour référence, Tailwind les gère)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
}

// Messages d'erreur
export const ERROR_MESSAGES = {
  NO_RESTAURANT: 'Veuillez sélectionner un restaurant pour voir les informations.',
  NO_RESTAURANTS_AVAILABLE: 'Aucun restaurant disponible. Veuillez rafraîchir la page.',
  LOADING_ERROR: 'Erreur lors du chargement des données. Veuillez réessayer.',
  GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer.'
}

// Messages de succès
export const SUCCESS_MESSAGES = {
  RESTAURANT_SELECTED: 'Restaurant sélectionné avec succès.'
}

// LocalStorage keys
export const STORAGE_KEYS = {
  SELECTED_RESTAURANT_ID: 'selectedRestaurantId'
}


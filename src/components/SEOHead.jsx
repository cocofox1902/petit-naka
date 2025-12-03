import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRestaurant } from '../contexts/RestaurantContext'

// URL de base du site (à modifier selon votre domaine)
// IMPORTANT: Remplacez par votre vraie URL de domaine
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://petit-naka.netlify.app'

function SEOHead() {
  const location = useLocation()
  const { selectedRestaurant } = useRestaurant()

  useEffect(() => {
    // Fonction helper pour créer/mettre à jour une meta tag
    const setMetaTag = (property, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
      let meta = document.querySelector(selector)
      if (!meta) {
        meta = document.createElement('meta')
        if (isProperty) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Fonction helper pour créer/mettre à jour un link tag
    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    // Mettre à jour le titre de la page
    const updateTitle = () => {
      const baseTitle = 'Petit Naka - Cuisine Japonaise authentique à Paris'
      let pageTitle = baseTitle

      switch (location.pathname) {
        case '/':
          pageTitle = baseTitle
          break
        case '/carte':
          pageTitle = selectedRestaurant 
            ? `Carte - ${selectedRestaurant.name} | ${baseTitle}`
            : `Carte | ${baseTitle}`
          break
        case '/a-emporter':
          pageTitle = selectedRestaurant
            ? `À emporter - ${selectedRestaurant.name} | ${baseTitle}`
            : `À emporter | ${baseTitle}`
          break
        case '/reservation':
          pageTitle = selectedRestaurant
            ? `Réservation - ${selectedRestaurant.name} | ${baseTitle}`
            : `Réservation | ${baseTitle}`
          break
        case '/contact':
          pageTitle = selectedRestaurant
            ? `Contact - ${selectedRestaurant.name} | ${baseTitle}`
            : `Contact | ${baseTitle}`
          break
        case '/histoire':
          pageTitle = `Notre Histoire | ${baseTitle}`
          break
        default:
          pageTitle = baseTitle
      }

      document.title = pageTitle
    }

    // Mettre à jour la meta description
    const updateDescription = () => {
      let description = 'Petit Naka - Restaurant de cuisine japonaise authentique à Paris. Sushi, ramen, poke bowls et spécialités japonaises. Plats disponibles sur place, à emporter ou en livraison.'
      
      if (selectedRestaurant && (location.pathname === '/carte' || location.pathname === '/reservation' || location.pathname === '/contact')) {
        description = `${selectedRestaurant.name} - ${selectedRestaurant.address}, ${selectedRestaurant.postalCode} ${selectedRestaurant.city}. ${description}`
      }

      setMetaTag('description', description)
    }

    // URL canonique
    const updateCanonical = () => {
      const canonicalUrl = `${BASE_URL}${location.pathname}`
      setLinkTag('canonical', canonicalUrl)
    }

    // Open Graph Tags
    const updateOpenGraph = () => {
      const baseTitle = 'Petit Naka - Cuisine Japonaise authentique à Paris'
      let ogTitle = baseTitle
      let ogDescription = 'Restaurant de cuisine japonaise authentique à Paris. Sushi, ramen, poke bowls et spécialités japonaises.'
      // IMPORTANT: Créez une image og-image.jpg (1200x630px) dans /public et utilisez-la
      const ogImage = `${BASE_URL}/og-image.jpg` // Image de partage (à créer)
      const ogUrl = `${BASE_URL}${location.pathname}`

      if (selectedRestaurant && (location.pathname === '/carte' || location.pathname === '/reservation' || location.pathname === '/contact')) {
        ogTitle = `${selectedRestaurant.name} | ${baseTitle}`
        ogDescription = `${selectedRestaurant.name} - ${selectedRestaurant.address}, ${selectedRestaurant.postalCode} ${selectedRestaurant.city}. ${ogDescription}`
      }

      setMetaTag('og:title', ogTitle, true)
      setMetaTag('og:description', ogDescription, true)
      setMetaTag('og:image', ogImage, true)
      setMetaTag('og:url', ogUrl, true)
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:locale', 'fr_FR', true)
      setMetaTag('og:site_name', 'Petit Naka', true)
    }

    // Twitter Cards
    const updateTwitterCards = () => {
      const baseTitle = 'Petit Naka - Cuisine Japonaise authentique à Paris'
      let twitterTitle = baseTitle
      let twitterDescription = 'Restaurant de cuisine japonaise authentique à Paris. Sushi, ramen, poke bowls et spécialités japonaises.'
      const twitterImage = `${BASE_URL}/og-image.jpg` // Même image que Open Graph

      if (selectedRestaurant && (location.pathname === '/carte' || location.pathname === '/reservation' || location.pathname === '/contact')) {
        twitterTitle = `${selectedRestaurant.name} | ${baseTitle}`
        twitterDescription = `${selectedRestaurant.name} - ${selectedRestaurant.address}, ${selectedRestaurant.postalCode} ${selectedRestaurant.city}. ${twitterDescription}`
      }

      setMetaTag('twitter:card', 'summary_large_image')
      setMetaTag('twitter:title', twitterTitle)
      setMetaTag('twitter:description', twitterDescription)
      setMetaTag('twitter:image', twitterImage)
      // twitter:site sera ajouté manuellement si vous avez un compte Twitter
    }

    // Meta robots
    const updateRobots = () => {
      setMetaTag('robots', 'index, follow')
    }

    // Meta author
    const updateAuthor = () => {
      setMetaTag('author', 'Petit Naka')
    }

    updateTitle()
    updateDescription()
    updateCanonical()
    updateOpenGraph()
    updateTwitterCards()
    updateRobots()
    updateAuthor()
  }, [location.pathname, selectedRestaurant])

  return null
}

export default SEOHead


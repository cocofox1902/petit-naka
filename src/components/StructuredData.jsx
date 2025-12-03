import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRestaurant } from '../contexts/RestaurantContext'
import restaurantsData from '../data/restaurants.json'

// URL de base du site (à modifier selon votre domaine)
// IMPORTANT: Remplacez par votre vraie URL de domaine
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://petit-naka.netlify.app'

function StructuredData() {
  const location = useLocation()
  const { selectedRestaurant, restaurants } = useRestaurant()

  useEffect(() => {
    // Supprimer les anciens scripts de structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())

    // Fonction pour convertir les horaires en format Schema.org
    const formatOpeningHours = (openingHours) => {
      if (!openingHours) return []
      
      const dayMap = {
        'lundi': 'Mo',
        'mardi': 'Tu',
        'mercredi': 'We',
        'jeudi': 'Th',
        'vendredi': 'Fr',
        'samedi': 'Sa',
        'dimanche': 'Su'
      }

      return Object.entries(openingHours).map(([day, hours]) => {
        const dayCode = dayMap[day]
        if (!dayCode) return null
        
        if (Array.isArray(hours) && hours.length > 0) {
          if (hours[0] === 'Fermé') {
            return null
          }
          // Convertir "11:30–22:00" en "11:30-22:00"
          return hours.map(hour => `${dayCode} ${hour.replace('–', '-')}`).join(', ')
        }
        return null
      }).filter(Boolean)
    }

    // WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Petit Naka',
      'url': BASE_URL,
      'description': 'Restaurant de cuisine japonaise authentique à Paris. Sushi, ramen, poke bowls et spécialités japonaises.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/carte?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    // Restaurant Schema (pour chaque restaurant)
    const restaurantSchemas = restaurants.map(restaurant => {
      const openingHours = formatOpeningHours(restaurant.openingHours)
      
      return {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        'name': restaurant.name,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': restaurant.address,
          'addressLocality': restaurant.city,
          'postalCode': restaurant.postalCode,
          'addressCountry': 'FR'
        },
        'telephone': restaurant.phone,
        'url': `${BASE_URL}/carte?name=${restaurant.id}`,
        'servesCuisine': 'Japanese',
        'priceRange': '€€',
        'openingHoursSpecification': openingHours.length > 0 ? openingHours.map(hours => {
          const [day, timeRange] = hours.split(' ')
          const [open, close] = timeRange.split('-')
          return {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': day,
            'opens': open,
            'closes': close
          }
        }) : undefined
      }
    })

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Accueil',
          'item': BASE_URL
        },
        ...(location.pathname !== '/' ? [{
          '@type': 'ListItem',
          'position': 2,
          'name': location.pathname === '/carte' ? 'Carte' :
                 location.pathname === '/a-emporter' ? 'À emporter' :
                 location.pathname === '/reservation' ? 'Réservation' :
                 location.pathname === '/contact' ? 'Contact' :
                 location.pathname === '/histoire' ? 'Histoire' : 'Page',
          'item': `${BASE_URL}${location.pathname}`
        }] : [])
      ]
    }

    // Créer et ajouter les scripts
    const addStructuredData = (schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    // Ajouter tous les schemas
    addStructuredData(websiteSchema)
    restaurantSchemas.forEach(schema => addStructuredData(schema))
    addStructuredData(breadcrumbSchema)

    // Si un restaurant est sélectionné, ajouter un LocalBusiness schema spécifique
    if (selectedRestaurant) {
      const openingHours = formatOpeningHours(selectedRestaurant.openingHours)
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'FoodEstablishment',
        'name': selectedRestaurant.name,
        'image': `${BASE_URL}/logo.webp`,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': selectedRestaurant.address,
          'addressLocality': selectedRestaurant.city,
          'postalCode': selectedRestaurant.postalCode,
          'addressCountry': 'FR'
        },
        'telephone': selectedRestaurant.phone,
        'url': `${BASE_URL}${location.pathname}?name=${selectedRestaurant.id}`,
        'servesCuisine': 'Japanese',
        'priceRange': '€€',
        ...(openingHours.length > 0 && {
          'openingHoursSpecification': openingHours.map(hours => {
            const [day, timeRange] = hours.split(' ')
            const [open, close] = timeRange.split('-')
            return {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': day,
              'opens': open,
              'closes': close
            }
          })
        })
      }
      addStructuredData(localBusinessSchema)
    }
  }, [location.pathname, selectedRestaurant, restaurants])

  return null
}

export default StructuredData


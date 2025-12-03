import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRestaurant } from '../contexts/RestaurantContext'
import menuData from '../data/menu.json'
import { validateMenuData } from '../utils/validation'

// Composant pour la barre parallax sous les titres
function ParallaxBar() {
  const barRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer pour détecter quand la barre entre dans le viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let rafId = null
    let ticking = false

    const updateParallax = () => {
      if (barRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        
        // Position de l'élément par rapport au viewport
        const elementTop = containerRect.top
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight * 2)))
        
        // Calculer le déplacement de gauche (0) à droite (largeur - 50px)
        const barWidth = 50
        const maxOffset = windowWidth - barWidth
        const parallaxOffset = scrollProgress * maxOffset
        
        barRef.current.style.transform = `translateX(${parallaxOffset}px)`
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    updateParallax()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="relative w-full h-1 bg-transparent overflow-hidden">
      <div 
        ref={barRef}
        className="absolute top-0 left-0 h-full bg-red-600"
        style={{ 
          width: '50px',
          willChange: 'transform',
          transition: 'none',
          transform: isVisible ? undefined : 'translateX(0)'
        }}
      />
    </div>
  )
}

// Composant pour un item avec carte
function MenuItem({ item, imageData, isVisible = true }) {
  const itemRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isVisible && !hasAnimated && itemRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasAnimated(true)
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(itemRef.current)
      return () => observer.disconnect()
    }
  }, [isVisible, hasAnimated])

  return (
    <div 
      ref={itemRef}
      className={`flex flex-col bg-white p-4 md:p-6 lg:p-6 rounded-xl m-4 md:m-0 lg:m-0 w-[80%] md:w-full lg:w-full transition-all duration-700 hover:shadow-xl hover:scale-105 ${
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Carte blanche avec bordure */}
      <div className="flex flex-col items-center">
        {/* Image ou emoji */}
        <div className="h-48 md:h-56 lg:h-64 w-full rounded-lg overflow-hidden flex items-center justify-center mb-4 bg-gray-50">
          {imageData.type === 'image' ? (
            <img 
              src={imageData.value}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl md:text-7xl lg:text-8xl">{imageData.value}</span>
          )}
        </div>

        {/* Nom du plat */}
        <h4 className="text-black font-bold text-xl lg:text-2xl mb-2 text-center">
          {item.name}
        </h4>

        {/* Description */}
        {item.description && (
          <p className="text-gray-700 text-base lg:text-lg text-center mb-2">
            {item.description}
          </p>
        )}

        {/* Note */}
        {item.note && (
          <p className="text-amber-600 text-xs md:text-sm lg:text-base italic text-center">
            {item.note}
          </p>
        )}
      </div>

      {/* Bouton prix en dessous */}
      <div className="mt-auto">
        <div className="bg-amber-800 hover:bg-amber-900 rounded-3xl py-3 px-6 lg:py-4 lg:px-8 text-center transition-colors duration-300 w-[50%] md:w-[60%] lg:w-[70%] mx-auto">
          <span className="text-white font-bold text-xl lg:text-2xl">
            {item.price.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  )
}

// Composant de roue pour les entrées
function WheelCarousel({ items, getItemImage, categoryId = 'entrees' }) {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeout = useRef(null)
  const accumulatedDeltaRef = useRef(0)

  // Dupliquer les items si nécessaire pour avoir au moins 8 items
  const displayItems = useMemo(() => {
    const minItems = 8
    if (items.length >= minItems) {
      return items
    }
    // Dupliquer les items jusqu'à avoir au moins 8
    const duplicated = []
    while (duplicated.length < minItems) {
      duplicated.push(...items)
    }
    return duplicated.slice(0, minItems)
  }, [items])

  // Réinitialiser l'index quand la catégorie change
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex(0)
        accumulatedDeltaRef.current = 0
        setIsVisible(true)
      }, 350)
    }, 0)
  }, [categoryId])

  // Animation d'entrée au premier montage
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 300)
  }, [])

  // Rayon du cercle (en pixels)
  const radius = 250
  // Angle de départ (pour positionner l'item actif sur le côté droit)
  const startAngle = 0

  useEffect(() => {
    const scrollThreshold = 80 // Seuil pour changer d'item
    let touchStartY = 0
    let touchEndY = 0

    const handleWheel = (e) => {
      e.preventDefault()
      
      if (isScrollingRef.current) return

      const delta = e.deltaY
      accumulatedDeltaRef.current += delta

      // Détecter la direction (inversée)
      if (Math.abs(accumulatedDeltaRef.current) >= scrollThreshold) {
        const direction = accumulatedDeltaRef.current > 0 ? -1 : 1
        
        setCurrentIndex(prevIndex => {
          const newIndex = (prevIndex + direction + displayItems.length) % displayItems.length
          return newIndex
        })
        
        accumulatedDeltaRef.current = 0
        isScrollingRef.current = true
        
        // Snap avec animation
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        
        scrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 200)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      
      if (isScrollingRef.current) return

      touchEndY = e.touches[0].clientY
      const delta = touchStartY - touchEndY
      accumulatedDeltaRef.current += delta
      touchStartY = touchEndY

      // Détecter la direction (inversée)
      if (Math.abs(accumulatedDeltaRef.current) >= scrollThreshold) {
        const direction = accumulatedDeltaRef.current > 0 ? -1 : 1
        
        setCurrentIndex(prevIndex => {
          const newIndex = (prevIndex + direction + displayItems.length) % displayItems.length
          return newIndex
        })
        
        accumulatedDeltaRef.current = 0
        isScrollingRef.current = true
        
        // Snap avec animation
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        
        scrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 200)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
      }
    }
  }, [displayItems.length])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[85%] md:hidden overflow-hidden"
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.8s ease-out'
      }}
    >
      {/* Arc visible - on ne montre qu'une partie du cercle sur le côté */}
      {/* Le conteneur est positionné pour que l'item actif (à x=radius, y=0) soit centré verticalement */}
      <div 
        className="absolute"
        style={{
          left: '42%',
          top: '18%',
          transform: `translate(-${375}px)`
        }}
      >
        {displayItems.map((item, index) => {
          const imageData = getItemImage(item, categoryId)
          
          // Calculer l'angle relatif par rapport à l'item actuel
          let relativeIndex = index - currentIndex
          // Normaliser pour le chemin le plus court
          if (relativeIndex > displayItems.length / 2) {
            relativeIndex -= displayItems.length
          } else if (relativeIndex < -displayItems.length / 2) {
            relativeIndex += displayItems.length
          }
          
          // Angle sur l'arc (de -60° à +60° pour l'arc visible)
          // L'arc part du côté droit (0°) et forme un arc vertical
          const arcAngle = relativeIndex * 30 // 30° entre chaque item sur l'arc
          const angle = startAngle - arcAngle // L'arc monte vers le haut et descend vers le bas
          const radian = (angle * Math.PI) / 180
          
          // Position sur le cercle (horizontal avec arc vertical)
          const x = Math.cos(radian) * radius
          const y = Math.sin(radian) * radius
          
          // Calculer la distance par rapport à l'item actuel
          const distance = Math.abs(relativeIndex)
          
          // Opacité et scale basés sur la distance
          const isActive = index === currentIndex
          const opacity = isActive ? 1 : Math.max(0.1, 1 - (distance * 0.3))
          const scale = isActive ? 1 : Math.max(0.4, 1 - (distance * 0.2))
          
          // Rotation de l'item pour qu'il soit toujours droit (compenser l'angle de l'arc)
          const itemRotation = -arcAngle
          
          // Masquer les items trop loin de l'arc visible
          if (Math.abs(arcAngle) > 90) {
            return null
          }
          
          return (
            <div
              key={index}
              className="absolute transition-all duration-200 ease-out"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${itemRotation}deg) scale(${scale})`,
                opacity: opacity,
                transformOrigin: 'center center',
                zIndex: isActive ? 10 : 5 - distance,
              }}
            >
              <div className="flex flex-col bg-white p-4 rounded-xl w-[300px]">
                <div className="flex flex-col items-center">
                  {/* Image ou emoji */}
                  <div className="h-48 rounded-lg overflow-hidden flex items-center justify-center mb-2 bg-gray-50">
                    {imageData.type === 'image' ? (
                      <img 
                        src={imageData.value}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{imageData.value}</span>
                    )}
                  </div>

                  {/* Nom du plat */}
                  <h4 className="text-black font-bold text-xl my-5 text-center">
                    {item.name}
                  </h4>

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-700 text-lg text-center mb-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bouton prix */}
                <div className="mt-4">
                  <div className="bg-amber-800 rounded-3xl py-2 px-4 text-center">
                    <span className="text-white font-bold text-xl">
                      {item.price.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    
    </div>
  )
}

function Carte() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { selectedRestaurantId, selectedRestaurant, selectRestaurant, restaurants } = useRestaurant()
  const [activeCategory, setActiveCategory] = useState('entrees')

  // Gérer le paramètre d'URL pour sélectionner automatiquement un restaurant
  useEffect(() => {
    const restaurantName = searchParams.get('name')
    if (restaurantName) {
      // Vérifier si le nom correspond à un restaurant valide
      const restaurant = restaurants.find(r => r.id === restaurantName)
      if (restaurant) {
        // Sélectionner le restaurant (cela l'enregistrera automatiquement dans localStorage)
        selectRestaurant(restaurantName)
        // Nettoyer l'URL en enlevant le paramètre
        setSearchParams({})
      }
    }
  }, [searchParams, restaurants, selectRestaurant, setSearchParams])

  // Récupérer le menu du restaurant sélectionné avec validation
  const currentMenuData = useMemo(() => {
    if (!selectedRestaurantId) {
      return {}
    }
    
    try {
      // Valider les données du menu
      if (!validateMenuData(menuData)) {
        if (import.meta.env.DEV) {
          console.error('Carte: Structure des données de menu invalide')
        }
        return {}
      }
      
      if (!menuData[selectedRestaurantId]) {
        return {}
      }
      
      return menuData[selectedRestaurantId]
    } catch {
      // Erreur silencieuse en production
      return {}
    }
  }, [selectedRestaurantId])

  // Récupérer l'image depuis le JSON ou utiliser un fallback
  const getItemImage = (item, categoryId) => {
    // Si l'item a une image dans le JSON, l'utiliser
    if (item.image) {
      return { type: 'image', value: item.image }
    }
    
    // Fallback par catégorie si pas d'image
    const categoryFallbacks = {
      'entrees': { type: 'emoji', value: '🥢' },
      'domburi': { type: 'emoji', value: '🍱' },
      'curry': { type: 'emoji', value: '🍛' },
      'poke': { type: 'emoji', value: '🥗' },
      'sushi': { type: 'emoji', value: '🍣' },
      'sashimi': { type: 'emoji', value: '🐟' },
      'chirashi': { type: 'emoji', value: '🍱' },
      'maki': { type: 'emoji', value: '🍣' },
      'desserts': { type: 'emoji', value: '🍡' },
      'ramen': { type: 'emoji', value: '🍜' },
      'udon': { type: 'emoji', value: '🍜' },
      'soba': { type: 'emoji', value: '🍜' },
    }

    return categoryFallbacks[categoryId] || { type: 'emoji', value: '🍽️' }
  }

  const categories = useMemo(() => {
    const categoryNames = {
      'entrees': 'Entrées / Accompagnements',
      'domburi': 'Domburi',
      'curry': 'Curry Japonais',
      'poke': 'Poké Bowl',
      'sushi': 'Sushi',
      'sashimi': 'Sashimi',
      'chirashi': 'Chirashi',
      'maki': 'Maki / California',
      'desserts': 'Desserts',
      'ramen': 'Ramen',
      'udon': 'Udon',
      'soba': 'Soba'
    }

    return Object.keys(currentMenuData).map(categoryId => ({
      id: categoryId,
      name: categoryNames[categoryId] || categoryId,
      data: currentMenuData[categoryId] || []
    }))
  }, [currentMenuData])

  // Scroller vers le haut puis désactiver le scroll sur la page (uniquement sur mobile)
  useEffect(() => {
    // Fonction pour vérifier si on est sur mobile
    const isMobile = () => window.innerWidth < 768 // md breakpoint
    
    // Fonction pour forcer le scroll vers le haut
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      // Pour iOS
      if (window.pageYOffset) {
        window.pageYOffset = 0
      }
    }
    
    // Scroller immédiatement
    scrollToTop()
    
    // Si on est sur mobile, désactiver le scroll
    if (isMobile()) {
      // Scroller plusieurs fois pour s'assurer que ça fonctionne sur mobile
      setTimeout(scrollToTop, 0)
      setTimeout(scrollToTop, 50)
      setTimeout(scrollToTop, 100)
      setTimeout(scrollToTop, 200)
      
      // Désactiver le scroll après un délai pour s'assurer que le scroll est terminé
      setTimeout(() => {
        scrollToTop()
        document.body.style.overflow = 'hidden'
        document.body.style.overflowY = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.overflowY = 'hidden'
      }, 300)
    } else {
      // Sur tablette/desktop, juste scroller vers le haut et laisser le scroll actif
      scrollToTop()
    }
    
    // Gérer le resize pour réactiver le scroll si on passe en mode desktop
    const handleResize = () => {
      if (!isMobile()) {
        // Réactiver le scroll si on est sur tablette/desktop
        document.body.style.overflow = ''
        document.body.style.overflowY = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.documentElement.style.overflow = ''
        document.documentElement.style.overflowY = ''
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      // Nettoyer les styles
      document.body.style.overflow = ''
      document.body.style.overflowY = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.overflowY = ''
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!selectedRestaurant || !selectedRestaurantId) {
    return (
      <section className="flex flex-col overflow-x-hidden overflow-y-hidden items-center justify-center h-screen">
        <p className="text-white text-xl">Veuillez sélectionner un restaurant</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col overflow-x-hidden md:overflow-y-auto overflow-y-hidden">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-[90%] md:h-auto lg:h-auto">
        {/* Sélecteur de catégorie */}
        <div className="bg-black/80 h-[7%] lg:h-auto backdrop-blur-sm py-4 lg:py-6 -mx-4 md:-mx-6 lg:mx-0 px-4 md:px-6 lg:px-8 shrink-0">
          <div className="overflow-x-auto scrollbar-hide lg:overflow-visible">
            <div className="flex space-x-2 min-w-max md:min-w-0 md:justify-center lg:justify-center px-2 lg:px-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                  }}
                  className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base whitespace-nowrap transition-background duration-600 rounded-lg ${
                    activeCategory === category.id
                      ? 'text-white bg-red-600'
                      : 'text-white bg-black hover:bg-gray-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carrousel circulaire uniquement sur mobile */}
        <div className="h-[80vh] md:hidden">
          {(() => {
            const activeCategoryData = categories.find(cat => cat.id === activeCategory)
            return activeCategoryData ? (
              <WheelCarousel 
                items={activeCategoryData.data} 
                getItemImage={getItemImage}
                categoryId={activeCategory}
              />
            ) : null
          })()}
        </div>

        {/* Grille sur tablette et desktop */}
        <div className="hidden md:block lg:h-auto">
          {(() => {
            const activeCategoryData = categories.find(cat => cat.id === activeCategory)
            if (!activeCategoryData) return null
            
            // Sur desktop, afficher en grille
            return (
              <div className="py-8 lg:py-12 px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {activeCategoryData.data.map((item, index) => {
                    const imageData = getItemImage(item, activeCategory)
                    return (
                      <MenuItem 
                        key={`${item.name}-${index}`}
                        item={item}
                        imageData={imageData}
                        isVisible={true}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

export default Carte


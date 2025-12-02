import { useState, useEffect, useRef, useMemo } from 'react'
import menuData from '../data/menu.json'
import soupeMisoImage from '../assets/images/soupe-miso.png'

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
      className={`flex flex-col bg-white p-4 md:p-6 rounded-xl m-4 w-[80%] transition-all duration-700 ${
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Carte blanche avec bordure */}
      <div className="flex flex-col items-center">
        {/* Image ou emoji */}
        <div className="h-48 md:h-64 rounded-lg overflow-hidden flex items-center justify-center mb-4 bg-gray-50">
          {imageData.type === 'image' ? (
            <img 
              src={imageData.value}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl md:text-8xl">{imageData.value}</span>
          )}
        </div>

        {/* Nom du plat */}
        <h4 className="text-black font-bold text-xl mb-2 text-center">
          {item.name}
        </h4>

        {/* Description */}
        {item.description && (
          <p className="text-gray-700 text-lg text-center mb-2">
            {item.description}
          </p>
        )}

        {/* Note */}
        {item.note && (
          <p className="text-amber-600 text-xs md:text-sm italic text-center">
            {item.note}
          </p>
        )}
      </div>

      {/* Bouton prix en dessous */}
      <div className="mt-2">
        <div className="bg-amber-800 hover:bg-amber-900 rounded-3xl py-3 px-6 text-center transition-colors duration-30 w-[50%] mx-auto">
          <span className="text-white font-bold text-2xl">
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
  const isScrollingRef = useRef(false)
  const scrollTimeout = useRef(null)
  const accumulatedDeltaRef = useRef(0)

  // Réinitialiser l'index quand la catégorie change
  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0)
      accumulatedDeltaRef.current = 0
    }, 0)
  }, [categoryId])

  // Rayon du cercle (en pixels)
  const radius = 300
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
          const newIndex = (prevIndex + direction + items.length) % items.length
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
        }, 600)
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
          const newIndex = (prevIndex + direction + items.length) % items.length
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
        }, 600)
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
  }, [items.length])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full md:hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Arc visible - on ne montre qu'une partie du cercle sur le côté */}
      {/* Le conteneur est positionné pour que l'item actif (à x=radius, y=0) soit centré verticalement */}
      <div 
        className="absolute"
        style={{
          left: '50%',
          top: '35%',
          transform: `translate(-${400}px)`
        }}
      >
        {items.map((item, index) => {
          const imageData = getItemImage(item.name, categoryId)
          
          // Calculer l'angle relatif par rapport à l'item actuel
          let relativeIndex = index - currentIndex
          // Normaliser pour le chemin le plus court
          if (relativeIndex > items.length / 2) {
            relativeIndex -= items.length
          } else if (relativeIndex < -items.length / 2) {
            relativeIndex += items.length
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
              className="absolute transition-all duration-600 ease-out"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${itemRotation}deg) scale(${scale})`,
                opacity: opacity,
                transformOrigin: 'center center',
                zIndex: isActive ? 10 : 5 - distance,
              }}
            >
              <div className="flex flex-col bg-white p-4 rounded-xl w-[250px]">
                <div className="flex flex-col items-center">
                  {/* Image ou emoji */}
                  <div className="h-32 rounded-lg overflow-hidden flex items-center justify-center mb-2 bg-gray-50">
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
                  <h4 className="text-black font-bold text-sm mb-1 text-center">
                    {item.name}
                  </h4>

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-700 text-xs text-center mb-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bouton prix */}
                <div className="mt-2">
                  <div className="bg-amber-800 rounded-3xl py-2 px-4 text-center">
                    <span className="text-white font-bold text-sm">
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
  const [activeCategory, setActiveCategory] = useState('entrees')

  // Mapping des images/emojis pour chaque plat
  const getItemImage = (itemName, categoryId) => {
    const name = itemName.toLowerCase()
    
    // Images avec fond transparent ou emojis
    const imageMap = {
      // Entrées
      'soupe miso': { type: 'image', value: soupeMisoImage },
      'salade de choux': { type: 'emoji', value: '🥗' },
      'riz nature': { type: 'emoji', value: '🍚' },
      'salade d\'algues': { type: 'emoji', value: '🌿' },
      'wakamé': { type: 'emoji', value: '🌿' },
      'épinard': { type: 'emoji', value: '🥬' },
      'goma-ae': { type: 'emoji', value: '🥬' },
      'pomme de terre': { type: 'emoji', value: '🥔' },
      'aubergine': { type: 'emoji', value: '🍆' },
      'gyoza': { type: 'image', value: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&q=80' },
      'kara-agué': { type: 'emoji', value: '🍗' },
      'yakitori': { type: 'emoji', value: '🍢' },
      'brochette': { type: 'emoji', value: '🍢' },
      
      // Domburi
      'poulet teriyaki': { type: 'image', value: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&q=80' },
      'saumon teriyaki': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      
      // Curry
      'curry': { type: 'image', value: 'https://images.unsplash.com/photo-1585032226651-759b0d6c58c0?w=200&q=80' },
      
      // Poké
      'poké': { type: 'image', value: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80' },
      'thon': { type: 'emoji', value: '🐟' },
      
      // Sushi
      'california': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      'nigiri': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      'sushi': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      'assortiment': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      'saumon': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      
      // Sashimi
      'sashimi': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      
      // Chirashi
      'chirashi': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      
      // Maki
      'maki': { type: 'image', value: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&q=80' },
      
      // Desserts
      'matcha': { type: 'emoji', value: '🍵' },
      'cake': { type: 'emoji', value: '🍰' },
      'dorayaki': { type: 'emoji', value: '🥞' },
      'daifuku': { type: 'emoji', value: '🍡' },
      'glace': { type: 'emoji', value: '🍨' },
    }

    // Chercher une correspondance
    for (const [key, value] of Object.entries(imageMap)) {
      if (name.includes(key)) {
        return value
      }
    }

    // Fallback par catégorie
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
    }

    return categoryFallbacks[categoryId] || { type: 'emoji', value: '🍽️' }
  }

  const categories = useMemo(() => [
    { id: 'entrees', name: 'Entrées / Accompagnements', data: menuData.entrees, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
    { id: 'domburi', name: 'Domburi', data: menuData.domburi, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80' },
    { id: 'curry', name: 'Curry Japonais', data: menuData.curry, image: 'https://images.unsplash.com/photo-1585032226651-759b0d6c58c0?w=600&q=80' },
    { id: 'poke', name: 'Poké Bowl', data: menuData.poke, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
    { id: 'sushi', name: 'Sushi', data: menuData.sushi, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80' },
    { id: 'sashimi', name: 'Sashimi', data: menuData.sashimi, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80' },
    { id: 'chirashi', name: 'Chirashi', data: menuData.chirashi, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80' },
    { id: 'maki', name: 'Maki / California', data: menuData.maki, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80' },
    { id: 'desserts', name: 'Desserts', data: menuData.desserts, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80' },
  ], [])



  // Désactiver le scroll sur la page
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.overflowX = 'hidden'
    document.documentElement.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.body.style.overflowX = ''
      document.documentElement.style.overflowX = ''
    }
  }, [])

  return (
    <section className="h-[80vh] flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className="mx-auto px-4 md:px-6 max-w-7xl w-full flex flex-col h-[90%]">
        {/* Sélecteur de catégorie */}
        <div className="bg-black/80 h-[7%] backdrop-blur-sm py-4 px-4 md:px-6 shrink-0 overflow-x-hidden">
          <div className="overflow-x-hidden w-full">
            <div className="flex space-x-2 md:justify-center flex-wrap w-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                  }}
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-all duration-300 rounded-lg ${
                    activeCategory === category.id
                      ? 'text-white bg-red-600 font-semibold shadow-lg'
                      : 'text-white bg-black hover:bg-gray-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carrousel cercle - prend toute la hauteur restante */}
        <div className="h-full">
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
      </div>
    </section>
  )
}

export default Carte


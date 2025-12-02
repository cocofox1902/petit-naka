import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRestaurant } from '../contexts/RestaurantContext'
import Model3D from '../components/Model3D'

// Composant Carrousel de plats
function DishCarousel() {
  const dishes = [
    { name: "Sushi & Sashimi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80", description: "Poissons frais du jour" },
    { name: "Ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80", description: "Bouillons savoureux" },
    { name: "Yakitori", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80", description: "Brochettes grillées" },
    { name: "Poké Bowl", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", description: "Bols colorés et frais" },
    { name: "Chirashi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80", description: "Assortiment de poissons" },
    { name: "Gyoza", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80", description: "Raviolis japonais" }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % dishes.length)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [dishes.length, isDragging])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + dishes.length) % dishes.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dishes.length)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setCurrentX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50 // Seuil minimum pour changer de slide
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      setCurrentX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  const dragOffset = isDragging ? (startX - currentX) : 0
  const translateX = carouselWidth > 0 
    ? -currentIndex * 100 - (dragOffset / carouselWidth) * 100
    : -currentIndex * 100

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Carrousel */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing" 
        style={{ height: '400px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
          }}
        >
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="min-w-full relative"
              style={{ height: '400px' }}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{dish.name}</h3>
                <p className="text-gray-300">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label="Précédent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label="Suivant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicateurs */}
      <div className="flex justify-center gap-2 mt-6">
        {dishes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-red-600 w-8'
                : 'bg-gray-600 w-2 hover:bg-gray-500'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Home() {
  const location = useLocation()
  const { restaurants, selectRestaurant, selectedRestaurantId } = useRestaurant()
  const ramenSectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [modelKey, setModelKey] = useState(0)

  // Réinitialiser le scrollProgress et forcer la réinitialisation du modèle quand on arrive sur la page
  useEffect(() => {
    // Réinitialiser avec un petit délai pour éviter les cascades
    const timer = setTimeout(() => {
      setScrollProgress(0)
      setModelKey(prev => prev + 1)
    }, 0)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (!ramenSectionRef.current) return

      const section = ramenSectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = rect.height
      
      // Calculer le progrès du scroll dans la section (0 à 1)
      // Quand la section est en haut de l'écran (rect.top = 0) : progress = 0
      // Quand la section est complètement sortie (rect.top = -sectionHeight) : progress = 1
      // On utilise -rect.top pour avoir une valeur positive qui augmente quand on scroll
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight))
      
      setScrollProgress(progress)
    }

    // Utiliser requestAnimationFrame pour une animation fluide
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Appel initial avec un petit délai pour s'assurer que le DOM est prêt
    setTimeout(() => {
      handleScroll()
    }, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Calculer les valeurs basées sur le scroll progress
  // Rotation à 1/4 de la vitesse du scroll (parallax)
  const rotation = (scrollProgress * 360) / 4 // Rotation de 0° à 90° (360/4 = 90)
  // Opacité de 100% à 0% selon le scroll
  const opacity = 1 - scrollProgress // Opacité de 1 à 0
  // Translation vers le bas selon le scroll (2x plus rapide que le scroll)
  const translateY = scrollProgress * 8 // Translation de 0 à 10 unités vers le bas (2x plus rapide)
  // Scale de 1 à 4 selon le scroll
  const scale = 1 + (scrollProgress * 1) // Scale de 1 à 4

  const handleArrowClick = () => {
    const nextSection = ramenSectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Section 1: Modèle 3D avec parallax */}
      <section 
        ref={ramenSectionRef}
        className="flex items-center justify-center relative overflow-hidden"
        style={{ height: '80vh', minHeight: '500px' }}
      >
        <div className="w-full h-full absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
            style={{ background: 'transparent', pointerEvents: 'none' }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.8} />
            <Model3D key={`${location.pathname}-${modelKey}`} rotation={rotation} opacity={opacity} translateY={translateY} scale={scale} />
            <OrbitControls enabled={false} />
          </Canvas>
        </div>
        
        {/* Flèche animée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center from-transparent to-black bg-gradient-to-b" >
        <button
          onClick={handleArrowClick}
          className="text-white hover:text-red-600 transition-colors duration-300 cursor-pointer z-10"
          aria-label="Scroll to next section"
        >
          <svg
            className="w-8 h-8 md:w-12 md:h-12 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
        </div>
      </section>
      
      {/* Contenu de la page */}
      <section className="relative overflow-hidden bg-black">
        {/* Gradient de fond */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50" />
        
        <div className="mx-auto px-4 md:px-6 max-w-6xl relative z-10 py-20 md:py-32">
          <div className="text-center mb-20 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Cuisine Japonaise
              <span className="block text-red-600 mt-2">authentique</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
              Bienvenue au Petit Naka, un restaurant de cuisine authentique japonaise avec plusieurs adresses à Paris. Nos plats sont préparés avec passion par des chefs japonais et sont disponibles sur place, à emporter ou en livraison. Venez découvrir et déguster une cuisine japonaise de qualité !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/carte"
                className="bg-transparent text-white font-semibold py-4 px-10 rounded-lg text-center border-2 border-white transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
              >
                Voir la carte
              </Link>
            </div>
          </div>

          {/* Section Localisations */}
          <div className="mt-24 md:mt-32 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Nos Adresses
            </h2>
            <p className="text-gray-400 text-center mb-4 max-w-2xl mx-auto">
              Retrouvez-nous dans plusieurs quartiers de Paris
            </p>
            {selectedRestaurantId && (
              <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto text-sm">
                Cliquez sur une adresse pour sélectionner un autre restaurant
              </p>
            )}
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants.map((restaurant) => {
                  const isSelected = selectedRestaurantId === restaurant.id
                  return (
                    <button
                      key={restaurant.id}
                      onClick={() => selectRestaurant(restaurant.id)}
                      className={`flex items-center gap-4 p-4 border-b transition-all duration-300 text-left w-full ${
                        isSelected
                          ? 'border-red-600 bg-red-600/10 hover:bg-red-600/20'
                          : 'border-gray-800 hover:border-red-600/50'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isSelected ? 'bg-red-600 w-2 h-2' : 'bg-red-600'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`text-lg ${
                          isSelected ? 'text-white font-semibold' : 'text-gray-300'
                        }`}>
                          {restaurant.address}
                        </p>
                        {isSelected && (
                          <p className="text-red-600 text-sm mt-1">✓ Restaurant sélectionné</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Carrousel de plats */}
          <div className="mt-24 md:mt-32 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Nos Spécialités
            </h2>
            <DishCarousel />
          </div>
        </div>
      </section>

      {/* Bouton de réservation en bas à droite */}
      <Link
        to="/reservation"
        className="fixed bottom-6 right-6 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl z-50"
      >
        Cliquer pour réserver
      </Link>
    </>
  )
}

export default Home

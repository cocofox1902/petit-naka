import { Link } from 'react-router-dom'
import { useRestaurant } from '../contexts/RestaurantContext'
import { usePageTransition } from '../contexts/PageTransitionContext'
import OpeningHours from '../components/OpeningHours'
import LazyImage from '../components/LazyImage'
import { ERROR_MESSAGES } from '../constants'

function AEmporter() {
  const { selectedRestaurant } = useRestaurant()
  const { startTransition } = usePageTransition()

  if (!selectedRestaurant) {
    return (
      <section className="py-16 md:py-24 bg-black min-h-screen">
        <div className="mx-auto px-4 md:px-6 max-w-5xl text-center">
          <p className="text-gray-400 text-lg" role="alert">{ERROR_MESSAGES.NO_RESTAURANT}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">À emporter</h2>
          <p className="text-gray-300 text-lg lg:text-xl">Passez votre commande par téléphone</p>
        </div>

        {/* Grande image de plats à emporter - LCP image, chargée immédiatement */}
        <div className="mb-12 lg:mb-16 rounded-lg overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80" 
            alt="Plats à emporter"
            className="w-full h-80 md:h-96 lg:h-[500px] object-cover transition-all duration-700 hover:scale-110"
            fetchPriority="high"
            loading="eager"
            width="1200"
            height="500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 lg:mb-16">
          {/* Section téléphone */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 lg:mb-4" id="phone-heading">Commande par téléphone</h3>
              <a 
                href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`}
                className="text-red-400 text-2xl lg:text-3xl font-bold transition-all duration-300 hover:text-red-300 hover:scale-105 inline-block underline"
                aria-label={`Appeler pour commander au ${selectedRestaurant.phone}`}
              >
                {selectedRestaurant.phone}
              </a>
            </div>
          </div>
          
          {/* Section sur place */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 lg:mb-4" id="location-heading">Sur place</h3>
              <div role="region" aria-labelledby="location-heading">
                <p className="text-gray-300 text-lg lg:text-xl mb-1">{selectedRestaurant.address}</p>
                <p className="text-gray-300 text-lg lg:text-xl mb-2">{selectedRestaurant.postalCode} {selectedRestaurant.city}</p>
                <p className="text-gray-300 text-sm lg:text-base">Venez commander directement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 mb-8 lg:mb-12 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
          <h3 className="text-white font-bold text-xl lg:text-2xl mb-6 lg:mb-8" id="opening-hours-heading">Heures d'ouverture</h3>
          <OpeningHours openingHours={selectedRestaurant.openingHours} />
        </div>

        <div className="text-center">
          <Link
            to="/carte"
            onClick={startTransition}
            className="inline-block bg-red-600 text-white font-semibold py-4 px-10 lg:py-5 lg:px-12 rounded-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl text-lg lg:text-xl"
            aria-label="Voir la carte complète du menu"
          >
            Voir la carte complète
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AEmporter

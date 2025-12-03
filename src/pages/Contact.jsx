import { useRestaurant } from '../contexts/RestaurantContext'
import OpeningHours from '../components/OpeningHours'
import LazyImage from '../components/LazyImage'

function Contact() {
  const { selectedRestaurant } = useRestaurant()

  if (!selectedRestaurant) {
    return null
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">Infos & contact</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Image de localisation */}
        <div className="mb-12 lg:mb-16 rounded-lg overflow-hidden shadow-2xl">
          <LazyImage 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
            alt="Localisation restaurant"
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-all duration-700 hover:scale-110"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 lg:mb-16">
          {/* Adresse */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl lg:text-3xl mb-4 lg:mb-6" id="address-heading">Adresse</h3>
              <div className="space-y-3 lg:space-y-4 text-gray-300" role="region" aria-labelledby="address-heading">
                <p className="text-lg lg:text-xl transition-all duration-300 hover:text-white">{selectedRestaurant.address}</p>
                <p className="text-lg lg:text-xl transition-all duration-300 hover:text-white">{selectedRestaurant.postalCode} {selectedRestaurant.city}</p>
                <a 
                  href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`}
                  className="block text-red-400 font-bold text-xl lg:text-2xl mt-6 lg:mt-8 transition-all duration-300 hover:text-red-300 hover:scale-105"
                  aria-label={`Appeler le restaurant au ${selectedRestaurant.phone}`}
                >
                  {selectedRestaurant.phone}
                </a>
              </div>
            </div>
            <a
              href={selectedRestaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-400 text-sm lg:text-base font-medium transition-all duration-300 hover:text-red-300 hover:scale-105 underline"
              aria-label="Voir l'itinéraire sur Google Maps"
            >
              Voir l'itinéraire
              <svg className="w-5 h-5 lg:w-6 lg:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Horaires */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl lg:text-3xl mb-4 lg:mb-6" id="hours-heading">Heures d'ouverture</h3>
            </div>
            <div role="region" aria-labelledby="hours-heading">
              <OpeningHours 
                openingHours={selectedRestaurant.openingHours}
              />
            </div>
          </div>
        </div>

        {/* Section contact */}
        <div className="mt-12 lg:mt-16 bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300">
          <h3 className="text-white font-bold text-xl lg:text-2xl mb-4 lg:mb-6 text-center">Nous contacter</h3>
          <p className="text-gray-400 text-center mb-4 lg:mb-6 text-base lg:text-lg">
            Vous pouvez également nous contacter au <br /><a href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`} className="text-red-400 font-bold hover:text-red-300 transition-all duration-300 text-lg lg:text-xl underline" aria-label={`Appeler le restaurant au ${selectedRestaurant.phone}`}>{selectedRestaurant.phone}</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact

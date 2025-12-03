import { useRestaurant } from '../contexts/RestaurantContext'

function Contact() {
  const { selectedRestaurant } = useRestaurant()

  if (!selectedRestaurant) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Infos & contact</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Image de localisation */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
            alt="Localisation restaurant"
            className="w-full h-64 md:h-96 object-cover transition-all duration-700 hover:scale-110"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Adresse */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl mb-4">Adresse</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-lg transition-all duration-300 hover:text-white">{selectedRestaurant.address}</p>
                <p className="text-lg transition-all duration-300 hover:text-white">{selectedRestaurant.postalCode} {selectedRestaurant.city}</p>
                <a 
                  href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`}
                  className="block text-red-600 font-bold text-xl mt-6 transition-all duration-300 hover:text-red-500 hover:scale-105"
                >
                  {selectedRestaurant.phone}
                </a>
              </div>
            </div>
            <a
              href={selectedRestaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 text-sm font-medium transition-all duration-300 hover:text-red-500 hover:scale-105"
            >
              Voir l'itinéraire
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Horaires */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl mb-4">Heures d'ouverture</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              {selectedRestaurant.openingHours && Object.entries(selectedRestaurant.openingHours).map(([day, hours]) => {
                const dayNames = {
                  'lundi': 'Lundi',
                  'mardi': 'Mardi',
                  'mercredi': 'Mercredi',
                  'jeudi': 'Jeudi',
                  'vendredi': 'Vendredi',
                  'samedi': 'Samedi',
                  'dimanche': 'Dimanche'
                }
                const hoursArray = Array.isArray(hours) ? hours : [hours]
                const displayHours = hoursArray.join(', ')
                const isClosed = hoursArray.some(h => h === 'Fermé')
                
                return (
                  <div 
                    key={day} 
                    className={`flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white ${isClosed ? 'opacity-60' : ''}`}
                  >
                    <span className="font-medium">{dayNames[day]}</span>
                    <span className={isClosed ? 'text-red-600 font-semibold' : ''}>{displayHours}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Section contact */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
          <h3 className="text-white font-bold text-xl mb-4 text-center">Nous contacter</h3>
          <p className="text-gray-400 text-center mb-4">
            Vous pouvez également nous contacter au <br /><a href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`} className="text-red-600 font-bold hover:text-red-500 transition-all duration-300">{selectedRestaurant.phone}</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact

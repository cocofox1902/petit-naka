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
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Lundi</span>
                <span>11:30 - 15:00, 17:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Mardi</span>
                <span>11:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Mercredi</span>
                <span>11:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Jeudi</span>
                <span>11:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Vendredi</span>
                <span>11:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Samedi</span>
                <span>11:30 - 23:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white">
                <span className="font-medium">Dimanche</span>
                <span>11:30 - 23:00</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-900/30 rounded-lg border border-red-600/30">
              <p className="text-sm text-gray-300">
                <span className="text-red-600 font-bold">Ouvert</span> - Ferme à 23:00
              </p>
            </div>
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700/50">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm mb-2">Paiement</p>
            <p className="text-gray-400 text-xs">Cash, Mastercard, Carte de débit, Ticket Restaurant, Visa</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700/50">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm mb-2">Idéal pour les familles</p>
            <p className="text-gray-400 text-xs">Espace accueillant</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700/50">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm mb-2">Équipements</p>
            <p className="text-gray-400 text-xs">Espace fumeur, Climatisation</p>
          </div>
        </div>
        
        {/* Section contact */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
          <h3 className="text-white font-bold text-xl mb-4 text-center">Nous contacter</h3>
          <p className="text-gray-400 text-center mb-4">
            Vous pouvez également nous contacter au <a href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`} className="text-red-600 font-bold hover:text-red-500 transition-all duration-300">{selectedRestaurant.phone}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact

import { Link } from 'react-router-dom'

function AEmporter() {
  return (
    <section className="py-16 md:py-24 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">À emporter</h2>
          <p className="text-gray-400 text-lg">Passez votre commande par téléphone</p>
        </div>

        {/* Grande image de plats à emporter */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80" 
            alt="Plats à emporter"
            className="w-full h-80 md:h-96 object-cover transition-all duration-700 hover:scale-110"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Section téléphone */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Commande par téléphone</h3>
              <a 
                href="tel:+33140330113" 
                className="text-red-600 text-2xl font-bold transition-all duration-300 hover:text-red-500 hover:scale-105 inline-block"
              >
                +33 1 40 33 01 13
              </a>
            </div>
          </div>
          
          {/* Section sur place */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700/50">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Sur place</h3>
              <p className="text-gray-300 text-lg mb-1">4 Rue Merlin</p>
              <p className="text-gray-300 text-lg mb-2">75011 Paris</p>
              <p className="text-gray-400 text-sm">Venez commander directement</p>
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-gray-800 rounded-lg p-6 md:p-8 mb-8 border border-gray-700/50">
          <h3 className="text-white font-bold text-xl mb-6">Heures d'ouverture</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900">
              <span className="font-medium">Lundi</span>
              <span>11:30 - 15:00, 17:30 - 23:00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900">
              <span className="font-medium">Mardi - Dimanche</span>
              <span>11:30 - 23:00</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/carte"
            className="inline-block bg-red-600 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl text-lg"
          >
            Voir la carte complète
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AEmporter

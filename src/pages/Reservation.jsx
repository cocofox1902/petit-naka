import { useRestaurant } from '../contexts/RestaurantContext'
import { ERROR_MESSAGES } from '../constants'

function Reservation() {
  const { selectedRestaurant } = useRestaurant()

  // Générer les dates pour novembre 2025
  const generateCalendarDays = () => {
    const days = []
    // Novembre 2025 commence un samedi (1er novembre)
    // Ajouter les jours vides au début
    for (let i = 0; i < 5; i++) {
      days.push(null)
    }
    // Ajouter les jours de novembre (1-30)
    for (let i = 1; i <= 30; i++) {
      days.push(i)
    }
    return days
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']

  if (!selectedRestaurant) {
    return (
      <section className="py-16 md:py-24 bg-black min-h-screen">
        <div className="mx-auto px-4 md:px-6 max-w-2xl text-center">
          <p className="text-gray-400 text-lg" role="alert">{ERROR_MESSAGES.NO_RESTAURANT}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black min-h-screen" aria-labelledby="reservation-heading">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-8 lg:mb-12">
          <h1 id="reservation-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">Réservation</h1>
          <p className="text-gray-300 text-lg lg:text-xl">
            Réservez une table en ligne ou par téléphone au{' '}
            <a 
              href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`}
              className="text-red-400 font-bold hover:text-red-300 transition-colors underline"
              aria-label={`Appeler pour réserver au ${selectedRestaurant.phone}`}
            >
              {selectedRestaurant.phone}
            </a>
          </p>
        </div>

        {/* Widget TheFork - Visuel non fonctionnel */}
        <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-2xl max-w-md lg:max-w-lg mx-auto" role="region" aria-label="Widget de réservation TheFork">
          {/* Header avec nom et branding */}
          <div className="mb-6 lg:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">{selectedRestaurant.name}</h2>
            <div className="flex items-center justify-center gap-2 text-sm lg:text-base text-gray-600" aria-label="Proposé avec amour par TheFork">
              <span>Proposé avec <strong>amour</strong> par</span>
              <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded" aria-label="TheFork">
                <span className="text-xs lg:text-sm font-bold text-white">TheFork</span>
              </div>
            </div>
          </div>

          {/* Boutons de navigation Date / Pers. / Heure */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4" role="tablist" aria-label="Options de réservation">
            <button 
              className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-green-50 rounded-lg border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              role="tab"
              aria-selected="true"
              aria-controls="date-panel"
              tabIndex={0}
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-green-700">Date</span>
            </button>
            <button 
              className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              role="tab"
              aria-selected="false"
              aria-controls="people-panel"
              tabIndex={-1}
              disabled
              aria-disabled="true"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-400">Pers.</span>
            </button>
            <button 
              className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              role="tab"
              aria-selected="false"
              aria-controls="time-panel"
              tabIndex={-1}
              disabled
              aria-disabled="true"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-400">Heure</span>
            </button>
          </div>

          {/* Calendrier */}
          <div className="mb-6" id="date-panel" role="tabpanel" aria-labelledby="date-tab">
            {/* Navigation du calendrier */}
            <div className="flex items-center justify-between mb-4" role="group" aria-label="Navigation du calendrier">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded" 
                disabled
                aria-label="Mois précédent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900" id="calendar-month">novembre 2025</h3>
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded"
                aria-label="Mois suivant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendrier avec structure ARIA correcte */}
            <div role="table" aria-labelledby="calendar-month">
              {/* En-têtes des jours de la semaine */}
              <div role="row" className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-600 py-2" role="columnheader">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille du calendrier - organisée en lignes */}
              {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, rowIndex) => {
                const rowDays = calendarDays.slice(rowIndex * 7, (rowIndex + 1) * 7)
                return (
                  <div key={rowIndex} role="row" className="grid grid-cols-7 gap-1">
                    {rowDays.map((day, cellIndex) => (
                      <div key={cellIndex} role="cell" className="aspect-square flex items-center justify-center">
                        {day ? (
                          <button 
                            className="w-full h-full text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            disabled
                            aria-label={`Sélectionner le ${day} novembre 2025`}
                            aria-disabled="true"
                          >
                            {day}
                          </button>
                        ) : (
                          <div className="w-full h-full" aria-hidden="true"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Note de contact */}
          <div className="mt-8 text-center border-t border-gray-200 pt-6" role="region" aria-label="Contact téléphonique">
            <p className="text-gray-600 text-sm mb-3">Ou appelez-nous directement</p>
            <a 
              href={`tel:${selectedRestaurant.phone.replace(/\s/g, '')}`}
              className="text-red-600 font-bold text-xl transition-all duration-300 hover:text-red-700 hover:scale-110 inline-block focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded underline"
              aria-label={`Appeler pour réserver au ${selectedRestaurant.phone}`}
            >
              {selectedRestaurant.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation

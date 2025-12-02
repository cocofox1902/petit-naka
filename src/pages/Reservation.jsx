function Reservation() {
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

  return (
    <section className="py-16 md:py-24 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Réservation</h2>
          <p className="text-gray-400 text-lg">Réservez une table en ligne ou par téléphone au +33 1 40 33 01 13</p>
        </div>

        {/* Widget TheFork - Visuel non fonctionnel */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-2xl max-w-md mx-auto">
          {/* Header avec nom et branding */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Petit Naka</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>Proposé avec <b>amour</b> par</span>
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                <span className="text-xs font-bold">TheFork</span>
              </div>
            </div>
          </div>

          {/* Boutons de navigation Date / Pers. / Heure */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
            <button className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-green-50 rounded-lg border-2 border-green-500">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-green-700">Date</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent opacity-50">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-400">Pers.</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent opacity-50">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-400">Heure</span>
            </button>
          </div>

          {/* Calendrier */}
          <div className="mb-6">
            {/* Navigation du calendrier */}
            <div className="flex items-center justify-between mb-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">novembre 2025</h3>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div key={index} className="aspect-square flex items-center justify-center">
                  {day ? (
                    <button 
                      className="w-full h-full text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      {day}
                    </button>
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Note de contact */}
          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <p className="text-gray-400 text-sm mb-3">Ou appelez-nous directement</p>
            <a 
              href="tel:+33140330113" 
              className="text-red-600 font-bold text-xl transition-all duration-300 hover:text-red-500 hover:scale-110 inline-block"
            >
              +33 1 40 33 01 13
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation

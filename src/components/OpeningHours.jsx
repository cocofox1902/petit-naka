import { DAY_NAMES } from '../constants'

function OpeningHours({ openingHours, className = '' }) {
  if (!openingHours || Object.keys(openingHours).length === 0) {
    return (
      <div className={className}>
        <p className="text-gray-400 text-sm">Horaires non disponibles</p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 text-sm text-gray-300 ${className}`}>
      {Object.entries(openingHours).map(([day, hours]) => {
        const hoursArray = Array.isArray(hours) ? hours : [hours]
        const displayHours = hoursArray.join(', ')
        const isClosed = hoursArray.some(h => h === 'Fermé')
        
        return (
          <div 
            key={day} 
            className={`flex justify-between items-center p-3 bg-gray-900/50 rounded transition-all duration-300 hover:bg-gray-900 hover:text-white ${isClosed ? 'opacity-60' : ''}`}
            role="row"
            aria-label={`${DAY_NAMES[day]}: ${displayHours}`}
          >
            <span className="font-medium" role="rowheader">{DAY_NAMES[day]}</span>
            <span 
              className={isClosed ? 'text-red-600 font-semibold' : ''}
              role="cell"
              aria-label={isClosed ? 'Fermé' : displayHours}
            >
              {displayHours}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default OpeningHours


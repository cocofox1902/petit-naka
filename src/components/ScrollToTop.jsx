import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Utiliser requestAnimationFrame pour ne pas bloquer le bfcache
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
  }, [pathname])

  // Gérer la restauration depuis le bfcache
  useEffect(() => {
    const handlePageShow = (event) => {
      // Si la page est restaurée depuis le bfcache, restaurer la position de scroll
      if (event.persisted) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        })
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return null
}

export default ScrollToTop


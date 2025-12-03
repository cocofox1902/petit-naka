import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RestaurantProvider } from './contexts/RestaurantContext'
import { PageTransitionProvider } from './contexts/PageTransitionContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import RestaurantModal from './components/RestaurantModal'

// Lazy load SEO components pour réduire le bundle initial
const SEOHead = lazy(() => import('./components/SEOHead'))
const StructuredData = lazy(() => import('./components/StructuredData'))

// Code splitting - Chargement paresseux des pages
const Home = lazy(() => import('./pages/Home'))
const Carte = lazy(() => import('./pages/Carte'))
const AEmporter = lazy(() => import('./pages/AEmporter'))
const Reservation = lazy(() => import('./pages/Reservation'))
const Histoire = lazy(() => import('./pages/Histoire'))
const Contact = lazy(() => import('./pages/Contact'))

// Composant de chargement
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Chargement...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <RestaurantProvider>
        <PageTransitionProvider>
          <Router>
            <Suspense fallback={null}>
              <SEOHead />
              <StructuredData />
            </Suspense>
            <ScrollToTop />
            <PageTransition>
              <RestaurantModal />
              <Layout>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/carte" element={<Carte />} />
                      <Route path="/a-emporter" element={<AEmporter />} />
                      <Route path="/reservation" element={<Reservation />} />
                      <Route path="/histoire" element={<Histoire />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </Layout>
            </PageTransition>
          </Router>
        </PageTransitionProvider>
      </RestaurantProvider>
    </ErrorBoundary>
  )
}

export default App

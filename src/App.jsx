import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RestaurantProvider } from './contexts/RestaurantContext'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import RestaurantModal from './components/RestaurantModal'
import Home from './pages/Home'
import Carte from './pages/Carte'
import AEmporter from './pages/AEmporter'
import Reservation from './pages/Reservation'
import Histoire from './pages/Histoire'
import Contact from './pages/Contact'

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <ScrollToTop />
        <PageTransition>
          <RestaurantModal />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carte" element={<Carte />} />
              <Route path="/a-emporter" element={<AEmporter />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/histoire" element={<Histoire />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </PageTransition>
      </Router>
    </RestaurantProvider>
  )
}

export default App

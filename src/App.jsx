import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Carte from './pages/Carte'
import AEmporter from './pages/AEmporter'
import Reservation from './pages/Reservation'
import Histoire from './pages/Histoire'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageTransition>
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
  )
}

export default App

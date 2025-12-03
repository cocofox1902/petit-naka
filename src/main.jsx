import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode désactivé en production pour améliorer les performances
// Il reste actif en développement via Vite
const root = createRoot(document.getElementById('root'))
root.render(<App />)

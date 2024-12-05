import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './global.css'
import Header from './header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Header /> 
      <div className="container mx-auto">
      <App />
    </div>
  </StrictMode>,
)

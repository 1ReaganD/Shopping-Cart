import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routies from './routies'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routies />
  </StrictMode>,
)

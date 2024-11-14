import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// index.js hoặc App.js  
import { library } from '@fortawesome/fontawesome-svg-core';  
import { fas } from '@fortawesome/free-solid-svg-icons';  

library.add(fas);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

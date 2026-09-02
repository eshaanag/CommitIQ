import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyThemeToDocument, getStoredTheme, getSystemTheme } from './components/ui/ThemeToggle'

// Immediate synchronous theme initialization to prevent flash on initial load
const initialTheme = getStoredTheme() || getSystemTheme()
applyThemeToDocument(initialTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

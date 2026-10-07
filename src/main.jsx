import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// The single-file preview build runs inside a sandboxed frame, so it keeps
// routes in memory instead of the address bar.
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter
// In the preview, opening the link with #admin starts on the admin page.
const routerProps = import.meta.env.VITE_PREVIEW
  ? { initialEntries: [window.location.hash === '#admin' ? '/admin' : '/'] }
  : {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router {...routerProps}>
      <App />
    </Router>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/recuperatorio">
      <div className="min-h-screen flex flex-col bg-surface text-dark antialiased">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter >
  </StrictMode>,
)

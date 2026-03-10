import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Feedback from './pages/Feedback.jsx'

function App() {
  return (
    <div className="app-shell">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <Navbar />
        <main className="mt-6 flex-1 space-y-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="mt-8 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>WorkHours Calculator · Designed by Vinit Pawar</p>
          <p>Copyright © 2026 WorkHours Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App

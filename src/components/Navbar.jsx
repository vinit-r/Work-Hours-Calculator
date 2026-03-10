import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadItem, saveItem } from '../store/localStorage.js'

const THEME_KEY = 'whc_theme'

function useTheme() {
  const [theme, setTheme] = useState(() => loadItem(THEME_KEY, 'system'))

  useEffect(() => {
    const root = document.documentElement
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    saveItem(THEME_KEY, theme)
  }, [theme])

  const toggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggle }
}

const linkBase =
  'inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors'
const linkInactive =
  'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800/70'
const linkActive =
  'text-slate-900 bg-slate-100 dark:text-slate-50 dark:bg-slate-800/80 shadow-sm'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleShortcutNav = () => {
    if (location.pathname !== '/') navigate('/')
  }

  const isDark = theme === 'dark'

  return (
    <header className="card sticky top-3 z-20 px-4 py-3 shadow-sm sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl dark:bg-brand-600 bg-slate-800/80 dark:text-slate-50 shadow-sm">
          <span className="text-lg font-semibold">WH</span>
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              WorkHours
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Effective work & break planner
          </p>
        </div>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Feedback
        </NavLink>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={toggle}
          className="btn-ghost h-9 w-9 shrink-0 rounded-full p-0"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <span className="text-lg">🌙</span>
          ) : (
            <span className="text-lg">☀️</span>
          )}
        </button>
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            onClick={handleShortcutNav}
            className="btn-ghost h-9 px-3 text-xs"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={handleShortcutNav}
            className="btn-ghost h-9 px-3 text-xs"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleShortcutNav}
            className="btn-ghost h-9 px-3 text-xs"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      </div>

      {menuOpen && (
        <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 text-sm sm:hidden dark:border-slate-800">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/feedback"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Feedback
          </NavLink>
          <div className="mt-1 flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => {
                handleShortcutNav()
                setMenuOpen(false)
              }}
              className="btn-ghost h-8 px-3 text-xs"
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => {
                handleShortcutNav()
                setMenuOpen(false)
              }}
              className="btn-ghost h-8 px-3 text-xs"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                handleShortcutNav()
                setMenuOpen(false)
              }}
              className="btn-ghost h-8 px-3 text-xs"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      
      </div>
    </header>
  )
}


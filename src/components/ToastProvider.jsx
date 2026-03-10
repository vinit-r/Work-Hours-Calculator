import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, variant = 'error') => {
    setToast({ message, variant })
    window.clearTimeout((showToast)._tid)
    ;(showToast)._tid = window.setTimeout(() => {
      setToast(null)
    }, 3000)
  }, [])

  const value = { showToast }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div
            className={`pointer-events-auto rounded-xl px-4 py-2 text-sm shadow-lg ${
              toast.variant === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-slate-900 text-slate-50'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}


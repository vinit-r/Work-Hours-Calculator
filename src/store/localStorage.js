const isBrowser = typeof window !== 'undefined'

const getStorage = () => {
  if (!isBrowser) return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function loadItem(key, fallback = null) {
  const storage = getStorage()
  if (!storage) return fallback

  try {
    const raw = storage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveItem(key, value) {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write errors (quota, etc.)
  }
}

export function removeItem(key) {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.removeItem(key)
  } catch {
    // ignore
  }
}


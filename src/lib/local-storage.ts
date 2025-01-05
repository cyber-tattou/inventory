// Helper functions for localStorage management
export const storage = {
  // Get data with default fallback
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    const stored = localStorage.getItem(key)
    if (!stored) return defaultValue
    try {
      return JSON.parse(stored)
    } catch {
      return defaultValue
    }
  },

  // Set data
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  },

  // Remove data
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, '')
  }
} 
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface AmbientState {
  playing: boolean
  time: number
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isLight: boolean
  ambient: AmbientState
  setAmbient: (state: AmbientState) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'light' || stored === 'dark' ? stored : 'dark'
  })

  const [ambient, setAmbient] = useState<AmbientState>(() => {
    try {
      const raw = localStorage.getItem('ambient')
      return raw ? JSON.parse(raw) : { playing: false, time: 0 }
    } catch {
      return { playing: false, time: 0 }
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  const isLight = theme === 'light'

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLight, ambient, setAmbient }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

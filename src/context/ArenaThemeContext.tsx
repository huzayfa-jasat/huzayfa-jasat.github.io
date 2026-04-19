import { ARENA_THEMES, DEFAULT_THEME, type ArenaThemeKey, type ArenaTheme } from '../data/themes'
import { createContext, useState, useContext, type ReactNode } from "react";

interface ArenaThemeContextValue {
  themeKey: ArenaThemeKey
  theme: ArenaTheme
  setThemeKey: (key: ArenaThemeKey) => void
}

const ArenaThemeContext = createContext<ArenaThemeContextValue | null>(null)

export function ArenaThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKey] = useState<ArenaThemeKey>(DEFAULT_THEME)
  const theme = ARENA_THEMES[themeKey]

  return (
    <ArenaThemeContext.Provider value={{ themeKey, theme, setThemeKey }}>
      {children}
    </ArenaThemeContext.Provider>
  )
}

export function useArenaTheme(): ArenaThemeContextValue {
  const ctx = useContext(ArenaThemeContext)
  if (!ctx) throw new Error('useArenaTheme must be used within ArenaThemeProvider')
  return ctx
}
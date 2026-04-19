import { useArenaTheme } from '../../context/ArenaThemeContext'
import { ARENA_THEMES, type ArenaThemeKey } from '../../data/themes'

const THEME_KEYS: ArenaThemeKey[] = ['Hockey', 'Basketball', 'Soccer', 'Baseball', 'Football']

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 4,
  padding: 4,
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(12px)',
  borderRadius: 8,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 100,
  fontFamily: "'Orbitron', sans-serif",
}

export default function ArenaToggle() {
  const { themeKey, setThemeKey, theme } = useArenaTheme()

  return (
    <div style={containerStyle}>
      {THEME_KEYS.map((key) => {
        const t = ARENA_THEMES[key]
        const isActive = key === themeKey
        return (
          <button
            key={key}
            onClick={() => setThemeKey(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: isActive ? `${theme.accentColor}22` : 'transparent',
              border: isActive
                ? `1px solid ${theme.accentColor}`
                : '1px solid transparent',
              borderRadius: 6,
              color: isActive ? theme.accentColor : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: 11,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span>{t.name}</span>
          </button>
        )
      })}
    </div>
  )
}

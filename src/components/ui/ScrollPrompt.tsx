import { useArenaTheme } from '../../context/ArenaThemeContext'
import { useScrollProgress } from '../../hooks/useScrollStore'

export default function ScrollPrompt() {
  const { theme } = useArenaTheme()
  const progress = useScrollProgress()
  const opacity = Math.max(0, 1 - progress * 10)

  if (opacity <= 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity: opacity * 0.6,
        animation: 'bounce 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 10,
          letterSpacing: '0.3em',
          color: theme.accentColor,
          textTransform: 'uppercase',
        }}
      >
        Scroll to Enter
      </span>
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <rect x="1" y="1" width="18" height="26" rx="9" stroke={theme.accentColor} strokeWidth="2" />
        <circle cx="10" cy="8" r="2" fill={theme.accentColor}>
          <animate attributeName="cy" values="8;18;8" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

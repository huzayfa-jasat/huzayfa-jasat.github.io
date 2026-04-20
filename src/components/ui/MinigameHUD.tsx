import { useMinigameState, startMinigame, exitMinigame, setHoveringUI } from '../../hooks/useMinigameStore'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { SPORT_CONFIGS } from '../../data/sportConfigs'
import { useScrollProgress } from '../../hooks/useScrollStore'

export default function MinigameHUD() {
  const { active, phase, score, attempts } = useMinigameState()
  const { themeKey, theme } = useArenaTheme()
  const config = SPORT_CONFIGS[themeKey]
  const progress = useScrollProgress()

  const showPlayButton = progress > 0.9 && !active

  if (!showPlayButton && !active) return null

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        pointerEvents: 'none',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      {showPlayButton && (
        <button
          onClick={() => startMinigame()}
          style={{
            position: 'absolute',
            bottom: 80,
            pointerEvents: 'auto',
            padding: '16px 48px',
            background: `${theme.accentColor}22`,
            border: `2px solid ${theme.accentColor}`,
            borderRadius: 8,
            color: theme.accentColor,
            fontSize: 18,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            textTransform: 'uppercase' as const,
          }}
        >
          {config.labels.action}
        </button>
      )}

      {active && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <div style={{ color: '#fff', fontSize: 14, letterSpacing: '0.2em' }}>
            {config.labels.score.replace('!', 'S')}: {score}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.15em' }}>
            ATTEMPTS: {attempts}
          </div>
        </div>
      )}

      {phase === 'aiming' && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            letterSpacing: '0.2em',
          }}
        >
          {config.labels.instruction}
        </div>
      )}

      {(phase === 'scored' || phase === 'missed') && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            fontSize: 48,
            fontWeight: 900,
            color: phase === 'scored' ? theme.accentColor : '#ff4444',
            textShadow: `0 0 40px ${phase === 'scored' ? theme.accentColor : '#ff4444'}`,
            letterSpacing: '0.1em',
          }}
        >
          {phase === 'scored' ? config.labels.score : config.labels.miss}
        </div>
      )}

      {active && (
        <button
          onClick={() => exitMinigame()}
          onMouseEnter={() => setHoveringUI(true)}
          onMouseLeave={() => setHoveringUI(false)}
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            pointerEvents: 'auto',
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 6,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 10,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '0.2em',
            cursor: 'pointer',
          }}
        >
          EXIT
        </button>
      )}
    </div>
  )
}

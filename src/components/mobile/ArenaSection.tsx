import { useArenaTheme } from '../../context/ArenaThemeContext'
import { ARENA_THEMES, type ArenaThemeKey } from '../../data/themes'
import { useScrollAnimation } from './useScrollAnimation'
import style from './ArenaSection.module.css'

const THEME_KEYS = Object.keys(ARENA_THEMES) as ArenaThemeKey[]

export default function ArenaSection() {
  const { themeKey, theme, setThemeKey } = useArenaTheme()
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className={`${style.section} animate-fade-up`}>
      <p className={style.sectionLabel} style={{ color: theme.accentColor }}>
        CHOOSE YOUR ARENA
      </p>
      <div className={style.themeGrid}>
        {THEME_KEYS.map((key) => {
          const t = ARENA_THEMES[key]
          const isActive = key === themeKey
          return (
            <button
              key={key}
              className={`${style.themeButton} ${isActive ? style.themeButtonActive : ''}`}
              onClick={() => setThemeKey(key)}
              style={{
                borderColor: isActive ? t.accentColor : undefined,
                background: isActive ? `${t.accentColor}15` : undefined,
                color: isActive ? t.accentColor : undefined,
              }}
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </button>
          )
        })}
      </div>
      <p className={style.desktopHint}>
        Visit on desktop for the full 3D experience
      </p>
      <p className={style.footer}>
        Built with React · Three.js · TypeScript
      </p>
    </section>
  )
}

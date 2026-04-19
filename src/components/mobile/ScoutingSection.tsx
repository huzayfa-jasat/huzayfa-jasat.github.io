import { useArenaTheme } from '../../context/ArenaThemeContext'
import { PROFILE } from '../../data/content'
import { useScrollAnimation } from './useScrollAnimation'
import style from './ScoutingSection.module.css'

const STAT_ENTRIES = Object.entries(PROFILE.stats).filter(([key]) => key !== 'Overall')

export default function ScoutingSection() {
  const { theme } = useArenaTheme()
  const ref = useScrollAnimation<HTMLDivElement>()

  return (
    <section className={style.section}>
      <div
        ref={ref}
        className={`${style.card} animate-scale-in`}
        style={{ borderColor: `${theme.accentColor}44`, color: theme.accentColor }}
      >
        <div className={style.cardBg} />
        <div className={style.scanlines} />

        <p className={style.header} style={{ color: theme.accentColor }}>
          SCOUTING REPORT
        </p>
        <h2 className={style.name}>{PROFILE.name.toUpperCase()}</h2>
        <p className={style.titleText} style={{ color: theme.accentColor }}>
          {PROFILE.title.toUpperCase()}
        </p>

        <div className={style.divider} style={{ background: theme.accentColor }} />

        <div className={style.overallScore}>{PROFILE.stats.Overall}</div>
        <div className={style.overallLabel}>OVERALL</div>

        {STAT_ENTRIES.map(([label, value]) => (
          <div key={label}>
            <div className={style.statRow}>
              <span className={style.statLabel}>{label.toUpperCase()}</span>
              <span className={style.statValue}>{value}</span>
            </div>
            <div className={style.barTrack}>
              <div
                className={style.barFill}
                style={{
                  width: `${value}%`,
                  background: theme.accentColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

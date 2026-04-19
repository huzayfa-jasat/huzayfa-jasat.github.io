import { useArenaTheme } from '../../context/ArenaThemeContext'
import { EXPERIENCES } from '../../data/content'
import { useScrollAnimation } from './useScrollAnimation'
import style from './ExperienceSection.module.css'

function ExperienceCard({ experience, index }: { experience: typeof EXPERIENCES[0]; index: number }) {
  const { theme } = useArenaTheme()
  const ref = useScrollAnimation<HTMLDivElement>()
  const animClass = index % 2 === 0 ? 'animate-fade-left' : 'animate-fade-right'

  return (
    <div
      ref={ref}
      className={`${style.card} ${animClass}`}
      style={{
        borderColor: `${theme.accentColor}33`,
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className={style.cardHeader}>
        <h3 className={style.company}>{experience.company.toUpperCase()}</h3>
        <span className={style.period}>{experience.period}</span>
      </div>
      <p className={style.role} style={{ color: theme.accentColor }}>
        {experience.role}
      </p>
      <ul className={style.highlights}>
        {experience.highlights.map((highlight, i) => (
          <li key={i} className={style.highlight}>
            <span className={style.bullet} style={{ color: theme.accentColor }}>▸</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ExperienceSection() {
  const { theme } = useArenaTheme()

  return (
    <section className={style.section}>
      <p className={style.sectionLabel} style={{ color: theme.accentColor }}>
        EXPERIENCE
      </p>
      {EXPERIENCES.map((exp, i) => (
        <ExperienceCard key={exp.company} experience={exp} index={i} />
      ))}
    </section>
  )
}

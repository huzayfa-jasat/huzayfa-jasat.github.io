import { useArenaTheme } from '../../context/ArenaThemeContext'
import { PROJECTS } from '../../data/content'
import { useScrollAnimation } from './useScrollAnimation'
import style from './ProjectsSection.module.css'

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { theme } = useArenaTheme()
  const ref = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`${style.card} animate-fade-up`}
      style={{
        borderColor: `${theme.accentColor}33`,
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <h3 className={style.projectName}>{project.name}</h3>
      <p className={style.tagline} style={{ color: theme.accentColor }}>
        {project.tagline}
      </p>
      <p className={style.description}>{project.description}</p>
      <div className={style.tags}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={style.tag}
            style={{
              color: theme.accentColor,
              background: `${theme.accentColor}12`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className={style.links}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            style={{
              color: theme.accentColor,
              borderColor: `${theme.accentColor}44`,
            }}
          >
            GitHub ↗
          </a>
        )}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            style={{
              color: theme.accentColor,
              borderColor: `${theme.accentColor}44`,
            }}
          >
            Live ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const { theme } = useArenaTheme()
  const bannerRef = useScrollAnimation<HTMLDivElement>()

  return (
    <section className={style.section}>
      <div ref={bannerRef} className={`${style.banner} animate-fade-up`}>
        <div className={style.bannerLine} style={{ background: theme.accentColor }} />
        <h2 className={style.bannerTitle} style={{ color: theme.accentColor }}>
          PROJECTS
        </h2>
        <div className={style.bannerLine} style={{ background: theme.accentColor }} />
      </div>
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </section>
  )
}

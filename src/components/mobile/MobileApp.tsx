import { useArenaTheme } from '../../context/ArenaThemeContext'
import HeroSection from './HeroSection'
import ScoutingSection from './ScoutingSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import ArenaSection from './ArenaSection'
import style from './MobileApp.module.css'

export default function MobileApp() {
  const { theme } = useArenaTheme()

  return (
    <div
      className={style.container}
      style={{ '--accent': theme.accentColor } as React.CSSProperties}
    >
      <HeroSection />
      <ScoutingSection />
      <ExperienceSection />
      <ProjectsSection />
      <ArenaSection />
    </div>
  )
}

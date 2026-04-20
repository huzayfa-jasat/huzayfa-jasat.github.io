import { useEffect } from 'react'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import HeroSection from './HeroSection'
import ScoutingSection from './ScoutingSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import ArenaSection from './ArenaSection'
import style from './MobileApp.module.css'

export default function MobileApp() {
  const { theme } = useArenaTheme()

  useEffect(() => {
    const prevent = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault()
    }
    document.addEventListener('touchmove', prevent, { passive: false })
    return () => document.removeEventListener('touchmove', prevent)
  }, [])

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

import { Suspense, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { ArenaThemeProvider } from './context/ArenaThemeContext'
import TunnelScene from './components/TunnelScene'
import PostProcessing from './components/PostProcessing'
import ArenaToggle from './components/ui/ArenaToggle'
import NameOverlay from './components/ui/NameOverlay'
import ScrollPrompt from './components/ui/ScrollPrompt'
import LoadingScreen from './components/ui/LoadingScreen'
import SectionNav from './components/ui/SectionNav'
import { scrollToSection, unfocusPanel } from './components/ScrollCamera'
import { SECTIONS } from './hooks/useSectionNav'
import { getScrollProgress } from './hooks/useScrollStore'
import { useIsMobile } from './hooks/useIsMobile'
import MobileApp from './components/mobile/MobileApp'

export default function App() {
  const isMobile = useIsMobile()
  const handleNavigate = useCallback((progress: number) => {
    scrollToSection(progress)
  }, [])

  useEffect(() => {
    if (isMobile) return

    function handleKeyDown(e: KeyboardEvent) {
      const current = getScrollProgress()
      const currentIdx = SECTIONS.findIndex((_, i) =>
        i === SECTIONS.length - 1 || current < (SECTIONS[i].progress + SECTIONS[i + 1].progress) / 2
          ? current >= SECTIONS[i].progress - 0.05 || i === 0
          : false
      )

      if (e.key === 'Escape') {
        unfocusPanel()
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        const nextIdx = Math.min(currentIdx + 1, SECTIONS.length - 1)
        scrollToSection(SECTIONS[nextIdx].progress)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prevIdx = Math.max(currentIdx - 1, 0)
        scrollToSection(SECTIONS[prevIdx].progress)
      } else if (e.key >= '1' && e.key <= '5') {
        e.preventDefault()
        const idx = parseInt(e.key) - 1
        if (idx < SECTIONS.length) scrollToSection(SECTIONS[idx].progress)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobile])

  if (isMobile) {
    return (
      <ArenaThemeProvider>
        <MobileApp />
      </ArenaThemeProvider>
    )
  }

  return (
    <ArenaThemeProvider>
      <ArenaToggle />
      <NameOverlay />
      <ScrollPrompt />
      <SectionNav onNavigate={handleNavigate} />
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 1.6, 2], fov: 75, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={['#000']} />
          <Suspense fallback={<LoadingScreen />}>
            <TunnelScene />
            <PostProcessing />
          </Suspense>
        </Canvas>
      </div>
    </ArenaThemeProvider>
  )
}
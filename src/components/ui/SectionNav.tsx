import { useState } from 'react'
import { useScrollProgress } from '../../hooks/useScrollStore'
import { SECTIONS, getSectionForProgress } from '../../hooks/useSectionNav'
import { useArenaTheme } from '../../context/ArenaThemeContext'

interface SectionNavProps {
  onNavigate: (progress: number) => void
}

export default function SectionNav({ onNavigate }: SectionNavProps) {
  const progress = useScrollProgress()
  const activeSection = getSectionForProgress(progress)
  const { theme } = useArenaTheme()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <nav
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 0,
        zIndex: 50,
      }}
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeSection
        const isHovered = section.id === hoveredId
        const showLabel = isHovered || isActive
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.progress)}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 0',
              minWidth: 120,
            }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10,
                letterSpacing: '0.1em',
                color: isActive ? theme.accentColor : 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                opacity: showLabel ? 1 : 0,
                transform: showLabel ? 'translateX(0)' : 'translateX(6px)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {section.label}
            </span>

            {/* Dot + line connector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  borderRadius: '50%',
                  background: isActive ? theme.accentColor : 'rgba(255,255,255,0.25)',
                  border: isActive ? `1px solid ${theme.accentColor}` : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: isActive ? `0 0 10px ${theme.accentColor}, 0 0 20px ${theme.accentColor}44` : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
          </button>
        )
      })}
    </nav>
  )
}

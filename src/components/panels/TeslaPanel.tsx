import { Text } from '@react-three/drei'
import PanelScreen from './PanelScreen'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import type { Experience } from '../../data/content'

const PANEL_WIDTH = 4
const PANEL_HEIGHT = 2.8

interface ExperiencePanelProps {
  experience: Experience
  position: [number, number, number]
  rotation: [number, number, number]
}

export default function ExperiencePanel({ experience, position, rotation }: ExperiencePanelProps) {
  const { theme } = useArenaTheme()

  return (
    <PanelScreen
      width={PANEL_WIDTH}
      height={PANEL_HEIGHT}
      position={position}
      rotation={rotation}
    >
      {/* Section label */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 0.2, 0]}
        fontSize={0.1}
        color={theme.accentColor}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.2}
      >
        EXPERIENCE
      </Text>

      {/* Company name */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 0.55, 0]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {experience.company.toUpperCase()}
      </Text>

      {/* Role */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 0.9, 0]}
        fontSize={0.11}
        color={theme.accentColor}
        anchorX="left"
        anchorY="middle"
        maxWidth={PANEL_WIDTH * 0.6}
      >
        {experience.role}
      </Text>

      {/* Period */}
      <Text
        position={[PANEL_WIDTH / 2 - 0.3, PANEL_HEIGHT / 2 - 0.9, 0]}
        fontSize={0.09}
        color="rgba(255,255,255,0.5)"
        anchorX="right"
        anchorY="middle"
      >
        {experience.period}
      </Text>

      {/* Highlight bullets */}
      {experience.highlights.map((highlight, i) => (
        <group key={i} position={[-PANEL_WIDTH / 2 + 0.3, -0.15 - i * 0.28, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.065}
            color={theme.accentColor}
            anchorX="left"
            anchorY="top"
          >
            ▸
          </Text>
          <Text
            position={[0.12, 0, 0]}
            fontSize={0.065}
            color="rgba(255,255,255,0.8)"
            anchorX="left"
            anchorY="top"
            maxWidth={PANEL_WIDTH - 0.8}
            lineHeight={1.4}
          >
            {highlight}
          </Text>
        </group>
      ))}
    </PanelScreen>
  )
}

import { useCallback } from 'react'
import { Text } from '@react-three/drei'
import { type ThreeEvent } from '@react-three/fiber'
import PanelScreen from './PanelScreen'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import type { Project } from '../../data/content'

const PANEL_WIDTH = 3.5
const PANEL_HEIGHT = 2.4

interface ProjectPanelProps {
  project: Project
  position: [number, number, number]
  rotation: [number, number, number]
}

function layoutTags(tags: string[], maxWidth: number) {
  const rows: { tag: string; x: number; row: number }[] = []
  let currentX = 0
  let currentRow = 0
  const gap = 0.12

  for (const tag of tags) {
    const tagWidth = tag.length * 0.055 + 0.18
    if (currentX + tagWidth > maxWidth && currentX > 0) {
      currentRow++
      currentX = 0
    }
    rows.push({ tag, x: currentX + tagWidth / 2, row: currentRow })
    currentX += tagWidth + gap
  }
  return rows
}

export default function ProjectPanel({ project, position, rotation }: ProjectPanelProps) {
  const { theme } = useArenaTheme()
  const tags = layoutTags(project.tags, PANEL_WIDTH - 0.6)

  const handleGithubClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer')
    }
  }, [project.github])

  const handleWebsiteClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (project.website) {
      window.open(project.website, '_blank', 'noopener,noreferrer')
    }
  }, [project.website])

  return (
    <PanelScreen
      width={PANEL_WIDTH}
      height={PANEL_HEIGHT}
      position={position}
      rotation={rotation}
    >
      {/* Project name */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 0.3, 0]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={PANEL_WIDTH - 0.6}
      >
        {project.name}
      </Text>

      {/* GitHub link */}
      {project.github && (
        <group
          position={[PANEL_WIDTH / 2 - 0.55, PANEL_HEIGHT / 2 - 0.65, 0.05]}
          onClick={handleGithubClick}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = '' }}
        >
          <mesh>
            <planeGeometry args={[0.8, 0.22]} />
            <meshBasicMaterial color={theme.accentColor} transparent opacity={0.1} depthWrite={false} />
          </mesh>
          <Text
            fontSize={0.065}
            color={theme.accentColor}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            GITHUB ↗
          </Text>
        </group>
      )}

      {/* Website link */}
      {project.website && (
        <group
          position={[PANEL_WIDTH / 2 - 1.40, PANEL_HEIGHT / 2 - 0.65, 0.05]}
          onClick={handleWebsiteClick}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = '' }}
        >
          <mesh>
            <planeGeometry args={[0.8, 0.22]} />
            <meshBasicMaterial color={theme.accentColor} transparent opacity={0.1} depthWrite={false} />
          </mesh>
          <Text
            fontSize={0.065}
            color={theme.accentColor}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            🌐 WEBSITE ↗
          </Text>
        </group>
      )}

      {/* Tagline */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 0.65, 0]}
        fontSize={0.09}
        color={theme.accentColor}
        anchorX="left"
        anchorY="middle"
        maxWidth={PANEL_WIDTH - 0.6}
      >
        {project.tagline}
      </Text>

      {/* Divider */}
      <mesh position={[0, PANEL_HEIGHT / 2 - 0.85, 0]}>
        <planeGeometry args={[PANEL_WIDTH - 0.4, 0.003]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.3} />
      </mesh>

      {/* Description */}
      <Text
        position={[-PANEL_WIDTH / 2 + 0.3, PANEL_HEIGHT / 2 - 1.05, 0]}
        fontSize={0.075}
        color="rgba(255,255,255,0.75)"
        anchorX="left"
        anchorY="top"
        maxWidth={PANEL_WIDTH - 0.6}
        lineHeight={1.6}
      >
        {project.description}
      </Text>

      {/* Tech tags — wrapping rows */}
      {tags.map(({ tag, x, row }) => {
        const tagWidth = tag.length * 0.055 + 0.18
        return (
          <group
            key={tag}
            position={[
              -PANEL_WIDTH / 2 + 0.3 + x,
              -PANEL_HEIGHT / 2 + 0.55 - row * 0.26,
              0.01,
            ]}
          >
            <mesh>
              <planeGeometry args={[tagWidth, 0.18]} />
              <meshBasicMaterial
                color={theme.accentColor}
                transparent
                opacity={0.12}
              />
            </mesh>
            <Text
              fontSize={0.055}
              color={theme.accentColor}
              anchorX="center"
              anchorY="middle"
            >
              {tag}
            </Text>
          </group>
        )
      })}
    </PanelScreen>
  )
}

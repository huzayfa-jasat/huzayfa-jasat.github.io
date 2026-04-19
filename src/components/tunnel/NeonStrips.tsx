import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { TUNNEL_LENGTH } from '../ScrollCamera'
import { TUNNEL_WIDTH } from './TunnelGeometry'

const STRIP_HEIGHT = 0.08
const STRIP_POSITIONS_Y = [0.3, 3.5, 6.7]

export default function NeonStrips() {
  const { theme } = useArenaTheme()
  const groupRef = useRef<THREE.Group>(null)
  const targetColor = new THREE.Color(theme.accentColor)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshBasicMaterial
        mat.color.lerp(targetColor, 0.05)
        const pulse = Math.sin(state.clock.elapsedTime * 2 + child.position.z * 0.1) * 0.15 + 0.85
        mat.opacity = pulse
      }
    })
  })

  const strips: React.JSX.Element[] = []

  STRIP_POSITIONS_Y.forEach((y, yi) => {
    strips.push(
      <mesh
        key={`left-${yi}`}
        position={[-TUNNEL_WIDTH / 2 + 0.01, y, -TUNNEL_LENGTH / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[TUNNEL_LENGTH, STRIP_HEIGHT]} />
        <meshBasicMaterial
          color={theme.accentColor}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
    strips.push(
      <mesh
        key={`right-${yi}`}
        position={[TUNNEL_WIDTH / 2 - 0.01, y, -TUNNEL_LENGTH / 2]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[TUNNEL_LENGTH, STRIP_HEIGHT]} />
        <meshBasicMaterial
          color={theme.accentColor}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  })

  const glowLights = Array.from({ length: 8 }, (_, i) => {
    const z = -i * (TUNNEL_LENGTH / 8) - 3
    return (
      <group key={`glow-${i}`}>
        <pointLight
          position={[-TUNNEL_WIDTH / 2 + 0.5, STRIP_POSITIONS_Y[1], z]}
          color={theme.accentColor}
          intensity={0.3}
          distance={5}
        />
        <pointLight
          position={[TUNNEL_WIDTH / 2 - 0.5, STRIP_POSITIONS_Y[1], z]}
          color={theme.accentColor}
          intensity={0.3}
          distance={5}
        />
      </group>
    )
  })

  return (
    <group ref={groupRef}>
      {strips}
      {glowLights}
    </group>
  )
}

import { type ReactNode, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'

interface PanelScreenProps {
  width: number
  height: number
  position: [number, number, number]
  rotation?: [number, number, number]
  children: ReactNode
}

export default function PanelScreen({
  width,
  height,
  position,
  rotation = [0, 0, 0],
  children,
}: PanelScreenProps) {
  const { theme } = useArenaTheme()
  const borderRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (borderRef.current) {
      const mat = borderRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Recessed backing */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.15]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.3} />
      </mesh>

      {/* Screen surface */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#050510" />
      </mesh>

      {/* Border glow */}
      <mesh ref={borderRef} position={[0, 0, 0.005]}>
        <planeGeometry args={[width + 0.06, height + 0.06]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.4} />
      </mesh>

      {/* Panel content */}
      <group position={[0, 0, 0.02]}>
        {children}
      </group>
    </group>
  )
}

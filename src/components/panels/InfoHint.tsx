import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'

interface InfoHintProps {
  position: [number, number, number]
  text?: string
}

export default function InfoHint({ position, text = 'CLICK EACH PANEL FOR MORE INFO' }: InfoHintProps) {
  const { theme } = useArenaTheme()
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.35
    }
  })

  return (
    <group position={position}>
      {/* Small screen backing */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.8, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.3} />
      </mesh>

      {/* Border glow */}
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.86, 0.46]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.3} />
      </mesh>

      {/* Screen surface */}
      <mesh>
        <planeGeometry args={[2.8, 0.4]} />
        <meshBasicMaterial color="#050510" />
      </mesh>

      {/* Text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.1}
        color={theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {text}
      </Text>
    </group>
  )
}

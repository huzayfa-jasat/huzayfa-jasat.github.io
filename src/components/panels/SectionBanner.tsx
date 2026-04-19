import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'

interface SectionBannerProps {
  position: [number, number, number]
  text: string
}

export default function SectionBanner({ position, text }: SectionBannerProps) {
  const { theme } = useArenaTheme()
  const leftLineRef = useRef<THREE.Mesh>(null)
  const rightLineRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 0.5
    if (leftLineRef.current) {
      const mat = leftLineRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulse
    }
    if (rightLineRef.current) {
      const mat = rightLineRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulse
    }
  })

  const lineWidth = 2.5
  const textGap = 0.3

  return (
    <group position={position}>
      {/* Left line */}
      <mesh ref={leftLineRef} position={[-(lineWidth / 2 + textGap + 1), 0, 0]}>
        <planeGeometry args={[lineWidth, 0.008]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.5} />
      </mesh>

      {/* Right line */}
      <mesh ref={rightLineRef} position={[(lineWidth / 2 + textGap + 1), 0, 0]}>
        <planeGeometry args={[lineWidth, 0.008]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.5} />
      </mesh>

      {/* Text */}
      <Text
        fontSize={0.18}
        color={theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.25}
        material-alphaTest={0.5}
      >
        {text}
      </Text>
    </group>
  )
}

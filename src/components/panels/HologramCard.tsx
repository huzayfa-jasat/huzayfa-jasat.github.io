import { useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { PROFILE } from '../../data/content'
import './HologramMaterial'

const CARD_WIDTH = 3.2
const CARD_HEIGHT = 4.6
const CARD_Z = -8

export default function HologramCard() {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<any>(null)
  const { theme } = useArenaTheme()
  const [isDragging, setIsDragging] = useState(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const targetColor = new THREE.Color(theme.accentColor)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
      materialRef.current.uColor.lerp(targetColor, 0.05)
    }
    if (groupRef.current && !isDragging) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15,
        0.02
      )
    }
  })

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsDragging(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !groupRef.current) return
    const dx = (e.clientX - lastPointer.current.x) * 0.01
    const dy = (e.clientY - lastPointer.current.y) * 0.01
    groupRef.current.rotation.y += dx
    groupRef.current.rotation.x = THREE.MathUtils.clamp(
      groupRef.current.rotation.x + dy, -0.5, 0.5
    )
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = () => setIsDragging(false)

  return (
    <group
      ref={groupRef}
      position={[0, 2, CARD_Z]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Card border outline */}
      <mesh>
        <planeGeometry args={[CARD_WIDTH + 0.06, CARD_HEIGHT + 0.06]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <meshBasicMaterial color="#050510" transparent opacity={0.85} />
      </mesh>

      {/* Header: SCOUTING REPORT */}
      <Text
        position={[0, CARD_HEIGHT / 2 - 0.3, 0.02]}
        fontSize={0.14}
        color={theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        SCOUTING REPORT
      </Text>

      {/* Name */}
      <Text
        position={[0, CARD_HEIGHT / 2 - 0.65, 0.02]}
        fontSize={0.26}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {PROFILE.name.toUpperCase()}
      </Text>

      {/* Title */}
      <Text
        position={[0, CARD_HEIGHT / 2 - 0.95, 0.02]}
        fontSize={0.12}
        color={theme.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        {PROFILE.title.toUpperCase()}
      </Text>

      {/* Divider line */}
      <mesh position={[0, CARD_HEIGHT / 2 - 1.15, 0.02]}>
        <planeGeometry args={[CARD_WIDTH - 0.4, 0.005]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.4} />
      </mesh>

      {/* Overall rating — large number */}
      <Text
        position={[0, CARD_HEIGHT / 2 - 1.55, 0.02]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {PROFILE.overall.toString()}
      </Text>

      <Text
        position={[0, CARD_HEIGHT / 2 - 1.9, 0.02]}
        fontSize={0.09}
        color="rgba(255,255,255,0.5)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
      >
        OVERALL
      </Text>

      {/* Detail rows */}
      {PROFILE.details.map((detail, i) => {
        const y = CARD_HEIGHT / 2 - 2.3 - i * 0.32
        return (
          <group key={detail.label} position={[-CARD_WIDTH / 2 + 0.3, y, 0.12]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.08}
              color={theme.accentColor}
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.12}
              material-alphaTest={0.5}
            >
              {detail.label.toUpperCase()}
            </Text>
            <Text
              position={[0, -0.15, 0]}
              fontSize={0.1}
              color="rgba(255,255,255,0.85)"
              anchorX="left"
              anchorY="middle"
              material-alphaTest={0.5}
            >
              {detail.value}
            </Text>
          </group>
        )
      })}

      {/* Glow light */}
      <pointLight
        position={[0, 0, 0.5]}
        color={theme.accentColor}
        intensity={0.2}
        distance={2}
      />
    </group>
  )
}

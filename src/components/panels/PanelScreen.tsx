import { type ReactNode, useRef, useCallback } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { focusPanel, unfocusPanel, isFocused } from '../ScrollCamera'

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
  const isHovered = useRef(false)
  const hoverScale = useRef(1)
  const hoverGlow = useRef(0)

  useFrame((state) => {
    const targetScale = isHovered.current ? 1.03 : 1
    const targetGlow = isHovered.current ? 0.8 : 0
    hoverScale.current = THREE.MathUtils.lerp(hoverScale.current, targetScale, 0.1)
    hoverGlow.current = THREE.MathUtils.lerp(hoverGlow.current, targetGlow, 0.1)

    if (groupRef.current) {
      groupRef.current.scale.setScalar(hoverScale.current)
    }
    if (borderRef.current) {
      const mat = borderRef.current.material as THREE.MeshBasicMaterial
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 0.5
      mat.opacity = pulse + hoverGlow.current
    }
  })

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    if (isFocused()) {
      unfocusPanel()
      return
    }

    if (!groupRef.current) return

    const worldPos = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPos)

    const worldQuat = new THREE.Quaternion()
    groupRef.current.getWorldQuaternion(worldQuat)
    const euler = new THREE.Euler().setFromQuaternion(worldQuat)
    const ry = euler.y

    const normalX = Math.sin(ry)
    const normalZ = Math.cos(ry)
    const dist = 3

    const cameraPos: [number, number, number] = [
      worldPos.x + normalX * dist,
      worldPos.y,
      worldPos.z + normalZ * dist,
    ]
    const lookAt: [number, number, number] = [worldPos.x, worldPos.y, worldPos.z]

    focusPanel(cameraPos, lookAt)
  }, [])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Clickable area */}
      <mesh
        position={[0, 0, 0.03]}
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; isHovered.current = true }}
        onPointerOut={() => { document.body.style.cursor = ''; isHovered.current = false }}
      >
        <planeGeometry args={[width + 0.2, height + 0.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

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

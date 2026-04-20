import { useRef, type ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface SlidingPanelProps {
  wallX: number
  wallRotationY: number
  y: number
  z: number
  children: ReactNode
}

const APPROACH_START = 14
const APPROACH_END = 5
const DEPART_START = -2
const DEPART_END = -8

function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t))
  return clamped * clamped * (3 - 2 * clamped)
}

export default function SlidingPanel({ wallX, wallRotationY, y, z, children }: SlidingPanelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (!groupRef.current) return

    const dz = camera.position.z - z

    let t = 0
    if (dz > APPROACH_START) {
      t = 0
    } else if (dz > APPROACH_END) {
      t = smoothstep(1 - (dz - APPROACH_END) / (APPROACH_START - APPROACH_END))
    } else if (dz > DEPART_START) {
      t = 1
    } else if (dz > DEPART_END) {
      t = smoothstep((dz - DEPART_END) / (DEPART_START - DEPART_END))
    } else {
      t = 0
    }

    const x = THREE.MathUtils.lerp(wallX, 0, t)
    const rotY = THREE.MathUtils.lerp(wallRotationY, 0, t)

    groupRef.current.position.set(x, y, z)
    groupRef.current.rotation.set(0, rotY, 0)
  })

  return (
    <group ref={groupRef} position={[wallX, y, z]} rotation={[0, wallRotationY, 0]}>
      {children}
    </group>
  )
}

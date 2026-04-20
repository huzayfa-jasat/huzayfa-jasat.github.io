import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { SPORT_CONFIGS } from '../../data/sportConfigs'
import { isHoveringUI } from '../../hooks/useMinigameStore'
import { TUNNEL_LENGTH } from '../ScrollCamera'

const raycaster = new THREE.Raycaster()
const aimPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const intersectPoint = new THREE.Vector3()
const ARENA_Z = -TUNNEL_LENGTH - 20

export default function Crosshair() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef(new THREE.Vector2())
  const { camera, gl } = useThree()
  const { themeKey, theme } = useArenaTheme()
  const config = SPORT_CONFIGS[themeKey]

  useEffect(() => {
    const handler = gl.domElement
    const onPointerMove = (e: PointerEvent) => {
      const rect = handler.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [gl])

  useFrame(() => {
    if (!groupRef.current) return
    if (isHoveringUI()) {
      groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true
    raycaster.setFromCamera(mouseRef.current, camera)
    const worldTargetZ = ARENA_Z + config.target.position[2]
    aimPlane.constant = -worldTargetZ
    if (raycaster.ray.intersectPlane(aimPlane, intersectPoint)) {
      groupRef.current.position.set(
        intersectPoint.x,
        intersectPoint.y,
        intersectPoint.z - ARENA_Z
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Horizontal bar */}
      <mesh>
        <planeGeometry args={[1.2, 0.04]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.9} depthWrite={false} depthTest={false} />
      </mesh>
      {/* Vertical bar */}
      <mesh>
        <planeGeometry args={[0.04, 1.2]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.9} depthWrite={false} depthTest={false} />
      </mesh>
      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color={theme.accentColor} depthWrite={false} depthTest={false} />
      </mesh>
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[0.25, 0.3, 32]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.6} depthWrite={false} depthTest={false} />
      </mesh>
    </group>
  )
}

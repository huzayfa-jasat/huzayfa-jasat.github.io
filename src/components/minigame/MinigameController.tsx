import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'
import Crosshair from './Crosshair'
import Target from './Target'
import Projectile from './Projectile'
import { useMinigameState, launchProjectile, getMinigameState } from '../../hooks/useMinigameStore'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { SPORT_CONFIGS } from '../../data/sportConfigs'
import { TUNNEL_LENGTH } from '../ScrollCamera'

const raycaster = new THREE.Raycaster()
const aimPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const intersectPoint = new THREE.Vector3()
const ARENA_Z = -TUNNEL_LENGTH - 20

export default function MinigameController() {
  const { active, phase } = useMinigameState()
  const { camera, gl } = useThree()
  const mouseRef = useRef(new THREE.Vector2())
  const aimRef = useRef(new THREE.Vector3())
  const { themeKey } = useArenaTheme()
  const config = SPORT_CONFIGS[themeKey]

  useEffect(() => {
    const handler = gl.domElement

    const onPointerMove = (e: PointerEvent) => {
      const rect = handler.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return
      const state = getMinigameState()
      if (!state.active || state.phase !== 'aiming') return

      raycaster.setFromCamera(mouseRef.current, camera)
      const worldTargetZ = ARENA_Z + config.target.position[2]
      aimPlane.constant = -worldTargetZ
      if (raycaster.ray.intersectPlane(aimPlane, intersectPoint)) {
        aimRef.current.set(
          intersectPoint.x,
          intersectPoint.y,
          intersectPoint.z - ARENA_Z
        )
      }

      launchProjectile()
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('click', onClick)
    }
  }, [gl, camera, config])

  if (!active) return null

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Target />
      {phase === 'aiming' && <Crosshair />}
      {phase === 'launched' && <Projectile aimTarget={aimRef.current.clone()} />}
    </Physics>
  )
}

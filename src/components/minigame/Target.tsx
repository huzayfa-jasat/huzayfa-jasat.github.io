import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { SPORT_CONFIGS } from '../../data/sportConfigs'
import { useMinigameState, setTargetWorldPos } from '../../hooks/useMinigameStore'
import HockeyNet from './targets/HockeyNet'
import BasketballHoop from './targets/BasketballHoop'
import SoccerGoal from './targets/SoccerGoal'
import FootballGoal from './targets/FootballTire'
import StrikeZone from './targets/StrikeZone'
import type { ArenaThemeKey } from '../../data/themes'

const TARGET_MESHES: Record<ArenaThemeKey, React.FC> = {
  Hockey: HockeyNet,
  Basketball: BasketballHoop,
  Soccer: SoccerGoal,
  Football: FootballGoal,
  Baseball: StrikeZone,
}

const SWAY_RANGE = 2.5
const SWAY_SPEED = 1.2
const _worldPos = new THREE.Vector3()

export default function Target() {
  const { themeKey } = useArenaTheme()
  const config = SPORT_CONFIGS[themeKey]
  const TargetMesh = TARGET_MESHES[themeKey]
  const groupRef = useRef<THREE.Group>(null)
  const frozenX = useRef<number | null>(null)
  const { phase } = useMinigameState()

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    if (phase === 'aiming') {
      frozenX.current = null
      groupRef.current.position.x = Math.sin(clock.getElapsedTime() * SWAY_SPEED) * SWAY_RANGE
    } else if (frozenX.current === null) {
      frozenX.current = groupRef.current.position.x
    }

    groupRef.current.getWorldPosition(_worldPos)
    const off = config.target.sensorOffset
    setTargetWorldPos(_worldPos.x + off[0], _worldPos.y + off[1], _worldPos.z + off[2])
  })

  return (
    <group ref={groupRef} position={config.target.position}>
      <TargetMesh />
    </group>
  )
}

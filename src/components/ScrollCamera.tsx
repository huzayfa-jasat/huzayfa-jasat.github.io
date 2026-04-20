import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { setScrollProgress } from '../hooks/useScrollStore'
import { getMinigameState } from '../hooks/useMinigameStore'
import { SPORT_CONFIGS } from '../data/sportConfigs'
import { useArenaTheme } from '../context/ArenaThemeContext'

const TUNNEL_LENGTH = 95
const CAMERA_Y = 1.6
const CAMERA_START_Z = 2
const CAMERA_END_Z = -TUNNEL_LENGTH + 5

let _scrollToTarget: number | null = null
export function scrollToSection(progress: number) {
  _scrollToTarget = progress
}

interface FocusTarget {
  cameraPos: THREE.Vector3
  lookAt: THREE.Vector3
}

let _focusTarget: FocusTarget | null = null
let _isFocused = false
const _focusListeners = new Set<() => void>()

export function focusPanel(cameraPos: [number, number, number], lookAt: [number, number, number]) {
  _focusTarget = {
    cameraPos: new THREE.Vector3(...cameraPos),
    lookAt: new THREE.Vector3(...lookAt),
  }
  _isFocused = true
  _focusListeners.forEach(fn => fn())
}

export function unfocusPanel() {
  _focusTarget = null
  _isFocused = false
  _focusListeners.forEach(fn => fn())
}

export function isFocused() {
  return _isFocused
}

export function onFocusChange(cb: () => void) {
  _focusListeners.add(cb)
  return () => _focusListeners.delete(cb)
}

const ARENA_Z = -TUNNEL_LENGTH - 20

export default function ScrollCamera() {
  const scroll = useScroll()
  const { camera } = useThree()
  const { themeKey } = useArenaTheme()
  const targetZ = useRef(CAMERA_START_Z)
  const currentLookAt = useRef(new THREE.Vector3(0, CAMERA_Y, -10))

  useFrame(() => {
    if (_scrollToTarget !== null) {
      scroll.el.scrollTop = _scrollToTarget * scroll.el.scrollHeight
      _scrollToTarget = null
    }

    const offset = scroll.offset
    setScrollProgress(offset)

    const minigame = getMinigameState()

    if (minigame.active && scroll.el.style.overflow !== 'hidden') {
      scroll.el.style.overflow = 'hidden'
      scroll.el.style.pointerEvents = 'none'
    } else if (!minigame.active && scroll.el.style.overflow === 'hidden') {
      scroll.el.style.overflow = ''
      scroll.el.style.pointerEvents = ''
    }

    if (_focusTarget) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, _focusTarget.cameraPos.x, 0.08)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, _focusTarget.cameraPos.y, 0.08)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, _focusTarget.cameraPos.z, 0.08)
      currentLookAt.current.lerp(_focusTarget.lookAt, 0.08)
      camera.lookAt(currentLookAt.current)
    } else if (minigame.active) {
      const config = SPORT_CONFIGS[themeKey]
      const gamePos = new THREE.Vector3(
        0,
        CAMERA_Y,
        ARENA_Z + config.launch.origin[2] + 3
      )
      const gameLook = new THREE.Vector3(
        0,
        config.target.position[1],
        ARENA_Z + config.target.position[2]
      )
      camera.position.lerp(gamePos, 0.05)
      currentLookAt.current.lerp(gameLook, 0.05)
      camera.lookAt(currentLookAt.current)
    } else {
      targetZ.current = THREE.MathUtils.lerp(CAMERA_START_Z, CAMERA_END_Z, offset)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, CAMERA_Y, 0.1)
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1)
      const forwardLook = new THREE.Vector3(0, CAMERA_Y, camera.position.z - 10)
      currentLookAt.current.lerp(forwardLook, 0.1)
      camera.lookAt(currentLookAt.current)
    }
  })

  return null
}

export { TUNNEL_LENGTH, CAMERA_Y }

import { useSyncExternalStore } from 'react'

type GamePhase = 'idle' | 'aiming' | 'launched' | 'scored' | 'missed'

interface MinigameState {
  active: boolean
  phase: GamePhase
  score: number
  attempts: number
}

let _state: MinigameState = {
  active: false,
  phase: 'idle',
  score: 0,
  attempts: 0,
}

const _listeners = new Set<() => void>()

function notify() {
  _listeners.forEach(fn => fn())
}

export function getMinigameState() {
  return _state
}

export function startMinigame() {
  _state = { active: true, phase: 'aiming', score: 0, attempts: 0 }
  notify()
}

export function exitMinigame() {
  _state = { active: false, phase: 'idle', score: 0, attempts: 0 }
  notify()
}

export function launchProjectile() {
  _state = { ..._state, phase: 'launched', attempts: _state.attempts + 1 }
  notify()
}

export function recordScore() {
  _state = { ..._state, phase: 'scored', score: _state.score + 1 }
  notify()
}

export function recordMiss() {
  _state = { ..._state, phase: 'missed' }
  notify()
}

export function resetAim() {
  _state = { ..._state, phase: 'aiming' }
  notify()
}

let _hoveringUI = false
export function setHoveringUI(v: boolean) { _hoveringUI = v }
export function isHoveringUI() { return _hoveringUI }

const _targetWorldPos = { x: 0, y: 0, z: 0 }
export function setTargetWorldPos(x: number, y: number, z: number) {
  _targetWorldPos.x = x
  _targetWorldPos.y = y
  _targetWorldPos.z = z
}
export function getTargetWorldPos() { return _targetWorldPos }

export function useMinigameState() {
  return useSyncExternalStore(
    (cb) => {
      _listeners.add(cb)
      return () => _listeners.delete(cb)
    },
    () => _state
  )
}

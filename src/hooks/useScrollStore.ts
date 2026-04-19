import { useSyncExternalStore } from 'react'

let _progress = 0
const _listeners = new Set<() => void>()

export function getScrollProgress() {
  return _progress
}

export function setScrollProgress(p: number) {
  const rounded = Math.round(p * 100) / 100
  if (rounded === _progress) return
  _progress = rounded
  _listeners.forEach(fn => fn())
}

export function useScrollProgress() {
  return useSyncExternalStore(
    (cb) => {
      _listeners.add(cb)
      return () => _listeners.delete(cb)
    },
    () => _progress
  )
}

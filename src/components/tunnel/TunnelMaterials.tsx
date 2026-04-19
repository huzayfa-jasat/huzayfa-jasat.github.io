import { useMemo } from 'react'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'

function createNoiseTexture(
  baseColor: [number, number, number],
  noiseAmount: number,
  size = 512
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = `rgb(${baseColor[0]},${baseColor[1]},${baseColor[2]})`
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < size * size * 0.3; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const offset = (Math.random() - 0.5) * noiseAmount
    const r = Math.max(0, Math.min(255, baseColor[0] + offset))
    const g = Math.max(0, Math.min(255, baseColor[1] + offset))
    const b = Math.max(0, Math.min(255, baseColor[2] + offset))
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(x, y, 2, 2)
  }

  for (let i = 0; i < 20; i++) {
    const y = Math.random() * size
    ctx.strokeStyle = `rgba(${baseColor[0] + 15},${baseColor[1] + 15},${baseColor[2] + 15},0.3)`
    ctx.lineWidth = Math.random() * 2 + 0.5
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y + (Math.random() - 0.5) * 10)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return texture
}

export function useWallTexture() {
  const { theme } = useArenaTheme()
  return useMemo(() => {
    const color = new THREE.Color(theme.wallTint)
    const r = Math.round(color.r * 255)
    const g = Math.round(color.g * 255)
    const b = Math.round(color.b * 255)
    const tex = createNoiseTexture([r, g, b], 30)
    tex.repeat.set(2, 8)
    return tex
  }, [theme.wallTint])
}

export function useFloorTexture() {
  const { theme } = useArenaTheme()
  return useMemo(() => {
    const color = new THREE.Color(theme.floorColor)
    const r = Math.round(color.r * 255)
    const g = Math.round(color.g * 255)
    const b = Math.round(color.b * 255)
    const tex = createNoiseTexture([r, g, b], 20)
    tex.repeat.set(4, 16)
    return tex
  }, [theme.floorColor])
}

export function useCeilingTexture() {
  return useMemo(() => {
    const tex = createNoiseTexture([15, 15, 18], 15)
    tex.repeat.set(2, 8)
    return tex
  }, [])
}

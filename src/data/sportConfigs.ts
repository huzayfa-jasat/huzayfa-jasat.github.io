import type { ArenaThemeKey } from './themes'

export interface ProjectileConfig {
  shape: 'sphere' | 'cylinder' | 'oval'
  radius: number
  height?: number
  color: string
  mass: number
}

export interface TargetConfig {
  position: [number, number, number]
  sensorSize: [number, number, number]
  sensorOffset: [number, number, number]
}

export interface LaunchConfig {
  origin: [number, number, number]
  power: number
  arc: number
}

export interface SportConfig {
  projectile: ProjectileConfig
  target: TargetConfig
  launch: LaunchConfig
  labels: {
    action: string
    score: string
    miss: string
    instruction: string
  }
}

export const SPORT_CONFIGS: Record<ArenaThemeKey, SportConfig> = {
  Hockey: {
    projectile: { shape: 'cylinder', radius: 0.15, height: 0.05, color: '#111111', mass: 0.5 },
    target: { position: [0, 0.6, -15], sensorSize: [1.8, 1.2, 3], sensorOffset: [0, 0.6, 0] },
    launch: { origin: [0, 0.15, -3], power: 6, arc: 0.02 },
    labels: { action: 'SHOOT', score: 'GOAL!', miss: 'MISS!', instruction: 'AIM AND CLICK TO SHOOT THE PUCK INTO THE NET' },
  },
  Basketball: {
    projectile: { shape: 'sphere', radius: 0.12, color: '#ff6600', mass: 0.6 },
    target: { position: [0, 3.2, -10], sensorSize: [1, 1, 3], sensorOffset: [0, -0.35, 0.4] },
    launch: { origin: [0, 1.2, -2], power: 5, arc: 0.3 },
    labels: { action: 'SHOOT', score: 'SWISH!', miss: 'MISS!', instruction: 'AIM AND CLICK TO SINK THE BALL IN THE HOOP' },
  },
  Soccer: {
    projectile: { shape: 'sphere', radius: 0.11, color: '#ffffff', mass: 0.45 },
    target: { position: [0, 1.22, -20], sensorSize: [7.32, 2.44, 3], sensorOffset: [0, 1.22, 0] },
    launch: { origin: [0, 0.11, -5], power: 6, arc: 0.08 },
    labels: { action: 'KICK', score: 'GOAL!', miss: 'MISS!', instruction: 'AIM AND CLICK TO KICK THE BALL INTO THE NET' },
  },
  Football: {
    projectile: { shape: 'oval', radius: 0.1, color: '#8B4513', mass: 0.4 },
    target: { position: [0, 5, -22], sensorSize: [3, 6, 3], sensorOffset: [0, 3, 0] },
    launch: { origin: [0, 1.5, -5], power: 6, arc: 0.2 },
    labels: { action: 'THROW', score: 'FIELD GOAL!', miss: 'MISS!', instruction: 'AIM AND CLICK TO KICK IT OVER THE CROSSBAR' },
  },
  Baseball: {
    projectile: { shape: 'sphere', radius: 0.037, color: '#ffffff', mass: 0.15 },
    target: { position: [0, 0.9, -12], sensorSize: [1.2, 1.5, 4], sensorOffset: [0, 0, 0] },
    launch: { origin: [0, 1.5, -2], power: 2.5, arc: 0.01 },
    labels: { action: 'PITCH', score: 'STRIKE!', miss: 'BALL!', instruction: 'AIM AND CLICK TO PITCH A STRIKE' },
  },
}

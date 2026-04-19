export type ArenaThemeKey = 'Hockey' | 'Basketball' | 'Baseball' | 'Football' | 'Soccer'

export interface ArenaTheme {
    name: ArenaThemeKey,
    icon: string
    floorColor: string
    wallTint: string
    accentColor: string
    lightIntensity: number
    floorRoughness: number
    floorMetalness: number
    ambientIntensity: number
}

export const ARENA_THEMES: Record<ArenaThemeKey, ArenaTheme> = {
    Hockey: {
        name: 'Hockey',
        icon: '🏒',
        floorColor: '#a8d5e2',
        wallTint: '#1a2a3a',
        accentColor: '#00d4ff',
        lightIntensity: 1.2,
        floorRoughness: 0.1,
        floorMetalness: 0.3,
        ambientIntensity: 0.3,
    },
    Basketball: {
        name: 'Basketball',
        icon: '🏀',
        floorColor: '#8B6914',
        wallTint: '#2a1a0a',
        accentColor: '#ff8c00',
        lightIntensity: 1.0,
        floorRoughness: 0.6,
        floorMetalness: 0.0,
        ambientIntensity: 0.25,
  },
    Soccer: {
        name: 'Soccer',
        icon: '⚽',
        floorColor: '#2d5a1e',
        wallTint: '#0a1a0a',
        accentColor: '#00ff6a',
        lightIntensity: 0.9,
        floorRoughness: 0.8,
        floorMetalness: 0.0,
        ambientIntensity: 0.2,
    },
    Baseball: {
        name: 'Baseball',
        icon: '⚾',
        floorColor: '#8B4513',
        wallTint: '#1a0a00',
        accentColor: '#ff4444',
        lightIntensity: 1.1,
        floorRoughness: 0.9,
        floorMetalness: 0.0,
        ambientIntensity: 0.25,
    },
    Football: {
        name: 'Football',
        icon: '🏈',
        floorColor: '#1a5c1a',
        wallTint: '#0a1a0a',
        accentColor: '#ffd700',
        lightIntensity: 1.1,
        floorRoughness: 0.7,
        floorMetalness: 0.0,
        ambientIntensity: 0.25,
    },
}

export const DEFAULT_THEME: ArenaThemeKey = 'Hockey'

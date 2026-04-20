import { describe, it, expect } from 'vitest'
import { PROFILE, EXPERIENCES, PROJECTS } from '../content'
import { ARENA_THEMES } from '../themes'

describe('Portfolio content', () => {
  it('has complete profile', () => {
    expect(PROFILE.name).toBe('Huzayfa Jasat')
    expect(PROFILE.title).toBe('Software Engineer')
    expect(PROFILE.overall).toBe(99)
    expect(PROFILE.details.length).toBeGreaterThanOrEqual(3)
  })

  it('has Tesla experience', () => {
    expect(EXPERIENCES[0].company).toBe('Tesla')
    expect(EXPERIENCES[0].role).toContain('Software Engineering')
    expect(EXPERIENCES[0].highlights.length).toBeGreaterThanOrEqual(2)
  })

  it('has projects', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(2)
    const nearU = PROJECTS.find(p => p.name === 'NearU')
    const pushBlock = PROJECTS.find(p => p.name === 'PushBlock')
    expect(nearU).toBeDefined()
    expect(pushBlock).toBeDefined()
  })
    
  it('has themes defined', () => {
    expect(Object.keys(ARENA_THEMES)).toHaveLength(5)
    expect(ARENA_THEMES.Hockey).toBeDefined()
    expect(ARENA_THEMES.Basketball).toBeDefined()
    expect(ARENA_THEMES.Soccer).toBeDefined()
    expect(ARENA_THEMES.Baseball).toBeDefined()
    expect(ARENA_THEMES.Football).toBeDefined()
  })
})
export interface Section {
  id: string
  label: string
  progress: number
}

export const SECTIONS: Section[] = [
  { id: 'intro', label: 'Intro', progress: 0 },
  { id: 'stats', label: 'Scouting Report', progress: 0.08 },
  { id: 'experience', label: 'Experience', progress: 0.28 },
  { id: 'projects', label: 'Projects', progress: 0.6 },
  { id: 'arena', label: 'Arena', progress: 0.88 },
]

export function getSectionForProgress(progress: number): string {
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (progress >= SECTIONS[i].progress - 0.05) return SECTIONS[i].id
  }
  return SECTIONS[0].id
}

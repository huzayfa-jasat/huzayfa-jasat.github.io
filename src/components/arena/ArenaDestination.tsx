import { useArenaTheme } from '../../context/ArenaThemeContext'
import { TUNNEL_LENGTH } from '../ScrollCamera'
import { useScrollProgress } from '../../hooks/useScrollStore'
import IceRink from './IceRink'
import BasketballCourt from './BasketballCourt'
import BaseballDiamond from './BaseballDiamond'
import SoccerField from './SoccerField'
import FootballField from './FootballField'
import MinigameController from '../minigame/MinigameController'

const ARENA_COMPONENTS = {
  Hockey: IceRink,
  Basketball: BasketballCourt,
  Baseball: BaseballDiamond,
  Soccer: SoccerField,
  Football: FootballField,
} as const

export default function ArenaDestination() {
  const { themeKey } = useArenaTheme()
  const progress = useScrollProgress()
  const ArenaComponent = ARENA_COMPONENTS[themeKey]

  if (progress < 0.85) return null

  return (
    <group position={[0, 0, -TUNNEL_LENGTH - 20]}>
      <ArenaComponent />
      <MinigameController />
    </group>
  )
}

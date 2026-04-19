import { ScrollControls } from '@react-three/drei'
import ScrollCamera from './ScrollCamera'
import TunnelGeometry from './tunnel/TunnelGeometry'
import TunnelLighting from './tunnel/TunnelLighting'
import NeonStrips from './tunnel/NeonStrips'
import HologramCard from './panels/HologramCard'
import ExperiencePanel from './panels/TeslaPanel'
import ProjectPanel from './panels/ProjectPanel'
import ArenaDestination from './arena/ArenaDestination'
import InfoHint from './panels/InfoHint'
import { EXPERIENCES, PROJECTS } from '../data/content'
import { TUNNEL_WIDTH } from './tunnel/TunnelGeometry'

const EXPERIENCE_START_Z = -18
const EXPERIENCE_SPACING = 8
const PROJECT_Z = -46

export default function TunnelScene() {
  return (
    <ScrollControls pages={7} damping={0.12} eps={0.001}>
      <ScrollCamera />
      <TunnelLighting />
      <TunnelGeometry />
      <NeonStrips />
      <HologramCard />

      {/* Info hint — between scouting card and first experience */}
      <InfoHint position={[0, 2.8, -13]} />

      {/* Experience panels — alternating walls */}
      {EXPERIENCES.map((exp, i) => (
        <ExperiencePanel
          key={exp.company}
          experience={exp}
          position={[
            i % 2 === 0 ? -TUNNEL_WIDTH / 2 + 0.1 : TUNNEL_WIDTH / 2 - 0.1,
            2.2,
            EXPERIENCE_START_Z - i * EXPERIENCE_SPACING,
          ]}
          rotation={[0, i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
        />
      ))}

      {/* Project panels — alternating walls */}
      {PROJECTS.map((project, i) => (
        <ProjectPanel
          key={project.name}
          project={project}
          position={[
            i % 2 === 0 ? -TUNNEL_WIDTH / 2 + 0.1 : TUNNEL_WIDTH / 2 - 0.1,
            2.2,
            PROJECT_Z - i * 6,
          ]}
          rotation={[0, i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
        />
      ))}

      {/* Hint — after projects, before arena */}
      <InfoHint position={[0, 2.8, PROJECT_Z - PROJECTS.length * 6 - 3]} text="SCROLL TO THE END" />

      <ArenaDestination />
    </ScrollControls>
  )
}

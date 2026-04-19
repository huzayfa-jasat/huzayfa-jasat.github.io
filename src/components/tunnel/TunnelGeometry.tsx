import { useArenaTheme } from '../../context/ArenaThemeContext'
import { useWallTexture, useFloorTexture, useCeilingTexture } from './TunnelMaterials'
import { TUNNEL_LENGTH } from '../ScrollCamera'

const TUNNEL_WIDTH = 10
const TUNNEL_HEIGHT = 7
const TUNNEL_CENTER_Z = -TUNNEL_LENGTH / 2

export default function TunnelGeometry() {
  const { theme } = useArenaTheme()
  const wallTexture = useWallTexture()
  const floorTexture = useFloorTexture()
  const ceilingTexture = useCeilingTexture()

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, TUNNEL_CENTER_Z]}>
        <planeGeometry args={[TUNNEL_WIDTH, TUNNEL_LENGTH]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={theme.floorRoughness}
          metalness={theme.floorMetalness}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, TUNNEL_HEIGHT, TUNNEL_CENTER_Z]}>
        <planeGeometry args={[TUNNEL_WIDTH, TUNNEL_LENGTH]} />
        <meshStandardMaterial map={ceilingTexture} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, TUNNEL_CENTER_Z]}>
        <planeGeometry args={[TUNNEL_LENGTH, TUNNEL_HEIGHT]} />
        <meshStandardMaterial map={wallTexture} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, TUNNEL_CENTER_Z]}>
        <planeGeometry args={[TUNNEL_LENGTH, TUNNEL_HEIGHT]} />
        <meshStandardMaterial map={wallTexture} roughness={0.8} metalness={0.2} />
      </mesh>

    </group>
  )
}

export { TUNNEL_WIDTH, TUNNEL_HEIGHT }

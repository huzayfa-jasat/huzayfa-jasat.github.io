import * as THREE from 'three'
import { useArenaTheme } from '../../../context/ArenaThemeContext'

export default function StrikeZone() {
  const { theme } = useArenaTheme()
  return (
    <group>
      <mesh>
        <planeGeometry args={[1.2, 1.5]} />
        <meshBasicMaterial color={theme.accentColor} transparent opacity={0.15} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.2, 1.5)]} />
        <lineBasicMaterial color={theme.accentColor} />
      </lineSegments>
    </group>
  )
}

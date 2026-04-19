import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { TUNNEL_LENGTH } from '../ScrollCamera'

export default function TunnelLighting() {
  const { theme } = useArenaTheme()
  const spotRef1 = useRef<THREE.SpotLight>(null)
  const spotRef2 = useRef<THREE.SpotLight>(null)
  const accentColor = new THREE.Color(theme.accentColor)

  useFrame(() => {
    if (spotRef1.current) {
      spotRef1.current.color.lerp(accentColor, 0.05)
      spotRef1.current.intensity = THREE.MathUtils.lerp(
        spotRef1.current.intensity,
        theme.lightIntensity * 2,
        0.05
      )
    }
    if (spotRef2.current) {
      spotRef2.current.color.lerp(accentColor, 0.05)
    }
  })

  return (
    <group>
      <ambientLight intensity={theme.ambientIntensity} />

      {/* Overhead point lights along tunnel */}
      {Array.from({ length: 6 }, (_, i) => (
        <pointLight
          key={`overhead-${i}`}
          position={[0, 6.5, -i * 10 - 5]}
          intensity={0.4}
          distance={15}
          color="#ffffff"
        />
      ))}

      {/* Accent spotlight at entrance */}
      <spotLight
        ref={spotRef1}
        position={[0, 6, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={theme.lightIntensity * 2}
        color={theme.accentColor}
        distance={30}
      />

      {/* Arena glow from tunnel end */}
      <spotLight
        ref={spotRef2}
        position={[0, 4, -TUNNEL_LENGTH + 2]}
        angle={0.8}
        penumbra={0.8}
        intensity={theme.lightIntensity * 3}
        color={theme.accentColor}
        distance={40}
      />

      {/* Hemisphere fill light */}
      <hemisphereLight
        color={theme.accentColor}
        groundColor="#000000"
        intensity={0.15}
      />
    </group>
  )
}

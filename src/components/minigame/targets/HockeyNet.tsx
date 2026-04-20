import * as THREE from 'three'

export default function HockeyNet() {
  return (
    <group>
      {/* Left post */}
      <mesh position={[-0.9, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
      {/* Right post */}
      <mesh position={[0.9, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 8]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
      {/* Net */}
      <mesh position={[0, 0.6, 0.4]}>
        <boxGeometry args={[1.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} side={THREE.DoubleSide} emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

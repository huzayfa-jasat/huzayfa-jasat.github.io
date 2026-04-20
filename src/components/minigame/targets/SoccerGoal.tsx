import * as THREE from 'three'

export default function SoccerGoal() {
  return (
    <group>
      {/* Left post */}
      <mesh position={[-3.66, 1.22, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.44, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      {/* Right post */}
      <mesh position={[3.66, 1.22, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.44, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 2.44, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 7.32, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      {/* Net */}
      <mesh position={[0, 1.22, 1]}>
        <boxGeometry args={[7.32, 2.44, 2]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} side={THREE.DoubleSide} emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

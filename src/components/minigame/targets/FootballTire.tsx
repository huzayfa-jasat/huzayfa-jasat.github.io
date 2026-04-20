export default function FootballGoal() {
  return (
    <group>
      {/* Base post */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 6, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 3, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.6} />
      </mesh>
      {/* Left upright */}
      <mesh position={[-1.5, 3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 6, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.6} />
      </mesh>
      {/* Right upright */}
      <mesh position={[1.5, 3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 6, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

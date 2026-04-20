export default function BasketballHoop() {
  return (
    <group>
      {/* Backboard */}
      <mesh>
        <boxGeometry args={[1.8, 1.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      {/* Rim */}
      <mesh position={[0, -0.35, 0.4]}>
        <torusGeometry args={[0.23, 0.03, 16, 32]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>
      {/* Net */}
      <mesh position={[0, -0.6, 0.4]}>
        <cylinderGeometry args={[0.23, 0.12, 0.4, 16, 1, true]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

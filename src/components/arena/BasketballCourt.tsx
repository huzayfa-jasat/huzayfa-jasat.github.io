import * as THREE from 'three'

export default function BasketballCourt() {
  return (
    <group>
      {/* Hardwood floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[15, 28]} />
        <meshStandardMaterial color="#c4893b" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Court surround */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 50]} />
        <meshStandardMaterial color="#8B6914" roughness={0.6} />
      </mesh>

      {/* Center circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.8, 1.9, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Center line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[15, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Three-point arcs (simplified as rings) */}
      {[-10, 10].map((z) => (
        <mesh key={`arc-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <ringGeometry args={[6.7, 6.8, 64, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Free throw lanes */}
      {[-10, 10].map((z) => (
        <mesh key={`lane-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <planeGeometry args={[3.6, 5.8]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Backboard + hoop (simplified) */}
      {[-13.5, 13.5].map((z) => (
        <group key={`hoop-${z}`} position={[0, 3, z]}>
          <mesh>
            <boxGeometry args={[1.8, 1.1, 0.05]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, -0.35, z > 0 ? -0.4 : 0.4]}>
            <torusGeometry args={[0.23, 0.02, 16, 32]} />
            <meshStandardMaterial color="#ff4400" />
          </mesh>
        </group>
      ))}

      {/* Arena lights */}
      <pointLight position={[0, 18, 0]} intensity={2.5} distance={50} color="#fff5e0" />
      <pointLight position={[-8, 12, -8]} intensity={1} distance={30} color="#ffcc80" />
      <pointLight position={[8, 12, 8]} intensity={1} distance={30} color="#ffcc80" />
    </group>
  )
}

export default function SoccerField() {
  return (
    <group>
      {/* Grass pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[68, 105]} />
        <meshStandardMaterial color="#1a7a1a" roughness={0.8} />
      </mesh>

      {/* Lighter grass stripes */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -47 + i * 10.5]}>
          <planeGeometry args={[68, 5.25]} />
          <meshStandardMaterial color="#1d8c1d" roughness={0.8} />
        </mesh>
      ))}

      {/* Center circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[9.1, 9.25, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Center spot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Halfway line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[68, 0.12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Touchlines + goal lines */}
      {[-34, 34].map((x) => (
        <mesh key={`touch-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 0]}>
          <planeGeometry args={[0.12, 105]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {[-52.5, 52.5].map((z) => (
        <mesh key={`goal-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <planeGeometry args={[68, 0.12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Goals */}
      {[-52.5, 52.5].map((z) => (
        <group key={`goalnet-${z}`} position={[0, 0, z]}>
          {/* Posts */}
          <mesh position={[-3.66, 1.22, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.44, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[3.66, 1.22, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.44, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Crossbar */}
          <mesh position={[0, 2.44, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 7.32, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Net (simplified) */}
          <mesh position={[0, 1.22, z > 0 ? 1 : -1]}>
            <boxGeometry args={[7.32, 2.44, 2]} />
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Floodlights */}
      <pointLight position={[0, 30, 0]} intensity={2} distance={80} color="#f0ffe0" />
      <pointLight position={[-25, 25, -30]} intensity={1.5} distance={50} color="#e8ffe0" />
      <pointLight position={[25, 25, 30]} intensity={1.5} distance={50} color="#e8ffe0" />
    </group>
  )
}

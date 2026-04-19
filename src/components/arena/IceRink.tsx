export default function IceRink() {
  return (
    <group>
      {/* Ice surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#dceef5" roughness={0.05} metalness={0.4} />
      </mesh>

      {/* Center red line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[30, 0.15]} />
        <meshBasicMaterial color="#cc0000" />
      </mesh>

      {/* Center circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.5, 4.65, 64]} />
        <meshBasicMaterial color="#0044cc" />
      </mesh>

      {/* Blue lines */}
      {[-15, 15].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <planeGeometry args={[30, 0.3]} />
          <meshBasicMaterial color="#0044cc" />
        </mesh>
      ))}

      {/* Boards — left and right */}
      {[-15, 15].map((x) => (
        <mesh key={`board-${x}`} position={[x, 0.6, 0]}>
          <boxGeometry args={[0.15, 1.2, 60]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}

      {/* Boards — ends */}
      {[-30, 30].map((z) => (
        <mesh key={`end-${z}`} position={[0, 0.6, z]}>
          <boxGeometry args={[30, 1.2, 0.15]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}

      {/* Goal nets */}
      {[-28, 28].map((z) => (
        <group key={`goal-${z}`} position={[0, 0, z]}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.8, 1.2, 0.8]} />
            <meshStandardMaterial color="#cc0000" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Face-off circles */}
      {[-10, 10].map((z) =>
        [-7, 7].map((x) => (
          <mesh key={`fo-${x}-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, z]}>
            <ringGeometry args={[2.8, 2.95, 64]} />
            <meshBasicMaterial color="#cc0000" />
          </mesh>
        ))
      )}

      {/* Arena lights above */}
      <pointLight position={[0, 20, 0]} intensity={2} distance={60} color="#e0f0ff" />
      <pointLight position={[-10, 15, -15]} intensity={1} distance={40} color="#88ccff" />
      <pointLight position={[10, 15, 15]} intensity={1} distance={40} color="#88ccff" />
    </group>
  )
}

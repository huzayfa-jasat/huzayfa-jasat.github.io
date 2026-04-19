export default function BaseballDiamond() {
  return (
    <group>
      {/* Outfield grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#2d6b1e" roughness={0.8} />
      </mesh>

      {/* Infield dirt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#b8860b" roughness={0.9} />
      </mesh>

      {/* Pitcher's mound */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1, 1.5, 0.6, 32]} />
        <meshStandardMaterial color="#c4a253" roughness={0.9} />
      </mesh>

      {/* Bases */}
      {[
        [0, 0.05, 12],
        [9, 0.05, 3],
        [0, 0.05, -6],
        [-9, 0.05, 3],
      ].map(([x, y, z], i) => (
        <mesh key={`base-${i}`} position={[x, y, z]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Outfield wall */}
      <mesh position={[0, 1.5, -25]}>
        <boxGeometry args={[50, 3, 0.3]} />
        <meshStandardMaterial color="#003300" roughness={0.7} />
      </mesh>

      {/* Foul poles */}
      {[-20, 20].map((x) => (
        <mesh key={`pole-${x}`} position={[x, 5, -20]}>
          <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
      ))}

      {/* Stadium lights */}
      <pointLight position={[0, 25, -10]} intensity={2} distance={60} color="#fff8e8" />
      <pointLight position={[-15, 20, 5]} intensity={1.2} distance={40} color="#ffe0c0" />
      <pointLight position={[15, 20, 5]} intensity={1.2} distance={40} color="#ffe0c0" />
    </group>
  )
}

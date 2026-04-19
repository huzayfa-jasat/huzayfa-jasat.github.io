import { Text } from '@react-three/drei'

export default function FootballField() {
  return (
    <group>
      {/* Turf */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[49, 110]} />
        <meshStandardMaterial color="#1a5c1a" roughness={0.7} />
      </mesh>

      {/* End zones */}
      {[-50, 50].map((z) => (
        <mesh key={`ez-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]}>
          <planeGeometry args={[49, 10]} />
          <meshStandardMaterial color="#8b0000" roughness={0.7} />
        </mesh>
      ))}

      {/* Yard lines (every 5 yards) */}
      {Array.from({ length: 21 }, (_, i) => {
        const z = -45.7 + i * 4.57
        return (
          <mesh key={`yl-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
            <planeGeometry args={[49, 0.08]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )
      })}

      {/* Yard numbers */}
      {[10, 20, 30, 40, 50, 40, 30, 20, 10].map((num, i) => {
        const z = -36.6 + i * 9.14
        return (
          <group key={`num-${i}`}>
            <Text
              position={[-18, 0.03, z]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {num.toString()}
            </Text>
            <Text
              position={[18, 0.03, z]}
              rotation={[-Math.PI / 2, 0, Math.PI]}
              fontSize={2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {num.toString()}
            </Text>
          </group>
        )
      })}

      {/* Hash marks (simplified) */}
      {Array.from({ length: 100 }, (_, i) => {
        const z = -45.7 + i * 0.914
        return (
          <group key={`hash-${i}`}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-23, 0.02, z]}>
              <planeGeometry args={[0.6, 0.04]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[23, 0.02, z]}>
              <planeGeometry args={[0.6, 0.04]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        )
      })}

      {/* Goalposts */}
      {[-55, 55].map((z) => (
        <group key={`gp-${z}`} position={[0, 0, z]}>
          <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 10, 8]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
          <mesh position={[0, 10, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 5.6, 8]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
          <mesh position={[-2.8, 13, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
          <mesh position={[2.8, 13, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
        </group>
      ))}

      {/* Stadium lights */}
      <pointLight position={[0, 30, 0]} intensity={2.5} distance={80} color="#fff8e0" />
      <pointLight position={[-20, 25, -25]} intensity={1.2} distance={50} color="#ffe8c0" />
      <pointLight position={[20, 25, 25]} intensity={1.2} distance={50} color="#ffe8c0" />
    </group>
  )
}

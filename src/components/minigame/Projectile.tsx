import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, BallCollider, CylinderCollider, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useArenaTheme } from '../../context/ArenaThemeContext'
import { SPORT_CONFIGS } from '../../data/sportConfigs'
import { getMinigameState, getTargetWorldPos, recordMiss, recordScore, resetAim } from '../../hooks/useMinigameStore'

interface ProjectileProps {
  aimTarget: THREE.Vector3
}

const _meshWorldPos = new THREE.Vector3()

export default function Projectile({ aimTarget }: ProjectileProps) {
  const bodyRef = useRef<RapierRigidBody>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)
  const resolved = useRef(false)
  const { themeKey } = useArenaTheme()
  const config = SPORT_CONFIGS[themeKey]

  useEffect(() => {
    if (!bodyRef.current) return
    const origin = new THREE.Vector3(...config.launch.origin)
    const dir = new THREE.Vector3().subVectors(aimTarget, origin).normalize()
    dir.y += config.launch.arc
    dir.normalize()

    const impulse = dir.multiplyScalar(config.launch.power * config.projectile.mass)
    bodyRef.current.applyImpulse({ x: impulse.x, y: impulse.y, z: impulse.z }, true)
  }, [aimTarget, config])

  useFrame((_, delta) => {
    if (resolved.current) return
    elapsed.current += delta

    if (meshRef.current && getMinigameState().phase === 'launched') {
      meshRef.current.getWorldPosition(_meshWorldPos)
      const tp = getTargetWorldPos()
      const [sx, sy, sz] = config.target.sensorSize
      if (
        Math.abs(_meshWorldPos.x - tp.x) < sx / 2 &&
        Math.abs(_meshWorldPos.y - tp.y) < sy / 2 &&
        Math.abs(_meshWorldPos.z - tp.z) < sz / 2
      ) {
        resolved.current = true
        recordScore()
        setTimeout(() => resetAim(), 1500)
        return
      }
    }

    if (elapsed.current > 4 && !resolved.current) {
      resolved.current = true
      if (getMinigameState().phase === 'launched') {
        recordMiss()
      }
      setTimeout(() => resetAim(), 1500)
    }
  })

  const { shape, radius, height, color, mass } = config.projectile

  return (
    <RigidBody
      ref={bodyRef}
      position={config.launch.origin}
      colliders={false}
      mass={mass}
      linearDamping={0.1}
      ccd
    >
      {shape === 'sphere' ? (
        <>
          <mesh ref={meshRef}>
            <sphereGeometry args={[radius * 2.5, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
          <BallCollider args={[radius * 2.5]} />
        </>
      ) : shape === 'oval' ? (
        <>
          <mesh ref={meshRef} scale={[1, 1, 1.6]}>
            <sphereGeometry args={[radius * 2.5, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
          <BallCollider args={[radius * 2.5]} />
        </>
      ) : (
        <>
          <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[radius * 2.5, radius * 2.5, (height ?? 0.05) * 2, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
          <CylinderCollider args={[((height ?? 0.05) * 2) / 2, radius * 2.5]} />
        </>
      )}
    </RigidBody>
  )
}

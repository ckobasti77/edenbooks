"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh, MeshBasicMaterial } from "three"

import { PHONE_POSITION, smoothstep } from "./constants"

type AudioWavesProps = {
  progress: number
}

function AudioWaves({ progress }: AudioWavesProps) {
  const visibility = smoothstep(0.72, 0.9, progress) * (1 - smoothstep(0.98, 1, progress))

  return (
    <group
      position={[PHONE_POSITION[0] - 0.05, PHONE_POSITION[1] - 0.82, 2.2]}
      rotation={[0, 0, -Math.PI * 0.1]}
      visible={visibility > 0.01}
    >
      {[0.22, 0.38, 0.54, 0.7].map((radius, index) => (
        <WaveRing
          key={radius}
          index={index}
          radius={radius}
          visibility={visibility}
        />
      ))}
    </group>
  )
}

type WaveRingProps = {
  index: number
  radius: number
  visibility: number
}

function WaveRing({ index, radius, visibility }: WaveRingProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    const pulse = (Math.sin(time * 1.7 + index * 0.9) + 1) / 2
    const scale = 1 + pulse * 0.08 + index * 0.03

    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale)
    }

    if (materialRef.current) {
      materialRef.current.opacity = visibility * (0.42 - index * 0.045) * (0.78 + pulse * 0.22)
    }
  })

  return (
    <mesh ref={meshRef} renderOrder={12}>
      <torusGeometry args={[radius, 0.007, 8, 128, Math.PI * 2]} />
      <meshBasicMaterial
        ref={materialRef}
        color={index % 2 === 0 ? "#7cc7ff" : "#2f8cff"}
        depthTest={false}
        depthWrite={false}
        opacity={0}
        transparent
        toneMapped={false}
      />
    </mesh>
  )
}

export { AudioWaves }

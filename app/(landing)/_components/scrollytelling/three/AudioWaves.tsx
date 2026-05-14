"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh, MeshBasicMaterial } from "three"

import {
  AUDIO_WAVE_ORIGIN,
  AUDIO_WAVE_ROTATION,
  AUDIO_WAVE_SCALE,
  smoothstep,
} from "./constants"

type AudioWavesProps = {
  progress: number
}

const WAVE_COUNT = 5

function AudioWaves({ progress }: AudioWavesProps) {
  const visibility =
    smoothstep(0.78, 0.9, progress) * (1 - smoothstep(0.98, 1, progress))

  return (
    <group
      position={AUDIO_WAVE_ORIGIN}
      rotation={AUDIO_WAVE_ROTATION}
      scale={AUDIO_WAVE_SCALE}
      visible={visibility > 0.01}
    >
      {Array.from({ length: WAVE_COUNT }, (_, index) => (
        <WaveRing key={index} index={index} visibility={visibility} />
      ))}
    </group>
  )
}

type WaveRingProps = {
  index: number
  visibility: number
}

function WaveRing({ index, visibility }: WaveRingProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshBasicMaterial>(null)

  useFrame(() => {
    const phase = ((performance.now() / 1000) * 0.34 + index / WAVE_COUNT) % 1
    const outwardScale = 0.42 + phase * 1.78
    const fade = Math.pow(1 - phase, 1.55)

    if (meshRef.current) {
      meshRef.current.scale.setScalar(outwardScale)
      meshRef.current.position.z = phase * 0.036
    }

    if (materialRef.current) {
      materialRef.current.opacity = visibility * fade * (0.42 - index * 0.03)
    }
  })

  return (
    <mesh ref={meshRef} renderOrder={10}>
      <torusGeometry args={[0.18, 0.0045, 8, 96]} />
      <meshBasicMaterial
        ref={materialRef}
        color={index % 2 === 0 ? "#7cc7ff" : "#2f8cff"}
        depthTest
        depthWrite={false}
        opacity={0}
        transparent
        toneMapped={false}
      />
    </mesh>
  )
}

export { AudioWaves }

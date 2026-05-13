"use client"

import { AdditiveBlending } from "three"

import {
  AUDIO_SCREEN_ASSETS,
  READER_SCREEN_ASSETS,
  SCREEN_PLANE_POSITION,
  SCREEN_PLANE_ROTATION,
  SCREEN_PLANE_SCALE,
  smoothstep,
} from "./constants"
import { useOptionalTexture } from "./texture-utils"

type ScreenPlaneProps = {
  progress: number
}

function ScreenPlane({ progress }: ScreenPlaneProps) {
  const readerTexture = useOptionalTexture({ candidates: READER_SCREEN_ASSETS })
  const audioTexture = useOptionalTexture({ candidates: AUDIO_SCREEN_ASSETS })
  const activation = smoothstep(0.5, 0.72, progress)
  const audioFade = smoothstep(0.7, 0.86, progress)
  const readerOpacity = activation * (1 - audioFade * 0.92)
  const audioOpacity = activation * audioFade
  const glowOpacity = activation * (0.16 + audioFade * 0.1)

  return (
    <group
      position={SCREEN_PLANE_POSITION}
      rotation={SCREEN_PLANE_ROTATION}
      scale={SCREEN_PLANE_SCALE}
    >
      <mesh position={[0, 0, -0.006]} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#02040a"
          depthWrite={false}
          opacity={activation * 0.86}
          transparent
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, -0.004]} renderOrder={2}>
        <planeGeometry args={[1.06, 1.06]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#2f8cff"
          depthWrite={false}
          opacity={glowOpacity}
          transparent
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0]} renderOrder={3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#07101e"
          depthWrite={false}
          map={readerTexture ?? undefined}
          opacity={readerOpacity}
          transparent
          toneMapped={false}
        />
      </mesh>

      {!readerTexture && <FallbackReaderScreen opacity={readerOpacity} />}

      <mesh position={[0, 0, 0.004]} renderOrder={4}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#08111f"
          depthWrite={false}
          map={audioTexture ?? undefined}
          opacity={audioOpacity}
          transparent
          toneMapped={false}
        />
      </mesh>

      {!audioTexture && <FallbackAudioScreen opacity={audioOpacity} />}
    </group>
  )
}

function FallbackReaderScreen({ opacity }: { opacity: number }) {
  return (
    <group position={[0, 0, 0.006]} renderOrder={5}>
      <mesh position={[0, 0.38, 0]}>
        <planeGeometry args={[0.72, 0.075]} />
        <meshBasicMaterial
          color="#f7faff"
          opacity={opacity * 0.95}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.18, 0.24, 0]}>
        <planeGeometry args={[0.36, 0.03]} />
        <meshBasicMaterial
          color="#7cc7ff"
          opacity={opacity * 0.72}
          transparent
          toneMapped={false}
        />
      </mesh>
      {[0.1, -0.02, -0.14, -0.26].map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <planeGeometry args={[index === 3 ? 0.54 : 0.68, 0.018]} />
          <meshBasicMaterial
            color="#f7faff"
            opacity={opacity * (0.64 - index * 0.08)}
            transparent
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.39, 0]}>
        <planeGeometry args={[0.54, 0.055]} />
        <meshBasicMaterial
          color="#2f8cff"
          opacity={opacity * 0.92}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function FallbackAudioScreen({ opacity }: { opacity: number }) {
  return (
    <group position={[0, 0, 0.01]} renderOrder={6}>
      <mesh position={[0, 0.22, 0]}>
        <circleGeometry args={[0.18, 48]} />
        <meshBasicMaterial
          color="#2f8cff"
          opacity={opacity * 0.9}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.22, 0.002]}>
        <circleGeometry args={[0.105, 48]} />
        <meshBasicMaterial
          color="#02040a"
          opacity={opacity}
          transparent
          toneMapped={false}
        />
      </mesh>
      {[-0.08, -0.17, -0.26].map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <planeGeometry args={[0.62 - index * 0.12, 0.024]} />
          <meshBasicMaterial
            color={index === 0 ? "#f7faff" : "#7cc7ff"}
            opacity={opacity * (0.72 - index * 0.12)}
            transparent
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[-0.18, -0.42, 0]}>
        <planeGeometry args={[0.22, 0.045]} />
        <meshBasicMaterial
          color="#f7faff"
          opacity={opacity * 0.64}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.18, -0.42, 0]}>
        <planeGeometry args={[0.22, 0.045]} />
        <meshBasicMaterial
          color="#2f8cff"
          opacity={opacity * 0.86}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export { ScreenPlane }

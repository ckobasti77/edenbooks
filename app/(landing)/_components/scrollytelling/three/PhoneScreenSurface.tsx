"use client"

import { useVideoTexture } from "@react-three/drei"
import { AdditiveBlending, DoubleSide } from "three"

import {
  PHONE_SCREEN_VIDEO_PATH,
  PHONE_SCREEN_SURFACE_POSITION,
  PHONE_SCREEN_SURFACE_ROTATION,
  PHONE_SCREEN_SURFACE_SCALE,
  smoothstep,
} from "./constants"

type PhoneScreenSurfaceProps = {
  progress: number
}

function PhoneScreenSurface({ progress }: PhoneScreenSurfaceProps) {
  const videoReveal = smoothstep(0.72, 0.8, progress)
  const captureGlow = smoothstep(0.45, 0.68, progress)
  const videoTexture = useVideoTexture(PHONE_SCREEN_VIDEO_PATH, {
    crossOrigin: "anonymous",
    loop: true,
    muted: true,
    playsInline: true,
    start: videoReveal > 0.02,
  })

  return (
    <group
      position={PHONE_SCREEN_SURFACE_POSITION}
      rotation={PHONE_SCREEN_SURFACE_ROTATION}
      scale={PHONE_SCREEN_SURFACE_SCALE}
    >
      <mesh position={[0, 0, -0.004]} renderOrder={35} scale={[0.94, 0.97, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#020712"
          depthTest={false}
          depthWrite={false}
          opacity={0.38 + captureGlow * 0.28}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0]} renderOrder={36} scale={[0.96, 0.985, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#2f8cff"
          depthTest={false}
          depthWrite={false}
          opacity={captureGlow * 0.08 + videoReveal * 0.035}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.004]} renderOrder={37}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          depthTest={false}
          depthWrite={false}
          map={videoTexture}
          opacity={videoReveal}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export { PhoneScreenSurface }

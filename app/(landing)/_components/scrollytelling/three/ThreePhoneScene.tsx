"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { AdditiveBlending, Group, Vector3 } from "three"

import { AudioWaves } from "./AudioWaves"
import {
  PHONE_BASE_ROTATION,
  PHONE_POSITION,
  PHONE_SCALE,
  getPhonePosition,
  getPhoneRotation,
  mix,
  smoothstep,
} from "./constants"
import { FlyingBooks } from "./FlyingBooks"
import { PhoneModel } from "./PhoneModel"
import { SceneLights } from "./SceneLights"
import { ScreenPlane } from "./ScreenPlane"

type ThreePhoneSceneProps = {
  progress: number
}

function ThreePhoneScene({ progress }: ThreePhoneSceneProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <Canvas
        camera={{ fov: 34, position: [0, 0.08, 7] }}
        dpr={[1, 1.55]}
        flat
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <SceneLights />
        <CameraRig progress={progress} />
        <Suspense fallback={<LoadingPhoneSilhouette />}>
          <LibraryHalo progress={progress} />
          <FlyingBooks progress={progress} />
          <PhoneRig progress={progress} />
          <AudioWaves progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function PhoneRig({ progress }: ThreePhoneSceneProps) {
  const rigRef = useRef<Group>(null)
  const currentPosition = useRef(new Vector3(...PHONE_POSITION))
  const currentRotation = useRef(new Vector3(...PHONE_BASE_ROTATION))

  useFrame((_, delta) => {
    const rig = rigRef.current

    if (!rig) {
      return
    }

    const amount = 1 - Math.exp(-delta * 7)
    const targetPosition = getPhonePosition(progress)
    const targetRotation = getPhoneRotation(progress)

    currentPosition.current.lerp(new Vector3(...targetPosition), amount)
    currentRotation.current.lerp(new Vector3(...targetRotation), amount)

    rig.position.copy(currentPosition.current)
    rig.rotation.set(
      currentRotation.current.x,
      currentRotation.current.y,
      currentRotation.current.z
    )
  })

  return (
    <group ref={rigRef} scale={PHONE_SCALE}>
      <PhoneModel />
      <ScreenPlane progress={progress} />
    </group>
  )
}

function CameraRig({ progress }: ThreePhoneSceneProps) {
  const { camera } = useThree()
  const cameraTarget = useRef(new Vector3(0.6, -0.04, 0))
  const cameraPosition = useRef(new Vector3(0, 0.08, 7))

  useFrame((_, delta) => {
    const audio = smoothstep(0.74, 1, progress)
    const amount = 1 - Math.exp(-delta * 4.5)

    cameraPosition.current.lerp(
      new Vector3(mix(0, 0.12, audio), mix(0.08, 0.16, audio), mix(7, 6.72, audio)),
      amount
    )
    cameraTarget.current.lerp(
      new Vector3(mix(0.62, 0.78, audio), mix(-0.04, 0.02, audio), 0),
      amount
    )

    camera.position.copy(cameraPosition.current)
    camera.lookAt(cameraTarget.current)
  })

  return null
}

function LibraryHalo({ progress }: ThreePhoneSceneProps) {
  const reveal = smoothstep(0.16, 0.56, progress)
  const audio = smoothstep(0.72, 1, progress)

  return (
    <mesh position={[PHONE_POSITION[0], PHONE_POSITION[1] + 0.12, -0.92]} scale={[3.1, 2.3, 1]}>
      <circleGeometry args={[1, 96]} />
      <meshBasicMaterial
        blending={AdditiveBlending}
        color={audio > 0.5 ? "#7cc7ff" : "#2f8cff"}
        depthWrite={false}
        opacity={0.09 + reveal * 0.14 + audio * 0.06}
        transparent
        toneMapped={false}
      />
    </mesh>
  )
}

function LoadingPhoneSilhouette() {
  return (
    <group position={PHONE_POSITION} rotation={PHONE_BASE_ROTATION} scale={PHONE_SCALE}>
      <mesh>
        <planeGeometry args={[0.34, 0.72]} />
        <meshBasicMaterial color="#07101e" opacity={0.55} transparent />
      </mesh>
    </group>
  )
}

export { ThreePhoneScene }

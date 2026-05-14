"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Group, Vector3 } from "three"

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
        className="pointer-events-none"
        dpr={[1, 1.55]}
        flat
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <SceneLights />
        <CameraRig progress={progress} />
        <Suspense fallback={<LoadingPhoneSilhouette />}>
          <FlyingBooks progress={progress} />
          <PhoneRig progress={progress} />
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
      <PhoneModel progress={progress} />
      <AudioWaves progress={progress} />
    </group>
  )
}

function CameraRig({ progress }: ThreePhoneSceneProps) {
  const { camera } = useThree()
  const cameraTarget = useRef(new Vector3(0.6, -0.04, 0))
  const cameraPosition = useRef(new Vector3(0, 0.08, 7))

  useFrame((_, delta) => {
    const audio = smoothstep(0.78, 1, progress)
    const amount = 1 - Math.exp(-delta * 4.5)

    cameraPosition.current.lerp(
      new Vector3(
        mix(0, 0.1, audio),
        mix(0.08, 0.14, audio),
        mix(7, 6.78, audio)
      ),
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

function LoadingPhoneSilhouette() {
  return (
    <group
      position={PHONE_POSITION}
      rotation={PHONE_BASE_ROTATION}
      scale={PHONE_SCALE}
    >
      <mesh>
        <planeGeometry args={[0.34, 0.72]} />
        <meshBasicMaterial color="#07101e" opacity={0.55} transparent />
      </mesh>
    </group>
  )
}

export { ThreePhoneScene }

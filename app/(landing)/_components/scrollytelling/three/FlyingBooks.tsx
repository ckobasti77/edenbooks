"use client"

import { DoubleSide, Vector3 } from "three"

import {
  BOOK_ARC_POINTS,
  BOOK_COVER_ASSETS,
  BOOK_HIDDEN_POSITION,
  BOOK_ROTATIONS,
  BOOK_SCREEN_EXIT,
  BOOK_SCREEN_TARGET,
  clamp01,
  mix,
  mixVector,
  smoothstep,
} from "./constants"
import {
  useOptionalTexture,
  useProceduralBookTexture,
} from "./texture-utils"

type FlyingBooksProps = {
  progress: number
}

const workingPosition = new Vector3()
const screenOffset = new Vector3()
const hiddenOffset = new Vector3()

function FlyingBooks({ progress }: FlyingBooksProps) {
  return (
    <group>
      {BOOK_COVER_ASSETS.map((book, index) => (
        <FlyingBook
          key={book.title}
          accent={book.color}
          candidates={book.candidates}
          index={index}
          progress={progress}
          title={book.title}
        />
      ))}
    </group>
  )
}

type FlyingBookProps = {
  accent: string
  candidates: readonly string[]
  index: number
  progress: number
  title: string
}

function FlyingBook({
  accent,
  candidates,
  index,
  progress,
  title,
}: FlyingBookProps) {
  const loadedTexture = useOptionalTexture({ candidates })
  const fallbackTexture = useProceduralBookTexture(title, accent, index)
  const texture = loadedTexture ?? fallbackTexture ?? undefined
  const state = getBookState(progress, index)

  return (
    <group
      position={state.position}
      rotation={[0, 0, state.rotation]}
      scale={state.scale}
    >
      <mesh position={[0.018, -0.018, -0.012]} renderOrder={1}>
        <planeGeometry args={[0.54, 0.76]} />
        <meshBasicMaterial
          color="#02040a"
          opacity={state.opacity * 0.42}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh renderOrder={2}>
        <planeGeometry args={[0.5, 0.72]} />
        <meshBasicMaterial
          color="#06101f"
          opacity={state.opacity}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.014]} renderOrder={3}>
        <planeGeometry args={[0.455, 0.655]} />
        <meshBasicMaterial
          color={accent}
          map={texture}
          opacity={state.opacity}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function getBookState(progress: number, index: number) {
  const stagger = index * 0.018
  const reveal = smoothstep(0.18 + stagger, 0.45 + stagger * 0.4, progress)
  const converge = smoothstep(0.45 + stagger * 0.5, 0.65 + stagger * 0.25, progress)
  const enter = smoothstep(0.64 + stagger * 0.2, 0.8, progress)
  const audioExit = smoothstep(0.78, 0.95, progress)
  const arcPoint = BOOK_ARC_POINTS[index]

  hiddenOffset.set(
    (index - 2.5) * 0.035,
    Math.sin(index * 1.7) * 0.04,
    -index * 0.018
  )

  const hiddenPoint = BOOK_HIDDEN_POSITION.clone().add(hiddenOffset)

  screenOffset.set((index - 2.5) * 0.035, Math.sin(index) * 0.025, index * 0.01)

  const screenTarget = BOOK_SCREEN_TARGET.clone().add(screenOffset)
  const screenExit = BOOK_SCREEN_EXIT.clone().add(screenOffset.multiplyScalar(0.35))

  mixVector(workingPosition, hiddenPoint, arcPoint, reveal)

  if (converge > 0) {
    mixVector(workingPosition, arcPoint, screenTarget, converge)
  }

  if (enter > 0) {
    mixVector(workingPosition, screenTarget, screenExit, enter)
  }

  const revealOpacity = reveal
  const exitOpacity = 1 - clamp01(enter * 0.85 + audioExit * 0.35)
  const opacity = clamp01(revealOpacity * exitOpacity)
  const scale = mix(mix(0.36, 1, reveal), 0.42, enter)
  const rotation = mix(
    mix(BOOK_ROTATIONS[index], BOOK_ROTATIONS[index] * 0.55, converge),
    0,
    enter
  )

  return {
    opacity,
    position: workingPosition.toArray() as [number, number, number],
    rotation,
    scale,
  }
}

export { FlyingBooks }

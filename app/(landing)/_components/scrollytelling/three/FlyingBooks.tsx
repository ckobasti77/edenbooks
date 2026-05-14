"use client"

import { useMemo } from "react"
import { CatmullRomCurve3, DoubleSide, Vector3, type Vector3Tuple } from "three"

import {
  BOOK_ARC_POINTS,
  BOOK_COVER_ASSETS,
  BOOK_DEPTH_VARIATION,
  BOOK_HIDDEN_POSITION,
  BOOK_ROTATIONS,
  BOOK_SCALE_VARIATION,
  BOOK_SCREEN_EXIT,
  BOOK_SCREEN_TARGET,
  clamp01,
  mix,
  smoothstep,
} from "./constants"
import {
  createCentripetalCurve,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  sampleCubicBezier,
  sampleCurve,
} from "./curve-utils"
import {
  useOptionalTexture,
  useProceduralBookTexture,
} from "./texture-utils"

type FlyingBooksProps = {
  progress: number
}

type BookPath = {
  arcPoint: Vector3
  controlA: Vector3
  controlB: Vector3
  revealCurve: CatmullRomCurve3
  rotationX: number
  rotationY: number
  scale: number
  screenExit: Vector3
  screenTarget: Vector3
}

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
  const path = useMemo(() => createBookPath(index), [index])
  const loadedTexture = useOptionalTexture({ candidates })
  const fallbackTexture = useProceduralBookTexture(title, accent, index)
  const texture = loadedTexture ?? fallbackTexture ?? undefined
  const state = getBookState(progress, index, path)

  return (
    <group
      position={state.position}
      rotation={state.rotation}
      scale={state.scale}
    >
      <mesh position={[0.014, -0.014, -0.018]} renderOrder={20}>
        <planeGeometry args={[0.54, 0.76]} />
        <meshBasicMaterial
          color="#02040a"
          depthTest={false}
          depthWrite={false}
          opacity={state.opacity * 0.28}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh renderOrder={21}>
        <planeGeometry args={[0.5, 0.72]} />
        <meshBasicMaterial
          color="#06101f"
          depthTest={false}
          depthWrite={false}
          opacity={state.opacity}
          side={DoubleSide}
          transparent
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.014]} renderOrder={22}>
        <planeGeometry args={[0.455, 0.655]} />
        <meshBasicMaterial
          color={accent}
          depthTest={false}
          depthWrite={false}
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

function createBookPath(index: number): BookPath {
  const direction = index - (BOOK_COVER_ASSETS.length - 1) / 2
  const depth = BOOK_DEPTH_VARIATION[index] ?? 0
  const hiddenPoint = BOOK_HIDDEN_POSITION.clone().add(
    new Vector3(
      direction * 0.028,
      Math.sin(index * 1.45) * 0.035,
      -0.08 - index * 0.014
    )
  )
  const arcPoint = BOOK_ARC_POINTS[index]
    .clone()
    .add(new Vector3(direction * 0.02, Math.sin(index * 1.2) * 0.025, depth))
  const revealCurve = createCentripetalCurve([
    hiddenPoint,
    hiddenPoint
      .clone()
      .add(new Vector3(direction * 0.05, -0.12 + index * 0.018, -0.18)),
    arcPoint.clone().add(new Vector3(-direction * 0.045, 0.16, -0.12)),
    arcPoint,
  ])
  const screenTarget = BOOK_SCREEN_TARGET.clone().add(
    new Vector3(direction * 0.022, Math.sin(index * 1.1) * 0.018, index * 0.006)
  )
  const screenExit = BOOK_SCREEN_EXIT.clone().add(
    new Vector3(direction * 0.01, Math.sin(index) * 0.01, -index * 0.012)
  )
  const controlA = arcPoint
    .clone()
    .lerp(screenTarget, 0.32)
    .add(new Vector3(direction * 0.1, 0.18 - index * 0.028, 0.36))
  const controlB = arcPoint
    .clone()
    .lerp(screenTarget, 0.72)
    .add(new Vector3(-direction * 0.045, -0.07 + Math.sin(index) * 0.025, 0.24))

  return {
    arcPoint,
    controlA,
    controlB,
    revealCurve,
    rotationX: (index % 2 === 0 ? -1 : 1) * 0.035,
    rotationY: direction * 0.055,
    scale: BOOK_SCALE_VARIATION[index] ?? 1,
    screenExit,
    screenTarget,
  }
}

function getBookState(progress: number, index: number, path: BookPath) {
  const stagger = index * 0.014
  const reveal = smoothstep(0.18 + stagger, 0.45 + stagger * 0.55, progress)
  const converge = smoothstep(
    0.45 + stagger * 0.4,
    0.62 + stagger * 0.18,
    progress
  )
  const enter = smoothstep(0.62 + stagger * 0.1, 0.72, progress)
  const audioDissolve = smoothstep(0.72, 0.82, progress)
  const position = new Vector3()

  sampleCurve(position, path.revealCurve, easeOutCubic(reveal))

  if (converge > 0) {
    sampleCubicBezier(
      position,
      path.arcPoint,
      path.controlA,
      path.controlB,
      path.screenTarget,
      easeInOutCubic(converge)
    )
  }

  if (enter > 0) {
    position.copy(path.screenTarget).lerp(path.screenExit, easeInCubic(enter))
  }

  const drift = Math.sin(progress * Math.PI * 2 + index * 1.7)
  position.y += drift * 0.018 * reveal * (1 - enter)

  const revealOpacity = reveal
  const enterFade = 1 - enter
  const audioFade = 1 - audioDissolve * 0.88
  const opacity = clamp01(revealOpacity * enterFade * audioFade)
  const scale = mix(mix(0.36, path.scale, easeOutCubic(reveal)), 0.32, enter)
  const rotationZ = mix(
    mix(BOOK_ROTATIONS[index] ?? 0, (BOOK_ROTATIONS[index] ?? 0) * 0.42, converge),
    0,
    enter
  )
  const rotation: Vector3Tuple = [
    mix(path.rotationX, 0, enter),
    mix(path.rotationY, 0, enter),
    rotationZ,
  ]

  return {
    opacity,
    position: position.toArray() as Vector3Tuple,
    rotation,
    scale,
  }
}

export { FlyingBooks }

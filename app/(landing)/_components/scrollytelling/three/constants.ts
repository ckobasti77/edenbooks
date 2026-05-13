import { MathUtils, Vector3, type Vector3Tuple } from "three"

export const PHONE_MODEL_PATH = "/models/phone.glb"

export const DUPLICATE_PHONE_NODE_NAMES = ["iphone17promax_0"] as const

export const PHONE_BASE_ROTATION: Vector3Tuple = [
  0.12,
  -0.32,
  -0.04,
]
export const PHONE_BOOK_REVEAL_TILT: Vector3Tuple = [
  0.16,
  -0.46,
  -0.08,
]
export const PHONE_READER_ROTATION: Vector3Tuple = [
  0.1,
  -0.22,
  -0.03,
]
export const PHONE_AUDIO_ROTATION: Vector3Tuple = [
  0.08,
  -0.12,
  -0.02,
]

export const PHONE_SCALE = 3.8
export const PHONE_POSITION: Vector3Tuple = [1.78, -0.04, 0]
export const PHONE_MOBILE_FALLBACK_IMAGE = "/images/devices/mobile-mockup.avif"

export const SCREEN_PLANE_POSITION: Vector3Tuple = [0.1, 0.035, 0.405]
export const SCREEN_PLANE_ROTATION: Vector3Tuple = [0, 0, 0]
export const SCREEN_PLANE_SCALE: Vector3Tuple = [0.33, 0.76, 1]

export const READER_SCREEN_ASSETS = [] as const
export const AUDIO_SCREEN_ASSETS = [] as const

export const BOOK_COVER_ASSETS = [
  {
    title: "Plava biblioteka",
    candidates: ["/images/books/1.avif"],
    color: "#2f8cff",
  },
  {
    title: "Tihi fokus",
    candidates: ["/images/books/2.avif"],
    color: "#7cc7ff",
  },
  {
    title: "Granice uma",
    candidates: ["/images/books/3.avif"],
    color: "#84f0d4",
  },
  {
    title: "Nocni ritam",
    candidates: ["/images/books/4.avif"],
    color: "#b8d7ff",
  },
  {
    title: "Sledece poglavlje",
    candidates: ["/images/books/5.avif"],
    color: "#6c7a91",
  },
  {
    title: "Eden audio",
    candidates: [],
    color: "#f7faff",
  },
] as const

export const BOOK_HIDDEN_POSITION = new Vector3(
  PHONE_POSITION[0] - 0.08,
  PHONE_POSITION[1] - 0.08,
  -0.75
)

export const BOOK_SCREEN_TARGET = new Vector3(
  PHONE_POSITION[0] - 0.02,
  PHONE_POSITION[1] - 0.03,
  0.34
)

export const BOOK_SCREEN_EXIT = new Vector3(
  PHONE_POSITION[0] - 0.02,
  PHONE_POSITION[1] - 0.03,
  -0.48
)

export const BOOK_ARC_POINTS = [
  new Vector3(PHONE_POSITION[0] - 1.55, PHONE_POSITION[1] + 0.1, 0.03),
  new Vector3(PHONE_POSITION[0] - 1.18, PHONE_POSITION[1] + 0.95, 0.08),
  new Vector3(PHONE_POSITION[0] - 0.36, PHONE_POSITION[1] + 1.34, 0.1),
  new Vector3(PHONE_POSITION[0] + 0.5, PHONE_POSITION[1] + 1.14, 0.08),
  new Vector3(PHONE_POSITION[0] + 1.06, PHONE_POSITION[1] + 0.42, 0.03),
  new Vector3(PHONE_POSITION[0] + 0.78, PHONE_POSITION[1] - 0.5, -0.02),
] as const

export const BOOK_ROTATIONS = [-0.42, -0.22, -0.05, 0.12, 0.3, 0.46] as const

export function clamp01(value: number) {
  return MathUtils.clamp(value, 0, 1)
}

export function smoothstep(start: number, end: number, value: number) {
  return MathUtils.smoothstep(clamp01((value - start) / (end - start)), 0, 1)
}

export function mix(start: number, end: number, amount: number) {
  return MathUtils.lerp(start, end, clamp01(amount))
}

export function mixVector(
  target: Vector3,
  start: Vector3,
  end: Vector3,
  amount: number
) {
  return target.copy(start).lerp(end, clamp01(amount))
}

export function getPhoneRotation(progress: number): Vector3Tuple {
  const reveal = smoothstep(0.18, 0.42, progress)
  const absorb = smoothstep(0.48, 0.74, progress)
  const audio = smoothstep(0.74, 1, progress)

  const rotation = PHONE_BASE_ROTATION.map((value, index) =>
    mix(value, PHONE_BOOK_REVEAL_TILT[index], reveal)
  ) as Vector3Tuple

  rotation.forEach((value, index) => {
    rotation[index] = mix(value, PHONE_READER_ROTATION[index], absorb)
    rotation[index] = mix(rotation[index], PHONE_AUDIO_ROTATION[index], audio)
  })

  return rotation
}

export function getPhonePosition(progress: number): Vector3Tuple {
  const audio = smoothstep(0.72, 1, progress)

  return [
    mix(PHONE_POSITION[0], PHONE_POSITION[0] + 0.08, audio),
    mix(PHONE_POSITION[1], PHONE_POSITION[1] + 0.02, audio),
    PHONE_POSITION[2],
  ]
}

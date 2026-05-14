import { MathUtils, Vector3, type Vector3Tuple } from "three"

export const PHONE_MODEL_PATH = "/models/iphone-17-pro-max.glb"

export const PHONE_ROOT_NODE_NAME = "Phone_21"
export const PHONE_SCREEN_MESH_NODE_NAME = "Object_59"
export const PHONE_FRONT_GLASS_NODE_NAME = "Object_60"
export const PHONE_SPEAKER_NODE_NAME = "Object_64"

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

export const PHONE_SCALE = 11.05
export const PHONE_POSITION: Vector3Tuple = [1.72, -0.02, 0]
export const PHONE_MOBILE_FALLBACK_IMAGE = "/images/devices/mobile-mockup.avif"
export const PHONE_SCREEN_VIDEO_PATH = "/videos/phone-screen.mp4"
export const PHONE_SCREEN_VIDEO_ASPECT = 372 / 684

export const PHONE_SCREEN_SURFACE_POSITION: Vector3Tuple = [0, 0, 0.0048]
export const PHONE_SCREEN_SURFACE_ROTATION: Vector3Tuple = [0, 0, 0]
export const PHONE_SCREEN_SURFACE_SCALE: Vector3Tuple = [0.0718, 0.1572, 1]

export const READER_SCREEN_ASSETS = [] as const
export const AUDIO_SCREEN_ASSETS = [] as const

export const AUDIO_WAVE_ORIGIN: Vector3Tuple = [0.002, -0.081, 0.008]
export const AUDIO_WAVE_ROTATION: Vector3Tuple = [0, 0, -0.08]
export const AUDIO_WAVE_SCALE: Vector3Tuple = [0.19, 0.1, 1]

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
] as const

export const BOOK_HIDDEN_POSITION = new Vector3(
  PHONE_POSITION[0] - 0.04,
  PHONE_POSITION[1] - 0.08,
  -0.38
)

export const BOOK_SCREEN_TARGET = new Vector3(
  PHONE_POSITION[0] + 0.03,
  PHONE_POSITION[1] + 0.01,
  0.12
)

export const BOOK_SCREEN_EXIT = new Vector3(
  PHONE_POSITION[0] + 0.02,
  PHONE_POSITION[1] + 0.01,
  -0.08
)

export const BOOK_ARC_POINTS = [
  new Vector3(PHONE_POSITION[0] - 1.04, PHONE_POSITION[1] - 0.22, 0.22),
  new Vector3(PHONE_POSITION[0] - 0.82, PHONE_POSITION[1] + 0.44, 0.25),
  new Vector3(PHONE_POSITION[0] - 0.16, PHONE_POSITION[1] + 0.78, 0.27),
  new Vector3(PHONE_POSITION[0] + 0.72, PHONE_POSITION[1] + 0.48, 0.3),
  new Vector3(PHONE_POSITION[0] + 0.88, PHONE_POSITION[1] - 0.12, 0.32),
] as const

export const BOOK_ROTATIONS = [-0.32, -0.18, 0.02, 0.18, 0.32] as const
export const BOOK_DEPTH_VARIATION = [0.02, 0.04, 0.06, 0.08, 0.1] as const
export const BOOK_SCALE_VARIATION = [0.72, 0.78, 0.86, 0.78, 0.72] as const

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
  const absorb = smoothstep(0.45, 0.72, progress)
  const audio = smoothstep(0.78, 1, progress)

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
  const audio = smoothstep(0.78, 1, progress)

  return [
    mix(PHONE_POSITION[0], PHONE_POSITION[0] + 0.06, audio),
    mix(PHONE_POSITION[1], PHONE_POSITION[1] + 0.02, audio),
    PHONE_POSITION[2],
  ]
}

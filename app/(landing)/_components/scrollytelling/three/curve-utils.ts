import { CatmullRomCurve3, Vector3 } from "three"

export function easeOutCubic(value: number) {
  const amount = 1 - clamp01(value)

  return 1 - amount * amount * amount
}

export function easeInCubic(value: number) {
  const amount = clamp01(value)

  return amount * amount * amount
}

export function easeInOutCubic(value: number) {
  const amount = clamp01(value)

  return amount < 0.5
    ? 4 * amount * amount * amount
    : 1 - Math.pow(-2 * amount + 2, 3) / 2
}

export function createCentripetalCurve(points: Vector3[]) {
  return new CatmullRomCurve3(points, false, "centripetal", 0.48)
}

export function sampleCurve(
  target: Vector3,
  curve: CatmullRomCurve3,
  amount: number
) {
  return target.copy(curve.getPoint(clamp01(amount)))
}

export function sampleCubicBezier(
  target: Vector3,
  start: Vector3,
  controlA: Vector3,
  controlB: Vector3,
  end: Vector3,
  amount: number
) {
  const t = clamp01(amount)
  const inverse = 1 - t

  return target
    .copy(start)
    .multiplyScalar(inverse * inverse * inverse)
    .addScaledVector(controlA, 3 * inverse * inverse * t)
    .addScaledVector(controlB, 3 * inverse * t * t)
    .addScaledVector(end, t * t * t)
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

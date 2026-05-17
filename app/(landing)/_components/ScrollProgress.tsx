"use client"

import { useEffect, useRef, useCallback } from "react"
import { useSmoothScroll } from "../_providers/SmoothScrollProvider"

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)
  const smoothScrollRef = useSmoothScroll()
  const rafIdRef = useRef(0)
  const currentScaleRef = useRef(0)
  const targetScaleRef = useRef(0)

  const lerp = useCallback((a: number, b: number, t: number) => {
    return a + (b - a) * t
  }, [])

  /* Smooth RAF loop – interpolates toward target using lerp */
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let active = true
    const LERP_FACTOR = 0.12

    const tick = () => {
      if (!active) return

      const target = targetScaleRef.current
      const current = currentScaleRef.current

      // Snap when close enough to avoid endless micro-updates
      if (Math.abs(target - current) < 0.0005) {
        if (current !== target) {
          currentScaleRef.current = target
          bar.style.transform = `scaleX(${target})`
        }
      } else {
        const next = lerp(current, target, LERP_FACTOR)
        currentScaleRef.current = next
        bar.style.transform = `scaleX(${next})`
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      active = false
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [lerp])

  /* Update target on every scroll event (passive, no re-render) */
  useEffect(() => {
    const computeProgress = () => {
      const root = document.documentElement
      const total = root.scrollHeight - root.clientHeight
      targetScaleRef.current = total > 0 ? root.scrollTop / total : 0
    }

    // Immediately compute on mount
    computeProgress()
    currentScaleRef.current = targetScaleRef.current
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${currentScaleRef.current})`
    }

    // Hook into Lenis for smooth updates if available
    const lenis = smoothScrollRef?.current
    if (lenis) {
      lenis.on("scroll", computeProgress)
    }

    // Fallback native scroll listener (also fires with Lenis)
    window.addEventListener("scroll", computeProgress, { passive: true })
    window.addEventListener("resize", computeProgress)

    return () => {
      if (lenis) {
        lenis.off("scroll", computeProgress)
      }
      window.removeEventListener("scroll", computeProgress)
      window.removeEventListener("resize", computeProgress)
    }
  }, [smoothScrollRef])

  return (
    <div
      aria-label="Napredak kroz stranicu"
      role="progressbar"
      className="fixed inset-x-0 top-0 z-[80] h-0.5 pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-primary will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}

export { ScrollProgress }

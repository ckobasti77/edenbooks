"use client"

import Lenis from "lenis"
import { useEffect, type ReactNode } from "react"

type SmoothScrollProviderProps = {
  children: ReactNode
}

function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )

    if (prefersReducedMotion.matches) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      anchors: true,
    })

    let frameId = 0

    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return children
}

export { SmoothScrollProvider }

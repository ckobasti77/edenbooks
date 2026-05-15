"use client"

import gsap from "gsap"
import Lenis from "lenis"
import { useEffect, type ReactNode } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on("scroll", updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return children
}

export { SmoothScrollProvider }

"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import gsap from "gsap"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollProviderProps = {
  children: ReactNode
}

type SmoothScrollRef = {
  current: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollRef | null>(null)

function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

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
    lenisRef.current = lenis

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
      lenisRef.current = null
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export { SmoothScrollProvider, useSmoothScroll }

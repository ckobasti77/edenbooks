"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRightIcon, AudioLinesIcon, BookOpenIcon } from "lucide-react"

import {
  BOOK_COVER_ASSETS,
  PHONE_MOBILE_FALLBACK_IMAGE,
} from "./three/constants"
import { ScrollyCopy, scrollyCopyScenes } from "./ScrollyCopy"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

gsap.registerPlugin(ScrollTrigger)

const ThreePhoneScene = dynamic(
  () =>
    import("./three/ThreePhoneScene").then((module) => module.ThreePhoneScene),
  {
    loading: () => <SceneLoadingFallback />,
    ssr: false,
  }
)

const mobileBookImages = [
  "/images/books/1.avif",
  "/images/books/2.avif",
  "/images/books/3.avif",
  "/images/books/4.avif",
  "/images/books/5.avif",
] as const

function EdenBooks3DScrollytelling() {
  const rootRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const root = rootRef.current

    if (!root) {
      return
    }

    const ctx = gsap.context(() => {
      const pinElement = root.querySelector("[data-eden-3d-sticky]")
      const trigger = ScrollTrigger.create({
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
        pin: pinElement ?? undefined,
        pinSpacing: false,
        scrub: 0.9,
        start: "top top",
        trigger: root,
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        trigger.kill()
      }
    }, root)

    return () => {
      ctx.revert()
    }
  }, [shouldReduceMotion])

  return (
    <div id="pocetna" className="relative">
      <span id="biblioteka" className="absolute top-[38%]" aria-hidden="true" />
      <span id="audio-knjige" className="absolute top-[72%]" aria-hidden="true" />
      <span id="preporuke" className="absolute bottom-0" aria-hidden="true" />

      <section
        ref={rootRef}
        className={cn(
          "relative hidden h-[261vh] bg-[#02040a] lg:block",
          shouldReduceMotion && "lg:hidden"
        )}
      >
        <div
          data-eden-3d-sticky="true"
          className="relative top-0 h-screen overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#02040a]" />
          <div
            className="absolute -inset-20 scale-105 opacity-90 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 78% 18%, rgba(47,140,255,0.18), transparent 30rem), radial-gradient(ellipse at 64% 82%, rgba(124,199,255,0.12), transparent 26rem), radial-gradient(ellipse at 23% 78%, rgba(47,140,255,0.1), transparent 24rem), radial-gradient(ellipse at 88% 58%, rgba(132,240,212,0.06), transparent 20rem), radial-gradient(ellipse at 14% 30%, rgba(78,121,255,0.08), transparent 22rem), linear-gradient(135deg, #02040a 0%, #050914 54%, #08111f 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:78px_78px]" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-background to-transparent" />

          <ThreePhoneScene progress={progress} />
          <ScrollyCopy progress={progress} />
        </div>
      </section>

      <MobileScrollyFallback
        className={cn("lg:hidden", shouldReduceMotion && "lg:block")}
      />
    </div>
  )
}

function SceneLoadingFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      <div className="absolute right-[15%] top-1/2 h-[400px] w-[214px] -translate-y-1/2 rounded-[2.5rem] border border-white/10 bg-white/[0.045] shadow-[0_42px_100px_rgba(0,0,0,0.45)]" />
      <div
        className="absolute right-[3%] top-[18%] h-[58%] w-[46%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 35% 28%, rgba(47,140,255,0.2), transparent 24rem), radial-gradient(ellipse at 78% 72%, rgba(124,199,255,0.11), transparent 20rem)",
        }}
      />
    </div>
  )
}

type MobileScrollyFallbackProps = {
  className?: string
}

function MobileScrollyFallback({ className }: MobileScrollyFallbackProps) {
  return (
    <section className={cn("relative overflow-hidden pt-24", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.24),transparent_26rem),linear-gradient(180deg,#02040a_0%,#050914_100%)]" />
      <Container className="grid gap-16 py-12">
        {scrollyCopyScenes.map((scene, index) => {
          const Icon = index === 0 ? BookOpenIcon : AudioLinesIcon

          return (
            <article
              key={scene.eyebrow}
              className="grid max-w-full gap-8 overflow-hidden md:grid-cols-[0.9fr_1.1fr] md:items-center"
            >
              <div className="min-w-0 max-w-[calc(100vw-2.5rem)]">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                  <Icon className="size-4" />
                  {scene.eyebrow}
                </div>
                <h2 className="max-w-[calc(100vw-2.5rem)] text-4xl font-semibold leading-[1.04] text-white sm:text-5xl">
                  {scene.headline}
                </h2>
                <p className="mt-5 max-w-[calc(100vw-2.5rem)] text-base leading-7 text-white/68">
                  {scene.subheadline}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {scene.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/72"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
                >
                  <a href={scene.href}>
                    {scene.cta}
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </Button>
              </div>

              {index === 0 ? <MobileLibraryVisual /> : <MobileAudioVisual />}
            </article>
          )
        })}
      </Container>
    </section>
  )
}

function MobileLibraryVisual() {
  return (
    <div className="relative mx-auto min-h-[410px] w-full max-w-sm overflow-hidden">
      <div className="absolute left-1/2 top-[48%] size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/22 blur-3xl" />
      <div className="absolute inset-x-4 top-8 grid grid-cols-3 gap-3 opacity-80">
        {mobileBookImages.slice(0, 3).map((src, index) => (
          <div
            key={src}
            className={cn(
              "relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/35",
              index === 0 && "translate-y-12 rotate-[-8deg]",
              index === 1 && "rotate-[2deg]",
              index === 2 && "translate-y-10 rotate-[8deg]"
            )}
          >
            <Image
              src={src}
              alt={BOOK_COVER_ASSETS[index].title}
              fill
              sizes="110px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Image
        src={PHONE_MOBILE_FALLBACK_IMAGE}
        alt="EdenBooks mobilna aplikacija"
        width={300}
        height={520}
        priority
        className="relative z-10 mx-auto h-auto w-[72%] object-contain drop-shadow-[0_36px_70px_rgba(0,0,0,0.5)]"
      />
    </div>
  )
}

function MobileAudioVisual() {
  return (
    <div className="relative mx-auto min-h-[380px] w-full max-w-sm overflow-hidden">
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <Image
        src={PHONE_MOBILE_FALLBACK_IMAGE}
        alt="EdenBooks audio režim"
        width={300}
        height={520}
        className="relative z-10 mx-auto h-auto w-[70%] object-contain drop-shadow-[0_36px_70px_rgba(0,0,0,0.5)]"
      />
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="absolute left-1/2 top-[66%] z-20 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35"
          style={{
            height: `${110 + index * 58}px`,
            opacity: 0.44 - index * 0.1,
            width: `${110 + index * 58}px`,
          }}
        />
      ))}
    </div>
  )
}

export { EdenBooks3DScrollytelling }

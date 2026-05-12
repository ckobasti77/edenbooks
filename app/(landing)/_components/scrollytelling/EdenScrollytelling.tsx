"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {
  scrollytellingAssets,
  scrollytellingBooks,
  scrollytellingScenes,
  scrollytellingTiming,
} from "../../_constants/scrollytelling"
import { ScrollyStage } from "./ScrollyStage"
import { ScrollyTextPanel } from "./ScrollyTextPanel"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

gsap.registerPlugin(ScrollTrigger)

function EdenScrollytelling() {
  const rootRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const root = rootRef.current

    if (!root) {
      return
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined

    const ctx = gsap.context(() => {
      matchMedia = gsap.matchMedia()

      matchMedia.add(
        `(min-width: ${scrollytellingTiming.desktopMinWidth}px)`,
        () => {
          const q = gsap.utils.selector(root)
          const copies = q("[data-scrolly-copy]")
          const phone = q("[data-scrolly-phone]")
          const phoneGlow = q("[data-phone-glow]")
          const phoneEmblem = q("[data-phone-emblem]")
          const floatingBooks = q("[data-floating-book]")
          const shelf = q("[data-library-shelf]")
          const selectedBook = q("[data-selected-book]")
          const audio = q("[data-audio-overlay]")
          const recommendations = q("[data-recommendation-layer]")
          const recommendationCards = q("[data-recommendation-card]")
          const finalCta = q("[data-final-cta-card]")
          const resolvedGlow = q("[data-resolved-glow]")

          gsap.set(copies, { autoAlpha: 0, y: 28, yPercent: -50 })
          gsap.set(q("[data-scrolly-copy='0']"), {
            autoAlpha: 1,
            y: 0,
            yPercent: -50,
          })
          gsap.set(phone, {
            x: 40,
            y: 12,
            rotateX: 7,
            rotateY: -16,
            rotateZ: 2,
            scale: 1.06,
            transformOrigin: "50% 50%",
          })
          gsap.set(phoneGlow, { scale: 1, autoAlpha: 0.85 })
          gsap.set(phoneEmblem, { y: 0, rotate: 0 })
          gsap.set(shelf, { autoAlpha: 0, scale: 0.92, y: 24, yPercent: -50 })
          gsap.set(selectedBook, { autoAlpha: 0, scale: 0.9, y: 28 })
          gsap.set(audio, { autoAlpha: 0, scale: 0.94, y: 28 })
          gsap.set(recommendations, { autoAlpha: 0, x: 70 })
          gsap.set(recommendationCards, { autoAlpha: 0, y: 34, scale: 0.94 })
          gsap.set(finalCta, { autoAlpha: 0, y: 22 })
          gsap.set(resolvedGlow, { scale: 0.85, autoAlpha: 0.55 })

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: scrollytellingTiming.scrub,
            },
          })

          tl.addLabel("discovery", scrollytellingTiming.labels.discovery)

          tl.addLabel("library", scrollytellingTiming.labels.library)
            .to(q("[data-scrolly-copy='0']"), { autoAlpha: 0, y: -28, yPercent: -50, duration: 0.32 }, "library")
            .to(q("[data-scrolly-copy='1']"), { autoAlpha: 1, y: 0, yPercent: -50, duration: 0.36 }, "library+=0.04")
            .to(
              phone,
              {
                x: 18,
                y: 0,
                rotateX: 3,
                rotateY: -4,
                rotateZ: 0,
                scale: 0.96,
                duration: 0.7,
              },
              "library"
            )
            .to(phoneGlow, { scale: 0.9, autoAlpha: 0.65, duration: 0.7 }, "library")
            .to(
              floatingBooks,
              {
                x: (index: number) => [-240, -110, 80, 210, 20][index] ?? 0,
                y: (index: number) => [132, 112, 92, 132, 176][index] ?? 0,
                rotate: 0,
                scale: 0.68,
                autoAlpha: 0.42,
                duration: 0.75,
                stagger: 0.025,
              },
              "library"
            )
            .to(shelf, { autoAlpha: 1, scale: 1, y: 0, yPercent: -50, duration: 0.5 }, "library+=0.14")

          tl.addLabel("audio", scrollytellingTiming.labels.audio)
            .to(q("[data-scrolly-copy='1']"), { autoAlpha: 0, y: -28, yPercent: -50, duration: 0.32 }, "audio")
            .to(q("[data-scrolly-copy='2']"), { autoAlpha: 1, y: 0, yPercent: -50, duration: 0.36 }, "audio+=0.04")
            .to(shelf, { autoAlpha: 0.18, x: -110, scale: 0.92, duration: 0.48 }, "audio")
            .to(selectedBook, { autoAlpha: 1, scale: 1, y: 0, duration: 0.48 }, "audio+=0.08")
            .to(audio, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5 }, "audio+=0.12")
            .to(
              phone,
              {
                x: -16,
                y: -4,
                rotateX: 4,
                rotateY: 7,
                scale: 0.92,
                duration: 0.65,
              },
              "audio"
            )
            .to(phoneEmblem, { y: 22, rotate: 12, duration: 0.6 }, "audio")
            .to(floatingBooks, { autoAlpha: 0.16, scale: 0.58, duration: 0.45 }, "audio")

          tl.addLabel("recommendations", scrollytellingTiming.labels.recommendations)
            .to(q("[data-scrolly-copy='2']"), { autoAlpha: 0, y: -28, yPercent: -50, duration: 0.32 }, "recommendations")
            .to(q("[data-scrolly-copy='3']"), { autoAlpha: 1, y: 0, yPercent: -50, duration: 0.36 }, "recommendations+=0.04")
            .to(audio, { autoAlpha: 0, y: -36, scale: 0.94, duration: 0.42 }, "recommendations")
            .to(selectedBook, { autoAlpha: 0, x: -70, scale: 0.84, duration: 0.42 }, "recommendations")
            .to(shelf, { autoAlpha: 0, x: -160, duration: 0.38 }, "recommendations")
            .to(floatingBooks, { autoAlpha: 0, scale: 0.48, duration: 0.38 }, "recommendations")
            .to(
              phone,
              {
                x: -300,
                y: 34,
                rotateX: 2,
                rotateY: 15,
                rotateZ: -2,
                scale: 0.7,
                autoAlpha: 0.56,
                duration: 0.72,
              },
              "recommendations"
            )
            .to(recommendations, { autoAlpha: 1, x: 0, duration: 0.5 }, "recommendations+=0.08")
            .to(
              recommendationCards,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.42,
                stagger: 0.08,
              },
              "recommendations+=0.18"
            )
            .to(finalCta, { autoAlpha: 1, y: 0, duration: 0.42 }, "recommendations+=0.42")
            .to(resolvedGlow, { scale: 1.18, autoAlpha: 0.75, duration: 0.7 }, "recommendations")

          requestAnimationFrame(() => ScrollTrigger.refresh())

          return () => {
            tl.kill()
          }
        }
      )
    }, root)

    return () => {
      matchMedia?.revert()
      ctx.revert()
    }
  }, [shouldReduceMotion])

  return (
    <div id="pocetna" className="relative">
      <span id="biblioteka" className="absolute top-[25%]" aria-hidden="true" />
      <span id="audio-knjige" className="absolute top-[50%]" aria-hidden="true" />
      <span id="preporuke" className="absolute top-[75%]" aria-hidden="true" />
      <section
        ref={rootRef}
        className={cn(
          "relative hidden h-[400vh] lg:block",
          shouldReduceMotion && "lg:hidden"
        )}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollyStage />
        </div>
      </section>

      <ScrollyFallback className={cn("lg:hidden", shouldReduceMotion && "lg:block")} />
    </div>
  )
}

function ScrollyFallback({ className }: { className?: string }) {
  return (
    <section className={cn("relative overflow-hidden pt-24", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.22),transparent_28rem),linear-gradient(180deg,#02040a_0%,#050914_100%)]" />
      <Container className="flex flex-col gap-16 py-12">
        {scrollytellingScenes.map((scene, index) => (
          <div key={scene.key} className="grid gap-8 lg:grid-cols-2">
            <ScrollyTextPanel scene={scene} index={index} staticMode />
            <MobileSceneVisual index={index} />
          </div>
        ))}
      </Container>
    </section>
  )
}

function MobileSceneVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
        <Image
          src={scrollytellingAssets.phone}
          alt="Eden Books mobilna aplikacija"
          width={330}
          height={560}
          priority
          className="relative mx-auto h-auto w-[78%] object-contain drop-shadow-[0_36px_70px_rgba(0,0,0,0.5)]"
        />
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative size-24 overflow-hidden rounded-2xl">
            <Image
              src={scrollytellingBooks[2].src}
              alt={scrollytellingBooks[2].title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">
              Nastavi tamo gde si stao
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {scrollytellingBooks.slice(index === 3 ? 1 : 0, index === 3 ? 4 : 3).map((book) => (
        <div
          key={book.src}
          className="rounded-2xl border border-white/10 bg-white/[0.055] p-2 shadow-xl shadow-black/25"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src={book.src}
              alt={book.title}
              fill
              sizes="110px"
              className="object-cover"
            />
          </div>
          <p className="mt-2 truncate text-xs text-white/72">{book.title}</p>
        </div>
      ))}
      {index === 3 && (
        <Button asChild className="col-span-3 mt-2">
          <a href="#zapocni">Započni čitanje</a>
        </Button>
      )}
    </div>
  )
}

export { EdenScrollytelling }

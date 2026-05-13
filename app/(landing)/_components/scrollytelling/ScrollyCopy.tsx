"use client"

import { ArrowRightIcon, BookOpenIcon, HeadphonesIcon } from "lucide-react"

import { smoothstep } from "./three/constants"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"

type ScrollyCopyProps = {
  progress: number
}

export const scrollyCopyScenes = [
  {
    icon: BookOpenIcon,
    eyebrow: "DIGITALNA BIBLIOTEKA",
    headline: "Čitaj knjige kao da su već u tvojoj biblioteci.",
    subheadline:
      "Digitalna biblioteka koja ti otvara knjigu odmah - bez čekanja, bez komplikacija, direktno na telefonu.",
    cta: "Istraži biblioteku",
    href: "#biblioteka",
    chips: ["Knjige odmah", "Reader mode", "Uvek dostupno"],
  },
  {
    icon: HeadphonesIcon,
    eyebrow: "AUDIO KNJIGE",
    headline: "Kada ne možeš da čitaš - slušaj.",
    subheadline:
      "Audio knjige prate korisnika u pokretu, dok vizuelni talasi iz telefona jasno pokazuju da EdenBooks nije samo čitanje.",
    cta: "Pogledaj audio iskustvo",
    href: "#audio-knjige",
    chips: ["Audio režim", "U pokretu", "Premium iskustvo"],
  },
] as const

function ScrollyCopy({ progress }: ScrollyCopyProps) {
  const audioAmount = smoothstep(0.66, 0.82, progress)

  return (
    <Container className="pointer-events-none relative z-20 grid h-full grid-cols-[0.9fr_1.1fr] items-center pt-20">
      <div className="relative min-h-[520px] max-w-[620px]">
        <CopyPanel
          headingLevel={1}
          opacity={1 - audioAmount}
          scene={scrollyCopyScenes[0]}
          translateY={-18 * audioAmount}
        />
        <CopyPanel
          headingLevel={2}
          opacity={audioAmount}
          scene={scrollyCopyScenes[1]}
          translateY={26 * (1 - audioAmount)}
        />
      </div>
    </Container>
  )
}

type CopyPanelProps = {
  headingLevel: 1 | 2
  opacity: number
  scene: (typeof scrollyCopyScenes)[number]
  translateY: number
}

function CopyPanel({ headingLevel, opacity, scene, translateY }: CopyPanelProps) {
  const Icon = scene.icon
  const Heading = headingLevel === 1 ? "h1" : "h2"

  return (
    <div
      className="absolute left-0 top-[66%] w-full -translate-y-1/2 transition-transform duration-200"
      style={{
        opacity,
        transform: `translateY(calc(-50% + ${translateY}px))`,
      }}
    >
      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Icon className="size-4" />
        {scene.eyebrow}
      </div>

      <Heading className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl xl:text-[4rem]">
        {scene.headline}
      </Heading>

      <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
        {scene.subheadline}
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {scene.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm font-medium text-white/74 backdrop-blur-xl"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="pointer-events-auto mt-9">
        <Button
          asChild
          size="lg"
          className="h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
        >
          <a href={scene.href}>
            {scene.cta}
            <ArrowRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </div>
  )
}

export { ScrollyCopy }

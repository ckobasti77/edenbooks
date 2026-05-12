import { ArrowRightIcon } from "lucide-react"

import { scrollytellingScenes } from "../../_constants/scrollytelling"
import { GenreChip } from "./GenreChip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

type ScrollyScene = (typeof scrollytellingScenes)[number]

type ScrollyTextPanelProps = {
  scene: ScrollyScene
  index: number
  className?: string
  staticMode?: boolean
}

function ScrollyTextPanel({
  scene,
  index,
  className,
  staticMode = false,
}: ScrollyTextPanelProps) {
  const Heading = index === 0 ? "h1" : "h2"
  const chips =
    "featurePills" in scene
      ? scene.featurePills
      : "categoryChips" in scene
        ? scene.categoryChips
        : "uiLabels" in scene
          ? scene.uiLabels
          : "recommendationChips" in scene
            ? scene.recommendationChips
            : []

  return (
    <div
      data-scrolly-copy={index}
      className={cn(
        !staticMode &&
          "absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0",
        index === 0 && !staticMode && "opacity-100",
        className
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        {scene.eyebrow}
      </p>
      <Heading className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
        {scene.title}
      </Heading>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
        {scene.text}
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {chips.map((chip) => (
          <GenreChip key={chip} label={chip} />
        ))}
      </div>

      {"primaryCta" in scene && (
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
          >
            <a href="#biblioteka">
              {scene.primaryCta}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-xl border-white/12 bg-white/[0.045] px-5 text-white hover:bg-white/[0.09]"
          >
            <a href="#audio-knjige">{scene.secondaryCta}</a>
          </Button>
        </div>
      )}

      {"cta" in scene && (
        <Button
          asChild
          size="lg"
          className="mt-9 h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
        >
          <a href="#zapocni">
            {scene.cta}
            <ArrowRightIcon data-icon="inline-end" />
          </a>
        </Button>
      )}
    </div>
  )
}

export { ScrollyTextPanel }

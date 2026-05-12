import Image from "next/image"
import { SparklesIcon } from "lucide-react"

import {
  scrollytellingAssets,
  scrollytellingBooks,
  scrollytellingScenes,
} from "../../_constants/scrollytelling"
import { AudioPlayerMock } from "./AudioPlayerMock"
import { BookShelf } from "./BookShelf"
import { FloatingBookCard } from "./FloatingBookCard"
import { PhoneMockup } from "./PhoneMockup"
import { RecommendationCard } from "./RecommendationCard"
import { ScrollyTextPanel } from "./ScrollyTextPanel"
import { GenreChip } from "./GenreChip"
import { Button } from "@/components/ui/button"

const floatingPositions = [
  "left-[4%] top-[18%] rotate-[-9deg]",
  "right-[7%] top-[16%] rotate-[8deg]",
  "left-[10%] bottom-[20%] rotate-[7deg]",
  "right-[2%] bottom-[24%] rotate-[-6deg]",
  "left-[43%] top-[8%] rotate-[4deg]",
]

function ScrollyStage() {
  const recommendationScene = scrollytellingScenes[3]

  return (
    <div className="relative h-full overflow-hidden bg-[#02040a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(47,140,255,0.24),transparent_34rem),radial-gradient(circle_at_20%_70%,rgba(124,199,255,0.10),transparent_26rem),linear-gradient(135deg,#02040a_0%,#050914_52%,#08111f_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-[0.92fr_1.08fr] items-center gap-12 px-6 pt-16 lg:px-8">
        <div className="relative z-30 h-full">
          {scrollytellingScenes.map((scene, index) => (
            <ScrollyTextPanel key={scene.key} scene={scene} index={index} />
          ))}
        </div>

        <div
          className="relative h-full min-h-0"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-0">
            {scrollytellingBooks.map((book, index) => (
              <FloatingBookCard
                key={book.src}
                src={book.src}
                title={book.title}
                meta={book.meta}
                index={index}
                className={floatingPositions[index]}
              />
            ))}
          </div>

          <div className="absolute right-[12%] top-1/2 z-20 -translate-y-1/2">
            <PhoneMockup />
          </div>

          <BookShelf />

          <div
            data-selected-book
            className="absolute left-[8%] top-[23%] z-20 w-44 rounded-3xl border border-white/12 bg-white/[0.07] p-3 opacity-0 shadow-2xl shadow-black/35 backdrop-blur-2xl will-change-transform"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/10">
              <Image
                src={scrollytellingBooks[2].src}
                alt={scrollytellingBooks[2].title}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">
              {scrollytellingBooks[2].title}
            </p>
            <p className="mt-1 text-xs text-white/48">Izabrano za slušanje</p>
          </div>

          <AudioPlayerMock />

          <div
            data-recommendation-layer
            className="absolute inset-y-0 right-0 z-30 flex w-[560px] max-w-[78vw] items-center opacity-0 will-change-transform"
          >
            <div className="w-full">
              <div className="mb-4 flex flex-wrap justify-end gap-2">
                {"recommendationChips" in recommendationScene &&
                  recommendationScene.recommendationChips.map((chip) => (
                    <GenreChip
                      key={chip}
                      data-recommendation-chip
                      label={chip}
                    />
                  ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {scrollytellingBooks.slice(0, 3).map((book, index) => (
                  <RecommendationCard
                    key={book.src}
                    src={book.src}
                    title={book.title}
                    meta={book.meta}
                    index={index}
                  />
                ))}
              </div>
              <div
                data-final-cta-card
                className="mt-4 rounded-3xl border border-white/12 bg-[#07101e]/88 p-5 opacity-0 shadow-2xl shadow-black/40 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
                    <Image
                      src={scrollytellingAssets.emblem}
                      alt=""
                      width={42}
                      height={30}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      Tvoja sledeća knjiga je već tu.
                    </p>
                    <p className="mt-1 text-xs text-white/52">
                      Premium izbor prema tvom ritmu čitanja.
                    </p>
                  </div>
                  <Button asChild size="sm" className="shrink-0">
                    <a href="#zapocni">
                      {"cta" in recommendationScene
                        ? recommendationScene.cta
                        : "Započni čitanje"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            data-resolved-glow
            className="absolute right-[18%] top-[48%] -z-0 size-[500px] -translate-y-1/2 rounded-full bg-primary/12 opacity-60 blur-3xl"
          />
          <SparklesIcon
            data-spark-mark
            className="absolute right-[18%] top-[18%] size-5 text-primary/70"
          />
        </div>
      </div>
    </div>
  )
}

export { ScrollyStage }

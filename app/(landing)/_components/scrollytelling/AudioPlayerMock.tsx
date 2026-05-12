import Image from "next/image"
import { HeadphonesIcon, PauseIcon } from "lucide-react"

import { scrollytellingBooks, scrollytellingScenes } from "../../_constants/scrollytelling"

function AudioPlayerMock() {
  const audioScene = scrollytellingScenes[2]
  const selectedBook = scrollytellingBooks[2]

  return (
    <div
      data-audio-overlay
      className="absolute bottom-12 left-1/2 z-30 w-[min(520px,82vw)] -translate-x-1/2 rounded-[1.75rem] border border-white/12 bg-[#07101e]/88 p-4 opacity-0 shadow-2xl shadow-blue-950/45 backdrop-blur-2xl will-change-transform"
    >
      <div className="flex items-center gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          <Image
            src={selectedBook.src}
            alt={selectedBook.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-primary">
            <HeadphonesIcon className="size-4" />
            <span className="text-xs font-medium uppercase tracking-[0.18em]">
              {"uiLabels" in audioScene ? audioScene.uiLabels[3] : "Audio režim"}
            </span>
          </div>
          <p className="mt-2 truncate text-sm font-semibold text-white">
            {"uiLabels" in audioScene
              ? audioScene.uiLabels[0]
              : "Nastavi tamo gde si stao"}
          </p>
          <div className="mt-4 flex items-end gap-1">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className="w-1 rounded-full bg-primary/70"
                style={{ height: `${10 + ((index * 7) % 26)}px` }}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Pauziraj audio"
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/25"
        >
          <PauseIcon className="size-5 fill-current" />
        </button>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {"uiLabels" in audioScene &&
          audioScene.uiLabels.slice(1, 3).map((label) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs text-white/62"
            >
              {label}
            </div>
          ))}
      </div>
    </div>
  )
}

export { AudioPlayerMock }

import Image from "next/image"
import { BookOpenIcon, SparklesIcon } from "lucide-react"

import {
  scrollytellingAssets,
  scrollytellingBooks,
} from "../../_constants/scrollytelling"

function PhoneMockup() {
  const activeBook = scrollytellingBooks[0]

  return (
    <div
      data-scrolly-phone
      className="phone-shell relative mx-auto h-[560px] w-[310px] will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        data-phone-glow
        className="absolute left-1/2 top-1/2 -z-10 size-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/24 blur-3xl will-change-transform"
      />

      <div className="absolute inset-[58px_31px_60px_31px] z-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#06101f] shadow-inner shadow-black/80">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-[0.68rem] font-semibold text-white">
            EDEN BOOKS
          </span>
          <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_rgba(47,140,255,0.9)]" />
        </div>
        <div className="p-5">
          <div className="relative mx-auto aspect-[3/4] w-36 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-black/35">
            <Image
              src={activeBook.src}
              alt={activeBook.title}
              fill
              priority
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/16 text-primary">
              <BookOpenIcon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Tvoja sledeća knjiga
              </p>
              <p className="mt-1 text-xs text-white/48">68% pročitano</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-primary shadow-[0_0_18px_rgba(47,140,255,0.75)]" />
          </div>
        </div>
      </div>

      <div
        data-phone-emblem
        className="absolute -right-10 top-20 z-20 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-primary shadow-2xl shadow-black/30 backdrop-blur-xl will-change-transform"
      >
        <SparklesIcon className="size-6" />
      </div>

      <Image
        src={scrollytellingAssets.phone}
        alt="Eden Books mobilna aplikacija"
        fill
        priority
        sizes="(min-width: 1024px) 340px, 280px"
        className="z-10 object-contain drop-shadow-[0_42px_80px_rgba(0,0,0,0.55)]"
      />
    </div>
  )
}

export { PhoneMockup }

"use client"

import Image from "next/image"
import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRightIcon,
  BellIcon,
  BookOpenIcon,
  BookmarkIcon,
  CloudIcon,
  HeadphonesIcon,
  LockIcon,
  MonitorIcon,
  PauseIcon,
  RefreshCcwIcon,
  SearchIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SmartphoneIcon,
  SparklesIcon,
  TabletIcon,
  type LucideIcon,
} from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

gsap.registerPlugin(ScrollTrigger)

type BookCover = {
  title: string
  author: string
  image: string
  progress: number
  accent: string
}

const showcaseBooks: BookCover[] = [
  {
    title: "Skriveni gradovi",
    author: "Luka Vuković",
    image: "/images/books/1.avif",
    progress: 43,
    accent: "#59baff",
  },
  {
    title: "Tišina između redova",
    author: "Nina Kovač",
    image: "/images/books/2.avif",
    progress: 81,
    accent: "#8dcfff",
  },
  {
    title: "Sedam pisama",
    author: "Petar Marković",
    image: "/images/books/3.avif",
    progress: 25,
    accent: "#e7a65a",
  },
  {
    title: "Kad se vetar smiri",
    author: "Iva Janković",
    image: "/images/books/4.avif",
    progress: 100,
    accent: "#62d8ff",
  },
]

const pillIcons: Record<string, LucideIcon> = {
  Desktop: MonitorIcon,
  Tablet: TabletIcon,
  Telefon: SmartphoneIcon,
  Sinhronizovano: RefreshCcwIcon,
  Audio: HeadphonesIcon,
}

const benefitIcons: Record<string, LucideIcon> = {
  "Uvek sinhronizovano": CloudIcon,
  "Nastavi tačno gde si stao": BookmarkIcon,
  "Čitaj ili slušaj": HeadphonesIcon,
  "Tvoji podaci su sigurni": LockIcon,
}

function GlowButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex h-14 items-center justify-center rounded-full border border-[#54b9ff]/85 bg-[linear-gradient(135deg,#117fff,#0758d7)] px-7 text-base font-extrabold text-white shadow-[0_0_0_1px_rgba(122,204,255,0.22),0_0_42px_rgba(47,140,255,0.55),inset_0_1px_0_rgba(255,255,255,0.24)] transition duration-300 [font-family:var(--font-ui)] hover:border-[#9bdcff] hover:shadow-[0_0_0_1px_rgba(122,204,255,0.32),0_0_56px_rgba(47,140,255,0.72),inset_0_1px_0_rgba(255,255,255,0.28)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#47adff]/45"
    >
      <BookmarkIcon className="mr-3 size-5" strokeWidth={1.8} />
      <span>{children}</span>
      <ArrowRightIcon className="ml-3 size-5 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}

function BookCoverCard({ book, compact = false }: { book: BookCover; compact?: boolean }) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1727] shadow-[0_16px_34px_rgba(0,0,0,0.35)]",
          compact ? "aspect-[0.72]" : "aspect-[0.7]"
        )}
      >
        <Image
          src={book.image}
          alt=""
          fill
          sizes={compact ? "110px" : "150px"}
          className="object-cover opacity-82"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.02),rgba(5,9,20,0.16)_48%,rgba(5,9,20,0.78))]" />
        <div className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full border border-white/12 bg-black/42 text-white/70 backdrop-blur-md">
          <HeadphonesIcon className="size-3" strokeWidth={1.7} />
        </div>
      </div>
      <p
        className={cn(
          "mt-2 truncate font-bold text-white/86 [font-family:var(--font-ui)]",
          compact ? "text-[0.58rem]" : "text-[0.68rem]"
        )}
      >
        {book.title}
      </p>
      <p className="mt-0.5 truncate text-[0.55rem] text-white/44 [font-family:var(--font-ui)]">
        {book.author}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full shadow-[0_0_10px_currentColor]"
            style={{ width: `${book.progress}%`, backgroundColor: book.accent, color: book.accent }}
          />
        </div>
        <span className="text-[0.55rem] font-bold text-white/46 [font-family:var(--font-ui)]">
          {book.progress}%
        </span>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative w-[46rem]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.55rem] rounded-b-[0.65rem] border-x-2 border-t-2 border-[#4b5665]/86 bg-[#06101e] p-3 shadow-[0_44px_110px_rgba(0,0,0,0.82),0_0_0_1px_rgba(128,194,255,0.15),0_0_80px_rgba(47,140,255,0.18),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-black/80" />
        <div className="relative grid h-full grid-cols-[8.8rem_1fr] overflow-hidden rounded-[1rem] border border-white/8 bg-[#050a14]">
          <aside className="border-r border-white/6 bg-[#070d18]/95 p-4">
            <div className="flex items-center gap-2 text-[#7acaff]">
              <SparklesIcon className="size-3.5 fill-current" strokeWidth={1.7} />
              <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.26em] [font-family:var(--font-ui)]">
                Eden Books
              </span>
            </div>
            <nav className="mt-8 grid gap-1.5">
              {[
                "Početna",
                "Biblioteka",
                "Trenutno čitam",
                "Beleške",
                "Citati",
                "Audio",
                "Podešavanja",
              ].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.62rem] font-bold [font-family:var(--font-ui)]",
                    index === 1
                      ? "border border-[#3caeff]/14 bg-[#2f8cff]/14 text-[#8ed0ff]"
                      : "text-slate-400/78"
                  )}
                >
                  {index === 5 ? (
                    <HeadphonesIcon className="size-3.5" strokeWidth={1.8} />
                  ) : index === 3 ? (
                    <BookmarkIcon className="size-3.5" strokeWidth={1.8} />
                  ) : (
                    <BookOpenIcon className="size-3.5" strokeWidth={1.8} />
                  )}
                  {item}
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 bg-[radial-gradient(circle_at_78%_8%,rgba(47,140,255,0.16),transparent_18rem),linear-gradient(180deg,#08111f,#050914)]">
            <header className="flex h-12 items-center justify-end gap-4 border-b border-white/6 px-5">
              <div className="flex h-7 w-40 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3">
                <SearchIcon className="size-3 text-white/38" strokeWidth={1.8} />
                <span className="text-[0.58rem] font-semibold text-white/38 [font-family:var(--font-ui)]">
                  Pretraga
                </span>
              </div>
              <BellIcon className="size-4 text-white/52" strokeWidth={1.7} />
              <div className="flex size-7 items-center justify-center rounded-full bg-[#176fe5] text-[0.65rem] font-extrabold text-white shadow-[0_0_22px_rgba(47,140,255,0.45)]">
                J
              </div>
            </header>

            <main className="grid grid-cols-[1fr_10.6rem] gap-4 p-5">
              <div className="min-w-0">
                <h3 className="text-[0.76rem] font-extrabold text-white [font-family:var(--font-ui)]">
                  Trenutno čitaš
                </h3>
                <div className="mt-3 grid grid-cols-[5.6rem_1fr] gap-4 rounded-2xl border border-white/8 bg-white/[0.045] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="relative aspect-[0.7] overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src="/images/books/5.avif"
                      alt=""
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(5,9,20,0.2)_50%,rgba(5,9,20,0.68))]" />
                  </div>
                  <div className="min-w-0 py-2">
                    <h4 className="truncate text-2xl font-medium leading-none text-white [font-family:var(--font-display)]">
                      Severna svetlost
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 [font-family:var(--font-reading)]">
                      Mila Petrović
                    </p>
                    <div className="mt-7 flex items-center justify-between text-[0.62rem] font-semibold text-slate-400 [font-family:var(--font-ui)]">
                      <span>Poslednja stranica: 152 od 224</span>
                      <span className="text-[#7acaff]">67%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[67%] rounded-full bg-[#2f8cff] shadow-[0_0_12px_rgba(47,140,255,0.8)]" />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="rounded-full bg-[#2f8cff] px-4 py-2 text-[0.62rem] font-extrabold text-white shadow-[0_0_18px_rgba(47,140,255,0.34)] [font-family:var(--font-ui)]">
                        Nastavi čitanje
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full border border-white/10 text-white/58">
                        <BookmarkIcon className="size-3.5" strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <h3 className="text-[0.76rem] font-extrabold text-white [font-family:var(--font-ui)]">
                    Moja biblioteka
                  </h3>
                  <span className="text-[0.58rem] font-bold text-white/42 [font-family:var(--font-ui)]">
                    Sortiraj: Najnovije
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  {["Sve", "E-knjige", "Audio knjige", "Preuzeto"].map((tag, index) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[0.58rem] font-extrabold [font-family:var(--font-ui)]",
                        index === 0
                          ? "bg-[#2f8cff] text-white shadow-[0_0_18px_rgba(47,140,255,0.28)]"
                          : "border border-white/10 bg-white/[0.025] text-white/48"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {showcaseBooks.map((book) => (
                    <BookCoverCard key={book.title} book={book} />
                  ))}
                </div>
              </div>

              <aside className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.045] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <h3 className="text-[0.68rem] font-extrabold text-white [font-family:var(--font-ui)]">
                  Nedavne beleške
                </h3>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Ideje dolaze u tišini.", "Str. 45 · 12. maj"],
                    ["Omiljeni citat iz poglavlja.", "Str. 112 · 11. maj"],
                    ["Podsetnik za kasnije.", "Str. 150 · 10. maj"],
                  ].map(([title, meta], index) => (
                    <div key={title} className="flex gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border",
                          index === 0 &&
                            "border-[#d7a64e]/28 bg-[#d7a64e]/12 text-[#ffd782]",
                          index === 1 &&
                            "border-[#ff904f]/28 bg-[#ff904f]/12 text-[#ffac7a]",
                          index === 2 &&
                            "border-[#47adff]/28 bg-[#47adff]/12 text-[#7acaff]"
                        )}
                      >
                        <BookmarkIcon className="size-3.5" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.6rem] font-bold text-white/82 [font-family:var(--font-ui)]">
                          {title}
                        </span>
                        <span className="mt-0.5 block text-[0.52rem] font-semibold text-white/36 [font-family:var(--font-ui)]">
                          {meta}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <span className="mt-5 inline-flex text-[0.58rem] font-extrabold text-[#62bdff] [font-family:var(--font-ui)]">
                  Prikaži sve beleške
                </span>
              </aside>
            </main>
          </div>
        </div>
      </div>
      <div className="mx-auto h-4 w-[42rem] rounded-b-[1.4rem] bg-[linear-gradient(90deg,#1d2430,#596577_38%,#202733_58%,#151b25)] shadow-[0_26px_54px_rgba(0,0,0,0.58)]" />
      <div className="mx-auto h-1.5 w-[34rem] rounded-b-full bg-[#0a0e16]" />
    </div>
  )
}

function TabletMockup() {
  return (
    <div className="relative h-[28rem] w-[20.4rem] overflow-hidden rounded-[2rem] border-[5px] border-[#151a21] bg-[#060b14] shadow-[0_34px_86px_rgba(0,0,0,0.78),0_0_0_1px_rgba(147,201,255,0.16),0_0_46px_rgba(47,140,255,0.22),inset_0_1px_0_rgba(255,255,255,0.22)]">
      <div className="absolute left-1/2 top-2 size-1.5 -translate-x-1/2 rounded-full bg-black/90" />
      <div className="flex h-full flex-col bg-[radial-gradient(circle_at_72%_0%,rgba(47,140,255,0.18),transparent_16rem),#07101e]">
        <header className="flex h-14 items-center justify-between border-b border-white/6 px-5">
          <h3 className="text-sm font-extrabold text-white [font-family:var(--font-ui)]">
            Biblioteka
          </h3>
          <div className="flex items-center gap-3 text-white/50">
            <SearchIcon className="size-4" strokeWidth={1.8} />
            <span className="grid size-4 grid-cols-2 gap-0.5">
              <span className="rounded-[2px] bg-current opacity-70" />
              <span className="rounded-[2px] bg-current opacity-70" />
              <span className="rounded-[2px] bg-current opacity-70" />
              <span className="rounded-[2px] bg-current opacity-70" />
            </span>
          </div>
        </header>

        <div className="flex-1 p-5">
          <div className="flex gap-2">
            {["E-knjige", "Audio", "Preuzeto"].map((item, index) => (
              <span
                key={item}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.62rem] font-extrabold [font-family:var(--font-ui)]",
                  index === 0
                    ? "border-[#2f8cff]/45 bg-[#2f8cff]/18 text-[#82cdff]"
                    : "border-white/10 bg-white/[0.025] text-white/48"
                )}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="grid grid-cols-[4.8rem_1fr] gap-4">
              <div className="relative aspect-[0.72] overflow-hidden rounded-lg border border-white/10">
                <Image src="/images/books/5.avif" alt="" fill sizes="78px" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(5,9,20,0.62))]" />
              </div>
              <div className="min-w-0 py-1">
                <h4 className="truncate text-sm font-medium text-white [font-family:var(--font-display)]">
                  Severna svetlost
                </h4>
                <p className="mt-1 text-[0.58rem] text-white/42 [font-family:var(--font-ui)]">
                  Mila Petrović
                </p>
                <p className="mt-4 text-[0.56rem] font-semibold text-white/40 [font-family:var(--font-ui)]">
                  Poslednja stranica 152 od 224
                </p>
                <div className="mt-2 h-1 rounded-full bg-white/10">
                  <div className="h-full w-[67%] rounded-full bg-[#2f8cff] shadow-[0_0_10px_rgba(47,140,255,0.72)]" />
                </div>
                <span className="mt-3 inline-flex rounded-full bg-white/8 px-3 py-1.5 text-[0.56rem] font-extrabold text-white [font-family:var(--font-ui)]">
                  Nastavi čitanje
                </span>
              </div>
            </div>
          </div>

          <h4 className="mt-6 text-[0.68rem] font-extrabold text-white/64 [font-family:var(--font-ui)]">
            Nedavne beleške
          </h4>
          <div className="mt-3 grid gap-2">
            {[
              "Ideje dolaze u tišini.",
              "Omiljeni citat iz poglavlja.",
              "Podsetnik za kasnije.",
            ].map((note, index) => (
              <div
                key={note}
                className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/[0.035] p-3"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-lg border",
                    index === 0 && "border-[#d7a64e]/28 bg-[#d7a64e]/12 text-[#ffd782]",
                    index === 1 && "border-[#ff904f]/28 bg-[#ff904f]/12 text-[#ffac7a]",
                    index === 2 && "border-[#47adff]/28 bg-[#47adff]/12 text-[#7acaff]"
                  )}
                >
                  <BookmarkIcon className="size-3" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.62rem] font-bold text-white/86 [font-family:var(--font-ui)]">
                    {note}
                  </span>
                  <span className="block text-[0.5rem] text-white/36 [font-family:var(--font-ui)]">
                    Str. {index === 0 ? 45 : index === 1 ? 112 : 150} · 12. maj
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid h-14 grid-cols-5 border-t border-white/7 bg-[#050914]/94 px-4 text-white/38">
          {[
            ["Početna", BookOpenIcon],
            ["Biblioteka", BookOpenIcon],
            ["Čitam", BookmarkIcon],
            ["Beleške", BookmarkIcon],
            ["Audio", HeadphonesIcon],
          ].map(([label, Icon], index) => {
            const TypedIcon = Icon as LucideIcon
            return (
              <div
                key={label as string}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-[0.46rem] font-bold [font-family:var(--font-ui)]",
                  index === 1 && "text-[#55b7ff]"
                )}
              >
                <TypedIcon className="size-3.5" strokeWidth={1.8} />
                <span>{label as string}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="relative h-[25.5rem] w-[12.2rem] overflow-hidden rounded-[2.15rem] border-[4px] border-[#171b20] bg-[#050810] shadow-[0_26px_70px_rgba(0,0,0,0.86),0_0_0_1px_rgba(147,201,255,0.15),0_0_38px_rgba(47,140,255,0.2),inset_0_1px_0_rgba(255,255,255,0.28)]">
      <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      <div className="flex h-full flex-col bg-[radial-gradient(circle_at_80%_0%,rgba(47,140,255,0.16),transparent_12rem),#070d18] pt-9">
        <div className="px-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.48rem] font-bold leading-snug text-white/48 [font-family:var(--font-ui)]">
              Severna svetlost
              <br />
              Mila Petrović
            </span>
            <BookmarkIcon className="size-3.5 text-white/52" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-5 px-5">
          <p className="text-[0.62rem] font-extrabold text-[#72c3ff] [font-family:var(--font-ui)]">
            Poglavlje 12
          </p>
          <h4 className="mt-1 text-base font-medium leading-tight text-white [font-family:var(--font-display)]">
            Severni vetar
          </h4>
        </div>

        <p className="mt-4 flex-1 px-5 text-[0.58rem] leading-[1.85] text-slate-300/82 [font-family:var(--font-reading)]">
          Negde daleko, gde se nebo dodiruje sa morem, vetar nosi priče koje niko ne
          čuje. Ali one ne prestaju da postoje. Ponekad je tišina najglasniji odgovor.
        </p>

        <div className="rounded-t-[1.7rem] border-t border-white/10 bg-[#0a101d]/96 px-5 pb-5 pt-4 shadow-[0_-18px_40px_rgba(0,0,0,0.52)]">
          <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/18" />
          <div className="flex items-center justify-between text-[0.5rem] font-bold text-white/42 [font-family:var(--font-ui)]">
            <span>Audio verzija</span>
            <span>08:12 / 24:43</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-lg border border-white/10">
              <Image src="/images/books/5.avif" alt="" fill sizes="32px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.62rem] font-extrabold text-white [font-family:var(--font-ui)]">
                Severna svetlost
              </p>
              <p className="truncate text-[0.5rem] text-white/45 [font-family:var(--font-ui)]">
                Mila Petrović
              </p>
            </div>
          </div>
          <div className="mt-4 h-1 rounded-full bg-white/10">
            <div className="h-full w-[34%] rounded-full bg-[#64c4ff] shadow-[0_0_10px_rgba(100,196,255,0.8)]" />
          </div>
          <div className="mt-4 flex items-center justify-between px-1 text-white/68">
            <SkipBackIcon className="size-4" strokeWidth={1.8} />
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2f8cff] text-white shadow-[0_0_24px_rgba(47,140,255,0.52)]">
              <PauseIcon className="size-4 fill-current" strokeWidth={1.8} />
            </span>
            <SkipForwardIcon className="size-4" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DeviceComposition() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[28rem] w-full max-w-[45rem] sm:h-[34rem] md:h-[37rem] lg:h-[39rem] lg:max-w-none"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[22rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#2f8cff]/18 blur-3xl sm:h-[28rem] sm:w-[40rem] lg:left-[56%]" />
      <div className="pointer-events-none absolute inset-x-4 bottom-8 h-px bg-gradient-to-r from-transparent via-[#2f8cff]/48 to-transparent" />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 scale-[0.42] sm:top-2 sm:scale-[0.58] md:scale-[0.68] lg:left-auto lg:right-[-9rem] lg:top-4 lg:translate-x-0 lg:scale-[0.7] xl:right-[-4.5rem] xl:scale-[0.78] 2xl:right-[-4rem] 2xl:scale-[0.9]">
        <div data-device>
          <DashboardMockup />
        </div>
      </div>

      <div className="absolute left-[4%] top-[9.6rem] scale-[0.58] sm:left-[23%] sm:top-[10.8rem] sm:scale-[0.76] md:left-[24%] md:top-[12rem] md:scale-[0.86] lg:left-auto lg:right-[8.5rem] lg:top-[14.8rem] lg:scale-[0.86] xl:right-[12rem] xl:scale-[0.94]">
        <div data-device>
          <TabletMockup />
        </div>
      </div>

      <div className="absolute right-[5%] top-[13rem] scale-[0.68] sm:right-[19%] sm:top-[16rem] sm:scale-[0.84] md:right-[18%] md:top-[17rem] md:scale-[0.92] lg:right-[-0.6rem] lg:top-[18.2rem] lg:scale-[0.9] xl:right-[3.8rem] xl:scale-100">
        <div data-device>
          <PhoneMockup />
        </div>
      </div>
    </div>
  )
}

function MultiDeviceSyncSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const section = landingCopy.sections.multiDevice

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]", root)
      const devices = gsap.utils.toArray<HTMLElement>("[data-device]", root)
      const benefitItems = gsap.utils.toArray<HTMLElement>("[data-benefit]", root)

      if (reduceMotion) {
        gsap.set([...revealItems, ...devices, ...benefitItems], {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          x: 0,
          scale: 1,
        })
        return
      }

      gsap.set(revealItems, { autoAlpha: 0, filter: "blur(10px)", y: 24 })
      gsap.set(devices, { autoAlpha: 0, scale: 0.96, x: 34 })
      gsap.set(benefitItems, { autoAlpha: 0, filter: "blur(8px)", y: 18 })

      let hasPlayed = false
      const playReveal = () => {
        if (hasPlayed) return

        hasPlayed = true

        gsap.to(revealItems, {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.075,
        })

        gsap.to(devices, {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.16,
          delay: 0.18,
        })

        gsap.to(benefitItems, {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.68,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.48,
        })
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        once: true,
        onEnter: playReveal,
      })

      requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.78 && rect.bottom > 0) {
          playReveal()
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id={section.id}
      className="relative isolate overflow-hidden bg-[#02040a] py-24 text-white sm:py-28 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#02040a]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_22%_20%,rgba(47,140,255,0.23),transparent_32rem),radial-gradient(circle_at_78%_30%,rgba(42,126,235,0.34),transparent_34rem),radial-gradient(circle_at_66%_78%,rgba(47,140,255,0.16),transparent_30rem),linear-gradient(180deg,#02040a_0%,#071322_48%,#02040a_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%,rgba(0,0,0,0.34))]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#55b7ff]/44 to-transparent sm:inset-x-10" />

      <Container className="max-w-[1420px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
          <div className="max-w-2xl text-center lg:text-left">
            <div
              data-reveal
              className="inline-flex items-center gap-3 text-sm font-extrabold uppercase text-[#a6dfff] [font-family:var(--font-ui)] [letter-spacing:0.28em]"
            >
              <SparklesIcon className="size-5 fill-[#4fb7ff] text-[#4fb7ff]" strokeWidth={1.65} />
              <span>EDEN BOOKS</span>
            </div>

            <h2
              data-reveal
              className="mx-auto mt-7 max-w-2xl text-[clamp(3.15rem,13vw,4.6rem)] font-medium leading-[0.96] text-white [font-family:var(--font-display)] sm:text-[clamp(4rem,8vw,5.2rem)] lg:mx-0 lg:text-[clamp(4rem,4.8vw,5.2rem)] 2xl:text-[5.75rem]"
            >
              <span className="block sm:whitespace-nowrap">Jedna biblioteka.</span>
              <span className="block">Svaki ekran.</span>
            </h2>

            <p
              data-reveal
              className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-200/76 [font-family:var(--font-reading)] sm:text-lg lg:mx-0"
            >
              {section.text}
            </p>

            <div data-reveal className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-3 lg:mx-0 lg:justify-start">
              {section.visualItems.map((item) => {
                const Icon = pillIcons[item]

                return (
                  <span
                    key={item}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 text-sm font-bold text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl [font-family:var(--font-ui)]"
                  >
                    {Icon ? <Icon className="size-4 text-[#76c9ff]" strokeWidth={1.8} /> : null}
                    {item}
                  </span>
                )
              })}
            </div>

            <div data-reveal className="mx-auto mt-7 flex max-w-xl items-start justify-center gap-3 lg:mx-0 lg:justify-start">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#47adff] shadow-[0_0_12px_rgba(71,173,255,0.95)]" />
              <p className="text-sm font-semibold text-slate-300/74 [font-family:var(--font-ui)] sm:text-base">
                {section.supportingText}
              </p>
            </div>

            <div data-reveal className="mt-10 flex justify-center lg:justify-start">
              <GlowButton href="#biblioteka">Započni čitanje</GlowButton>
            </div>
          </div>

          <DeviceComposition />
        </div>

        <div className="mt-16 grid gap-4 border-y border-[#58baff]/14 py-7 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-0 lg:py-8">
          {section.benefits.map((benefit, index) => {
            const Icon = benefitIcons[benefit.title] ?? BookOpenIcon

            return (
              <article
                key={benefit.title}
                data-benefit
                className={cn(
                  "flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:rounded-none lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:shadow-none",
                  index > 0 && "lg:border-l lg:border-white/8"
                )}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#65c4ff]/18 bg-[#2f8cff]/10 text-[#9bd8ff] shadow-[0_0_32px_rgba(47,140,255,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <Icon className="size-6" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-base font-extrabold leading-tight text-white [font-family:var(--font-ui)]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300/68 [font-family:var(--font-reading)]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export { MultiDeviceSyncSection }

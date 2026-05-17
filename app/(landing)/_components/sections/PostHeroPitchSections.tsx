import Image from "next/image"
import type { ReactNode } from "react"
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeadphonesIcon,
  StarIcon,
} from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { PricingSection } from "./PricingSection"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

type BookCardItem = {
  title: string
  image: string
}

const bookCards: BookCardItem[] = [
  {
    title: "TIHA BIBLIOTEKA",
    image: "/images/books/1.avif",
  },
  {
    title: "NOĆNO POGLAVLJE",
    image: "/images/books/2.avif",
  },
  {
    title: "GRAD OD REČI",
    image: "/images/books/3.avif",
  },
]

const phoneCatalog: BookCardItem[] = bookCards.concat([
  {
    title: "PLAVA POLICA",
    image: "/images/books/4.avif",
  },
])

function GlowButton({
  children,
  href,
  className,
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center rounded-full border border-[#47adff]/75 bg-[#07111f]/82 px-7 text-sm font-bold text-white shadow-[0_0_0_1px_rgba(71,173,255,0.18),0_0_34px_rgba(47,140,255,0.42),inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 [font-family:var(--font-ui)] hover:border-[#8ed0ff] hover:bg-[#0a1628] hover:shadow-[0_0_0_1px_rgba(142,208,255,0.28),0_0_46px_rgba(47,140,255,0.58),inset_0_1px_0_rgba(255,255,255,0.24)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#47adff]/45",
        className
      )}
    >
      <span>{children}</span>
      <ChevronRightIcon className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  )
}

function SectionBackground({ variant = "default" }: { variant?: "default" | "bottom" }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#02040a]" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-20",
          variant === "bottom"
            ? "bg-[radial-gradient(circle_at_20%_8%,rgba(47,140,255,0.2),transparent_31rem),radial-gradient(circle_at_82%_2%,rgba(26,91,160,0.28),transparent_30rem),linear-gradient(180deg,#071321_0%,#020712_44%,#000_100%)]"
            : "bg-[radial-gradient(circle_at_18%_4%,rgba(74,173,255,0.16),transparent_30rem),radial-gradient(circle_at_82%_14%,rgba(31,105,190,0.34),transparent_32rem),linear-gradient(135deg,#0a111a_0%,#030712_44%,#02040a_100%)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,transparent_42%,rgba(0,0,0,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#5bb9ff]/46 to-transparent sm:inset-x-10" />
    </>
  )
}

function BookRating() {
  return (
    <div className="flex items-center gap-1 text-[#2f8cff]" aria-label="Ocena 5 od 5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className="size-4 fill-current stroke-current" />
      ))}
    </div>
  )
}

function BookCard({ title, image }: BookCardItem) {
  return (
    <article className="group relative mx-auto w-full max-w-[18rem] overflow-hidden rounded-[1.65rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.055))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_0_1px_rgba(47,140,255,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#56b9ff]/56 hover:shadow-[0_34px_96px_rgba(0,0,0,0.5),0_0_44px_rgba(47,140,255,0.24),inset_0_1px_0_rgba(255,255,255,0.24)]">
      <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] bg-[radial-gradient(circle_at_50%_0%,rgba(80,181,255,0.18),transparent_58%)] opacity-80" />
      <div className="relative overflow-hidden rounded-[1.05rem] border border-[#6fc4ff]/22 bg-[#07101e] shadow-[0_20px_46px_rgba(0,0,0,0.48)]">
        <div className="relative aspect-[0.68] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 32vw, 72vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,10,0.04)_0%,transparent_58%,rgba(2,4,10,0.3)_100%)]" />
        </div>
        <span className="absolute left-3 top-3 rounded-full border border-[#53b9ff]/55 bg-black/48 px-3 py-1 text-[0.66rem] font-bold text-[#9bd8ff] shadow-[0_0_20px_rgba(47,140,255,0.3)] backdrop-blur-md [font-family:var(--font-ui)]">
          DODAJ NA POLICU
        </span>
      </div>
      <div className="relative pt-4">
        <h3 className="min-h-12 text-balance text-xl font-bold leading-tight text-white [font-family:var(--font-ui)]">
          {title}
        </h3>
        <div className="mt-3">
          <BookRating />
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="mt-4 grid grid-cols-2 divide-x divide-white/12 text-[#72c3ff]">
          <div className="flex justify-center">
            <BookOpenIcon className="size-7" strokeWidth={1.75} aria-label="E-knjiga" />
          </div>
          <div className="flex justify-center">
            <HeadphonesIcon
              className="size-7 text-white/72"
              strokeWidth={1.75}
              aria-label="Audio knjiga"
            />
          </div>
        </div>
      </div>
    </article>
  )
}

function CatalogSection() {
  const section = landingCopy.sections.digitalLibrary

  return (
    <section id="biblioteka" className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <SectionBackground />
      <Container>
        <h2 className="mx-auto max-w-4xl text-center text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.98] text-white [font-family:var(--font-display)]">
          {section.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-white/68 [font-family:var(--font-reading)] sm:text-lg">
          {section.text}
        </p>

        <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {section.visualItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm font-bold text-white/74 backdrop-blur-xl [font-family:var(--font-ui)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="relative mt-14 sm:mt-16">
          <button
            type="button"
            aria-label="Prethodne knjige"
            className="absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-xl border border-[#57b7ff]/50 bg-[#137edc]/85 text-white shadow-[0_0_30px_rgba(47,140,255,0.38)] transition hover:bg-[#2195ff] lg:flex"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <div className="grid gap-6 px-0 sm:grid-cols-3 sm:gap-5 lg:px-20 xl:gap-9">
            {bookCards.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Sledeće knjige"
            className="absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-xl border border-[#57b7ff]/50 bg-[#137edc]/85 text-white shadow-[0_0_30px_rgba(47,140,255,0.38)] transition hover:bg-[#2195ff] lg:flex"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <GlowButton href="#biblioteka">{landingCopy.hero.primaryCta}</GlowButton>
        </div>
      </Container>
    </section>
  )
}

function AppPhone({ variant }: { variant: "device" | "catalog" }) {
  const isCatalog = variant === "catalog"

  return (
    <div
      className={cn(
        "relative h-[29rem] w-[15.2rem] overflow-hidden rounded-[2.3rem] border border-white/18 bg-[#111827] p-2 shadow-[0_34px_92px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.22)]",
        !isCatalog && "rotate-[-4deg] bg-[linear-gradient(135deg,#1d1f23,#756d63_44%,#17191d)]",
        isCatalog && "rotate-[2deg] bg-[#060b15]"
      )}
    >
      <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      {isCatalog ? (
        <div className="relative h-full overflow-hidden rounded-[1.78rem] border border-white/10 bg-[#05101f] px-3 py-8">
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] font-bold text-[#72c3ff] [font-family:var(--font-ui)]">EDEN BOOKS</span>
            <span className="size-6 rounded-full border border-white/12 bg-white/8" />
          </div>
          <div className="mt-5 flex gap-2">
            {["Sve", "E-book", "Audio"].map((item, index) => (
              <span
                key={item}
                className={cn(
                  "rounded-full px-2 py-1 text-[0.58rem] font-bold [font-family:var(--font-ui)]",
                  index === 0
                    ? "bg-[#2f8cff] text-white"
                    : "border border-white/10 bg-white/7 text-white/64"
                )}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {phoneCatalog.map((book) => (
              <div key={book.title}>
                <div className="relative aspect-[0.68] overflow-hidden rounded-lg border border-white/10 bg-white/8">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="84px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-1 truncate text-[0.58rem] font-bold text-white/86 [font-family:var(--font-ui)]">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between rounded-2xl border border-white/10 bg-black/38 px-4 py-3 text-[#72c3ff] backdrop-blur-md">
            <BookOpenIcon className="size-4" />
            <HeadphonesIcon className="size-4 text-white/56" />
            <StarIcon className="size-4 text-white/56" />
          </div>
        </div>
      ) : (
        <div className="relative h-full overflow-hidden rounded-[1.78rem] bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.45),transparent_20%),linear-gradient(140deg,#b9ad9d_0%,#393a3d_39%,#a0907b_60%,#12151b_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_22%,rgba(255,255,255,0.36),transparent_24%),radial-gradient(ellipse_at_58%_76%,rgba(255,255,255,0.24),transparent_26%)]" />
        </div>
      )}
    </div>
  )
}

function MobileAppSection() {
  const section = landingCopy.sections.multiDevice
  const finalCta = landingCopy.sections.finalCta

  return (
    <section id={section.id} className="relative isolate overflow-hidden py-24 text-white sm:py-28 lg:py-32">
      <span id={finalCta.id} className="absolute top-0" aria-hidden="true" />
      <SectionBackground variant="bottom" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-16">
          <div className="relative min-h-[32rem] lg:order-1">
            <div className="absolute left-1/2 top-8 h-[24rem] w-[28rem] max-w-[88vw] -translate-x-1/2 rounded-full bg-[#2f8cff]/18 blur-3xl" />
            <div className="relative flex justify-center pt-4">
              <div className="translate-x-6 sm:translate-x-8">
                <AppPhone variant="device" />
              </div>
              <div className="-ml-20 translate-y-8 sm:-ml-16">
                <AppPhone variant="catalog" />
              </div>
            </div>
          </div>

          <div className="text-center lg:order-2 lg:text-left">
            <h2 className="mx-auto max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.98] text-white [font-family:var(--font-display)] lg:mx-0">
              {section.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/68 [font-family:var(--font-reading)] sm:text-lg lg:mx-0">
              {section.text}
            </p>
            <div className="mx-auto mt-8 h-px max-w-3xl bg-gradient-to-r from-transparent via-[#2f8cff] to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-[#2f8cff] lg:via-[#2f8cff] lg:to-transparent" />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              {section.visualItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-2 text-sm font-bold text-white/72 backdrop-blur-xl [font-family:var(--font-ui)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-xl lg:mx-0">
              <h3 className="text-3xl font-medium leading-[1] text-white [font-family:var(--font-display)] sm:text-4xl">
                {finalCta.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-white/64 [font-family:var(--font-reading)]">
                {finalCta.text}
              </p>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <GlowButton href="#biblioteka">{finalCta.cta}</GlowButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PostHeroPitchSections() {
  return (
    <>
      <CatalogSection />
      <PricingSection />
      <MobileAppSection />
    </>
  )
}

export { PostHeroPitchSections }

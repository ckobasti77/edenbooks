"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  GemIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react"

import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

gsap.registerPlugin(ScrollTrigger)

type BillingMode = "monthly" | "yearly"

type Plan = {
  name: string
  description: string
  monthlyPrice: string
  yearlyMonthlyEquivalentPrice: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
  Icon: LucideIcon
  accent: "blue" | "violet"
}

const plans: Plan[] = [
  {
    name: "Essential",
    description: "Za mirno čitanje i osnovni pristup biblioteci.",
    monthlyPrice: "Free",
    yearlyMonthlyEquivalentPrice: "Free",
    cta: "Izaberi Essential",
    Icon: BookOpenIcon,
    accent: "blue",
    features: [
      "Ograničen pristup e-knjigama",
      "Osnovne preporuke",
      "Čitanje na 1 uređaju",
    ],
  },
  {
    name: "Premium",
    description:
      "Za one koji žele više naslova, audio knjige i napredne preporuke.",
    monthlyPrice: "1.497 RSD / mesec",
    yearlyMonthlyEquivalentPrice: "1.198 RSD / mesec",
    cta: "Izaberi Premium",
    badge: "Najpopularniji",
    highlighted: true,
    Icon: GemIcon,
    accent: "blue",
    features: [
      "Neograničen pristup e-knjigama",
      "Audio knjige i napredne preporuke",
      "Personalizovane preporuke",
      "Čitanje na više uređaja",
    ],
  },
  {
    name: "Family",
    description: "Za više čitalaca, više ukusa i jednu zajedničku biblioteku.",
    monthlyPrice: "2.997 RSD / mesec",
    yearlyMonthlyEquivalentPrice: "2.398 RSD / mesec",
    cta: "Izaberi Family",
    Icon: UsersRoundIcon,
    accent: "violet",
    features: [
      "Sve iz paketa Premium",
      "Do 6 korisničkih profila",
      "Deljena biblioteka za celu porodicu",
      "Roditeljska kontrola",
      "Čitanje na do 6 uređaja",
    ],
  },
]

function splitPrice(price: string) {
  if (price === "Free") {
    return { amount: "Free", suffix: "" }
  }

  const [amount, suffix] = price.split(" RSD / ")

  return {
    amount,
    suffix: suffix ? `RSD / ${suffix}` : "",
  }
}

function PricingSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [billing, setBilling] = useState<BillingMode>("yearly")
  const isYearly = billing === "yearly"

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-pricing-reveal]",
        root
      )
      const featureItems = gsap.utils.toArray<HTMLElement>(
        "[data-pricing-feature]",
        root
      )

      if (reduceMotion) {
        gsap.set([...revealItems, ...featureItems], {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
        })
        return
      }

      gsap.set(revealItems, {
        autoAlpha: 0,
        filter: "blur(10px)",
        y: 24,
      })
      gsap.set(featureItems, {
        autoAlpha: 0,
        filter: "blur(8px)",
        y: 14,
      })

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
          stagger: 0.07,
        })

        gsap.to(featureItems, {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.58,
          delay: 0.34,
          ease: "power3.out",
          stagger: 0.025,
        })
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 68%",
        once: true,
        onEnter: playReveal,
      })

      requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect()
        const isAlreadyVisible =
          rect.top < window.innerHeight * 0.78 && rect.bottom > 0

        if (isAlreadyVisible) {
          playReveal()
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="paketi"
      className="relative isolate overflow-hidden bg-[#02040a] py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#02040a]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_14%,rgba(47,140,255,0.32),transparent_24rem),radial-gradient(circle_at_24%_44%,rgba(16,117,173,0.16),transparent_30rem),radial-gradient(circle_at_82%_58%,rgba(131,94,255,0.16),transparent_28rem),linear-gradient(180deg,#02040a_0%,#06101e_48%,#02040a_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#55b7ff]/54 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-24 -z-10 h-px bg-gradient-to-r from-transparent via-[#1c7fff]/58 to-transparent blur-[1px]" />

      <Container className="max-w-[1280px]">
        <div className="mx-auto max-w-4xl text-center">
          <div
            data-pricing-reveal
            className="inline-flex items-center gap-3 text-sm font-bold uppercase text-[#63bdff] [font-family:var(--font-ui)] [letter-spacing:0.22em]"
          >
            <BookOpenIcon className="size-5" strokeWidth={1.8} />
            <span>EDEN BOOKS</span>
          </div>

          <h2
            data-pricing-reveal
            className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.7rem,6.7vw,5.9rem)] font-medium leading-[0.92] text-white [font-family:var(--font-display)]"
          >
            Izaberi paket koji prati tvoj{" "}
            <span className="bg-gradient-to-r from-[#36b7ff] via-[#108cff] to-[#0068ff] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(47,140,255,0.55)]">
              ritam.
            </span>
          </h2>

          <p
            data-pricing-reveal
            className="mx-auto mt-6 max-w-3xl text-balance text-base leading-8 text-slate-200/76 [font-family:var(--font-reading)] sm:text-lg"
          >
            Bilo da čitaš povremeno, svake večeri ili deliš biblioteku sa
            porodicom, izaberi paket koji se uklapa u tvoj način čitanja.
          </p>

          <div data-pricing-reveal className="mt-8 flex justify-center">
            <div
              className="grid w-full max-w-[32rem] grid-cols-2 rounded-full border border-white/12 bg-[#07101f]/72 p-1.5 shadow-[0_0_0_1px_rgba(47,140,255,0.12),0_24px_70px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl"
              role="group"
              aria-label="Izbor naplate"
            >
              <button
                type="button"
                aria-pressed={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={cn(
                  "relative h-12 rounded-full text-sm font-bold text-white/66 transition duration-300 [font-family:var(--font-ui)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2f8cff]/45 sm:text-base",
                  billing === "monthly" &&
                    "bg-[#0c75df] text-white shadow-[0_0_0_1px_rgba(104,196,255,0.9),0_0_32px_rgba(47,140,255,0.55),inset_0_1px_0_rgba(255,255,255,0.22)]"
                )}
              >
                Mesečno
              </button>
              <button
                type="button"
                aria-pressed={billing === "yearly"}
                onClick={() => setBilling("yearly")}
                className={cn(
                  "relative flex h-12 items-center justify-center gap-2 rounded-full text-sm font-bold text-white/66 transition duration-300 [font-family:var(--font-ui)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2f8cff]/45 sm:text-base",
                  billing === "yearly" &&
                    "bg-[#0c75df] text-white shadow-[0_0_0_1px_rgba(104,196,255,0.9),0_0_32px_rgba(47,140,255,0.55),inset_0_1px_0_rgba(255,255,255,0.22)]"
                )}
              >
                <span>Godišnje</span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[0.68rem] font-extrabold leading-none transition duration-300",
                    billing === "yearly"
                      ? "border-white/22 bg-white/18 text-white"
                      : "border-[#2f8cff]/36 bg-[#2f8cff]/14 text-[#74c7ff]"
                  )}
                >
                  -20%
                </span>
              </button>
            </div>
          </div>

          <p
            data-pricing-reveal
            className={cn(
              "mt-4 min-h-6 text-sm text-slate-300/74 transition duration-300 [font-family:var(--font-ui)]",
              isYearly ? "opacity-100" : "opacity-0"
            )}
            aria-live="polite"
          >
            {isYearly
              ? "Cena je prikazana po mesecu, uz godišnju naplatu."
              : ""}
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan, index) => {
            const Icon = plan.Icon
            const displayedPrice = isYearly
              ? plan.yearlyMonthlyEquivalentPrice
              : plan.monthlyPrice
            const price = splitPrice(displayedPrice)
            const monthly = splitPrice(plan.monthlyPrice)
            const showYearlyDiscount = isYearly && plan.monthlyPrice !== "Free"

            return (
              <article
                key={plan.name}
                data-pricing-reveal
                className={cn(
                  "group relative flex min-h-[31rem] flex-col overflow-hidden rounded-[1.5rem] border bg-[#07111f]/68 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1.5 sm:p-7",
                  plan.highlighted
                    ? "border-[#119cff]/78 bg-[#061529]/82 shadow-[0_34px_110px_rgba(0,0,0,0.58),0_0_0_1px_rgba(47,140,255,0.22),0_0_72px_rgba(0,142,255,0.34),inset_0_1px_0_rgba(255,255,255,0.18)] lg:-mt-1 lg:min-h-[33rem]"
                    : plan.accent === "violet"
                      ? "border-[#9d7bff]/38 hover:border-[#ad8cff]/62 hover:shadow-[0_34px_100px_rgba(0,0,0,0.52),0_0_50px_rgba(141,104,255,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]"
                      : "border-[#68bdff]/36 hover:border-[#68bdff]/62 hover:shadow-[0_34px_100px_rgba(0,0,0,0.52),0_0_50px_rgba(47,140,255,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]",
                  index === 2 && "md:col-span-2 lg:col-span-1"
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100",
                    plan.highlighted
                      ? "bg-[radial-gradient(circle_at_50%_0%,rgba(26,157,255,0.28),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_36%)]"
                      : plan.accent === "violet"
                        ? "bg-[radial-gradient(circle_at_50%_0%,rgba(157,123,255,0.18),transparent_54%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]"
                        : "bg-[radial-gradient(circle_at_50%_0%,rgba(70,166,255,0.18),transparent_54%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]"
                  )}
                />
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2f8cff]/65 to-transparent opacity-70" />

                {plan.badge ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-2xl border-x border-b border-[#2f8cff]/42 bg-[#0b4a9d]/56 px-5 py-3 text-xs font-extrabold uppercase text-white shadow-[0_18px_44px_rgba(0,122,255,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl [font-family:var(--font-ui)] [letter-spacing:0.08em]">
                    <span className="inline-flex items-center gap-2">
                      <SparklesIcon className="size-4 fill-[#6abfff] text-[#6abfff]" />
                      {plan.badge}
                    </span>
                  </div>
                ) : null}

                <div className="relative z-10">
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-[1rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
                      plan.accent === "violet"
                        ? "border-[#a280ff]/34 bg-[#8f67ff]/14 text-[#b392ff]"
                        : "border-[#41adff]/34 bg-[#0b7cdf]/14 text-[#48b8ff]"
                    )}
                  >
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>

                  <div className="mt-5">
                    <h3 className="text-3xl font-semibold leading-none text-white [font-family:var(--font-display)] sm:text-4xl">
                      {plan.name}
                    </h3>
                    <p className="mt-3 min-h-[3.25rem] text-base leading-7 text-slate-200/72 [font-family:var(--font-reading)]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-5 min-h-[5.95rem]">
                    <div className="min-h-6">
                      {showYearlyDiscount ? (
                        <p className="animate-in fade-in slide-in-from-bottom-1 text-sm font-semibold text-slate-400/72 line-through duration-300 [font-family:var(--font-ui)]">
                          {monthly.amount} RSD
                        </p>
                      ) : null}
                    </div>
                    <div
                      key={`${plan.name}-${billing}`}
                      className="animate-in fade-in slide-in-from-bottom-2 flex flex-wrap items-end gap-x-2 gap-y-1 duration-300"
                    >
                      <span className="text-[clamp(3.1rem,6vw,4.55rem)] font-semibold leading-[0.9] text-white [font-family:var(--font-ui)]">
                        {price.amount}
                      </span>
                      {price.suffix ? (
                        <span
                          className={cn(
                            "pb-1 text-lg font-bold [font-family:var(--font-ui)]",
                            plan.accent === "violet"
                              ? "text-[#a984ff]"
                              : "text-[#31aaff]"
                          )}
                        >
                          {price.suffix}
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "mt-2 min-h-5 text-sm text-slate-300/64 transition duration-300 [font-family:var(--font-ui)]",
                        showYearlyDiscount ? "opacity-100" : "opacity-0"
                      )}
                      aria-hidden={!showYearlyDiscount}
                    >
                      {showYearlyDiscount ? "uz godišnju naplatu" : ""}
                    </p>
                  </div>

                  <div className="mt-2 h-px bg-gradient-to-r from-white/26 via-[#2f8cff]/34 to-transparent" />

                  <ul className="mt-5 grid gap-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        data-pricing-feature
                        className="flex items-start gap-3 text-base leading-6 text-slate-100/86 [font-family:var(--font-ui)]"
                      >
                        <CheckCircle2Icon
                          className={cn(
                            "mt-0.5 size-5 shrink-0",
                            plan.accent === "violet"
                              ? "text-[#a984ff]"
                              : "text-[#2fafff]"
                          )}
                          strokeWidth={1.9}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto pt-8">
                  <a
                    data-pricing-reveal
                    href="#zapocni"
                    className={cn(
                      "group/button inline-flex h-13 w-full items-center justify-center rounded-2xl border px-5 text-base font-extrabold transition duration-300 [font-family:var(--font-ui)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2f8cff]/45",
                      plan.highlighted
                        ? "border-[#5bc0ff]/55 bg-gradient-to-r from-[#28b8ff] via-[#147dff] to-[#0758ff] text-white shadow-[0_18px_58px_rgba(0,119,255,0.46),0_0_34px_rgba(47,140,255,0.32),inset_0_1px_0_rgba(255,255,255,0.24)] hover:shadow-[0_22px_70px_rgba(0,119,255,0.58),0_0_48px_rgba(47,140,255,0.42),inset_0_1px_0_rgba(255,255,255,0.28)]"
                        : plan.accent === "violet"
                          ? "border-[#a984ff]/74 bg-[#070b17]/70 text-[#dbcfff] shadow-[0_0_0_1px_rgba(169,132,255,0.12),0_0_24px_rgba(169,132,255,0.16),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#c5adff] hover:bg-[#150f2a]/78 hover:text-white"
                          : "border-[#2fafff]/74 bg-[#070b17]/70 text-white shadow-[0_0_0_1px_rgba(47,175,255,0.14),0_0_24px_rgba(47,140,255,0.18),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#87d7ff] hover:bg-[#071527]/86"
                    )}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRightIcon className="ml-3 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <p
          data-pricing-reveal
          className="mt-8 flex items-center justify-center gap-2 text-center text-base text-slate-300/72 [font-family:var(--font-ui)]"
        >
          <ShieldCheckIcon className="size-5 text-slate-300/70" strokeWidth={1.75} />
          <span>Bez skrivenih troškova. Otkaži kad želiš.</span>
        </p>
      </Container>
    </section>
  )
}

export { PricingSection }

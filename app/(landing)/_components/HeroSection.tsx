"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRightIcon,
  BookOpenIcon,
  HeadphonesIcon,
  SparklesIcon,
} from "lucide-react"

import { landingCopy } from "../_constants/landing-copy"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"
import { GlassCard } from "@/components/ui/GlassCard"

const featureIcons = [BookOpenIcon, HeadphonesIcon, SparklesIcon]

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const { hero } = landingCopy

  const entrance = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0 }

  return (
    <section
      id="pocetna"
      className="relative isolate flex min-h-[94svh] overflow-hidden pt-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_18%,rgba(47,140,255,0.20),transparent_34rem),linear-gradient(135deg,#02040A_0%,#050914_48%,#08111f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-background to-transparent" />

      <Container className="grid items-center gap-12 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 18 }}
            animate={entrance}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-5 text-sm font-medium uppercase text-primary"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 22 }}
            animate={entrance}
            transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
            className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 22 }}
            animate={entrance}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 18 }}
            animate={entrance}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
            >
              <a href="#biblioteka">
                {hero.primaryCta}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-white/12 bg-white/[0.045] px-5 text-white hover:bg-white/[0.09]"
            >
              <a href="#audio-knjige">{hero.secondaryCta}</a>
            </Button>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 18 }}
            animate={entrance}
            transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {hero.featureHighlights.map((feature, index) => {
              const Icon = featureIcons[index] ?? SparklesIcon

              return (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white/78"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/14 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>{feature}</span>
                </div>
              )
            })}
          </motion.div>

          <motion.dl
            initial={shouldReduceMotion ? entrance : { opacity: 0, y: 18 }}
            animate={entrance}
            transition={{ duration: 0.6, delay: 0.36, ease: "easeOut" }}
            className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm leading-5 text-white/52">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative min-h-[500px] lg:min-h-[560px]">
          <div className="absolute inset-6 rounded-[3rem] border border-white/10 bg-white/[0.035] blur-3xl" />
          <motion.div
            initial={shouldReduceMotion ? { y: 0 } : { y: 12 }}
            animate={shouldReduceMotion ? { y: 0 } : { y: [-8, 10, -8] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-8 w-[270px] -translate-x-1/2 sm:w-[320px] lg:top-10"
          >
            <div className="rounded-[2.4rem] border border-white/16 bg-[#07101e] p-3 shadow-2xl shadow-blue-950/60">
              <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#0d1a2d_0%,#050914_100%)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <span className="text-xs font-semibold text-white">
                    {hero.phone.title}
                  </span>
                  <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_rgba(47,140,255,0.85)]" />
                </div>
                <div className="px-5 py-6">
                  <div className="mb-6 h-52 rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(47,140,255,0.35),rgba(255,255,255,0.06)_48%,rgba(5,9,20,0.95))] p-4">
                    <div className="h-full rounded-xl border border-white/12 bg-black/20 p-4">
                      <div className="h-5 w-24 rounded-full bg-white/18" />
                      <div className="mt-20 h-7 w-36 rounded-full bg-white/22" />
                      <div className="mt-3 h-3 w-28 rounded-full bg-primary/45" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {hero.phone.activeBook}
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-full w-[68%] rounded-full bg-primary shadow-[0_0_22px_rgba(47,140,255,0.65)]" />
                  </div>
                  <p className="mt-3 text-xs text-white/52">
                    {hero.phone.progress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {hero.floatingBooks.map((label, index) => (
            <motion.div
              key={label}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: index % 2 === 0 ? [-6, 8, -6] : [8, -6, 8],
                    }
              }
              transition={{
                opacity: { duration: 0.5, delay: 0.25 + index * 0.1 },
                y: { duration: 5.5 + index, repeat: Infinity, ease: "easeInOut" },
              }}
              className={[
                "absolute rounded-2xl border border-white/12 bg-white/[0.075] px-4 py-3 text-sm text-white/80 shadow-xl shadow-black/25 backdrop-blur-xl",
                index === 0 && "left-0 top-24 rotate-[-6deg]",
                index === 1 && "right-2 top-48 rotate-[7deg]",
                index === 2 && "bottom-28 left-8 rotate-[5deg]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </motion.div>
          ))}

          <GlassCard className="absolute bottom-16 right-0 w-64 rounded-2xl py-0">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/16 text-primary">
                  <SparklesIcon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {hero.emblem.title}
                  </p>
                  <p className="mt-1 text-xs text-white/52">
                    {hero.emblem.text}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  )
}

export { HeroSection }

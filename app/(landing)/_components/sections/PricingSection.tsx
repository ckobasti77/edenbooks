import { CheckCircle2Icon, CrownIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { SectionShell } from "../SectionShell"
import { GlassCard } from "@/components/ui/GlassCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function PricingSection() {
  const section = landingCopy.sections.pricing

  return (
    <SectionShell
      id={section.id}
      title={section.title}
      text={section.text}
      reverse
      className="bg-white/[0.015]"
    >
      <GlassCard className="mx-auto max-w-xl rounded-3xl py-0">
        <CardHeader className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/14 text-primary">
              <CrownIcon className="size-5" />
            </span>
            <CardTitle className="text-white">{section.visualTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 p-5">
          {section.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/[0.095] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2Icon className="size-4 text-primary" />
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
              <span className="rounded-full border border-white/14 bg-white/[0.11] px-3 py-1 text-xs text-white/58">
                0{index + 1}
              </span>
            </div>
          ))}
        </CardContent>
      </GlassCard>
    </SectionShell>
  )
}

export { PricingSection }

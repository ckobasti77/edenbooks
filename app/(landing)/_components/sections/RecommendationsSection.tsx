import { SparklesIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { SectionShell } from "../SectionShell"
import { GlassCard } from "@/components/ui/GlassCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function RecommendationsSection() {
  const section = landingCopy.sections.recommendations

  return (
    <SectionShell id={section.id} title={section.title} text={section.text}>
      <GlassCard className="mx-auto max-w-xl rounded-3xl py-0">
        <CardHeader className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/14 text-primary">
              <SparklesIcon className="size-5" />
            </span>
            <CardTitle className="text-white">{section.visualTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
          {section.visualItems.map((item, index) => (
            <div
              key={item}
              className="min-h-28 rounded-2xl border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(47,140,255,0.08))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
            >
              <span className="text-xs text-primary">0{index + 1}</span>
              <p className="mt-8 text-sm font-medium text-white">{item}</p>
            </div>
          ))}
        </CardContent>
      </GlassCard>
    </SectionShell>
  )
}

export { RecommendationsSection }

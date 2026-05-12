import { HeadphonesIcon, PlayIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { SectionShell } from "../SectionShell"
import { GlassCard } from "@/components/ui/GlassCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ReadListenSection() {
  const section = landingCopy.sections.readListen

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
              <HeadphonesIcon className="size-5" />
            </span>
            <CardTitle className="text-white">{section.visualTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="rounded-3xl border border-white/10 bg-[#07101e] p-5">
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-blue-500/24">
                <PlayIcon className="size-5 fill-current" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {section.visualItems[0]}
                </p>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-full w-[62%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {section.visualItems.slice(1).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </SectionShell>
  )
}

export { ReadListenSection }

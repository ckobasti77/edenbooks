import { MonitorSmartphoneIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { SectionShell } from "../SectionShell"
import { GlassCard } from "@/components/ui/GlassCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function MultiDeviceSection() {
  const section = landingCopy.sections.multiDevice

  return (
    <SectionShell id={section.id} title={section.title} text={section.text}>
      <GlassCard className="mx-auto max-w-xl rounded-3xl py-0">
        <CardHeader className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/14 text-primary">
              <MonitorSmartphoneIcon className="size-5" />
            </span>
            <CardTitle className="text-white">{section.visualTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid items-end gap-4 sm:grid-cols-3">
            {section.visualItems.map((item, index) => (
              <div key={item} className="text-center">
                <div
                  className={[
                    "mx-auto rounded-2xl border border-white/18 bg-white/[0.095] shadow-[0_18px_46px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl",
                    index === 0 && "h-36 w-20",
                    index === 1 && "h-44 w-28",
                    index === 2 && "h-32 w-36",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                <p className="mt-3 text-sm text-white/64">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </GlassCard>
    </SectionShell>
  )
}

export { MultiDeviceSection }

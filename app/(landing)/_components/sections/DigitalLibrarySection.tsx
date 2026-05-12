import { BookOpenIcon, LibraryBigIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { SectionShell } from "../SectionShell"
import { GlassCard } from "@/components/ui/GlassCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function DigitalLibrarySection() {
  const section = landingCopy.sections.digitalLibrary

  return (
    <SectionShell id={section.id} title={section.title} text={section.text}>
      <GlassCard className="mx-auto max-w-xl rounded-3xl py-0">
        <CardHeader className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/14 text-primary">
              <LibraryBigIcon className="size-5" />
            </span>
            <CardTitle className="text-white">{section.visualTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 p-5">
          {section.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.07] text-primary">
                  <BookOpenIcon className="size-4" />
                </span>
                <span className="text-sm text-white/78">{item}</span>
              </div>
              <span className="text-xs text-white/38">0{index + 1}</span>
            </div>
          ))}
        </CardContent>
      </GlassCard>
    </SectionShell>
  )
}

export { DigitalLibrarySection }

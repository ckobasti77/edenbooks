import { ArrowRightIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"

function FinalCTASection() {
  const section = landingCopy.sections.finalCta

  return (
    <section
      id={section.id}
      className="relative isolate overflow-hidden border-t border-white/10 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#09040d_0%,#02040a_46%,#07101e_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background:radial-gradient(118%_78%_at_20%_0%,rgba(247,128,86,0.16),transparent_58%),radial-gradient(112%_84%_at_82%_12%,rgba(47,140,255,0.2),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_46%)]" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {section.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            {section.text}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-9 h-12 rounded-full border border-white/35 bg-white/88 px-5 text-[#06101f] shadow-[0_18px_56px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl hover:bg-white"
          >
            <a href="#pocetna">
              {section.cta}
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export { FinalCTASection }

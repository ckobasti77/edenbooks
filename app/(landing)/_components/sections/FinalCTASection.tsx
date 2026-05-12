import { ArrowRightIcon } from "lucide-react"

import { landingCopy } from "../../_constants/landing-copy"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"

function FinalCTASection() {
  const section = landingCopy.sections.finalCta

  return (
    <section
      id={section.id}
      className="relative overflow-hidden border-t border-white/10 py-24 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.20),transparent_34rem)]" />
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
            className="mt-9 h-12 rounded-xl px-5 shadow-xl shadow-blue-500/24"
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

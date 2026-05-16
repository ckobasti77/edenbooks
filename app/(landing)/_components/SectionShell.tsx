import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils/cn"

type SectionShellProps = {
  id: string
  title: string
  text: string
  children: React.ReactNode
  reverse?: boolean
  className?: string
}

function SectionShell({
  id,
  title,
  text,
  children,
  reverse = false,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden border-t border-white/10 py-24 sm:py-28 lg:py-32",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#09040d_0%,#02040a_44%,#07101e_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-75 [background:radial-gradient(120%_82%_at_0%_18%,rgba(247,128,86,0.14),transparent_58%),radial-gradient(110%_82%_at_100%_16%,rgba(47,140,255,0.18),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.038),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-x-4 top-6 -z-10 h-px bg-white/18 sm:inset-x-8" />
      <Container
        className={cn(
          "grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16",
          reverse && "lg:grid-cols-[1.08fr_0.92fr]"
        )}
      >
        <div className={cn("max-w-xl", reverse && "lg:order-2")}>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
            {text}
          </p>
        </div>
        <div className={cn(reverse && "lg:order-1")}>{children}</div>
      </Container>
    </section>
  )
}

export { SectionShell }

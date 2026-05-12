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
        "relative overflow-hidden border-t border-white/10 py-24 sm:py-28 lg:py-32",
        className
      )}
    >
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

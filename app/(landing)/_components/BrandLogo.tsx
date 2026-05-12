import { brand } from "@/lib/constants/brand"
import { cn } from "@/lib/utils/cn"

type BrandLogoProps = {
  className?: string
}

function BrandLogo({ className }: BrandLogoProps) {
  return (
    <a
      href="#pocetna"
      aria-label="EDEN BOOKS početna"
      className={cn(
        "flex items-center gap-3 text-sm font-semibold text-white",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-[0.72rem] shadow-lg shadow-blue-500/10">
        EB
      </span>
      <span className="leading-none">
        <span>{brand.wordmark.primary}</span>{" "}
        <span className="text-primary">{brand.wordmark.accent}</span>
      </span>
    </a>
  )
}

export { BrandLogo }

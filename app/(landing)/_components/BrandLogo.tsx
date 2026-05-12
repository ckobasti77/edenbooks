import Image from "next/image"

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
        "flex items-center text-sm font-semibold text-white",
        className
      )}
    >
      <Image
        src="/images/logos/logo.png"
        alt={brand.name}
        width={162}
        height={40}
        priority
        className="h-8 w-auto object-contain"
      />
      <span className="sr-only">
        {brand.wordmark.primary} {brand.wordmark.accent}
      </span>
    </a>
  )
}

export { BrandLogo }

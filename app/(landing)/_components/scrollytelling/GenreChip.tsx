import type { ComponentProps } from "react"

import { cn } from "@/lib/utils/cn"

type GenreChipProps = ComponentProps<"span"> & {
  label: string
}

function GenreChip({ label, className, ...props }: GenreChipProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.065] px-3 py-1.5 text-xs font-medium text-white/72 backdrop-blur-xl",
        className
      )}
    >
      {label}
    </span>
  )
}

export { GenreChip }

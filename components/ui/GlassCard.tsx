import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

function GlassCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "border border-white/10 bg-white/[0.055] text-white shadow-2xl shadow-black/30 backdrop-blur-xl ring-white/10",
        className
      )}
      {...props}
    />
  )
}

export { GlassCard }

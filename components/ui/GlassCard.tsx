import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

function GlassCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "border border-white/18 bg-white/[0.085] text-white shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10",
        className
      )}
      {...props}
    />
  )
}

export { GlassCard }

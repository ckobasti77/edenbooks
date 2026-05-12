import Image from "next/image"

import { cn } from "@/lib/utils/cn"

type RecommendationCardProps = {
  src: string
  title: string
  meta: string
  index: number
  className?: string
}

function RecommendationCard({
  src,
  title,
  meta,
  index,
  className,
}: RecommendationCardProps) {
  return (
    <article
      data-recommendation-card
      data-recommendation-index={index}
      className={cn(
        "rounded-2xl border border-white/12 bg-[#07101e]/86 p-3 opacity-0 shadow-2xl shadow-black/35 backdrop-blur-2xl will-change-transform",
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/10">
        <Image src={src} alt={title} fill sizes="130px" className="object-cover" />
      </div>
      <p className="mt-3 truncate text-sm font-medium text-white">{title}</p>
      <p className="mt-1 truncate text-xs text-white/48">{meta}</p>
    </article>
  )
}

export { RecommendationCard }

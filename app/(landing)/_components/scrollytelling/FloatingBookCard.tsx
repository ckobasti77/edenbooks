import Image from "next/image"

import { cn } from "@/lib/utils/cn"

type FloatingBookCardProps = {
  src: string
  title: string
  meta: string
  index: number
  className?: string
}

function FloatingBookCard({
  src,
  title,
  meta,
  index,
  className,
}: FloatingBookCardProps) {
  return (
    <div
      data-floating-book
      data-book-index={index}
      className={cn(
        "absolute w-28 rounded-2xl border border-white/12 bg-white/[0.075] p-2 shadow-2xl shadow-black/35 backdrop-blur-xl will-change-transform sm:w-32",
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/10">
        <Image
          src={src}
          alt={title}
          fill
          sizes="140px"
          className="object-cover"
        />
      </div>
      <div className="pt-2">
        <p className="truncate text-xs font-medium text-white">{title}</p>
        <p className="mt-0.5 truncate text-[0.68rem] text-white/48">{meta}</p>
      </div>
    </div>
  )
}

export { FloatingBookCard }

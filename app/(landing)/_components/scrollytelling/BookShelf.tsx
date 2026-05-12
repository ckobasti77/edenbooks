import Image from "next/image"

import { scrollytellingBooks, scrollytellingScenes } from "../../_constants/scrollytelling"
import { GenreChip } from "./GenreChip"

function BookShelf() {
  const libraryScene = scrollytellingScenes[1]

  return (
    <div
      data-library-shelf
      className="absolute left-1/2 top-1/2 z-10 w-[min(560px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 opacity-0 shadow-2xl shadow-black/35 backdrop-blur-2xl will-change-transform"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {"categoryChips" in libraryScene &&
          libraryScene.categoryChips.map((chip) => (
            <GenreChip key={chip} label={chip} data-library-chip />
          ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        {scrollytellingBooks.map((book, index) => (
          <div
            key={book.src}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-xl shadow-black/25"
          >
            <Image
              src={book.src}
              alt={book.title}
              fill
              sizes="120px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2 py-1 text-[0.62rem] text-white/76 backdrop-blur-md">
              0{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { BookShelf }

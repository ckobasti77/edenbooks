"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const root = document.documentElement
      const total = root.scrollHeight - root.clientHeight
      const nextProgress = total > 0 ? (root.scrollTop / total) * 100 : 0

      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <Progress
      aria-label="Napredak kroz stranicu"
      value={progress}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 rounded-none bg-transparent"
    />
  )
}

export { ScrollProgress }

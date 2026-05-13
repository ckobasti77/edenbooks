"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CanvasTexture,
  LinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from "three"

type OptionalTextureOptions = {
  candidates: readonly string[]
}

export function useOptionalTexture({ candidates }: OptionalTextureOptions) {
  const [texture, setTexture] = useState<Texture | null>(null)
  const cacheKey = candidates.join("|")

  useEffect(() => {
    let active = true
    let loadedTexture: Texture | null = null
    const loader = new TextureLoader()

    async function loadTexture() {
      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate, { method: "HEAD" })

          if (!response.ok) {
            continue
          }

          const nextTexture = await new Promise<Texture>((resolve, reject) => {
            loader.load(candidate, resolve, undefined, reject)
          })

          nextTexture.colorSpace = SRGBColorSpace
          nextTexture.generateMipmaps = true
          nextTexture.minFilter = LinearFilter
          nextTexture.magFilter = LinearFilter

          if (!active) {
            nextTexture.dispose()
            return
          }

          loadedTexture = nextTexture
          setTexture(nextTexture)
          return
        } catch {
          // Missing optional demo assets should fall back silently.
        }
      }

      if (active) {
        setTexture(null)
      }
    }

    loadTexture()

    return () => {
      active = false
      loadedTexture?.dispose()
    }
  }, [cacheKey, candidates])

  return texture
}

export function useProceduralBookTexture(
  title: string,
  accent: string,
  index: number
) {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 720

    const context = canvas.getContext("2d")

    if (!context) {
      return null
    }

    const gradient = context.createLinearGradient(0, 0, 512, 720)
    gradient.addColorStop(0, accent)
    gradient.addColorStop(0.48, "#08111f")
    gradient.addColorStop(1, "#02040a")
    context.fillStyle = gradient
    context.fillRect(0, 0, 512, 720)

    context.fillStyle = "rgba(255,255,255,0.12)"
    context.fillRect(42, 42, 428, 636)

    context.fillStyle = "rgba(2,4,10,0.72)"
    context.fillRect(68, 68, 376, 584)

    context.strokeStyle = "rgba(255,255,255,0.22)"
    context.lineWidth = 2
    context.strokeRect(94, 94, 324, 532)

    context.fillStyle = "#f7faff"
    context.font = "700 42px Arial, sans-serif"
    context.textAlign = "center"
    context.fillText("EDEN", 256, 238)

    context.fillStyle = accent
    context.font = "700 36px Arial, sans-serif"
    context.fillText("BOOKS", 256, 284)

    context.fillStyle = "rgba(247,250,255,0.78)"
    context.font = "600 30px Arial, sans-serif"
    wrapText(context, title, 256, 402, 318, 38)

    context.fillStyle = "rgba(124,199,255,0.82)"
    context.font = "500 22px Arial, sans-serif"
    context.fillText(`0${index + 1}`, 256, 560)

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearFilter
    texture.magFilter = LinearFilter

    return texture
  }, [accent, index, title])
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ")
  let line = ""
  let offset = 0

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word
    const metrics = context.measureText(testLine)

    if (metrics.width > maxWidth && line) {
      context.fillText(line, x, y + offset)
      line = word
      offset += lineHeight
      return
    }

    line = testLine
  })

  context.fillText(line, x, y + offset)
}

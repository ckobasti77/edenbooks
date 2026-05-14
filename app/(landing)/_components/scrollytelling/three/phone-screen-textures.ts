"use client"

import {
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  SRGBColorSpace,
} from "three"

type PhoneScreenMode = "reader" | "audio"

const SCREEN_WIDTH = 900
const SCREEN_HEIGHT = 1950
const SCREEN_RADIUS = 92

export function createPhoneScreenTexture(mode: PhoneScreenMode) {
  const canvas = document.createElement("canvas")
  canvas.width = SCREEN_WIDTH
  canvas.height = SCREEN_HEIGHT

  const context = canvas.getContext("2d")

  if (!context) {
    return null
  }

  drawBase(context)

  if (mode === "reader") {
    drawReaderMode(context)
  } else {
    drawAudioMode(context)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.needsUpdate = true

  return texture
}

function drawBase(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  context.save()
  roundedRect(context, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_RADIUS)
  context.clip()

  const background = context.createLinearGradient(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  background.addColorStop(0, "#071326")
  background.addColorStop(0.5, "#020712")
  background.addColorStop(1, "#01040b")
  context.fillStyle = background
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

  const glow = context.createRadialGradient(670, 280, 20, 670, 280, 760)
  glow.addColorStop(0, "rgba(47,140,255,0.42)")
  glow.addColorStop(0.5, "rgba(47,140,255,0.12)")
  glow.addColorStop(1, "rgba(47,140,255,0)")
  context.fillStyle = glow
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

  context.fillStyle = "rgba(255,255,255,0.08)"
  context.fillRect(128, 54, 118, 10)
  context.fillRect(654, 54, 92, 10)
  context.fillRect(766, 54, 34, 10)

  context.fillStyle = "#f7faff"
  context.font = "700 42px Arial, sans-serif"
  context.textAlign = "left"
  context.fillText("EDENBOOKS", 76, 158)

  context.fillStyle = "rgba(124,199,255,0.88)"
  context.font = "600 24px Arial, sans-serif"
  context.fillText("premium mobile app", 78, 198)

  context.restore()
}

function drawReaderMode(context: CanvasRenderingContext2D) {
  context.save()
  roundedRect(context, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_RADIUS)
  context.clip()

  drawPill(context, 76, 268, 236, 54, "rgba(47,140,255,0.18)", "#7cc7ff", "READER MODE")

  context.fillStyle = "#f7faff"
  context.font = "700 58px Arial, sans-serif"
  context.textAlign = "left"
  context.fillText("Tihi fokus", 76, 436)

  context.fillStyle = "rgba(247,250,255,0.62)"
  context.font = "500 30px Arial, sans-serif"
  context.fillText("Poglavlje 04", 78, 492)

  drawReadingCard(context)
  drawReaderProgress(context)

  context.restore()
}

function drawAudioMode(context: CanvasRenderingContext2D) {
  context.save()
  roundedRect(context, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_RADIUS)
  context.clip()

  drawPill(context, 76, 268, 226, 54, "rgba(124,199,255,0.16)", "#7cc7ff", "AUDIO MODE")

  const artwork = context.createLinearGradient(230, 390, 670, 830)
  artwork.addColorStop(0, "#2f8cff")
  artwork.addColorStop(0.42, "#102447")
  artwork.addColorStop(1, "#02040a")
  context.fillStyle = artwork
  context.beginPath()
  context.arc(450, 620, 206, 0, Math.PI * 2)
  context.fill()

  context.strokeStyle = "rgba(255,255,255,0.18)"
  context.lineWidth = 2
  context.beginPath()
  context.arc(450, 620, 178, 0, Math.PI * 2)
  context.stroke()

  context.fillStyle = "#f7faff"
  context.font = "700 46px Arial, sans-serif"
  context.textAlign = "center"
  context.fillText("EDEN", 450, 602)
  context.fillStyle = "#7cc7ff"
  context.fillText("AUDIO", 450, 662)

  context.fillStyle = "#f7faff"
  context.font = "700 56px Arial, sans-serif"
  context.fillText("Kada ne citas", 450, 970)

  context.fillStyle = "rgba(247,250,255,0.62)"
  context.font = "500 31px Arial, sans-serif"
  context.fillText("nastavi slusanjem", 450, 1028)

  drawAudioProgress(context)
  drawPlayControl(context)
  drawAudioBars(context)

  context.restore()
}

function drawReadingCard(context: CanvasRenderingContext2D) {
  const x = 76
  const y = 580
  const width = 748
  const height = 760

  const card = context.createLinearGradient(x, y, x + width, y + height)
  card.addColorStop(0, "rgba(255,255,255,0.12)")
  card.addColorStop(1, "rgba(255,255,255,0.035)")
  roundedRect(context, x, y, width, height, 42)
  context.fillStyle = card
  context.fill()

  context.fillStyle = "#f7faff"
  context.font = "700 38px Arial, sans-serif"
  context.textAlign = "left"
  context.fillText("Otvorena knjiga", x + 46, y + 82)

  const rows = [
    0.92,
    0.8,
    0.94,
    0.72,
    0.88,
    0.78,
    0.9,
    0.62,
  ]

  rows.forEach((rowWidth, index) => {
    const opacity = 0.64 - index * 0.035
    roundedRect(context, x + 46, y + 156 + index * 58, width * rowWidth - 92, 18, 9)
    context.fillStyle = `rgba(247,250,255,${opacity})`
    context.fill()
  })

  roundedRect(context, x + 46, y + height - 128, 120, 54, 18)
  context.fillStyle = "rgba(47,140,255,0.18)"
  context.fill()
  context.fillStyle = "#7cc7ff"
  context.font = "700 22px Arial, sans-serif"
  context.fillText("MARK", x + 78, y + height - 93)

  roundedRect(context, x + width - 218, y + height - 128, 172, 54, 18)
  context.fillStyle = "rgba(255,255,255,0.08)"
  context.fill()
  context.fillStyle = "rgba(247,250,255,0.72)"
  context.fillText("NEXT", x + width - 158, y + height - 93)
}

function drawReaderProgress(context: CanvasRenderingContext2D) {
  roundedRect(context, 76, 1440, 748, 16, 8)
  context.fillStyle = "rgba(255,255,255,0.12)"
  context.fill()
  roundedRect(context, 76, 1440, 452, 16, 8)
  context.fillStyle = "#2f8cff"
  context.fill()

  context.fillStyle = "rgba(247,250,255,0.62)"
  context.font = "600 26px Arial, sans-serif"
  context.textAlign = "left"
  context.fillText("62% procitano", 76, 1516)
  context.textAlign = "right"
  context.fillText("12 min", 824, 1516)
}

function drawAudioProgress(context: CanvasRenderingContext2D) {
  roundedRect(context, 132, 1170, 636, 18, 9)
  context.fillStyle = "rgba(255,255,255,0.12)"
  context.fill()
  roundedRect(context, 132, 1170, 386, 18, 9)
  context.fillStyle = "#2f8cff"
  context.fill()

  context.fillStyle = "rgba(247,250,255,0.58)"
  context.font = "600 25px Arial, sans-serif"
  context.textAlign = "left"
  context.fillText("14:32", 132, 1244)
  context.textAlign = "right"
  context.fillText("42:10", 768, 1244)
}

function drawPlayControl(context: CanvasRenderingContext2D) {
  context.fillStyle = "#2f8cff"
  context.beginPath()
  context.arc(450, 1368, 94, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = "#ffffff"
  context.beginPath()
  context.moveTo(424, 1320)
  context.lineTo(424, 1416)
  context.lineTo(502, 1368)
  context.closePath()
  context.fill()
}

function drawAudioBars(context: CanvasRenderingContext2D) {
  const bars = [62, 112, 78, 156, 94, 132, 72, 118, 86]
  const startX = 234

  bars.forEach((height, index) => {
    roundedRect(context, startX + index * 54, 1590 - height / 2, 18, height, 9)
    context.fillStyle =
      index % 2 === 0 ? "rgba(124,199,255,0.84)" : "rgba(47,140,255,0.92)"
    context.fill()
  })
}

function drawPill(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  background: string,
  color: string,
  label: string
) {
  roundedRect(context, x, y, width, height, height / 2)
  context.fillStyle = background
  context.fill()
  context.fillStyle = color
  context.font = "700 22px Arial, sans-serif"
  context.textAlign = "center"
  context.fillText(label, x + width / 2, y + 35)
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2)

  context.beginPath()
  context.moveTo(x + r, y)
  context.lineTo(x + width - r, y)
  context.quadraticCurveTo(x + width, y, x + width, y + r)
  context.lineTo(x + width, y + height - r)
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  context.lineTo(x + r, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - r)
  context.lineTo(x, y + r)
  context.quadraticCurveTo(x, y, x + r, y)
  context.closePath()
}

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 122
const FRAME_PATH = "/images/eden-frames"
const FRAME_PREFIX = "ezgif-frame"
const FRAME_EXTENSION = "jpg"
const MAX_DEVICE_PIXEL_RATIO = 2

type FrameState = {
  currentFrame: number
}

function getFrameSrc(frame: number) {
  return `${FRAME_PATH}/${FRAME_PREFIX}-${String(frame).padStart(
    3,
    "0"
  )}.${FRAME_EXTENSION}`
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imageRatio = image.naturalWidth / image.naturalHeight
  const canvasRatio = canvasWidth / canvasHeight

  let sourceWidth = image.naturalWidth
  let sourceHeight = image.naturalHeight
  let sourceX = 0
  let sourceY = 0

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio
    sourceX = (image.naturalWidth - sourceWidth) / 2
  } else {
    sourceHeight = image.naturalWidth / canvasRatio
    sourceY = (image.naturalHeight - sourceHeight) / 2
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight)
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  )
}

function VideoScrollytellingHero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current

    if (!root || !canvas) {
      return
    }

    const context = canvas.getContext("2d", { alpha: false })

    if (!context) {
      return
    }

    const images: HTMLImageElement[] = []
    const frameState: FrameState = { currentFrame: 1 }
    const firstPhaseEnd = Math.round(FRAME_COUNT * 0.25)
    const secondPhaseEnd = Math.round(FRAME_COUNT * 0.75)
    let activeImage: HTMLImageElement | undefined
    let isMounted = true
    let resizeFrame = 0
    let initialRenderFrame = 0

    const setCanvasSize = () => {
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO
      )
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      if (activeImage?.complete) {
        drawImageCover(context, activeImage, width, height)
      }
    }

    const render = () => {
      const frame = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(frameState.currentFrame))
      )
      const image = images[frame - 1]

      if (!image?.complete || image.naturalWidth === 0) {
        return
      }

      activeImage = image
      drawImageCover(context, image, window.innerWidth, window.innerHeight)
    }

    setCanvasSize()

    const imageLoaders = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const frame = index + 1
      const image = new Image()

      image.decoding = "async"
      image.loading = "eager"
      images.push(image)

      return new Promise<void>((resolve) => {
        image.onload = () => {
          if (frame === 1) {
            activeImage = image
            render()
          }

          resolve()
        }

        image.onerror = () => resolve()
        image.src = getFrameSrc(frame)
      })
    })

    const ctx = gsap.context(() => undefined, root)

    Promise.all(imageLoaders).then(() => {
      if (!isMounted) {
        return
      }

      ctx.add(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(frameState, {
            currentFrame: firstPhaseEnd,
            duration: 2,
            onUpdate: render,
          })
          .to(frameState, {
            currentFrame: secondPhaseEnd,
            duration: 6,
            onUpdate: render,
          })
          .to(frameState, {
            currentFrame: FRAME_COUNT,
            duration: 2,
            onUpdate: render,
          })

        initialRenderFrame = window.requestAnimationFrame(() => {
          render()
          ScrollTrigger.refresh()
        })
      })
    })

    const handleResize = () => {
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame)
      }

      resizeFrame = window.requestAnimationFrame(() => {
        setCanvasSize()
        render()
        ScrollTrigger.refresh()
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      isMounted = false
      window.removeEventListener("resize", handleResize)

      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame)
      }

      if (initialRenderFrame) {
        window.cancelAnimationFrame(initialRenderFrame)
      }

      ctx.revert()
    }
  }, [])

  return (
    <section
      id="pocetna"
      className="relative bg-[#02040a] text-white"
      aria-label="EdenBooks scrollytelling hero"
    >
      <div ref={rootRef} className="relative h-[400vh] overflow-clip">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#02040a]">
          <canvas
            ref={canvasRef}
            className="pointer-events-none block h-full w-full"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(47,140,255,0.18),transparent_30rem),linear-gradient(180deg,rgba(2,4,10,0.18)_0%,rgba(2,4,10,0.04)_42%,rgba(2,4,10,0.76)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02040a] to-transparent" />
        </div>
      </div>
    </section>
  )
}

export { VideoScrollytellingHero }
export default VideoScrollytellingHero

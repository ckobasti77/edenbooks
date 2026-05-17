"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/animated-text";
import { landingCopy } from "../../_constants/landing-copy";
import { useSmoothScroll } from "../../_providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const FRAME_PATH_DESKTOP = "/images/eden-frames";
const FRAME_PATH_MOBILE = "/images/eden-frames-mobile";
const FRAME_PATHS = {
  desktop: FRAME_PATH_DESKTOP,
  mobile: FRAME_PATH_MOBILE,
} as const;

type FrameVariant = keyof typeof FRAME_PATHS;

const FRAME_COUNTS: Record<FrameVariant, number> = {
  desktop: 183,
  mobile: 212,
};
const STOP_FRAMES_BY_VARIANT: Record<FrameVariant, number[]> = {
  desktop: [1, 61, 122, 183],
  mobile: [1, 70, 142, 212],
};
const TRANSITION_DURATION = 1.25;
const REDUCED_MOTION_DURATION = 0.01;
const TOUCH_SWIPE_THRESHOLD = 30;
const SCROLL_EPSILON = 2;
const DRIFT_CORRECTION_DELAY = 80;
const EXIT_RELEASE_DURATION = 900;
const TEXT_REVEAL_DELAY = 50;
const LOGO_BLUE = "#1075AD";
const LOGO_BLUE_LIGHT = "#58A9DB";
const LOGO_BLUE_GLOW = "rgba(16,117,173,0.52)";
const FRAME_EDGE_FADE_BACKGROUND =
  "linear-gradient(90deg,#020615 0%,#020615 9%,rgba(2,6,21,0.9) 13%,rgba(2,6,21,0.54) 19%,transparent 29%,transparent 71%,rgba(2,6,21,0.54) 81%,rgba(2,6,21,0.9) 87%,#020615 91%,#020615 100%),linear-gradient(180deg,#020615 0%,#020615 7%,rgba(2,6,21,0.86) 11%,rgba(2,6,21,0.46) 18%,transparent 28%,transparent 73%,rgba(2,6,21,0.5) 84%,rgba(2,6,21,0.9) 91%,#020615 96%,#020615 100%)";

/** Desktop breakpoint (matches Tailwind lg); tablet and phone use mobile frames. */
const DESKTOP_FRAME_BREAKPOINT = 1024;
/** Batch size for lazy-loading non-priority frames */
const LAZY_BATCH_SIZE = 6;
/** Delay between lazy batches (ms) */
const LAZY_BATCH_DELAY = 60;
const MOBILE_FRAME_WIDTH_RATIO = 0.94;

function getFrameVariantForViewport(): FrameVariant {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth >= DESKTOP_FRAME_BREAKPOINT ? "desktop" : "mobile";
}

function getFrameBasePath(variant: FrameVariant) {
  return FRAME_PATHS[variant];
}

function getFrameCount(variant: FrameVariant) {
  return FRAME_COUNTS[variant];
}

function getStopFrames(variant: FrameVariant) {
  return STOP_FRAMES_BY_VARIANT[variant];
}

function getHqFramePaths(variant: FrameVariant): Record<number, string> {
  const base = getFrameBasePath(variant);
  return Object.fromEntries(
    getStopFrames(variant).map((frame) => [
      frame,
      `${base}/${String(frame).padStart(3, "0")}.webp`,
    ]),
  );
}

type FrameObject = {
  currentFrame: number;
};

type ScrollyCopySection = {
  key: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  position: "left" | "bottom-left" | "bottom-right" | "bottom-center";
};

const scrollyCopySections: ScrollyCopySection[] = [
  ...landingCopy.scrollytelling,
];

function getFrameSrc(frame: number, basePath: string) {
  return `${basePath}/${String(frame).padStart(3, "0")}.webp`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutSine(progress: number) {
  return 0.5 - Math.cos(progress * Math.PI) / 2;
}

function getPanelPositionClass(position: ScrollyCopySection["position"]) {
  if (position === "bottom-left") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-[6vw] md:right-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 lg:left-[6vw] xl:left-[6vw]";
  }

  if (position === "bottom-right") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-auto md:right-[6vw] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 lg:right-[6vw] xl:right-[6vw]";
  }

  if (position === "bottom-center") {
    return "left-5 right-5 bottom-[1.5vh] md:left-1/2 md:right-auto md:top-auto md:bottom-[2vh] md:-translate-x-1/2 md:translate-y-0";
  }

  return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-[6vw] md:right-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 lg:left-[6vw] xl:left-[6vw]";
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight || !canvasWidth || !canvasHeight) {
    return;
  }

  const imageRatio = imageWidth / imageHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let sourceWidth = imageWidth;
  let sourceHeight = imageHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = imageHeight * canvasRatio;
    sourceX = (imageWidth - sourceWidth) / 2;
  } else {
    sourceHeight = imageWidth / canvasRatio;
    sourceY = (imageHeight - sourceHeight) / 2;
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasWidth,
    canvasHeight,
  );
}

function drawImageInsetWidth(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight || !canvasWidth || !canvasHeight) {
    return;
  }

  const imageRatio = imageWidth / imageHeight;
  const destinationWidth = canvasWidth * MOBILE_FRAME_WIDTH_RATIO;
  const destinationHeight = destinationWidth / imageRatio;
  const destinationX = (canvasWidth - destinationWidth) / 2;
  const destinationY = (canvasHeight - destinationHeight) / 2;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "#020615";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    0,
    0,
    imageWidth,
    imageHeight,
    destinationX,
    destinationY,
    destinationWidth,
    destinationHeight,
  );
}

function VideoScrollytellingHero() {
  const smoothScrollRef = useSmoothScroll();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imagesByVariantRef = useRef<
    Record<FrameVariant, Array<HTMLImageElement | null>>
  >({
    desktop: [],
    mobile: [],
  });
  const hqImagesByVariantRef = useRef<
    Record<FrameVariant, Record<number, HTMLImageElement | null>>
  >({
    desktop: {},
    mobile: {},
  });
  const loadingFramesRef = useRef<Record<FrameVariant, Set<number>>>({
    desktop: new Set<number>(),
    mobile: new Set<number>(),
  });
  const loadingHqFramesRef = useRef<Record<FrameVariant, Set<number>>>({
    desktop: new Set<number>(),
    mobile: new Set<number>(),
  });
  const activeFrameVariantRef = useRef<FrameVariant>("desktop");
  const frameObjRef = useRef<FrameObject>({ currentFrame: 1 });
  const activeSectionRef = useRef(0);
  const currentStopRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isInStepZoneRef = useRef(false);
  const touchStartYRef = useRef(0);
  const exitReleaseUntilRef = useRef(0);
  const copyRevealTimerRef = useRef<number | null>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [frameVariant, setFrameVariant] = useState<FrameVariant | null>(null);
  const [copyRevealSection, setCopyRevealSection] = useState<number | null>(
    null,
  );

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !canvas.width || !canvas.height) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) {
      return;
    }

    const exactFrame = frameObjRef.current.currentFrame;
    const activeVariant = activeFrameVariantRef.current;
    const frameCount = getFrameCount(activeVariant);
    const stopFrames = getStopFrames(activeVariant);
    const requestedFrame = clamp(Math.round(exactFrame), 1, frameCount);
    const activeImages = imagesByVariantRef.current[activeVariant];
    const activeHqImages = hqImagesByVariantRef.current[activeVariant];

    let image = activeImages[requestedFrame - 1];

    const isAtStopFrame = stopFrames.includes(requestedFrame);
    const distanceToStop = Math.abs(exactFrame - requestedFrame);

    if (isAtStopFrame && distanceToStop < 0.01) {
      const hqImage = activeHqImages[requestedFrame];

      if (hqImage?.complete && hqImage.naturalWidth) {
        image = hqImage;
      }
    }

    if (!image?.complete || !image.naturalWidth) {
      for (let offset = 1; offset < frameCount; offset += 1) {
        const previousImage = activeImages[requestedFrame - 1 - offset];
        const nextImage = activeImages[requestedFrame - 1 + offset];

        if (previousImage?.complete && previousImage.naturalWidth) {
          image = previousImage;
          break;
        }

        if (nextImage?.complete && nextImage.naturalWidth) {
          image = nextImage;
          break;
        }
      }
    }

    if (!image?.complete || !image.naturalWidth) {
      context.fillStyle = "#020615";
      context.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const drawFrame =
      activeVariant === "mobile" ? drawImageInsetWidth : drawImageCover;

    drawFrame(
      context,
      image,
      canvasSizeRef.current.width,
      canvasSizeRef.current.height,
    );
  }, []);

  useEffect(() => {
    const updateFrameVariant = () => {
      const nextVariant = getFrameVariantForViewport();

      activeFrameVariantRef.current = nextVariant;
      setFrameVariant(nextVariant);
      renderFrame();
    };

    updateFrameVariant();

    const mediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_FRAME_BREAKPOINT}px)`,
    );
    const handleMediaChange = () => updateFrameVariant();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, [renderFrame]);

  useEffect(() => {
    if (!frameVariant) {
      return;
    }

    let isActiveVariant = true;
    const batchTimers: ReturnType<typeof setTimeout>[] = [];
    const basePath = getFrameBasePath(frameVariant);
    const frameCount = getFrameCount(frameVariant);
    const stopFrames = getStopFrames(frameVariant);
    const frameImages = imagesByVariantRef.current[frameVariant];
    const hqImages = hqImagesByVariantRef.current[frameVariant];
    const loadingFrames = loadingFramesRef.current[frameVariant];
    const loadingHqFrames = loadingHqFramesRef.current[frameVariant];

    activeFrameVariantRef.current = frameVariant;
    renderFrame();

    const loadFrame = (frame: number, source: string) => {
      const cachedImage = frameImages[frame - 1];

      if (
        (cachedImage?.complete && cachedImage.naturalWidth) ||
        loadingFrames.has(frame)
      ) {
        return;
      }

      const image = new Image();

      loadingFrames.add(frame);
      image.decoding = "async";

      image.onload = () => {
        loadingFrames.delete(frame);
        frameImages[frame - 1] = image;

        if (isActiveVariant && activeFrameVariantRef.current === frameVariant) {
          renderFrame();
        }
      };

      image.onerror = () => {
        loadingFrames.delete(frame);
      };

      image.src = source;
    };

    // Phase 1: load stop frames for the active viewport immediately.
    const prioritySet = new Set(stopFrames);
    for (const stopFrame of stopFrames) {
      loadFrame(stopFrame, getFrameSrc(stopFrame, basePath));
    }

    // Phase 2: lazily load the rest of the active viewport set.
    const remainingFrames: number[] = [];
    for (let frame = 1; frame <= frameCount; frame += 1) {
      if (!prioritySet.has(frame)) {
        remainingFrames.push(frame);
      }
    }

    const loadBatch = (batchIndex: number) => {
      if (!isActiveVariant) return;

      const start = batchIndex * LAZY_BATCH_SIZE;
      const end = Math.min(start + LAZY_BATCH_SIZE, remainingFrames.length);

      if (start >= remainingFrames.length) return;

      for (let i = start; i < end; i++) {
        const frame = remainingFrames[i];
        loadFrame(frame, getFrameSrc(frame, basePath));
      }

      if (end < remainingFrames.length) {
        const timer = setTimeout(
          () => loadBatch(batchIndex + 1),
          LAZY_BATCH_DELAY,
        );
        batchTimers.push(timer);
      }
    };

    const startTimer = setTimeout(() => loadBatch(0), 100);
    batchTimers.push(startTimer);

    // Phase 3: load crisp stop frames for the active viewport only.
    const hqPaths = getHqFramePaths(frameVariant);
    Object.entries(hqPaths).forEach(([frameStr, src]) => {
      const frameNum = parseInt(frameStr, 10);
      const cachedImage = hqImages[frameNum];

      if (
        (cachedImage?.complete && cachedImage.naturalWidth) ||
        loadingHqFrames.has(frameNum)
      ) {
        return;
      }

      const img = new Image();

      loadingHqFrames.add(frameNum);
      img.decoding = "async";
      img.onload = () => {
        loadingHqFrames.delete(frameNum);
        hqImages[frameNum] = img;

        if (
          isActiveVariant &&
          activeFrameVariantRef.current === frameVariant &&
          Math.round(frameObjRef.current.currentFrame) === frameNum
        ) {
          renderFrame();
        }
      };
      img.onerror = () => {
        loadingHqFrames.delete(frameNum);
      };
      img.src = src;
    });

    return () => {
      isActiveVariant = false;
      batchTimers.forEach(clearTimeout);
    };
  }, [frameVariant, renderFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let resizeFrame = 0;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const physicalWidth = Math.round(viewportWidth * pixelRatio);
      const physicalHeight = Math.round(viewportHeight * pixelRatio);

      canvas.width = physicalWidth;
      canvas.height = physicalHeight;
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;

      canvasSizeRef.current = {
        width: physicalWidth,
        height: physicalHeight,
      };

      renderFrame();
      ScrollTrigger.refresh();
    };

    resizeCanvas();

    const handleResize = () => {
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }
    };
  }, [renderFrame]);

  useEffect(() => {
    const root = rootRef.current;
    const panels = sectionRefs.current.filter(
      (panel): panel is HTMLDivElement => panel !== null,
    );
    const frameObject = frameObjRef.current;

    if (!root || !panels.length) {
      return;
    }

    const activeVariant = frameVariant ?? activeFrameVariantRef.current;
    const stopFrames = getStopFrames(activeVariant);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDuration = prefersReducedMotion
      ? REDUCED_MOTION_DURATION
      : TRANSITION_DURATION;
    const maxStopIndex = stopFrames.length - 1;

    const clearCopyRevealTimer = () => {
      if (copyRevealTimerRef.current !== null) {
        window.clearTimeout(copyRevealTimerRef.current);
        copyRevealTimerRef.current = null;
      }
    };

    const scheduleCopyReveal = (index: number) => {
      clearCopyRevealTimer();

      if (prefersReducedMotion) {
        setCopyRevealSection(index);
        return;
      }

      copyRevealTimerRef.current = window.setTimeout(() => {
        setCopyRevealSection(index);
        copyRevealTimerRef.current = null;
      }, TEXT_REVEAL_DELAY);
    };

    const preparePanelForTransition = (index: number) => {
      clearCopyRevealTimer();
      activeSectionRef.current = index;
      setActiveSection(index);

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;

        if (isActive) {
          gsap.set(panel, {
            autoAlpha: 1,
            y: 0,
            overwrite: true,
          });
        } else {
          gsap.to(panel, {
            autoAlpha: 0,
            y: 14,
            duration: prefersReducedMotion ? REDUCED_MOTION_DURATION : 0.24,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });
    };

    const revealSettledPanel = (index: number) => {
      activeSectionRef.current = index;
      setActiveSection(index);
      scheduleCopyReveal(index);

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;

        if (isActive) {
          gsap.set(panel, {
            autoAlpha: 1,
            y: 0,
            overwrite: true,
          });
        } else {
          gsap.to(panel, {
            autoAlpha: 0,
            y: 14,
            duration: prefersReducedMotion ? REDUCED_MOTION_DURATION : 0.24,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
    };

    const getSectionStart = () =>
      root.getBoundingClientRect().top + window.scrollY;

    const getStopPosition = (index: number) => {
      const sectionStart = getSectionStart();
      const scrollableDistance = Math.max(
        0,
        root.offsetHeight - window.innerHeight,
      );
      const stepDistance =
        maxStopIndex > 0 ? scrollableDistance / maxStopIndex : 0;

      return sectionStart + stepDistance * clamp(index, 0, maxStopIndex);
    };

    const getNearestStopIndex = () => {
      const scrollableDistance = Math.max(
        0,
        root.offsetHeight - window.innerHeight,
      );
      const stepDistance =
        maxStopIndex > 0 ? scrollableDistance / maxStopIndex : 0;

      if (stepDistance <= 0) {
        return 0;
      }

      return clamp(
        Math.round((window.scrollY - getSectionStart()) / stepDistance),
        0,
        maxStopIndex,
      );
    };

    const isInsideStepZone = () => {
      const sectionStart = getSectionStart();
      const lastStopPosition = getStopPosition(maxStopIndex);

      return (
        window.scrollY >= sectionStart - SCROLL_EPSILON &&
        window.scrollY <= lastStopPosition + SCROLL_EPSILON
      );
    };

    const isAtStopPosition = (index: number) =>
      Math.abs(window.scrollY - getStopPosition(index)) <= SCROLL_EPSILON;

    const setStopInstantly = (index: number, snapScroll: boolean) => {
      const nextIndex = clamp(index, 0, maxStopIndex);
      const targetScroll = getStopPosition(nextIndex);

      currentStopRef.current = nextIndex;
      revealSettledPanel(nextIndex);
      frameObject.currentFrame = stopFrames[nextIndex];
      renderFrame();

      if (
        snapScroll &&
        Math.abs(window.scrollY - targetScroll) > SCROLL_EPSILON
      ) {
        const currentLenis = smoothScrollRef?.current;

        if (currentLenis) {
          currentLenis.scrollTo(targetScroll, {
            immediate: true,
            force: true,
            lock: true,
          });
        } else {
          window.scrollTo(0, targetScroll);
        }
      }
    };

    let fallbackScrollTween: gsap.core.Tween | null = null;
    let releaseTween: gsap.core.Tween | null = null;
    let driftCorrectionTimer = 0;

    const goToStop = (index: number) => {
      const nextIndex = clamp(index, 0, maxStopIndex);
      const targetScroll = getStopPosition(nextIndex);
      const targetFrame = stopFrames[nextIndex];
      const isAlreadySettled =
        currentStopRef.current === nextIndex &&
        Math.abs(window.scrollY - targetScroll) <= SCROLL_EPSILON &&
        Math.abs(frameObject.currentFrame - targetFrame) < 0.01;

      if (isAnimatingRef.current || isAlreadySettled) {
        return;
      }

      isAnimatingRef.current = true;
      currentStopRef.current = nextIndex;
      preparePanelForTransition(nextIndex);

      let frameComplete = false;
      let scrollComplete = false;
      let transitionFinished = false;

      const completeTransition = () => {
        if (transitionFinished) {
          return;
        }

        transitionFinished = true;
        releaseTween?.kill();
        releaseTween = null;
        frameObject.currentFrame = targetFrame;
        renderFrame();
        revealSettledPanel(nextIndex);
        isAnimatingRef.current = false;
      };

      const finishIfComplete = () => {
        if (frameComplete && scrollComplete) {
          completeTransition();
        }
      };

      fallbackScrollTween?.kill();
      releaseTween?.kill();
      gsap.killTweensOf(frameObject);

      gsap.to(frameObject, {
        currentFrame: targetFrame,
        duration: transitionDuration,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => renderFrame(),
        onComplete: () => {
          frameComplete = true;
          finishIfComplete();
        },
      });

      const currentLenis = smoothScrollRef?.current;

      if (currentLenis) {
        currentLenis.scrollTo(targetScroll, {
          duration: transitionDuration,
          easing: easeInOutSine,
          force: true,
          lock: true,
          onComplete: () => {
            scrollComplete = true;
            finishIfComplete();
          },
        });
      } else {
        const scrollState = { y: window.scrollY };

        fallbackScrollTween = gsap.to(scrollState, {
          y: targetScroll,
          duration: transitionDuration,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: () => window.scrollTo(0, scrollState.y),
          onComplete: () => {
            scrollComplete = true;
            fallbackScrollTween = null;
            finishIfComplete();
          },
        });
      }

      releaseTween = gsap.delayedCall(transitionDuration + 0.2, () => {
        frameComplete = true;
        scrollComplete = true;
        completeTransition();
        releaseTween = null;
      });
    };

    const shouldReleaseNaturalScroll = (direction: -1 | 1) => {
      if (direction < 0) {
        return currentStopRef.current === 0 && isAtStopPosition(0);
      }

      return (
        currentStopRef.current === maxStopIndex &&
        isAtStopPosition(maxStopIndex)
      );
    };

    const handleStepIntent = (
      direction: -1 | 1,
      event: WheelEvent | TouchEvent,
    ) => {
      if (!isInsideStepZone()) {
        return;
      }

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      if (shouldReleaseNaturalScroll(direction)) {
        exitReleaseUntilRef.current = performance.now() + EXIT_RELEASE_DURATION;
        return;
      }

      event.preventDefault();
      goToStop(currentStopRef.current + direction);
    };

    const correctDrift = () => {
      window.clearTimeout(driftCorrectionTimer);
      driftCorrectionTimer = 0;

      if (
        isAnimatingRef.current ||
        !isInsideStepZone() ||
        performance.now() < exitReleaseUntilRef.current
      ) {
        return;
      }

      const nearestStop = getNearestStopIndex();
      const nearestStopPosition = getStopPosition(nearestStop);

      if (Math.abs(window.scrollY - nearestStopPosition) <= SCROLL_EPSILON) {
        setStopInstantly(nearestStop, false);
        return;
      }

      goToStop(nearestStop);
    };

    const scheduleDriftCorrection = () => {
      if (
        isAnimatingRef.current ||
        !isInsideStepZone() ||
        performance.now() < exitReleaseUntilRef.current
      ) {
        return;
      }

      window.clearTimeout(driftCorrectionTimer);
      driftCorrectionTimer = window.setTimeout(
        correctDrift,
        DRIFT_CORRECTION_DELAY,
      );
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isInStepZoneRef.current && !isInsideStepZone()) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;

      if (!direction) {
        return;
      }

      handleStepIntent(direction, event);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isInStepZoneRef.current && !isInsideStepZone()) {
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isInStepZoneRef.current && !isInsideStepZone()) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      const delta = touchStartYRef.current - currentY;

      if (Math.abs(delta) < TOUCH_SWIPE_THRESHOLD) {
        return;
      }

      const direction = delta > 0 ? 1 : -1;

      if (isAnimatingRef.current || !shouldReleaseNaturalScroll(direction)) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isInStepZoneRef.current && !isInsideStepZone()) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;

      if (endY === undefined) {
        return;
      }

      const delta = touchStartYRef.current - endY;

      if (Math.abs(delta) < TOUCH_SWIPE_THRESHOLD) {
        return;
      }

      handleStepIntent(delta > 0 ? 1 : -1, event);
    };

    const handleResize = () => {
      if (!isInsideStepZone()) {
        return;
      }

      setStopInstantly(currentStopRef.current, true);
    };

    gsap.set(panels, {
      autoAlpha: 0,
      y: 18,
      willChange: "opacity, transform",
    });

    gsap.set(panels[0], {
      autoAlpha: 1,
      y: 0,
    });

    setStopInstantly(getNearestStopIndex(), isInsideStepZone());

    const stepZoneTrigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        isInStepZoneRef.current = true;

        if (!isAnimatingRef.current) {
          setStopInstantly(getNearestStopIndex(), true);
        }
      },
      onLeave: () => {
        isInStepZoneRef.current = false;
      },
      onEnterBack: () => {
        isInStepZoneRef.current = true;

        if (!isAnimatingRef.current) {
          setStopInstantly(getNearestStopIndex(), true);
        }
      },
      onLeaveBack: () => {
        isInStepZoneRef.current = false;
      },
    });

    isInStepZoneRef.current = stepZoneTrigger.isActive || isInsideStepZone();

    window.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      capture: true,
      passive: false,
    });
    window.addEventListener("scroll", scheduleDriftCorrection, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    renderFrame();
    ScrollTrigger.refresh();

    return () => {
      clearCopyRevealTimer();
      window.clearTimeout(driftCorrectionTimer);
      fallbackScrollTween?.kill();
      releaseTween?.kill();
      gsap.killTweensOf(frameObject);
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
      window.removeEventListener("scroll", scheduleDriftCorrection);
      window.removeEventListener("resize", handleResize);
      stepZoneTrigger.kill();
    };
  }, [frameVariant, renderFrame, smoothScrollRef]);

  return (
    <section
      id="pocetna"
      aria-label="EdenBooks canvas scrollytelling"
      className="relative isolate bg-[#020615] font-sans text-white"
    >
      <span id="preporuke" className="absolute top-[225vh]" aria-hidden="true" />
      <span id="audio-knjige" className="absolute top-[300vh]" aria-hidden="true" />
      <div ref={rootRef} className="relative h-[400vh] overflow-clip">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#020615]">
          <canvas
            ref={canvasRef}
            className="pointer-events-none block h-full w-full origin-center scale-100 transition-transform duration-700 ease-out will-change-transform lg:scale-[0.82]"
            aria-hidden="true"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] md:hidden"
            style={{
              background:
                "linear-gradient(180deg,#020615 0%,#020615 7%,rgba(2,6,21,0.92) 12%,rgba(2,6,21,0.56) 18%,transparent 30%,transparent 70%,rgba(2,6,21,0.56) 82%,rgba(2,6,21,0.92) 89%,#020615 94%,#020615 100%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
            style={{ background: FRAME_EDGE_FADE_BACKGROUND }}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-700 ease-out ${
              activeSection === 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, transparent 52%, rgba(2,6,21,0.18) 64%, rgba(2,6,21,0.48) 82%, rgba(2,6,21,0.66) 100%)",
            }}
          />

          {scrollyCopySections.map((section, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            const isActive = activeSection === index;
            const shouldRevealCopy = copyRevealSection === index;
            const isCentered = section.position === "bottom-center";
            const isAudioOutro = index === 3;
            const alignClass = isCentered
              ? "mx-auto text-center"
              : section.position === "bottom-right"
                ? "ml-auto mr-0 text-right"
                : "mx-0 text-left";
            const panelSizeClass = isCentered
              ? "max-w-[90vw] md:w-auto md:max-w-none"
              : "max-w-[30rem] md:w-[38vw] md:max-w-[34rem] lg:max-w-[36rem]";
            const titleSizeClass = isCentered
              ? "whitespace-nowrap text-[1.3rem] leading-[1.1] md:text-[1.7rem] md:leading-[1.1] lg:text-[2.1rem] lg:leading-[1.1] xl:text-[2.3rem]"
              : "text-[2.4rem] leading-[1.02] md:text-[2.9rem] md:leading-[1.02] lg:text-[3.2rem] lg:leading-[1.02] xl:text-[3.5rem] xl:leading-[1.02]";
            const bodySizeClass = isCentered
              ? "mt-2 whitespace-nowrap text-xs leading-relaxed md:mt-3 md:text-sm md:leading-relaxed lg:text-base lg:leading-relaxed"
              : "mt-5 max-w-[30rem] text-base leading-relaxed md:mt-6 md:text-lg md:leading-relaxed lg:text-lg lg:leading-relaxed";
            const ctaRevealClass = shouldRevealCopy
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0";

            return (
              <div
                key={section.key}
                className={`pointer-events-none absolute z-10 ${getPanelPositionClass(
                  section.position,
                )}`}
              >
                <div
                  data-eden-copy-panel
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                  className={`pointer-events-none relative w-[calc(100vw-2.5rem)] text-white ${panelSizeClass} ${
                    index === 0 ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  {isAudioOutro ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-[-1.2rem] inset-y-[-0.9rem] rounded-[2rem] bg-[#061327]/34 shadow-[0_22px_72px_rgba(2,6,21,0.26)] backdrop-blur-xl md:inset-x-[-2.4rem] md:inset-y-[-1.4rem]"
                      style={{
                        WebkitMaskImage:
                          "radial-gradient(ellipse at center, #000 0%, #000 48%, rgba(0,0,0,0.72) 66%, transparent 100%)",
                        maskImage:
                          "radial-gradient(ellipse at center, #000 0%, #000 48%, rgba(0,0,0,0.72) 66%, transparent 100%)",
                      }}
                    />
                  ) : null}
                  <div
                    className="relative z-10 flex flex-col items-center justify-center py-6 text-center md:py-8"
                  >
                    <div className={`pointer-events-none w-full transform-gpu ${alignClass}`}>
                      <p className="sr-only">{section.eyebrow}</p>
                      <Heading className="sr-only">{section.title}</Heading>
                      <p className="sr-only">{section.text}</p>

                      <div aria-hidden="true" className="w-full">
                        <div
                          style={{
                            color: LOGO_BLUE_LIGHT,
                            textShadow: `0 0 16px ${LOGO_BLUE_GLOW}`,
                          }}
                        >
                          {shouldRevealCopy ? (
                            <AnimatedText
                              key={`${section.key}-eyebrow-${copyRevealSection}`}
                              text={section.eyebrow}
                              animationType="words"
                              duration={0.32}
                              delay={0.0}
                              staggerDelay={0.03}
                              initialY={8}
                              className={`mb-4 max-w-none transform-gpu font-sans text-sm font-bold uppercase leading-none [letter-spacing:0.04em] md:mb-5 md:text-sm lg:text-base ${alignClass}`}
                            />
                          ) : (
                            <p
                              className={`mb-4 max-w-none transform-gpu font-sans text-sm font-bold uppercase leading-none opacity-0 [letter-spacing:0.04em] md:mb-5 md:text-sm lg:text-base ${alignClass}`}
                            >
                              {section.eyebrow}
                            </p>
                          )}
                        </div>
                        <div
                          style={{
                            WebkitTextStroke: `0.35px ${LOGO_BLUE}`,
                            textShadow: `0 0 18px ${LOGO_BLUE_GLOW}, 0 0 42px rgba(88,169,219,0.24)`,
                          }}
                        >
                          {shouldRevealCopy ? (
                            <AnimatedText
                              key={`${section.key}-title-${copyRevealSection}`}
                              text={section.title}
                              animationType="words"
                              duration={0.36}
                              delay={0.02}
                              staggerDelay={0.035}
                              initialY={14}
                              className={`max-w-none transform-gpu font-medium text-white [font-family:var(--font-display)] [letter-spacing:0] ${titleSizeClass} ${alignClass}`}
                            />
                          ) : (
                            <p
                              className={`max-w-none transform-gpu font-medium text-white opacity-0 [font-family:var(--font-display)] [letter-spacing:0] ${titleSizeClass} ${alignClass}`}
                            >
                              {section.title}
                            </p>
                          )}
                        </div>
                        {shouldRevealCopy ? (
                          <AnimatedText
                            key={`${section.key}-text-${copyRevealSection}`}
                            text={section.text}
                            animationType="words"
                            duration={0.32}
                            delay={0.06}
                            staggerDelay={0.016}
                            initialY={10}
                            className={`transform-gpu font-normal text-slate-200/85 [font-family:var(--font-reading)] [letter-spacing:0] [text-shadow:0_0_18px_rgba(15,23,42,0.75)] ${bodySizeClass} ${alignClass}`}
                          />
                        ) : (
                          <p
                            className={`transform-gpu font-normal text-slate-200/85 opacity-0 [font-family:var(--font-reading)] [letter-spacing:0] [text-shadow:0_0_18px_rgba(15,23,42,0.75)] ${bodySizeClass} ${alignClass}`}
                          >
                            {section.text}
                          </p>
                        )}
                      </div>
                      <a
                        data-scrolly-cta
                        href={section.href}
                        className={`mt-8 inline-flex h-[3.2rem] w-fit origin-center items-center justify-center rounded-full border bg-[#1075AD]/15 px-8 text-base font-bold text-white shadow-[0_0_0_1px_rgba(16,117,173,0.18),0_0_34px_rgba(16,117,173,0.52),inset_0_0_16px_rgba(88,169,219,0.08)] transition-[border-color,box-shadow,color,background-color,transform,opacity] duration-300 [font-family:var(--font-ui)] hover:-translate-y-0.5 hover:border-[#58A9DB] hover:bg-[#1075AD]/25 hover:shadow-[0_0_0_1px_rgba(88,169,219,0.28),0_0_48px_rgba(16,117,173,0.58),inset_0_0_18px_rgba(88,169,219,0.12)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#1075AD]/45 md:mt-10 md:h-[3.6rem] md:px-12 md:text-lg ${ctaRevealClass}`}
                        style={{
                          borderColor: LOGO_BLUE,
                        }}
                      >
                        {section.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { VideoScrollytellingHero };
export default VideoScrollytellingHero;

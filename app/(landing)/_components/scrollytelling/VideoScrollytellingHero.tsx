"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../../_providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 180;
const FRAME_PATH = "/images/eden-frames";
const STOP_FRAMES = [1, 60, 120, 180];
const TRANSITION_DURATION = 1.25;
const REDUCED_MOTION_DURATION = 0.01;
const TOUCH_SWIPE_THRESHOLD = 30;
const SCROLL_EPSILON = 2;
const DRIFT_CORRECTION_DELAY = 80;
const EXIT_RELEASE_DURATION = 900;
const FRAME_STAGE_SCALE = 0.82;
const LOGO_BLUE = "#1075AD";
const LOGO_BLUE_LIGHT = "#58A9DB";
const LOGO_BLUE_GLOW = "rgba(16,117,173,0.52)";
const LIQUID_POP_FILTER_IN = "url(#eden-liquid-pop-threshold) blur(0px)";
const LIQUID_POP_FILTER_OUT = "url(#eden-liquid-pop-threshold) blur(18px)";
const LIQUID_SCREEN_REVEAL_OFFSET = 54;
const FRAME_EDGE_FADE_BACKGROUND =
  "linear-gradient(90deg,#020615 0%,#020615 9%,rgba(2,6,21,0.9) 13%,rgba(2,6,21,0.54) 19%,transparent 29%,transparent 71%,rgba(2,6,21,0.54) 81%,rgba(2,6,21,0.9) 87%,#020615 91%,#020615 100%),linear-gradient(180deg,#020615 0%,#020615 7%,rgba(2,6,21,0.86) 11%,rgba(2,6,21,0.46) 18%,transparent 28%,transparent 73%,rgba(2,6,21,0.5) 84%,rgba(2,6,21,0.9) 91%,#020615 96%,#020615 100%)";

const HQ_FRAME_PATHS: Record<number, string> = {
  1: "/images/eden-frames/001.webp",
  60: "/images/eden-frames/060.webp",
  120: "/images/eden-frames/120.webp",
  180: "/images/eden-frames/180.webp",
};

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
  {
    key: "digital-reading",
    eyebrow: "Digitalna biblioteka",
    title: "Čitaj knjige kao da su već u tvojoj biblioteci.",
    text: "Premium katalog se otvara odmah, direktno na telefonu, bez čekanja i bez komplikacija.",
    cta: "Započni čitanje",
    href: "#biblioteka",
    position: "left",
  },
  {
    key: "library-opening",
    eyebrow: "Premium kolekcija",
    title: "Biblioteka se otvara oko tvog ekrana.",
    text: "Naslovi izlaze iz prostora oko telefona i pretvaraju katalog u elegantan, jasan trenutak otkrivanja.",
    cta: "Pogledaj naslove",
    href: "#kolekcija",
    position: "bottom-right",
  },
  {
    key: "reader-mode",
    eyebrow: "Reader mode",
    title: "Knjiga ulazi u ekran i odmah je spremna.",
    text: "Od izbora do čitanja, iskustvo ostaje brzo, mirno i napravljeno za korisnike koji žele sadržaj odmah.",
    cta: "Vidi iskustvo",
    href: "#iskustvo",
    position: "bottom-left",
  },
  {
    key: "audio-books",
    eyebrow: "Audio knjige",
    title: "Kada ne možeš da čitaš - slušaj.",
    text: "Audio knjige prate korisnika u pokretu, dok vizuelni talasi iz telefona jasno pokazuju da EdenBooks nije samo čitanje.",
    cta: "Pogledaj audio iskustvo",
    href: "#audio",
    position: "bottom-center",
  },
];

function getFrameSrc(frame: number) {
  return `${FRAME_PATH}/${String(frame).padStart(3, "0")}.webp`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutSine(progress: number) {
  return 0.5 - Math.cos(progress * Math.PI) / 2;
}

function getPanelPositionClass(position: ScrollyCopySection["position"]) {
  if (position === "bottom-left") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:top-auto md:bottom-[5vh] md:-translate-x-1/2 md:translate-y-0";
  }

  if (position === "bottom-right") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:top-auto md:bottom-[5vh] md:-translate-x-1/2 md:translate-y-0";
  }

  if (position === "bottom-center") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:top-auto md:bottom-[1.5vh] md:-translate-x-1/2 md:translate-y-0";
  }

  return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:top-[36%] md:-translate-x-1/2";
}

function LiquidPopFilter() {
  return (
    <svg aria-hidden="true" className="hidden" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="eden-liquid-pop-threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
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

function VideoScrollytellingHero() {
  const smoothScrollRef = useSmoothScroll();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const hqImagesRef = useRef<Record<number, HTMLImageElement | null>>({});
  const frameObjRef = useRef<FrameObject>({ currentFrame: 1 });
  const activeSectionRef = useRef(0);
  const currentStopRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isInStepZoneRef = useRef(false);
  const touchStartYRef = useRef(0);
  const exitReleaseUntilRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const [activeSection, setActiveSection] = useState(0);

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
    const requestedFrame = clamp(Math.round(exactFrame), 1, FRAME_COUNT);

    let image = imagesRef.current[requestedFrame - 1];

    const isAtStopFrame = STOP_FRAMES.includes(requestedFrame);
    const distanceToStop = Math.abs(exactFrame - requestedFrame);

    if (isAtStopFrame && distanceToStop < 0.01) {
      const hqImage = hqImagesRef.current[requestedFrame];

      if (hqImage?.complete && hqImage.naturalWidth) {
        image = hqImage;
      }
    }

    if (!image?.complete || !image.naturalWidth) {
      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const previousImage = imagesRef.current[requestedFrame - 1 - offset];
        const nextImage = imagesRef.current[requestedFrame - 1 + offset];

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
      return;
    }

    drawImageCover(
      context,
      image,
      canvasSizeRef.current.width,
      canvasSizeRef.current.height,
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadFrame = (frame: number, source: string) => {
      const image = new Image();

      image.decoding = "async";
      image.loading = "eager";

      image.onload = () => {
        if (!isMounted) {
          return;
        }

        imagesRef.current[frame - 1] = image;
        renderFrame();
      };

      image.src = source;
    };

    for (let frame = 1; frame <= FRAME_COUNT; frame += 1) {
      loadFrame(frame, getFrameSrc(frame));
    }

    Object.entries(HQ_FRAME_PATHS).forEach(([frameStr, src]) => {
      const frameNum = parseInt(frameStr, 10);
      const img = new Image();

      img.decoding = "async";
      img.onload = () => {
        if (isMounted) {
          hqImagesRef.current[frameNum] = img;

          if (Math.round(frameObjRef.current.currentFrame) === frameNum) {
            renderFrame();
          }
        }
      };
      img.src = src;
    });

    return () => {
      isMounted = false;
      imagesRef.current = [];
    };
  }, [renderFrame]);

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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDuration = prefersReducedMotion
      ? REDUCED_MOTION_DURATION
      : TRANSITION_DURATION;
    const maxStopIndex = STOP_FRAMES.length - 1;

    const getLiquidRevealOffset = (index: number) => {
      const position = scrollyCopySections[index]?.position;

      if (position === "bottom-right") {
        return { x: -LIQUID_SCREEN_REVEAL_OFFSET, y: 0 };
      }

      if (position === "bottom-center") {
        return { x: 0, y: LIQUID_SCREEN_REVEAL_OFFSET * 0.5 };
      }

      return { x: LIQUID_SCREEN_REVEAL_OFFSET, y: 0 };
    };

    const hideLiquidSection = (
      liquidSection: HTMLElement,
      index: number,
      immediate = false,
    ) => {
      const offset = getLiquidRevealOffset(index);

      gsap.to(liquidSection, {
        autoAlpha: 0,
        filter: LIQUID_POP_FILTER_OUT,
        scale: 0.94,
        x: offset.x * 0.45,
        y: offset.y || -10,
        duration:
          immediate || prefersReducedMotion ? REDUCED_MOTION_DURATION : 0.24,
        ease: "power2.in",
        overwrite: true,
      });
    };

    const preparePanelForTransition = (index: number) => {
      activeSectionRef.current = index;
      setActiveSection(index);

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;
        const liquidSection =
          panel.querySelector<HTMLElement>("[data-liquid-section]");
        const offset = getLiquidRevealOffset(panelIndex);

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

        if (!liquidSection) {
          return;
        }

        if (isActive) {
          gsap.set(liquidSection, {
            autoAlpha: 0,
            filter: LIQUID_POP_FILTER_OUT,
            scale: 0.94,
            transformOrigin: "50% 50%",
            x: offset.x,
            y: offset.y,
          });
        } else {
          hideLiquidSection(liquidSection, panelIndex);
        }
      });
    };

    const revealSettledPanel = (index: number, animate: boolean) => {
      activeSectionRef.current = index;
      setActiveSection(index);

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;
        const liquidSection =
          panel.querySelector<HTMLElement>("[data-liquid-section]");
        const offset = getLiquidRevealOffset(panelIndex);

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

        if (!liquidSection) {
          return;
        }

        if (isActive && animate && !prefersReducedMotion) {
          gsap.killTweensOf(liquidSection);
          gsap
            .timeline()
            .fromTo(
              liquidSection,
              {
                autoAlpha: 0,
                filter: LIQUID_POP_FILTER_OUT,
                scale: 0.94,
                x: offset.x,
                y: offset.y,
              },
              {
                autoAlpha: 1,
                duration: 0.33,
                ease: "power2.out",
              },
            )
            .to(liquidSection, {
              autoAlpha: 1,
              filter: LIQUID_POP_FILTER_IN,
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.33,
              ease: "power3.out",
            });
        } else if (isActive) {
          gsap.set(liquidSection, {
            autoAlpha: 1,
            filter: LIQUID_POP_FILTER_IN,
            scale: 1,
            x: 0,
            y: 0,
          });
        } else {
          hideLiquidSection(liquidSection, panelIndex, !animate);
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
      revealSettledPanel(nextIndex, false);
      frameObject.currentFrame = STOP_FRAMES[nextIndex];
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
      const targetFrame = STOP_FRAMES[nextIndex];
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
        revealSettledPanel(nextIndex, true);
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

    const liquidSections = panels.flatMap((panel) =>
      Array.from(panel.querySelectorAll<HTMLElement>("[data-liquid-section]")),
    );

    gsap.set(liquidSections, {
      autoAlpha: 0,
      filter: LIQUID_POP_FILTER_OUT,
      scale: 0.985,
      transformOrigin: "50% 50%",
      y: 12,
    });

    const firstLiquidSections = Array.from(
      panels[0]?.querySelectorAll<HTMLElement>("[data-liquid-section]") ?? [],
    );

    gsap.set(firstLiquidSections, {
      autoAlpha: 1,
      filter: LIQUID_POP_FILTER_IN,
      scale: 1,
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
  }, [renderFrame, smoothScrollRef]);

  return (
    <section
      id="pocetna"
      aria-label="EdenBooks canvas scrollytelling"
      className={`${inter.variable} ${playfair.variable} relative isolate bg-[#020615] text-white [--font-sans:var(--font-inter)] font-sans`}
    >
      <div ref={rootRef} className="relative h-[400vh] overflow-clip">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#020615]">
          <LiquidPopFilter />

          <canvas
            ref={canvasRef}
            className="pointer-events-none block h-full w-full origin-center transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: `scale(${FRAME_STAGE_SCALE})`,
            }}
            aria-hidden="true"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: FRAME_EDGE_FADE_BACKGROUND }}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[70vh] transition-opacity duration-700 ease-out ${
              activeSection === 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(2,6,21,0) 0%, rgba(2,6,21,0.9) 25%, #020615 45%, #020615 100%)",
            }}
          />

          {scrollyCopySections.map((section, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            const isActive = activeSection === index;
            const isCentered = section.position === "bottom-center";
            const isBottomSide =
              section.position === "bottom-left" ||
              section.position === "bottom-right";
            const isBottomPlacement = section.position !== "left";
            const alignClass = isCentered
              ? "mx-auto text-center"
              : section.position === "bottom-right"
                ? "ml-auto mr-0 text-right"
                : "mx-0 text-left";
            const panelSizeClass = isBottomPlacement
              ? isCentered
                ? "max-w-[38rem] md:w-[38rem]"
                : "max-w-[25rem] md:w-[31vw]"
              : "max-w-[26rem] md:w-[31vw]";
            const titleSizeClass = isCentered
              ? "h-[4.6rem] text-[1.85rem] leading-[1] md:h-[4.9rem] md:text-[2.08rem] md:leading-[1] lg:h-[5.1rem] lg:text-[2.18rem] lg:leading-[1]"
              : isBottomSide
                ? "h-[8.2rem] text-[2.05rem] leading-[0.98] md:h-[8.5rem] md:text-[2.25rem] md:leading-[0.98] lg:h-[8.8rem] lg:text-[2.35rem] lg:leading-[0.98]"
                : "h-[9.3rem] text-[2.35rem] leading-[0.96] md:h-[9.7rem] md:text-[2.68rem] md:leading-[0.96] lg:h-[10rem] lg:text-[2.78rem] lg:leading-[0.96]";
            const bodySizeClass = isCentered
              ? "mt-3 h-[3rem] max-w-[32rem] text-sm leading-snug md:mt-4 md:h-[3.2rem] md:text-sm md:leading-snug lg:h-[3.4rem] lg:text-base lg:leading-snug"
              : isBottomSide
                ? "mt-4 h-[4.8rem] max-w-[23rem] text-sm leading-relaxed md:mt-5 md:h-[5rem] md:text-sm md:leading-relaxed lg:h-[5.2rem] lg:text-base lg:leading-relaxed"
                : "mt-5 h-[5.2rem] max-w-[25rem] text-sm leading-relaxed md:mt-6 md:h-[5.4rem] md:text-base md:leading-relaxed lg:h-[5.6rem] lg:text-base lg:leading-relaxed";

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
                  <div
                    className="relative z-10 flex flex-col items-center justify-center py-6 text-center md:py-8"
                  >
                    <div
                      data-liquid-section
                      className={`pointer-events-none w-full transform-gpu ${alignClass}`}
                      style={{
                        willChange: "opacity, transform, filter",
                      }}
                    >
                      <p className="sr-only">{section.eyebrow}</p>
                      <Heading className="sr-only">{section.title}</Heading>
                      <p className="sr-only">{section.text}</p>

                      <div aria-hidden="true" className="w-full">
                        <p
                          data-liquid-pop
                          className={`mb-3 h-5 max-w-none transform-gpu font-sans text-xs font-semibold uppercase leading-none [letter-spacing:0] md:h-6 md:text-xs lg:h-6 lg:text-sm ${alignClass}`}
                          style={{
                            color: LOGO_BLUE_LIGHT,
                            textShadow: `0 0 16px ${LOGO_BLUE_GLOW}`,
                          }}
                        >
                          {section.eyebrow}
                        </p>
                        <p
                          data-liquid-pop
                          className={`max-w-none transform-gpu font-sans font-bold text-white [letter-spacing:0] ${titleSizeClass} ${alignClass}`}
                          style={{
                            WebkitTextStroke: `0.35px ${LOGO_BLUE}`,
                            textShadow: `0 0 18px ${LOGO_BLUE_GLOW}, 0 0 42px rgba(88,169,219,0.24)`,
                          }}
                        >
                          {section.title}
                        </p>
                        <p
                          data-liquid-pop
                          className={`transform-gpu font-sans font-medium text-slate-200/85 [letter-spacing:0] [text-shadow:0_0_18px_rgba(15,23,42,0.75)] ${bodySizeClass} ${alignClass}`}
                        >
                          {section.text}
                        </p>
                      </div>
                      <a
                        data-scrolly-cta
                        href={section.href}
                        className="pointer-events-auto mt-8 inline-flex h-12 w-fit origin-center items-center justify-center rounded-full border bg-[#1075AD]/15 px-7 text-sm font-bold text-white shadow-[0_0_0_1px_rgba(16,117,173,0.18),0_0_34px_rgba(16,117,173,0.52),inset_0_0_16px_rgba(88,169,219,0.08)] transition-[border-color,box-shadow,color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#58A9DB] hover:bg-[#1075AD]/25 hover:shadow-[0_0_0_1px_rgba(88,169,219,0.28),0_0_48px_rgba(16,117,173,0.58),inset_0_0_18px_rgba(88,169,219,0.12)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#1075AD]/45 md:mt-10 md:h-[3.35rem] md:px-10 md:text-base"
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

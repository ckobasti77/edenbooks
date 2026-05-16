"use client";

import { useCallback, useEffect, useRef } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
const SNAP_POINTS = [0, 0.333, 0.666, 1];

type FrameObject = {
  currentFrame: number;
};

type GlassSection = {
  key: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  position: "left" | "right" | "center";
};

const glassSections: GlassSection[] = [
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
    position: "right",
  },
  {
    key: "reader-mode",
    eyebrow: "Reader mode",
    title: "Knjiga ulazi u ekran i odmah je spremna.",
    text: "Od izbora do čitanja, iskustvo ostaje brzo, mirno i napravljeno za korisnike koji žele sadržaj odmah.",
    cta: "Vidi iskustvo",
    href: "#iskustvo",
    position: "left",
  },
  {
    key: "audio-books",
    eyebrow: "Audio knjige",
    title: "Kada ne možeš da čitaš - slušaj.",
    text: "Audio knjige prate korisnika u pokretu, dok vizuelni talasi iz telefona jasno pokazuju da EdenBooks nije samo čitanje.",
    cta: "Pogledaj audio iskustvo",
    href: "#audio",
    position: "center",
  },
];

function getFrameSrc(frame: number) {
  return `${FRAME_PATH}/${String(frame).padStart(3, "0")}.webp`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNearestSnapIndex(progress: number) {
  return SNAP_POINTS.reduce((nearestIndex, snapPoint, index) => {
    const nearestDistance = Math.abs(progress - SNAP_POINTS[nearestIndex]);
    const currentDistance = Math.abs(progress - snapPoint);

    return currentDistance < nearestDistance ? index : nearestIndex;
  }, 0);
}

function getPanelPositionClass(position: GlassSection["position"]) {
  if (position === "right") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-auto md:right-[3.8vw]";
  }

  if (position === "center") {
    return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2";
  }

  return "left-5 right-5 top-1/2 -translate-y-1/2 md:left-[3.8vw] md:right-auto";
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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const frameObjRef = useRef<FrameObject>({ currentFrame: 1 });
  const activeSectionRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const renderFrame = useCallback((explicitFrame?: number) => {
    const canvas = canvasRef.current;

    if (!canvas || !canvas.width || !canvas.height) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) {
      return;
    }

    const requestedFrame = clamp(
      Math.round(explicitFrame ?? frameObjRef.current.currentFrame),
      1,
      FRAME_COUNT,
    );

    let image = imagesRef.current[requestedFrame - 1];

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

    const loadSequence = () => {
      for (let frame = 1; frame <= FRAME_COUNT; frame += 1) {
        loadFrame(frame, getFrameSrc(frame));
      }
    };

    loadSequence();

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

    if (!root || !panels.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const firstPhaseEnd = Math.max(1, Math.round(FRAME_COUNT * 0.25));
    const secondPhaseEnd = Math.max(
      firstPhaseEnd + 1,
      Math.round(FRAME_COUNT * 0.75),
    );

    const showPanel = (index: number) => {
      if (index === activeSectionRef.current) {
        return;
      }

      activeSectionRef.current = index;

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;
        const innerElements = panel.querySelectorAll("p, h1, h2, a");

        // Animate the card container (smooth scale, blur, opacity)
        // Removed `y` movement here so it doesn't double-animate with children
        gsap.to(panel, {
          autoAlpha: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.98,
          filter: isActive ? "blur(0px)" : "blur(8px)",
          duration: prefersReducedMotion ? 0.01 : 0.8,
          ease: "power3.out",
          overwrite: true,
        });

        // Stagger the text elements inside for a premium cascade effect
        if (isActive && !prefersReducedMotion) {
          gsap.fromTo(
            innerElements,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
              delay: 0.05, // Start almost immediately
            }
          );
        } else if (!isActive) {
          // Hide inner elements cleanly when card is inactive
          gsap.to(innerElements, {
            autoAlpha: 0,
            y: -8,
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,
          });
        }
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(panels, {
        autoAlpha: 0,
        y: 18,
        filter: "blur(10px)",
        willChange: "opacity, transform, filter",
      });

      gsap.set(panels[0], {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: prefersReducedMotion ? false : 0.75,
          invalidateOnRefresh: true,
          snap: prefersReducedMotion
            ? undefined
            : {
                snapTo: SNAP_POINTS,
                directional: false,
                inertia: false,
                duration: { min: 0.18, max: 0.48 },
                delay: 0.04,
                ease: "power2.inOut",
              },
          onUpdate: (self) => {
            showPanel(getNearestSnapIndex(self.progress));
          },
        },
      });

      timeline
        .to(frameObjRef.current, {
          currentFrame: firstPhaseEnd,
          duration: 2,
          onUpdate: () => renderFrame(),
        })
        .to(frameObjRef.current, {
          currentFrame: secondPhaseEnd,
          duration: 6,
          onUpdate: () => renderFrame(),
        })
        .to(frameObjRef.current, {
          currentFrame: FRAME_COUNT,
          duration: 2,
          onUpdate: () => renderFrame(),
        });

      renderFrame();
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, [renderFrame]);

  return (
    <section
      id="pocetna"
      aria-label="EdenBooks canvas scrollytelling"
      className={`${inter.variable} ${playfair.variable} relative isolate bg-[#020615] text-white [--font-sans:var(--font-inter)] font-sans`}
    >
      <div ref={rootRef} className="relative h-[400vh] overflow-clip">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#020615]">
          <canvas
            ref={canvasRef}
            className="pointer-events-none block h-full w-full"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(45,172,255,0.34),transparent_35%),linear-gradient(90deg,rgba(2,6,21,0.82)_0%,rgba(2,6,21,0.42)_42%,rgba(2,6,21,0.08)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,21,0.02)_0%,rgba(2,6,21,0.04)_48%,rgba(2,6,21,0.72)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020615] to-transparent" />

          {glassSections.map((section, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            const isCentered = section.position === "center";

            return (
              <div
                key={section.key}
                className={`pointer-events-none absolute z-10 ${getPanelPositionClass(
                  section.position,
                )}`}
              >
                <div
                  data-eden-glass-panel
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                  className={`pointer-events-auto relative w-[calc(100vw-2.5rem)] max-w-[38rem] overflow-hidden rounded-3xl border border-white/10 bg-black/5 p-6 text-white shadow-2xl backdrop-blur-sm md:w-[40vw] md:p-8 ${
                    index === 0 ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="pointer-events-none absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                  <div className="pointer-events-none absolute bottom-0 right-0 h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
                  <div className="pointer-events-none absolute -left-20 top-9 h-40 w-16 rotate-[18deg] bg-white/5 blur-3xl" />

                  <div
                    className={`relative z-10 flex flex-col justify-center ${
                      isCentered
                        ? "items-center text-center"
                        : "items-start text-left"
                    }`}
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400 md:mb-3 md:text-sm">
                      {section.eyebrow}
                    </p>
                    <Heading className="text-2xl font-bold leading-tight text-white md:text-4xl md:leading-tight">
                      {section.title}
                    </Heading>
                    <p className="mt-3 max-w-[30rem] text-sm leading-relaxed text-slate-300 md:mt-4 md:text-base md:leading-relaxed">
                      {section.text}
                    </p>
                    <a
                      href={section.href}
                      className="mt-6 inline-flex h-10 w-fit items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-110 md:mt-8 md:h-12 md:px-8 md:text-base"
                    >
                      {section.cta}
                    </a>
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

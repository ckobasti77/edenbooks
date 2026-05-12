<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EDEN BOOKS Project Guide

## Project Overview

EDEN BOOKS is a premium scrollytelling landing page for a digital reading platform focused on ebooks and audiobooks.

The website should feel serious, modern, futuristic, trustworthy, elegant, and premium. The goal is to create a high-end product experience, not a generic book website.

Users should immediately understand that they can discover, read, and listen to books anywhere.

## Current Phase

The project is in the pitch/demo phase.

The current goal is to create a polished 3-part premium scrollytelling sequence for a company pitch:

1. Discovery -> Library
2. Library -> Read/Audio
3. Read/Audio -> Recommendations/CTA

The visual experience may use four scene states, but the sales story must still feel like those three parts.

This is not the full final website yet. Do not build backend logic, authentication, payments, database features, API integrations, videos, or React Three Fiber in this phase.

## Design Direction

- Dark navy / black background.
- Electric blue accent color.
- White typography.
- Premium glassmorphism, close to modern iOS-style surfaces.
- Subtle glow.
- Soft gradients.
- Subtle noise texture.
- Large typography with strong hierarchy.
- Clean spacing and restrained surfaces.
- Smooth scroll experience.
- Premium product landing page feeling.
- Serious digital reading platform, not a playful book blog.
- Avoid cheap gaming styling.
- Avoid crypto/cyberpunk styling.
- Avoid generic template feeling.
- Avoid too much visual noise.
- Treat EDEN BOOKS as a serious digital reading product made by a high-end agency.

## Available Assets

Use the assets already placed in the project:

```txt
public/images/books/
public/images/devices/mobile-mockup.avif
public/images/logos/logo.png
public/images/logos/emblem.png
```

Use `next/image` for these real assets. Do not replace them with CSS-only placeholders in the pitch/demo scrollytelling sequence.

## Tech Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for shared UI primitives.
- GSAP and GSAP ScrollTrigger for scrollytelling sequences.
- Framer Motion for simple non-scroll entrance animations when useful.
- Lenis for smooth scrolling.
- lucide-react for icons.
- clsx and tailwind-merge for class composition.

Do not introduce React Three Fiber unless explicitly requested later.

## Folder Structure Rules

- Use route co-location by default.
- Page-specific components, constants, hooks, helpers, and providers should live next to the route that uses them.
- Do not place page-only files in a giant global `components` folder.
- Use private route folders such as `_components`, `_constants`, `_hooks`, `_lib`, and `_providers` for route-specific code.
- Use `components/ui` only for shadcn components and truly shared UI primitives.
- Use `lib` only for cross-page utilities and shared constants.
- If a page-specific component becomes reused by multiple routes, promote it deliberately to `components/ui` or another shared module.

Preferred landing structure:

```txt
app/
  (landing)/
    page.tsx
    _components/
      scrollytelling/
    _constants/
    _providers/
components/
  ui/
lib/
  constants/
  utils/
```

## Code Rules

- Keep components small and maintainable.
- Store scene copy and asset paths in route constants.
- Store shared brand values in `lib/constants/brand.ts`.
- Use reusable UI primitives from `components/ui`.
- Use `cn` from `lib/utils/cn.ts`.
- Avoid hardcoded repeated text inside components.
- Avoid unnecessary dependencies.
- Use semantic HTML.
- Keep class names readable.
- Avoid `any`.
- Do not add backend logic unless explicitly requested.
- Do not add auth, payments, database, or API integrations yet.
- Do not add React Three Fiber yet.

## Scrollytelling Rules

- Use one main GSAP timeline per scrollytelling sequence.
- Use ScrollTrigger for scroll-controlled scene transitions.
- Use `gsap.context` and clean up all timelines, contexts, and ScrollTriggers.
- Prefer transforms, opacity, scale, and rotation.
- Avoid animating width/height where possible.
- Avoid too many independent ScrollTriggers.
- Keep DOM size reasonable.
- Text transitions should not flicker or overlap badly.
- Respect `prefers-reduced-motion`.
- Provide a clean mobile/reduced-motion fallback if pinned scroll is unstable.

## Performance Rules

- Keep the pitch/demo lightweight.
- Use `next/image` for real images.
- Avoid videos.
- Avoid heavy 3D.
- Avoid huge animated DOM trees.
- Avoid unnecessary rerenders.
- Use `will-change` only on the few elements that are actively animated.
- Keep blur/glow effects tasteful and limited.
- Do not add unnecessary dependencies.

## Next Phase

If the company accepts the premium offer, the next phase is expanding the pitch/demo into the full scrollytelling site: subscription packages, multi-device product story, complete responsive polish, analytics-ready CTA paths, and production deployment hardening.

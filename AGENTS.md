<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EDEN BOOKS Project Guide

## Project Overview

EDEN BOOKS is a premium scrollytelling landing page for a digital reading platform focused on ebooks and audiobooks.

The website should feel serious, modern, futuristic, trustworthy, elegant, and premium. The goal is to create a high-end product experience, not a generic book website.

Users should immediately understand that they can discover, read, and listen to books anywhere.

## Design Direction

- Dark navy / black background.
- Electric blue accent color.
- White typography.
- Premium glassmorphism iOS 26.4.2 like.
- Subtle glow.
- Soft gradients.
- Subtle noise texture.
- Large typography with strong hierarchy.
- Clean spacing and restrained surfaces.
- Smooth scroll experience.
- Avoid cheap gaming, crypto, and cyberpunk styling.
- Avoid generic template feeling.
- Treat EDEN BOOKS as a serious digital reading product made by a high-end agency.

## Tech Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for shared UI primitives.
- GSAP and GSAP ScrollTrigger for future scrollytelling sequences.
- Framer Motion for simple entrance animations.
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
- Split landing sections into separate components.
- Store landing copy in the landing route constants.
- Store brand values in `lib/constants/brand.ts`.
- Store navigation links in the landing route constants.
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

## shadcn/ui Rules

- Initialize and manage shadcn through the shadcn CLI.
- Use shadcn primitives before creating raw custom controls.
- Keep shadcn source components in `components/ui`.
- Compose EDEN BOOKS-specific wrappers around shadcn components when needed.
- Use semantic theme tokens where practical.
- Keep global UI primitives reusable and route-agnostic.

## Animation Rules

- Use Framer Motion for simple entrance animations.
- Use GSAP ScrollTrigger for future scrollytelling sequences.
- Clean up all GSAP animations and ScrollTriggers properly.
- Respect `prefers-reduced-motion` where possible.
- Keep animations smooth and performance-friendly.
- Do not create animation logic that is impossible to maintain.

## Performance Rules

- Keep the first version lightweight.
- Avoid large external assets.
- Use `next/image` for real images.
- Avoid unnecessary rerenders.
- Avoid huge animated DOM trees.
- Do not add videos or heavy 3D assets in the foundation phase.
- Use CSS gradients and div placeholders for foundation visuals.

## Current Phase

Foundation phase only.

Build:

- Project structure.
- Constants.
- Shared UI primitives.
- Navbar.
- HeroSection.
- Placeholder sections.
- Smooth scroll provider.
- Scroll progress indicator.

Do not build the full final scrollytelling experience yet.

## Next Phase

Implement GSAP ScrollTrigger scrollytelling transition between HeroSection and DigitalLibrarySection.

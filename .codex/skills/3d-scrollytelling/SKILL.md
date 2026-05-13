---
name: 3d-scrollytelling
description: Use this skill when building premium scroll-driven 3D landing page sections with React Three Fiber, GSAP ScrollTrigger, and HTML overlays.
---

# 3D Scrollytelling Skill

Use this workflow for premium landing page sections that combine:

- React Three Fiber
- Three.js
- @react-three/drei
- GSAP ScrollTrigger
- HTML/CSS overlays
- responsive fallback behavior

## Core Rules

- Keep the 3D scene isolated.
- Do not rewrite the whole app.
- Do not put important copy or CTA buttons inside the canvas.
- Keep text, buttons, and navigation as accessible HTML.
- Use the canvas for visual storytelling only.
- Use dynamic import with SSR disabled if React Three Fiber causes server rendering issues.
- Keep the canvas pointer-events disabled unless interaction is required.
- Protect the rest of the page from z-index and overflow issues.

## Performance Rules

- Avoid heavy postprocessing.
- Avoid large particle systems.
- Avoid physics.
- Use simple meshes and planes where possible.
- Keep texture count low.
- Use mobile fallbacks.
- Respect prefers-reduced-motion.

## Implementation Pattern

Recommended section structure:

<section className="relative h-[240vh]">
  <div className="sticky top-0 h-screen overflow-hidden">
    <ThreeScene progress={progress} />
    <HtmlOverlay progress={progress} />
  </div>
</section>

## Scroll Progress

Use GSAP ScrollTrigger or the existing scroll system to create a normalized progress value from 0 to 1.

Avoid tying complex animation state directly to React re-renders if it can be handled inside useFrame or refs.

## Mobile Rules

- Reduce 3D complexity.
- Reduce movement.
- Keep the CTA visible and tappable.
- Avoid horizontal overflow.
- Hide or simplify the 3D scene if needed.

## Final Checks

Before finishing:

- Run lint.
- Run build.
- Check mobile layout.
- Check for horizontal overflow.
- Check that canvas does not block buttons.
- Check hydration issues.
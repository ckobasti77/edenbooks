# AGENTS.md

## Project

This is the EdenBooks pitch/demo website.

Production/demo URL:

https://edenbooks.vercel.app/

GitHub repository:

https://github.com/ckobasti77/edenbooks

The goal is to build a premium frontend pitch experience for EdenBooks, a digital reading and audiobook platform.

This is not a full production app. This is a high-end sales demo / landing page experience intended to help present multiple redesign packages to the client.

---

## Current Phase

Current phase: **3D Pitch / Scrollytelling Demo Phase**

The priority is to create an impressive top-of-page experience using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Lenis smooth scrolling
- Framer Motion
- Three.js
- @react-three/fiber
- @react-three/drei

React Three Fiber is allowed in this phase.

---

## Main Experience

Build a premium 2-step 3D scrollytelling section for the EdenBooks homepage.

This 3D scene is only for the pitch/demo experience. It must not introduce production app concerns such as auth, backend state, payments, APIs, or real reading/audio playback.

The scene should use a real `.glb` phone model loaded from:

`public/models/phone.glb`

If the actual model file has a different name, either rename it to `phone.glb` or update the asset constant in one place.

The Three.js scene should include:

- One main 3D phone
- Removal/hiding of any duplicate phone if the GLB contains two phones
- A screen plane placed over the phone screen if the model does not expose a clean screen mesh
- Book cover planes that appear from behind the phone
- Book covers that move in a semi-circle / arc around the phone and then enter into the phone screen
- A subtle phone tilt toward the books while the books emerge
- Screen texture switching between reader mode and audio mode
- Subtle audio wave visuals coming from the speaker area
- Smooth scroll-driven camera/phone animation
- Clean lighting
- No gaming/cyberpunk look

The HTML overlay should include:

- Section headings
- Subheadings
- CTA buttons
- Supporting chips/labels if needed

Do not put all text inside the 3D canvas. Text and CTAs should stay as accessible HTML.

---

## Scrollytelling Story

The scrollytelling story has two main screens.

---

### Screen 1 - Digital Reading

Visual behavior:

- Phone is large and premium
- Book covers start from behind the phone
- Books emerge in a semi-circle / arc around the phone
- While books emerge, the phone subtly tilts toward them
- Books then fly toward and enter the phone screen
- The phone screen turns on
- The reader UI appears as a screen texture

Copy direction:

- Focus on instant digital reading
- Communicate that books are always available on the phone

Suggested headline:

Čitaj knjige kao da su već u tvojoj biblioteci.

Suggested subheadline:

Digitalna biblioteka koja ti otvara knjigu odmah - bez čekanja, bez komplikacija, direktno na telefonu.

Suggested CTA:

Istraži biblioteku

---

### Screen 2 - Audio Books

Visual behavior:

- Phone rotates slightly toward the user
- Screen changes from reader mode to audio mode
- Subtle audio waves come from the speaker / lower phone area
- The scene should clearly suggest audiobook playback

Copy direction:

- Focus on listening when reading is not convenient
- Communicate audio books as a premium second mode of the platform

Suggested headline:

Kada ne možeš da čitaš - slušaj.

Suggested subheadline:

Audio knjige prate korisnika u pokretu, dok vizuelni talasi iz telefona jasno pokazuju da EdenBooks nije samo čitanje.

Suggested CTA:

Pogledaj audio iskustvo

---

## Assets

Expected assets:

- public/models/phone.glb

- public/images/devices/phone-screen-reader.png
- public/images/devices/phone-screen-audio.png

- public/images/books/book-1.jpg
- public/images/books/book-2.jpg
- public/images/books/book-3.jpg
- public/images/books/book-4.jpg
- public/images/books/book-5.jpg
- public/images/books/book-6.jpg

- public/images/logos/eden-books-logo.svg
- public/images/logos/eden-books-emblem.svg

If some image assets are missing, create clean local placeholder components or fallback materials.

Do not block the build because an optional visual asset is missing.

---

## Implementation Rules

Prefer this structure:

app/
  (landing)/
    _components/
      scrollytelling/
        EdenBooks3DScrollytelling.tsx
        ScrollyCopy.tsx

        three/
          ThreePhoneScene.tsx
          PhoneModel.tsx
          ScreenPlane.tsx
          FlyingBooks.tsx
          AudioWaves.tsx
          SceneLights.tsx

Keep all 3D-specific code inside the scrollytelling folder.

Use dynamic import with `ssr: false` for the Three.js canvas component if needed, because React Three Fiber must not cause server-rendering problems.

The main scrollytelling section should be isolated and should not break existing sections.

Recommended layout:

<section className="relative h-[240vh]">
  <div className="sticky top-0 h-screen overflow-hidden">
    <ThreePhoneScene progress={progress} />
    <ScrollyCopy progress={progress} />
  </div>
</section>

Scroll progress should be derived through GSAP ScrollTrigger or an existing smooth scroll setup.

---

## Book Animation Direction

The book animation is important and should feel premium.

Book behavior:

- Books should not randomly fly from the edges of the screen
- Books should start from behind the phone
- They should reveal themselves in a semi-circle / arc around the phone
- The arc should feel like a digital library opening around the device
- After the arc reveal, books should move toward the phone screen
- At the end of the first scroll segment, the books should appear to enter/pass through the screen
- Use 2D planes with book cover textures, not heavy 3D book models
- Keep the motion smooth and elegant
- Avoid chaotic particle-like movement

Phone behavior during book reveal:

- As books emerge from behind the phone, the phone should subtly tilt toward the book arc
- This should feel like the phone is reacting to the library opening
- The tilt should be small and premium, not exaggerated
- After the books enter the screen, the phone should return toward a cleaner front-facing reading position

Suggested motion logic:

progress 0.00 - 0.20:
- books hidden or mostly behind the phone
- phone in premium idle pose

progress 0.20 - 0.45:
- books emerge from behind the phone in a semi-circle
- phone subtly tilts toward the book arc

progress 0.45 - 0.65:
- books move from the arc toward the screen
- screen glow increases

progress 0.65 - 0.80:
- books enter/pass through the screen
- reader screen becomes active

progress 0.80 - 1.00:
- transition toward audio mode
- audio waves appear
- phone rotates subtly toward user

---

## Phone Motion Constants

Phone movement, screen placement, and book motion should be easy to tune.

Use constants where possible, for example:

const PHONE_BASE_ROTATION = [0.12, -0.35, -0.04];
const PHONE_BOOK_REVEAL_TILT = [0.16, -0.48, -0.08];
const PHONE_AUDIO_ROTATION = [0.1, -0.18, -0.02];

const PHONE_SCALE = 1;
const PHONE_POSITION = [1.2, 0, 0];

const SCREEN_PLANE_POSITION = [0, 0, 0.03];
const SCREEN_PLANE_ROTATION = [0, 0, 0];
const SCREEN_PLANE_SCALE = [1, 2.1, 1];

The exact values should be adjusted after inspecting the GLB model.

---

## Screen Texture Behavior

Use two screen textures:

- /images/devices/phone-screen-reader.png
- /images/devices/phone-screen-audio.png

If they are missing, use fallback materials or simple local placeholder visuals.

Expected behavior:

- During the reading section, the reader screen is visible
- During the audio section, the audio screen fades in
- The transition should be clean and subtle
- The screen should have a slight premium glow, but not excessive bloom

Suggested timing:

progress 0.00 - 0.70:
- reader screen reveal sequence

progress 0.70 - 1.00:
- audio screen sequence

---

## Audio Wave Direction

Create subtle visual wave elements from the lower/speaker area of the phone.

Requirements:

- Appear mainly in the second segment
- Use simple Three.js lines, rings, curves, or transparent planes
- Animate gently
- Do not overdo it
- It should clearly suggest audio books
- Keep it elegant and lightweight
- Avoid noisy particle effects

---

## 3D Performance Rules

Performance is important.

- Do not use heavy postprocessing
- Do not add unnecessary bloom
- Do not use massive particle systems
- Do not use physics
- Keep the scene visually premium but lightweight
- Use simple planes for book covers
- Use simple animated curves/rings/lines for audio waves
- Limit texture count
- Use compressed/resized images where possible
- Keep the canvas `pointer-events: none` unless interaction is explicitly required
- Respect `prefers-reduced-motion`

---

## Mobile Rules

For mobile:

- Use a simplified version
- Reduce the number of flying books
- Reduce camera movement
- Keep text readable
- Do not let the 3D phone cover the whole CTA area
- If needed, hide the 3D scene below very small widths and use a polished static fallback
- Avoid horizontal overflow
- Keep CTA buttons tappable
- Do not let canvas block navigation or buttons

---

## Design Direction

Use a premium digital publishing / SaaS style.

Visual direction:

- Dark navy / near black background
- Electric blue accent
- White typography
- Soft glow
- Glassmorphism only where useful
- Elegant motion
- Editorial premium feel
- Modern but trustworthy

Avoid:

- Crypto look
- Gaming look
- Childish colors
- Excessive neon
- Messy particle effects
- Over-animated UI
- Cheap template feeling

---

## Do Not Build

Do not build the following in this phase:

- Backend
- Database
- Auth
- Payment
- Admin panel
- CMS
- Real book reader logic
- Real audio playback system
- API integrations
- User accounts
- Checkout
- Subscriptions

This phase is frontend-only pitch/demo work.

---

## Quality Bar

Before finishing:

- Run lint
- Run build
- Fix TypeScript errors
- Fix hydration issues
- Check desktop responsiveness
- Check mobile fallback
- Make sure the existing homepage still works
- Make sure the scrollytelling scene does not block clicks on navbar/CTA
- Make sure there is no horizontal overflow
- Make sure React Three Fiber does not cause SSR issues

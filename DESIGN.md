# HiArchit → Artful Re-creation (Original Implementation)

## Reference & differentiation
Reference for design intent: https://hiarchit.online/ — not source or asset reuse. This project reinterprets the *visual grammar*: creamy canvas, enormous solid/outline name, staggered second word, orbital stats, editorial WHO AM I, framed identity art, diagonal skills marquee, numbered work-history, separate work index, blog and contact overlay. Build independently in Next.js; no copied Angular component, portrait or signature.

## Design thesis
**The person behind the pixels works both sides of the stack.** Bold frontend authorship balanced with quiet systems reliability.

- Audience: clients, collaborators and employers evaluating Karan's creative engineering.
- Primary action: explore selected work, then email `hello@kailasam.dev`.
- Tone: precise / playful / assured.
- Tension: monumental typography vs intricate interactive engineering.
- Never: generic dark agency landing page, neon blob template, fabricated social proof, motion that obstructs reading.
- Dials: DESIGN_VARIANCE 8 / MOTION_INTENSITY 6 / VISUAL_DENSITY 3.

## Tokens
- `--paper: #f4f4f0`, `--white: #fff`, `--ink: #1b1d19`, `--lime: #afe451`, `--muted: #61635d`.
- Outfit display, DM Sans copy. Purposeful large wordmarks, compact tracked labels.
- Spacious editorial two-column desktop; hero typography re-composed for tablet/phone.
- Art: original canvas torus knot / orbital rings with reduced-motion CSS fallback; typographic identity frame replacing reference owner's photo.

## Motion grammar
- GSAP once-only masked hero words, section reveals, CSS hover feedback.
- Continuous marquee and slow orbital spin only where composition earns it.
- Intersection/visibility throttling of WebGL; no WebGL in reduced motion or when unavailable.
- JS-free baseline remains legible and navigable.

## Engineering gates
- Next.js App Router, TS, plain authored CSS, GSAP, Three.js imported dynamically on client.
- No external proprietary assets copied. Contact uses native accessible dialog.
- Reduced motion, keyboard focus states, escape-to-close, touch navigation, route-specific metadata.
- Responsive checkpoints: 320/360/390/430/768/1024/1440/1920, no horizontal overflow.
- Target LCP <2.5s where realistic, no layout shift, reasonable JavaScript bundle and Lighthouse 90+ aspirational.
- Site owner updates identity/content via `src/lib/site.ts`, work via `src/lib/projects.ts`, notes via `src/lib/notes.ts`.

## Known limitation
No authorized portrait provided, so original branded portrait artwork substitutes for real photo. Replace with an owned portrait before personal launch if desired. Content is Karan's, not Archit's.

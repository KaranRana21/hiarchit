# THE HUMAN INTERFACE — Archit Jain

## Artful design thesis

- **Truth:** Archit builds complex frontend systems that feel intuitive to people.
- **Tension:** engineered precision × human tactility. Cold metal × warm paper. Complexity × clarity.
- **Adjectives:** sculptural, deliberate, warm.
- **Never:** generic tech landing page, old HiArchit composition, neon purple SaaS aesthetic, stock headshots, invented credibility.
- **Primary action:** inspect Archit's documented engineering projects, then contact him.
- **First impression:** person with engineering depth and exceptional creative judgment.
- **DESIGN_VARIANCE:** 9 / **MOTION_INTENSITY:** 8 / **VISUAL_DENSITY:** 3.

## Art direction

Deep near-black (#101214), mineral silver (#D6D7D5), warm porcelain (#EDEAE2), signal vermilion (#FF694A); steel reflections, fine measurement marks, editorial display typography. Refined work gallery. One living WebGL sculpture: constrained, product-shot studio lighting rather than random particles. Its orbit visually illustrates complex systems being shaped into coherent interfaces.

## Motion grammar

- Opening line composition (not forced loader) with gentle stagger.
- 3D sculpture drifts at low speed; pointer input subtle, no scroll hijack.
- Work cards show angled slab transform only on fine hover; keyboard/touch fully accessible.
- Section entrance movements used only for content hierarchy.
- Respect `prefers-reduced-motion`, `saveData`, weak/mobile devices, page visibility, and offscreen state. 3D static fallback always visible.

## Evidence and asset contract

Archit identity, contact, roles, education, 4 featured projects, metrics, skills and article titles sourced from original public HiArchit. Archit's portrait loaded from existing original-site public image URL. Resume points to original Google Drive URL. Articles linked to original full versions, not rewritten or misrepresented. Project artwork is newly designed abstract diagrams, **not screenshots** of live software. No new metrics or unverifiable endorsements.

## Implementation / QA

Next.js App Router, React, TypeScript, GSAP/ScrollTrigger, Three.js, CSS. Semantic HTML and visible focus. Full content crawlable. No external icon dependency. Dynamic WebGL import only when needed, capped DPR, intersection/visibility pause, cleanup. Audits: 320, 360, 390, 430, 768, 1024, 1440, 1920; keyboard, navigation, mobile menus, broken images, motion fallback, SEO. GitHub CI: TypeScript, lint, production build. Vercel preview domain; do **not** change hiarchit.online DNS.

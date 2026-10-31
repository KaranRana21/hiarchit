# Karan Rana — Creative Development Portfolio

## Creative thesis
An engineer with a designer's eye. The site should feel like an independent art-direction and interaction practice, not a generic resume template.

- **Memorable truth:** visual confidence backed by technical depth.
- **Keywords:** editorial, precise, kinetic.
- **Tension:** warm print-design materials versus cool systems thinking.
- **First impression:** oversized typographic identity + original procedural sculpture.
- **Primary action:** explore real work and get in touch via direct email.
- **Anti-goals:** visual clone of reference; invented social proof; blank decorative sections; slow loading ceremony.

## Design dials
- DESIGN_VARIANCE 9/10
- MOTION_INTENSITY 7/10 (experienced through a few memorable moments, not everywhere)
- VISUAL_DENSITY 3/10

## Visual doctrine
- Matte near-black (`#1a1d1b`), warm paper (`#eae9e1`), coral vermilion (`#f66a45`).
- Compressed oversized sans display; humane editorial italic in Georgia for contrast.
- Strong typographic line breaks. Off-axis secondary labels. Sections alternate expansive silence and dense project imagery.
- Project images are original abstract typographic compositions (not scraped source photos or stolen brands).
- 3D hero: a procedural sculptural knot in Three.js, with WebGL/reduced-motion fallback.
- Motion: one hero reveal; selective on-scroll entrances; marquee; responsive hover affordances; no fake loader.
- Desktop: split identity and sculpture. Mobile: sculpture subdued behind headline; controls stay visible.

## Engineering
Next.js App Router, TypeScript, TailwindCSS base with authored CSS, GSAP (on demand), Three.js (on demand), Vercel. SSR-rendered readable text. Semantic HTML, keyboard navigation, focus-visible, reduced-motion styling. Contact uses mailto and local copy action: no unconfigured form backend.

## Performance budget
Prioritize static first paint. Three.js and GSAP imported after mount. Cap device pixel ratio. Pause WebGL on background tab. Use no third-party images, fonts or widgets. Target ≥90 Lighthouse performance where realistic and ≥95 accessibility/SEO, verify from deployed site.

## Content constraints
Experience and project names reflect Karan's supplied background. FPVparts is explicitly in development. Some hospitality sites are concepts; no fabricated client claims or testimonials.

## Reference
Hiarchit (https://github.com/architjain808/Hiarchit) influenced editorial pacing only. No source or asset reuse: repo currently has no explicit license. Art direction follows KaranRana21/build-artful-websites.

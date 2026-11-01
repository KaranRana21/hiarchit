# ARCHIT / FUTURE FORM — Artful 2026

**Thesis:** Engineering is an act of shaping the invisible. Archit Jain translates systems at enormous scale into interfaces humans can trust.

**Visual language:** a luxury-futurist exhibition of digital sculpture, machined metal, polarised glass, contemporary typography, dramatic negative space, and architectural grids. Jet on slate, parchment, frozen platinum, quiet champagne gold. A deliberately custom environment—not the original HiArchit and not our prior “Human Interface.”

**Creative tension:** monumental dimensionality × precise restraint. Immersive three-dimensional objects without an exhausting “3D demo” or hidden information.

**Dials:** DESIGN_VARIANCE 9; MOTION_INTENSITY 8 (first view, spatial project index); VISUAL_DENSITY 2–3.

**Architecture:** hero is full-bleed sculpture stage; opening title is asymmetrically composed in two planes. Four cases live in a three-dimensional chapter selector with accessible previous/next buttons, direct buttons, keyboard ←/→ and swipe. Portrait anchored in high-contrast editorial About; experience/metrics remain verifiable. Six original journal entries link to Archit's public writing. Resume and all socials preserved.

**Motion grammar:** low-frequency 3D gyro, camera perspective and light reflections respond gently to pointer. Project stage uses 600ms depth/translation and 2D layout fallback. Content typographic entrance uses once per chapter, never reading interruption. Hover 180ms. No forced loader.

**WebGL quality:** physically lit metal and nested frosted-glass icosahedra, PMREM studio reflections, tapered elliptical orbits, detailed triangulated exoskeleton, animated light sweep. Resize-observed, DPR ≤1.5, 30 FPS max, Visibility/Intersection gated, `saveData` / reduced-motion mobile fallback, clean resource disposal. No downloaded 3D models or unauthorized imagery.

**Color:** `#08090D` void; `#E9EBE8` chalk; `#C9B697` warm metallic highlight; `#8B98A8` muted steel; `#E9E6DE` editorial paper.

**Evidence:** profile portrait bundled from Archit's original public repo. Bio, role, Daffodils Software, education, actual projects, impact figures, resume, email, socials and journal titles from original source. No invented awards/clients/experience. Images in work gallery are editorial original diagrams and are labelled as concept visualization rather than site screenshots.

**Responsive:** 320–1920 px, hero sculpture scales and becomes static on mobile/saveData/reduced motion, cases switch to single-stage content with touch swipe, navigation remains accessible. Keyboard and visible focus. SEO noindex on preview until archit owns domain.

**Target:** Next.js App Router, TypeScript, GSAP ScrollTrigger, Three.js. Vercel. CI tests required before user signoff.

## November 2026 — Gravity Chamber / Type System v2

**Creative thesis:** Digital products have weight, depth, gravity. Archit Jain gives complex systems a human center. Hero: an optical sculpture with suspended glass core and asymmetric precision-metal arcs. The illustration is original procedural Three.js, not a purchased asset or another metallic letter.

**Visual tension:** Swiss editorial clarity x spatial optical engineering. Gallery-like negative space, platinum/titanium light, subtle glacier-green luminous accents, confident asymmetry. Avoid generic gradient blobs, center-hero templates, excessive neon, unreadable micro labels.

**Hero composition:** 49/51 asymmetric stage; architectural two-line statement; Archit's name and frontend role in clear H1; concise specific introduction, primary Work and secondary Resume actions; interactive 3D portal with draggable inertia and a user-facing motion toggle. On mobile a composed optical sculpture remains visible without WebGL.

**Typography:** Syne 650–800 for display; Plus Jakarta Sans 500–800 for paragraphs/UI; IBM Plex Mono 600+ for meta. Minimum 10px utility at 320px, 11px typical desktop, reduced tracking, stronger contrast. No tiny weight-400 microcopy; no empty stylistic line spacing.

**Motion engineering:** 30fps max, DPR 1.45, Intersection/visibility-gated, no external textures or 3D models, WebGL fallback for <=720px, reduced motion, saveData. Pausing motion stops idle movement while retaining drag control. No loader, no hidden text before hydration.

**Functional requirement:** All existing Archit content, photo, projects, verified data, resume, socials, Work and Journal retained. Preview noindex. QA widths 320–1920, no clipping, readable metadata, keyboard/touch navigation, correct resume/email links, WebGL activation and fallback.

## 3D portrait experiment — 1 November 2026

**Brief:** Human presence replaces abstract Gravity Chamber optical centerpiece. Archit's actual public SVG portrait provides likeness. We stage this as a photo-textured plane in a real Three.js scene, with physically illuminated stylized torso/neck/arms, architectural orbital rings, rotation and a pedestal. It is an honest portrait-plus-3D sculptural composition, **not** a photogrammetry scan or an anatomically faithful full-body model.

**Accuracy constraint:** Single published portrait lacks rear/side/full-body evidence. No arbitrary facial sculpture or claims of accurate proportions. Future true full-body GLB requires additional photos/character references and available generation credits; this version remains no-credit and entirely original geometry.

**Performance & accessibility:** lazy WebGL on desktop only, pause control, 30fps cap, resize and visibility gating, reduced-motion/saveData/mobile image fallback; source portrait remains local.

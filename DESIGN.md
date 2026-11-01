# ARCHIT® / DIGITAL-FIRST PORTFOLIO

## Creative direction
Rebuild for **Archit Jain** using Locomotive's homepage (https://locomotive.ca/en) as reference for visual grammar and motion choreography — not as source of content/identity.

## Source-derived structure
User-supplied `locomotive-montreal-web-agency.full-page.Woblo.zip` includes HTML/CSS snapshot. It identifies: moving full-bleed headline hero, centered typography over media, wide-interval summary with 3D ring, featured work as giant border-separated link rows and expanding in-line images, enormous manifesto, personal visual, extras/article list and typographic footer. Live site also confirms those sections.

User-supplied palette image: black `#000000`, white `#FFFFFF`, grey `#808080`. Retain monochrome palette without spurious accent color.
User-supplied `design-system.Woblo.css` contains neutral tokens and a fallback font. Use original external file only as reference, not as runtime stylesheet.
User-supplied `assets.Woblo.zip` contains Locomotive's showreel `file.mp4`. It depicts unrelated individuals. Do not publish or present it as Archit's professional work.

## Archit content — retained
Archit Jain, frontend engineer; UMANG Web, ITPO Booking, Anuvachan and TalentTrace; Daffodils Software career, Kurukshetra University education; verified biography, metrics, actual portrait, resume, Github, LinkedIn, X, Instagram; six published blog/article links.

## Implementation
Next.js App Router / React / TypeScript. Components:
- `LocomotiveChrome.tsx`: adaptive fixed navigation, full-screen accessible menu, monumental footer
- `LocomotiveHome.tsx`: cinematic portrait hero, editorial summary, featured work, manifesto, biography, outcomes, expertise, history, journal
- `WorkPage.tsx`, `JournalPage.tsx`: consistent inner page experience
- `locomotive-archit.css`: single reference-derived design system

Use strong modern grotesk typography with fallback. No shared or redistributed font files.
Project visuals are original conceptual CSS illustrations, not copied website screenshots. Fade/motion respects reduced-motion. No invented awards or client partnerships.

## Constraints
Keep site responsive from 320 to 1920px, accessible menu, visible focus, working links, no horizontal overflow. GitHub Actions: typecheck + lint + Next build + Chromium smoke QA. Keep site noindex until launch. Do not modify `hiarchit.online`.

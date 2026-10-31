# HiArchit-inspired Portfolio — Artful edition

Original independent Next.js interpretation of the design experience at https://hiarchit.online/, built for Karan Rana using [Build Artful Websites](https://github.com/KaranRana21/build-artful-websites). Not affiliated with, or licensed by, HiArchit. No source files or personal assets taken from that repository.

## Run

```bash
npm install
npm run dev
npm run lint
npm run build
```

Next.js 16, React 19, TypeScript, GSAP, Three.js, CSS. Node.js 20.9+.

## Routes

- `/` — Hero, About, Experience, Work, Contact
- `/work` — project index
- `/blog` — short editorial notes
- `/blog/[slug]` — note detail

## Customize

1. `src/lib/site.ts` — identity, links, experience, skills.
2. `src/lib/projects.ts` — real work and URLs. Current data is representative studio/client work; verify statuses before public release.
3. `src/lib/notes.ts` — articles.
4. `src/app/globals.css` — design and responsive composition.
5. `src/components/Orbital.tsx` — procedural original Three.js art.

Set `NEXT_PUBLIC_SITE_URL` to final deployed public URL to update sitemap and robots.

## QA

Test viewport widths 320, 360, 390, 430, 768, 1024, 1440, 1920; mobile menu, native contact dialog, work URLs, keyboard links, reduced motion, WebGL disabled, image loading, 404, canonical URL and Lighthouse.

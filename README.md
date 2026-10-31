# Karan Rana — Artful Portfolio

Original interactive portfolio built with **Next.js 16**, TypeScript, Tailwind v4, GSAP and Three.js. Inspired by craft and interaction patterns, not copied from unlicensed source.

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Open http://localhost:3000.

## Deploy

1. Create empty GitHub repository `KaranRana21/karan-portfolio-artful`.
2. From this directory:

```bash
git init
git add .
git commit -m "Build Artful creative portfolio"
git branch -M main
git remote add origin https://github.com/KaranRana21/karan-portfolio-artful.git
git push -u origin main
```

3. Import repo in Vercel as Next.js project. No environment variables required. Once domain chosen, set `NEXT_PUBLIC_SITE_URL` to canonical URL and deploy again for sitemap.

## Site map
- `/` — motion-led portfolio, real projects, services, about, contact
- `/work` — complete project index
- `/journal` — original field notes

## Design authority
Follow [DESIGN.md](DESIGN.md), and install house Artful skill via:

```bash
npx skills add KaranRana21/build-artful-websites --skill build-artful-websites
```

## Accessibility / QA
Check at 320, 360, 390, 430, 768, 1024, 1440, 1920px. Test keyboard, mobile menu, copy email, WebGL disabled, `prefers-reduced-motion`, outbound project links, 404, Lighthouse and console errors. Images are original CSS artwork; no source images copied.

## Reference rights
The reference repository `architjain808/Hiarchit` is public but has no explicit license as inspected October 2026. This project contains **no copied code, images, text or assets** from that repository. Obtain permission before importing any.

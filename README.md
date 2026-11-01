# Archit Jain — Digital-first Frontend Engineer

Full redesign of Archit Jain's portfolio, using Locomotive Montreal as visual and interaction reference. Archit identity and work remain original.

## Visual language
- Black `#000000`, white `#FFFFFF`, grey `#808080`
- Full-bleed grayscale portrait hero, oversized editorial typography
- Minimal fixed header, full-screen navigation, project-title index with expanding in-line artwork
- Monumental statement, visual biography, genuine metrics, capabilities, writing and giant contact footer
- High-weight, legible text, motion only when purposeful, responsive 320–1920px
- Original conceptual artwork for Archit's actual projects; no Locomotive project imagery or claim to its work

## Source integrity
Portrait and personal details from Archit's published portfolio.
Four original projects, actual work history, education, social links, resume, six published journal links.
Locomotive reference HTML/CSS/video supplied for design study only. Its showreel, proprietary fonts, branding, names and unrelated client imagery are **not included**.

## Start
```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## QA
`.github/workflows/verify.yml` builds and runs real Chromium tests at 320, 360, 390, 430, 768, 1024, 1440 and 1920px.
Vercel staging preview only; `hiarchit.online` untouched. Indexing intentionally disabled until final domain approval.

See `DESIGN.md` for source-driven design decisions.

---
name: fe-portfolio
description: Build conventions, file structure, and implementation decisions for the portfolio
metadata:
  type: project
---

**Stack:** semantic HTML5 + modern CSS (custom properties, flexbox/grid) + vanilla JS. No frameworks, no build tools. Root-absolute asset paths (`/assets/...`) — required for GitHub Pages, breaks under `file://`.

**File structure (current site):**
- `index.html` — single page; sections `#home` (hero+about), `#projects`, `#skills`, `#experience`, `#contact`. Sticky nav. `<head>` has SEO/OG/Twitter meta, canonical, JSON-LD Person.
- `assets/js/projects.js` — `PROJECTS` array = single source of truth for project cards. Add a project = append one object. `featured: true` renders first; `link` optional.
- `assets/js/main.js` — IIFE; renders cards from `PROJECTS`, smooth-scroll, scroll-spy, mobile nav, footer year. Scripts loaded with `defer` (projects.js before main.js).
- `assets/css/styles.css` — active stylesheet; design tokens at `:root` (`--sp-*`, `--fs-*`, colors, radii); dark terminal palette, green/cyan accents.
- `assets/og-cover.png` — 1200×630 social card.
- Legacy/unused (old Bootstrap site, ignore/can delete): `assets/css/style.css`, `assets/js/myscript.js`, `assets/bootstrap/`, `assets/images/`.

**Accessibility standards to keep:** exactly one `<h1>`, logical heading order, landmark elements, skip link, visible `:focus-visible` ring, WCAG AA contrast on dark, ARIA only where it helps, full `prefers-reduced-motion` handling.

**Decisions made:** no profile photo (terminal motif carries the hero); featured projects render first preserving résumé order; body font is Inter via one Google Fonts link, mono via system `ui-monospace` stack. Contrast token `--text-dim` is `#8593a4` (was `#6b7888`, which failed AA — do not darken below ~4.5:1). `.btn` has `min-height:44px`; external links use `rel="noopener noreferrer"`.

**Declined by user (do NOT apply unless asked):** self-hosting the résumé PDF (keep Google Drive link), dropping Google Fonts for system stack, the visual-polish bundle (stronger featured borders, lighter social buttons, core-stack emphasis).

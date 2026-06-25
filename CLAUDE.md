# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio website (Mahesh Sharma, **backend engineer**) built with plain semantic HTML, modern CSS (custom properties, flexbox/grid), and vanilla JavaScript. **No frameworks, no build tools, no backend.** Dark "terminal" theme.

It is hosted on GitHub Pages with Jekyll and served from `https://techstarmahesh.github.io/`. The custom domain `techstarmahesh.me` is **not in use** — there is intentionally no `CNAME` file, and the live/canonical URL is the `github.io` address. Use `https://techstarmahesh.github.io/` for any absolute URLs (canonical, OG/Twitter image, sitemap, JSON-LD).

There is **no build step, no test suite, and no linter**. Edits to source files are deployed as-is by GitHub Pages on push to `master`.

## Development

- **Preview locally**: open `index.html` via a static server (root-absolute asset paths break under `file://`). The VS Code Live Server extension is pinned to port `5501` in `.vscode/settings.json`.
- **Deploy**: push to `master`. GitHub Pages rebuilds via Jekyll and publishes automatically. Active development happens on `dev`; merge to `master` to go live.
- Asset paths are **root-absolute** (e.g. `/assets/...`). Keep new asset links root-absolute.
- Validate JS with `node --check assets/js/<file>.js` (the only available "test").

## Architecture

- `index.html` — the entire page. Semantic landmarks and anchor-scroll sections: `#home` (hero + about), `#projects`, `#skills`, `#experience`, `#contact` (links only, no form). Sticky top nav. `<head>` carries SEO/Open Graph/Twitter meta, a canonical link, and JSON-LD `Person` structured data.
- `assets/js/projects.js` — **the `PROJECTS` array is the single source of truth for the Projects section.** To add/edit a project, change one object in this array; do not hand-write cards in HTML. `featured: true` items render first with emphasis; `link` is optional (company projects have no public repo).
- `assets/js/main.js` — renders project cards from `PROJECTS`, plus smooth-scroll, IntersectionObserver scroll-spy, mobile nav toggle, footer year. IIFE-scoped vanilla JS.
- `assets/css/styles.css` — the active stylesheet. Design-token layer of CSS variables at `:root` (colors, spacing `--sp-*`, font sizes `--fs-*`, radii); dark terminal palette with green/cyan accents; responsive + accessible (focus states, `prefers-reduced-motion`).
- `assets/og-cover.png` — 1200×630 social-share card (referenced by OG/Twitter image tags).
- `sitemap.xml`, `robots.txt` — crawlability; both reference the `github.io` URL.
- `_config.yml` — Jekyll config; redirect `/home.html` → `/index.html`. `404.html` — custom not-found page.
- **Legacy/unused** (from the pre-rebuild Bootstrap site, safe to delete): `assets/css/style.css`, `assets/js/myscript.js`, `assets/bootstrap/`, `assets/images/`. Nothing in the current site depends on them.

## Team & workflow (how features get built)

This project is built by four specialized subagents defined in `.claude/agents/` (committed, so they auto-register every session):

- **product-manager** — owns scope/requirements; enforces the static-only constraint; reviews output vs requirements.
- **frontend-developer** — writes all HTML/CSS/vanilla JS; accessible markup; project data in `assets/js/projects.js`.
- **qa-responsive** — tests breakpoints, accessibility, links, console errors; reports fixes to frontend-developer.
- **product-improvement** — recruiter-lens review; prioritized must-have / nice-to-have suggestions.

**Per-feature flow: product-manager → frontend-developer → qa-responsive → product-improvement.** The orchestrating (main) agent does **not** write feature code — it scopes via product-manager, delegates implementation to frontend-developer, relays results, and asks the user when unclear. Trivial mechanical edits (typo, URL swap, config, docs) may be done directly. Always ask clarifying questions rather than guessing.

## Integrations & gotchas

- **Contact** is links-only (email, GitHub, LinkedIn, LeetCode, résumé). There is no contact form / Formspree.
- **Résumé download** links to a hardcoded Google Drive URL (in the hero and contact sections).
- **Private files are git-ignored — never commit them**: the résumé PDF (`*.pdf`), the screenshots doc (`*.docx`), `linkedin-export/`, and `.claude/settings.json`. See `.gitignore`.
- **Open content task**: most project `impact` lines in `projects.js` lack hard metrics (only Zippee has `5s → 1s`). Ask the user for real latency/throughput/scale numbers before inventing any.

---
name: session-log
description: Full project-journey log across BOTH repos (static github.io + Next.js msbinarydev). Read to pick up complete context on any machine.
metadata:
  type: project
---

# Session log — Mahesh Sharma portfolio (full journey)

Curated record of the work and decisions. Committed to BOTH repos so the full story travels with either clone. This is a curated summary, not the verbatim chat (the raw transcript lives in Claude Code's local `~/.claude` store and does not travel with git). Two repos exist:
- **techstarmahesh.github.io** — the original plain HTML/CSS/JS site (GitHub Pages).
- **msbinarydev** — the modern Next.js + Tailwind + Vercel rebuild.

## Part 1 — static site (techstarmahesh.github.io)

- **Team:** created 4 subagents in `.claude/agents/` (product-manager, frontend-developer, qa-responsive, product-improvement). Workflow rule: features go PM → FE → QA → PI; main agent doesn't write feature code (trivial edits OK). See [[dev-workflow]], [[agent-team]].
- **Requirements:** backend-engineer portfolio. First design = dark **terminal** theme; sections Hero+About / Projects / Skills / Experience / Contact; contact = links only (no form); public email mistermaheshsharma@gmail.com; phone kept private.
- **Content:** LinkedIn auto-fetch was blocked (429); user provided a résumé PDF + a .docx of profile screenshots. Extracted into [[profile-content]]. Software Engineer @ Infinite Locus (Zippee logistics, cut API latency 5s→1s); prior Software Developer @ Walkwel. 7 projects (Zippee, Capabara.ai, ITECC, Lead-Centre, ITTT SMS, TEN X YOU, SuperTails).
- **Build/QA/PI:** built terminal v1 (index.html + styles.css + projects.js data array + main.js). QA fixed an AA contrast issue + minor items. SEO bundle applied (generated og-cover.png, canonical, JSON-LD Person, sitemap, robots, defer) + hero "3+ years" + "Available for backend roles" pill.
- **Domain:** custom domain techstarmahesh.me is NOT live — removed CNAME, pointed all URLs at https://techstarmahesh.github.io/. See [[live-url-github-io]].
- **API-docs redesign:** explored 4 directions; user picked **API Reference / Docs** (light theme — sidebar endpoints, `GET /mahesh-sharma` request→response hero, endpoint project cards, JSON-schema skills, changelog experience, `POST /hire`). Built, QA-passed, improvement pass applied. Regenerated og-cover for the light theme.
- **Sample metrics decision:** user wanted placeholder numbers; FE correctly refused to ship unlabeled fabricated metrics on a real job portfolio. Resolved by rendering illustrative numbers in a `sampleMetrics` field with a visible on-page amber **"sample"** tag — replace with real verified figures before sharing.
- **Memory:** moved to project level (committed): `.claude/memory/` (shared) + `.claude/agent-memory/<agent>/` (per-agent). CLAUDE.md updated. Phone kept out of the repo.
- **Branches (origin):** `master` (original Bootstrap site, live until a merge), `dev` (terminal rebuild + memory), `intigration` (API-docs redesign + improvement pass — most complete), plus older `v1`/`website`. NOTE: recent redesign work landed on `intigration`, not `dev`.

## Part 2 — Next.js rebuild (msbinarydev)

- **Decision:** build a modern, SEO-first version in a separate `msbinarydev` repo. Framework: **Next.js** (chosen over React+Vite for SEO) + **Tailwind v4** + **TypeScript** + **Vercel**.
- **Branch model:** `toggle` (production — both themes + a terminal⇄docs toggle, defaults to terminal) / `terminal` (pinned) / `docs` (pinned). Pinned branches derive from `toggle` by flipping `src/lib/siteConfig.ts` (`defaultTheme` + `showToggle`).
- **Build:** Next.js 16 + React 19 app — both themes via `[data-theme]` + no-flash SSR script, data-driven content (`src/data`), SEO (metadata, sitemap.ts, robots.ts, next/og OG image, JSON-LD Person). `npm run lint` + `npm run build` pass.
- **QA (0 blockers):** fixed MobileNav focus management, tap targets, chrome width, nav-height token, hardcoded-hex→tokens.
- **PI applied:** visible "Open to backend roles" pill, AI/LLM surfaced above the fold, per-project anchors, discoverable toggle (glyphs), footer quick-links, hero GitHub button, scrollspy, Zippee impact leads with 5s→1s, JSON-LD image, AI in meta description, MethodBadge per-verb tokens.
- **Repo:** `git init`; pushed `toggle`/`terminal`/`docs` to the `msbinarydev` GitHub repo (via the `github-msbinarydev` SSH alias); deleted old branches `intigration`/`master`/`v1`/`website`. Its own `.claude/` (agents + memory updated for the Next.js stack) + `CLAUDE.md` with coding guidelines (component-per-feature, reuse, typed, data-driven, clean folders) are committed.

## Current state (both repos backed up on git as of 2026-06-26)

- **github.io:** branches `master` / `dev` / `intigration` (+ `v1`/`website`) all pushed to `origin`. Static site unchanged in spirit; latest design work on `intigration`.
- **msbinarydev:** `toggle` / `terminal` / `docs` pushed. Stale `dev` branch (old static mirror) remains and is still the GitHub **default** — to be removed.

## Open threads / TODO

- **msbinarydev (user, GitHub UI):** set default branch to `toggle`, then delete the stale `dev` branch.
- **msbinarydev (user, Vercel):** import repo → Production Branch = `toggle` → deploy → send the assigned URL so `SITE_URL` (in `src/lib/siteConfig.ts`) can be updated.
- **Both:** replace illustrative `sampleMetrics` with real verified numbers before sharing (visible "sample" tag meanwhile); add live URLs for SuperTails / TEN X YOU when provided.
- **github.io:** if the new design should go live on Pages, merge `intigration` → `master`.

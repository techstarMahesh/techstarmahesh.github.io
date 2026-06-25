---
name: session-log
description: Curated chronological log of the build conversations — decisions, what was done, and open threads. Read this to pick up full context on any machine.
metadata:
  type: project
---

# Session log

A human-readable journal of the work and decisions on this portfolio, committed to the repo so context travels to any clone / machine. This is a curated summary (not the verbatim chat — that lives in Claude Code's local `~/.claude` store and does not travel with git). Append new milestones at the bottom.

## 2026-06-25 — Initial build & decisions

**Team setup.** Created four subagents in `.claude/agents/`: product-manager, frontend-developer, qa-responsive, product-improvement. Workflow rule established: features go product-manager → frontend-developer → qa-responsive → product-improvement; the main agent doesn't write feature code (trivial edits excepted). See [[dev-workflow]], [[agent-team]].

**Requirements (product-manager interview).** Backend-engineer portfolio. First design picked: technical/terminal, dark. Sections: Hero+About, Projects, Skills, Experience (+Education/Certs), Contact. Contact = links only (no Formspree form). Public email mistermaheshsharma@gmail.com. Phone kept private.

**Content source.** LinkedIn auto-fetch was blocked (HTTP 429). User supplied a résumé PDF and a `.docx` of screenshots (which turned out to be LinkedIn/Naukri profile captures). All content extracted into [[profile-content]]. Key facts: Software Engineer @ Infinite Locus (Zippee logistics, cut API latency 5s→1s); prior Software Developer @ Walkwel. Projects: Zippee, Capabara.ai, ITECC, Lead-Centre (featured) + ITTT SMS, TEN X YOU, SuperTails.

**Terminal site built (v1).** index.html + assets/css/styles.css + assets/js/projects.js (PROJECTS data array) + assets/js/main.js. QA found 1 AA-contrast issue (`--text-dim` lightened to #8593a4) + minor tap-target/robustness fixes — all applied. product-improvement reviewed; user approved the SEO/social bundle (og:image via generated 1200×630 og-cover.png, canonical, JSON-LD Person, sitemap.xml, robots.txt, defer) + hero "3+ years" line + "Available for backend roles" pill. Declined for now: self-hosting résumé, dropping Google Fonts, visual-polish bundle.

**Domain change.** The custom domain techstarmahesh.me is NOT live — removed CNAME and pointed all absolute URLs at https://techstarmahesh.github.io/. See [[live-url-github-io]].

**Memory & repo hygiene.** Moved all memory to project level (committed): `.claude/memory/` (shared) + `.claude/agent-memory/<agent>/` (per-agent). CLAUDE.md updated to reflect the rebuilt site + team/workflow. Phone number kept OUT of the repo. `.gitignore` protects `*.pdf`, `*.docx`, `linkedin-export/`, `.claude/settings.json`. All committed and pushed to branch `dev`.

**New design direction chosen.** Explored 4 fresh directions (Observability Dashboard, API Reference/Docs, System Blueprint, Quiet Index). User picked **API Reference / Docs** — light theme, site reads like API documentation: hero `GET /mahesh-sharma` → JSON profile, projects as documented endpoints, experience as a releases/changelog, skills as a schema. Palette: white/cool-gray/navy-ink + indigo #4F46E5 brand + method-color badges + dark code panels. Type: Space Grotesk / Inter / JetBrains Mono. Signature: the request→response panel. frontend-developer is building it (replaces the terminal design; terminal version stays in git history).

## Current state
- Branch `dev`, not yet merged to `master`. **The live site is still the OLD Bootstrap site** until `dev` → `master`.
- API-docs redesign in progress.

## Open threads / TODO
- Add REAL project impact metrics to `assets/js/projects.js` (only Zippee is quantified; user to supply latency/throughput/scale numbers).
- Regenerate `assets/og-cover.png` to match the new light API-docs design (current card is terminal-green).
- Merge `dev` → `master` to publish; also clear any custom-domain setting in GitHub → Settings → Pages so the CNAME isn't recreated.

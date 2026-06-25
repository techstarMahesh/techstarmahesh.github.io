---
name: qa-portfolio
description: Test checklist, known-good patterns, and fixes already applied for the portfolio
metadata:
  type: project
---

**Test checklist for this static dark/terminal site:**
- **Breakpoints** ~375 / ~768 / ~1280px: no horizontal scroll, content reflows, grids collapse to one column. Container inner width at 375px is ~327px — grid `minmax()` tracks must stay below that.
- **Tap targets** ≥ ~44px (nav toggle, buttons, links). `.btn` has `min-height:44px`.
- **Contrast (WCAG AA)**: check hex values against bg `#0a0e14`. `--text-dim` must stay ≥ ~4.5:1 (currently `#8593a4`). `--text-muted` `#9aa7b8` ≈ 6.6:1 OK; accent `#4ee59a` ≈ 11:1 OK.
- **Keyboard / focus**: visible `:focus-visible`, skip link to `#main`, smooth-scroll moves focus to target (`tabindex=-1`, not trapped).
- **Heading order**: exactly one `<h1>`, no skipped levels.
- **Data integrity**: every field `main.js` reads (`name, tagline, summary, impact, tech, featured, link`) exists on each `projects.js` object; `tech` access is guarded `(project.tech || [])`; featured ordering works.
- **Links**: internal anchors resolve to section ids; external links `https://` + `rel="noopener noreferrer"` + `target="_blank"`.

**Already fixed (don't re-flag):** `--text-dim` lightened to pass AA; `.btn` min-height 44px; `.nav__link` got horizontal padding; `project.tech` guarded; `noreferrer` added; Twitter card → `summary_large_image`.

**Method:** static analysis of HTML/CSS/JS (no browser). Diagnose only — hand specific fixes (severity + location + suggested fix) back to frontend-developer.

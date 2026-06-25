---
name: agent-team
description: The four specialized subagents that own this portfolio project and what each does
metadata:
  type: project
---

This portfolio is built by a fixed team of four subagents, defined in `.claude/agents/` (committed to the repo, so they auto-register in every session):

- **product-manager** — owns scope/requirements; interviews the user, breaks work into tasks, enforces the static-only constraint, reviews output vs requirements.
- **frontend-developer** — writes all HTML/CSS/vanilla JS; clean structure, accessible markup, project data in a JS array (`assets/js/projects.js`). No frameworks/build tools.
- **qa-responsive** — tests breakpoints, accessibility, links, console errors; reports specific fixes back to frontend-developer.
- **product-improvement** — recruiter/visitor-lens review; prioritized must-have / nice-to-have suggestions (content, UX, polish, performance, SEO).

Use them per the flow in [[dev-workflow]]. Project content lives in [[profile-content]]; deploy facts in [[live-url-github-io]].

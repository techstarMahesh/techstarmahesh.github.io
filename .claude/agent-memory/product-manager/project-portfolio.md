---
name: pm-portfolio
description: Scope, requirements, and confirmed decisions for Mahesh Sharma's portfolio
metadata:
  type: project
---

**Project:** static personal portfolio for Mahesh Sharma, a **backend engineer**. Goal: showcase backend work (APIs, system design, integrations, performance) to recruiters/hiring engineers.

**Hard constraint (enforce on every feature):** static only — semantic HTML, modern CSS, vanilla JS. No frameworks, no build tools, no backend. Keep code easy for Mahesh to edit; project data lives in `assets/js/projects.js`.

**Confirmed decisions (from the requirements interview):**
- Visual style: technical / terminal, dark theme.
- Sections: Hero + About, Projects, Skills, Experience (+ Education/Certifications), Contact.
- Contact: links only (email, GitHub, LinkedIn, LeetCode, résumé) — NO contact form / Formspree.
- Public email: mistermaheshsharma@gmail.com. Phone is private — keep it OFF the public repo/site.
- Live URL: techstarmahesh.github.io (no custom domain / no CNAME).

**Workflow I own:** scope/review each feature FIRST, then hand to frontend-developer → qa-responsive → product-improvement. Full content reference for the site is in the shared memory `profile-content`.

**Open requirement:** project impact lines need real metrics (only Zippee is quantified). Ask Mahesh for latency/throughput/scale numbers; do not invent them.

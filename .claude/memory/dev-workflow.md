---
name: dev-workflow
description: How to build features on this portfolio — route through the subagent team; main agent does not write feature code
metadata:
  type: feedback
---

For this portfolio project, every feature/component/content change goes through the subagent team ([[agent-team]]), not the main agent:

**Per-feature flow: product-manager → frontend-developer → qa-responsive → product-improvement.**
1. **product-manager** scopes/reviews the feature first (requirements, static-only constraint).
2. **frontend-developer** writes ALL the code/markup/styles.
3. **qa-responsive** tests it (breakpoints, a11y, links) and reports fixes back to frontend-developer.
4. **product-improvement** reviews as a recruiter would and proposes prioritized must-have / nice-to-have items.

**Why:** the user set up a specialized team and wants features built through it, with product review before any code — not ad-hoc code from the orchestrator.

**How to apply:** the main agent orchestrates, scopes via product-manager, relays results, and asks the user questions — it does NOT write feature code. **Pragmatic exception:** trivial mechanical edits (typo, URL swap, config, gitignore) may be done directly to avoid wasteful round-trips. When in doubt, ask the user. Always ask clarifying questions rather than guessing.

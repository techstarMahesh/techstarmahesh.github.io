---
name: live-url-github-io
description: The portfolio's only live URL is the github.io address; the custom domain techstarmahesh.me is not in use
metadata:
  type: project
---

The live site is **https://techstarmahesh.github.io/** (deployed via GitHub Pages on push to `master`). The custom domain **techstarmahesh.me is NOT live / not working** and must not be referenced.

As of 2026-06-25 the `CNAME` file was removed and all absolute URLs (canonical link, `og:url`, `og:image`, `twitter:image`, `sitemap.xml`, `robots.txt` Sitemap line, JSON-LD `url`) were switched to the `github.io` address.

**Why:** the user confirmed the `.me` domain is not functional and asked that everything point at the github.io URL.

**How to apply:** use `https://techstarmahesh.github.io/` for any absolute URL. Do NOT re-add a `CNAME` file or reintroduce `techstarmahesh.me` anywhere unless the user says the domain is live again.

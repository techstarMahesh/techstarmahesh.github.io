# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio website (Mahesh Sharma) built with plain HTML/CSS/JS. It is hosted on GitHub Pages with Jekyll and served from `https://techstarmahesh.github.io/`. The custom domain `techstarmahesh.me` is **not in use** — there is intentionally no `CNAME` file, and the live/canonical URL is the `github.io` address. Use `https://techstarmahesh.github.io/` for any absolute URLs (canonical, OG/Twitter image, sitemap).

There is **no build step, no test suite, and no linter**. Edits to source files are deployed as-is by GitHub Pages on push to `master`.

## Development

- **Preview locally**: open `index.html` directly, or use the VS Code Live Server extension. `.vscode/settings.json` pins Live Server to port `5501`.
- **Deploy**: push to `master`. GitHub Pages rebuilds via Jekyll and publishes automatically.
- Asset paths are **root-absolute** (e.g. `/assets/...`). This works on GitHub Pages and Live Server but breaks when opening `index.html` via `file://`. Keep new asset links root-absolute.

## Architecture

- `index.html` — the entire site. All content lives here as one long document; navigation is anchor-based scrolling, not separate pages. Sections are marked by empty anchor divs and HTML comments: `#home`, `#about` (Education), `#projects` (Training/Projects + Skills progress bars), `#HireMe` (footer with resume link + contact form).
- `assets/css/style.css` — small custom layer on top of Bootstrap: theme color (`.navColor`), image hover/zoom effects, form hover, `.error` state.
- `assets/js/myscript.js` — only custom JS. Contains `validatePhoneNumber()`, which validates an Indian mobile number (`/^[6-9]\d{9}$/`) against `#phoneNumber` and toggles `#phoneNumberHelp`.
- `assets/bootstrap/` — vendored third-party libraries (Bootstrap 5, jQuery, Owl Carousel, Font Awesome). Treat as vendor files; do not hand-edit.
- `assets/images/` — portfolio/project images.
- `_config.yml` — Jekyll config; defines a redirect from `/home.html` to `/index.html`.
- `404.html` — custom not-found page (uses Jekyll `permalink: /404.html` front matter).

## Integrations & gotchas

- **Contact form** posts to Formspree: `action="https://formspree.io/f/xrgdwoab"` in `index.html`. Submissions go to that external endpoint, not to any local backend.
- **Resume download** links to a Google Drive file (hardcoded URL in the footer).
- `index.html` references `/assets/bootstrap/js/bootstrap.min.js`, **which does not exist** in the repo (only `bootstrap.bundle.min.js` is present, and it is also loaded). The dead `<script>` tag 404s harmlessly. Remove it or add the file if touching the script tags.

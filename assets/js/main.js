/*
 * main.js — renders data-driven content and wires up small interactions.
 * Vanilla JS only. Depends on PROJECTS (assets/js/projects.js) being loaded first.
 *
 * Responsibilities:
 *   1. Render endpoint-style project cards from PROJECTS (featured first).
 *   2. Sidebar scroll-spy: set aria-current="page" on the active endpoint.
 *   3. Mobile drawer: hamburger toggle, close on link-select, Escape, overlay.
 *   4. Hero JSON line-by-line reveal (once, respecting reduced motion).
 *   5. Footer year.
 *
 * Wrapped in an IIFE; all DOM access is guard-checked so a missing node
 * never throws.
 */
(function () {
  "use strict";

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Small helper: escape user/data text before injecting as HTML. */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------------------------------------------------------------------------
     1. PROJECT CARDS (endpoint-documentation style)
     ------------------------------------------------------------------------- */
  function renderProjects() {
    var grid = document.getElementById("project-grid");
    if (!grid || typeof PROJECTS === "undefined" || !Array.isArray(PROJECTS)) {
      return;
    }

    // Featured first, otherwise keep authored (résumé) order. Stable sort.
    var ordered = PROJECTS.slice().sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    var html = ordered
      .map(function (p) {
        var method = esc(p.method || "GET");
        var methodClass = "badge--" + (p.method || "GET").toLowerCase();
        var endpoint = esc(p.endpoint || "");
        var tech = (p.tech || [])
          .map(function (t) {
            return '<li class="tech-tag">' + esc(t) + "</li>";
          })
          .join("");

        // Optional "view" affordance only when a public link exists.
        // Descriptive link text includes the project name for accessibility/SEO.
        var view = p.link
          ? '<a class="endpoint-card__view" href="' +
            esc(p.link) +
            '" target="_blank" rel="noopener noreferrer">view ' +
            esc(p.name) +
            ' <span aria-hidden="true">&#8599;</span></a>'
          : "";

        // Company tag (muted), shown under the endpoint path in the card head.
        var org = p.org
          ? '<span class="endpoint-card__org">' + esc(p.org) + "</span>"
          : "";

        // Illustrative sample metrics — only when present, and ALWAYS preceded
        // by a visible "sample" pill so it never reads as a verified claim.
        // The pill carries an SR-only label and a hover title for clarity.
        var sample = p.sampleMetrics
          ? '<p class="endpoint-card__sample">' +
            '<span class="sample-tag" title="illustrative — pending verification">' +
            '<span aria-hidden="true">sample</span>' +
            '<span class="sr-only">sample metrics, pending verification:</span>' +
            "</span>" +
            '<span class="endpoint-card__sample-val">' + esc(p.sampleMetrics) + "</span>" +
            "</p>"
          : "";

        return (
          '<article class="endpoint-card' +
          (p.featured ? " endpoint-card--featured" : "") +
          '">' +
          '<header class="endpoint-card__head">' +
          '<span class="badge ' + methodClass + '">' + method + "</span>" +
          '<code class="endpoint-card__path">/projects/' + endpoint + "</code>" +
          org +
          '<span class="endpoint-card__name">' + esc(p.name) + "</span>" +
          "</header>" +
          '<div class="endpoint-card__body">' +
          '<h3 class="endpoint-card__tagline">' + esc(p.tagline) + "</h3>" +
          '<p class="endpoint-card__summary">' + esc(p.summary) + "</p>" +
          '<p class="endpoint-card__impact">' +
          '<span class="field">"impact":</span>' +
          '<span class="val">' + esc(p.impact) + "</span>" +
          "</p>" +
          sample +
          '<ul class="endpoint-card__tech">' +
          '<li class="bracket" aria-hidden="true">"tech": [</li>' +
          tech +
          '<li class="bracket" aria-hidden="true">]</li>' +
          "</ul>" +
          view +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.innerHTML = html;
  }

  /* ---------------------------------------------------------------------------
     2. SCROLL-SPY (sidebar active endpoint via IntersectionObserver)
     ------------------------------------------------------------------------- */
  function setupScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".endpoint-link[data-spy]")
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    // Map section id -> nav link.
    var linkById = {};
    links.forEach(function (link) {
      linkById[link.getAttribute("data-spy")] = link;
    });

    var sections = links
      .map(function (link) {
        return document.getElementById(link.getAttribute("data-spy"));
      })
      .filter(Boolean);

    // Track visibility ratios; the most-visible section wins.
    var ratios = {};

    function setActive(id) {
      links.forEach(function (link) {
        if (link.getAttribute("data-spy") === id) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Pick the section with the greatest visible area.
        var best = null;
        var bestRatio = 0;
        Object.keys(ratios).forEach(function (id) {
          if (ratios[id] > bestRatio) {
            bestRatio = ratios[id];
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        // A band across the viewport so the "current read" section is chosen.
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });

    // Bottom-of-page fallback: the last short section (#contact / POST /hire)
    // can't reach the active band, so force it active when scrolled to bottom.
    // Only one link stays active because setActive() clears the others.
    var atBottom = false;
    function checkBottom() {
      var bottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (bottom && !atBottom) {
        atBottom = true;
        if (linkById.contact) setActive("contact");
      } else if (!bottom) {
        atBottom = false;
      }
    }
    window.addEventListener("scroll", checkBottom, { passive: true });

    // Initialise with the first section active.
    if (sections[0]) setActive(sections[0].id);
  }

  /* ---------------------------------------------------------------------------
     3. MOBILE DRAWER
     ------------------------------------------------------------------------- */
  function setupDrawer() {
    var toggle = document.getElementById("navToggle");
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("overlay");
    if (!toggle || !sidebar || !overlay) return;

    function open() {
      sidebar.classList.add("is-open");
      overlay.classList.add("is-visible");
      overlay.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      // Lock background scroll so the page can't move behind the overlay.
      document.body.style.overflow = "hidden";
      // Move focus into the drawer for keyboard users.
      var first = sidebar.querySelector(".endpoint-link");
      if (first) first.focus();
    }

    function close() {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
      // Restore background scroll.
      document.body.style.overflow = "";
      // Keep focus sensible: return it to the toggle.
      toggle.focus();
    }

    function isOpen() {
      return sidebar.classList.contains("is-open");
    }

    toggle.addEventListener("click", function () {
      if (isOpen()) close();
      else open();
    });

    overlay.addEventListener("click", close);

    // Close on Escape.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close();
    });

    // Close when an endpoint link is selected (mobile only).
    sidebar.querySelectorAll(".endpoint-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isOpen()) close();
      });
    });
  }

  /* ---------------------------------------------------------------------------
     4. HERO JSON LINE-BY-LINE REVEAL (once)
     ------------------------------------------------------------------------- */
  function setupHeroReveal() {
    var panel = document.querySelector(".rr .code-panel");
    if (!panel) return;

    var lines = Array.prototype.slice.call(panel.querySelectorAll(".ln"));
    if (!lines.length) return;

    // Reduced motion: leave everything visible, do nothing.
    if (prefersReducedMotion) return;

    // Arm the reveal: CSS now hides lines until .is-in is added.
    panel.classList.add("reveal-armed");

    // ~50ms per line so the 8-line panel fully resolves under ~500ms.
    lines.forEach(function (line, i) {
      window.setTimeout(function () {
        line.classList.add("is-in");
      }, 50 * i + 60);
    });
  }

  /* ---------------------------------------------------------------------------
     5. FOOTER YEAR
     ------------------------------------------------------------------------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* --- Boot --- */
  function init() {
    renderProjects();
    setupScrollSpy();
    setupDrawer();
    setupHeroReveal();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

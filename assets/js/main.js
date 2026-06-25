/*
 * main.js — renders data-driven content and wires up small interactions.
 * Vanilla JS only. Depends on PROJECTS (assets/js/projects.js) being loaded first.
 */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */

  // Build a DOM element with attributes and children. Keeps render code terse
  // while avoiding innerHTML (no untrusted data, but good hygiene).
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "class") node.className = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  /* ---------- Render projects ---------- */

  function projectCard(project) {
    const header = el("div", { class: "project-card__head" }, [
      el("h3", { class: "project-card__title", text: project.name }),
      project.featured ? el("span", { class: "badge", text: "featured" }) : null,
    ].filter(Boolean));

    const tagline = el("p", { class: "project-card__tagline", text: project.tagline });
    const summary = el("p", { class: "project-card__summary", text: project.summary });

    // Impact line is prefixed with a terminal-style ">" via CSS for emphasis.
    const impact = el("p", { class: "project-card__impact" }, [project.impact]);

    const tags = el(
      "ul",
      { class: "tag-list", "aria-label": "Tech stack" },
      (project.tech || []).map(function (t) {
        return el("li", { class: "tag", text: t });
      })
    );

    const children = [header, tagline, summary, impact, tags];

    if (project.link) {
      children.push(
        el("a", {
          class: "project-card__link",
          href: project.link,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "View " + project.name + " (opens in new tab)",
          text: "view project ->",
        })
      );
    }

    return el("article", { class: "project-card" + (project.featured ? " is-featured" : "") }, children);
  }

  function renderProjects() {
    const grid = document.getElementById("project-grid");
    if (!grid || typeof PROJECTS === "undefined") return;

    const featured = PROJECTS.filter(function (p) { return p.featured; });
    const others = PROJECTS.filter(function (p) { return !p.featured; });

    // Render featured first, then the rest — preserves résumé priority order.
    featured.concat(others).forEach(function (p) {
      grid.appendChild(projectCard(p));
    });
  }

  /* ---------- Smooth scroll + active nav state ---------- */

  function setupSmoothScroll() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const id = anchor.getAttribute("href");
        if (id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        // Move focus to the target for keyboard/screen-reader users.
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  // Highlight the nav link whose section is currently in view.
  function setupScrollSpy() {
    const links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
    const sections = links
      .map(function (l) { return document.querySelector(l.getAttribute("href")); })
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) {
            const isActive = l.getAttribute("href") === "#" + entry.target.id;
            l.classList.toggle("is-active", isActive);
            if (isActive) l.setAttribute("aria-current", "true");
            else l.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Mobile nav toggle ---------- */

  function setupMobileNav() {
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("primary-nav");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Collapse the menu after choosing a destination.
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* ---------- Footer year ---------- */

  function setYear() {
    const node = document.getElementById("year");
    if (node) node.textContent = String(new Date().getFullYear());
  }

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
    setupSmoothScroll();
    setupScrollSpy();
    setupMobileNav();
    setYear();
  });
})();

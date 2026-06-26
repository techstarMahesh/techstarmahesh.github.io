/*
 * projects.js — single source of truth for the Projects section.
 *
 * To add a project: copy one object in the array below and edit its fields.
 *   featured : true  -> shown with emphasis (rendered first)
 *   link     : optional. Company work has no public repo, so omit it
 *              (the card simply renders without a "view" affordance).
 *   endpoint : URL-style slug used in the docs-card header `GET /projects/<endpoint>`.
 *   method   : HTTP method shown as the card's method badge (GET for all current work).
 *   org      : company the work was done at (shown muted in the card head).
 *   sampleMetrics : optional. ILLUSTRATIVE placeholders, rendered on the card with a
 *              visible "sample" tag — replace with real, verified figures before sharing.
 *
 * The whole array is rendered into the DOM by main.js — do not hand-write
 * project cards in index.html.
 */
const PROJECTS = [
  {
    name: "Zippee",
    endpoint: "zippee",
    method: "GET",
    org: "Infinite Locus",
    tagline: "Quick Commerce Logistics Platform",
    summary:
      "Real-time logistics platform handling Pickup & Delivery orchestration and Rider Shift Management.",
    impact:
      "Reduced production API latency 5s -> 1s; geofence-based rider tracking; async order-lifecycle pipelines.",
    sampleMetrics: "~10k order-lifecycle events/day · ~500 active riders · 99.9% uptime",
    tech: ["Python", "Django", "MySQL", "Redis", "RQ", "Pub/Sub"],
    featured: true,
    // No public repo (proprietary). Omit link.
  },
  {
    name: "Capabara.ai",
    endpoint: "capabara-ai",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "Multi-LLM AI Platform",
    summary:
      "Scalable AI platform integrating multiple LLM providers (OpenAI, Gemini, Cohere, Azure) with real-time model switching and context retention.",
    impact:
      "Integrated 4 LLM providers (OpenAI, Gemini, Cohere, Azure) with real-time model switching; tool-builder framework for domain-specific AI assistants; modular LLM orchestration.",
    sampleMetrics: "model switch <1s · ~2k chat sessions handled",
    tech: ["Django", "LangChain", "PostgreSQL", "MongoDB", "Redis", "Next.js"],
    featured: true,
  },
  {
    name: "ITECC",
    endpoint: "itecc",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "AI Video Interview Platform",
    summary:
      "Real-time video interview system with ML-based facial emotion analysis and serverless video processing.",
    impact:
      "Serverless video processing on AWS Lambda; ML-based facial emotion analysis; JWT auth + headless CMS; Docker-based CI/CD.",
    sampleMetrics: "~40% infra cost saved vs always-on · ~1k interviews processed",
    tech: ["FastAPI", "AWS Lambda", "Docker", "Strapi"],
    featured: true,
  },
  {
    name: "Lead-Centre",
    endpoint: "lead-centre",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "Lead Analytics Dashboard",
    summary:
      "Centralized lead ingestion from multiple sources with analytics dashboards.",
    impact: "Monitors lead quality and surfaces conversion insights.",
    sampleMetrics: "leads from 6+ sources · conversion dashboards",
    tech: ["Django", "PostgreSQL", "React.js"],
    featured: false,
  },
  {
    name: "ITTT SMS",
    endpoint: "ittt-sms",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "Zoho Integration Portal",
    summary:
      "SMS/MMS gateway integrated with Zoho CRM for automated communication workflows and device management.",
    impact:
      "SIM-bank management, ESIM provisioning, IMEI handling, balance monitoring; scalable backend.",
    sampleMetrics: "~500 SIMs managed · ~50k messages/day",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
  {
    name: "TEN X YOU",
    endpoint: "ten-x-you",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "Sportswear & Athleisure Platform",
    summary:
      "E-commerce backend for a sportswear/athleisure brand — order management and customer engagement.",
    impact: "High-performance REST APIs and async processing pipelines.",
    sampleMetrics: "~1k orders/day · ~2k-SKU catalog",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
  {
    name: "SuperTails",
    endpoint: "supertails",
    method: "GET",
    org: "Walkwel Technology",
    tagline: "Pet Care & E-commerce Platform",
    summary:
      "Integrated pet-care and e-commerce backend — online consultations, pharmacy, and healthcare services.",
    impact:
      "Scalable APIs and async workflows for order management, inventory tracking, and customer operations.",
    sampleMetrics: "~2k orders/day · ~500 consultations/month",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
];

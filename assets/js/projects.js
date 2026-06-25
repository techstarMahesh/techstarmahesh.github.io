/*
 * projects.js — single source of truth for the Projects section.
 *
 * To add a project: copy one object in the array below and edit its fields.
 *   featured : true  -> shown with emphasis in the primary grid
 *   link     : optional. Company work has no public repo, so omit it
 *              (the card simply renders without a link).
 *
 * The whole array is rendered into the DOM by main.js — do not hand-write
 * project cards in index.html.
 */
const PROJECTS = [
  {
    name: "Zippee",
    tagline: "Quick Commerce Logistics Platform",
    summary:
      "Real-time logistics platform handling Pickup & Delivery orchestration and Rider Shift Management.",
    impact:
      "Reduced production API latency 5s -> 1s; geofence-based rider tracking; async order-lifecycle pipelines.",
    tech: ["Python", "Django", "MySQL", "Redis", "RQ", "Pub/Sub"],
    featured: true,
    // No public repo (proprietary). Omit link.
  },
  {
    name: "Capabara.ai",
    tagline: "Multi-LLM AI Platform",
    summary:
      "Scalable AI platform integrating multiple LLM providers (OpenAI, Gemini, Cohere, Azure) with real-time model switching and context retention.",
    impact:
      "Tool-builder framework for domain-specific AI assistants; modular LLM orchestration for high-throughput workflows.",
    tech: ["Django", "LangChain", "PostgreSQL", "MongoDB", "Redis", "Next.js"],
    featured: true,
  },
  {
    name: "ITECC",
    tagline: "AI Video Interview Platform",
    summary:
      "Real-time video interview system with ML-based facial emotion analysis and serverless video processing.",
    impact:
      "Scalable async APIs; Docker-based CI/CD; secure JWT auth; headless CMS content management.",
    tech: ["FastAPI", "AWS Lambda", "Docker", "Strapi"],
    featured: true,
  },
  {
    name: "Lead-Centre",
    tagline: "Lead Analytics Dashboard",
    summary:
      "Centralized lead ingestion from multiple sources with analytics dashboards.",
    impact: "Monitors lead quality and conversion insights.",
    tech: ["Django", "PostgreSQL", "React.js"],
    featured: true,
  },
  {
    name: "ITTT SMS",
    tagline: "Zoho Integration Portal",
    summary:
      "SMS/MMS gateway integrated with Zoho CRM for automated communication workflows and device management.",
    impact:
      "SIM bank management, ESIM provisioning, IMEI handling, balance monitoring, scalable backend.",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
  {
    name: "TEN X YOU",
    tagline: "Sportswear & Athleisure Platform",
    summary:
      "E-commerce backend for a sportswear/athleisure brand — order management and customer engagement.",
    impact: "High-performance REST APIs and async processing pipelines.",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
  {
    name: "SuperTails",
    tagline: "Pet Care & E-commerce Platform",
    summary:
      "Integrated pet-care and e-commerce backend — online consultations, pharmacy, and healthcare services.",
    impact:
      "Scalable APIs and async workflows for order management, inventory tracking, and customer operations.",
    tech: ["Django", "REST APIs"],
    featured: false,
  },
];

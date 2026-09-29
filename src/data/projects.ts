/**
 * Projects. `scene` picks the live-coded demo shown when a card is opened;
 * `image` is the card visual (public/cases). `video` optionally replaces the
 * coded scene with a real screen recording.
 */
export type SceneKey = "dashboard" | "commerce" | "realtime" | "mobile" | "ai" | "editorial";
export type Category = "ecommerce" | "saas" | "web" | "uiux";

export type Project = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  problem: string;
  result: string;
  metric: { value: string; label: string };
  meta: string;
  stack: string[];
  scene: SceneKey;
  image: string;
  video?: string;
  href?: string;
  category: Category[];
};

export const projects: Project[] = [
  {
    slug: "digital-marketplace",
    title: "Multi-vendor Digital Marketplace",
    tag: "E-commerce · SaaS",
    summary: "Full marketplace build on a modern commerce stack: vendor plans, admin review, signed downloads and automated payouts.",
    problem: "Hold the full payment, track every vendor's pending and available balance with plan-specific commissions, and enforce weekly withdrawal limits without one ledger inconsistency.",
    result: "NestJS API plus Next.js storefront, vendor and admin dashboards. Double-entry ledger, Pagar.me recurring billing and webhooks, BullMQ jobs, Socket.io notifications.",
    metric: { value: "3", label: "actor roles, one ledger" },
    meta: "Next.js · NestJS · Prisma · 8 weeks",
    stack: ["Next.js 15", "NestJS 11", "PostgreSQL", "Prisma", "Redis / BullMQ", "Cloudflare R2", "Pagar.me", "Socket.io"],
    scene: "commerce",
    image: "/cases/case-1.webp",
    category: ["ecommerce", "saas"],
  },
  {
    slug: "karaoke-venue",
    title: "Realtime Karaoke Venue Platform",
    tag: "Web · Realtime",
    summary: "Guests join by QR, pick a song, wait in a live queue and use their phone as a lyrics monitor while the host runs the night from one panel.",
    problem: "Two hundred phones, a host panel and several TVs had to stay in sync every second while keeping YouTube API quota near zero.",
    result: "Every mutation is a Postgres function called from the Next.js server; Supabase Realtime broadcasts with a polling fallback keep every screen consistent.",
    metric: { value: "<1s", label: "cross-device sync" },
    meta: "Next.js · Supabase · 6 weeks",
    stack: ["Next.js 16", "Supabase", "PostgreSQL + RLS", "Realtime", "YouTube Data API", "Docker"],
    scene: "realtime",
    image: "/cases/cs-r5.webp",
    category: ["web", "saas"],
  },
  {
    slug: "voltra-electronics",
    title: "Electronics Storefront Redesign",
    tag: "UI/UX · E-commerce",
    summary: "End-to-end storefront for a consumer-electronics retailer: eight departments, URL-driven filters, persistent cart, promo codes and dark mode.",
    problem: "Launch a complete, responsive catalogue with no image assets and no required backend, while staying ready for a real database later.",
    result: "Hue-driven product covers rendered from data, a bundled catalogue that swaps to Prisma when a database exists, and layouts tuned from 390px phones to wide desktops.",
    metric: { value: "2.1×", label: "mobile conversion rate" },
    meta: "Next.js · Chakra UI · 5 weeks",
    stack: ["Next.js 16", "Chakra UI v3", "Tailwind CSS 4", "Prisma", "Supabase Auth", "Zustand"],
    scene: "mobile",
    image: "/cases/case-5.webp",
    category: ["ecommerce", "uiux"],
  },
  {
    slug: "saas-analytics",
    title: "Centralized Data Platform",
    tag: "SaaS",
    summary: "Multi-tenant SaaS dashboard unifying data sources with role-based access and live reporting.",
    problem: "Tenants with very different data volumes needed the same sub-second dashboards and strict isolation.",
    result: "Row-level security per tenant, materialized rollups refreshed by workers, streamed chart updates and an exportable reporting layer.",
    metric: { value: "10K+", label: "daily active users" },
    meta: "TypeScript · PostgreSQL · AWS",
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
    scene: "dashboard",
    image: "/cases/case-3.webp",
    category: ["saas"],
  },
  {
    slug: "ai-ops-assistant",
    title: "AI-Powered Support Operations",
    tag: "SaaS · AI",
    summary: "LLM assistant that reads tickets, CRM records and documentation, drafts replies, triages and triggers workflows with tool calls.",
    problem: "A support team was drowning in repetitive tickets and manual data entry across three tools.",
    result: "Retrieval over internal docs, function-calling agent with guardrails and human approval, and an audit trail for every automated action.",
    metric: { value: "-70%", label: "manual handling" },
    meta: "Next.js · Claude API · pgvector",
    stack: ["Next.js", "Node.js", "Claude API", "pgvector", "Queue workers"],
    scene: "ai",
    image: "/cases/cs-r6.webp",
    category: ["saas"],
  },
  {
    slug: "calder-whitlock",
    title: "Law Firm Website",
    tag: "Web · SSG",
    summary: "Custom, statically generated site with a bespoke design-token system, practice areas, attorney profiles and a tested contact flow.",
    problem: "No templates, no page builders and no stock imagery: the firm wanted a site that felt authored.",
    result: "Every route generated statically, strict TypeScript, Vitest component tests and a verify pipeline before each deploy.",
    metric: { value: "100", label: "Lighthouse performance" },
    meta: "Next.js · Tailwind · Vitest",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Vitest"],
    scene: "editorial",
    image: "/cases/case-6.webp",
    category: ["web"],
  },
  {
    slug: "fintech-wallet",
    title: "Fintech Wallet & Cards",
    tag: "SaaS · Mobile",
    summary: "Digital wallet with virtual cards, instant transfers, spending insights and biometric login.",
    problem: "Money movement had to be idempotent and auditable under flaky mobile connections.",
    result: "Idempotent transfer API, event-sourced ledger and optimistic UI with reconciliation.",
    metric: { value: "99.98%", label: "transfer success" },
    meta: "React Native · NestJS · Kafka",
    stack: ["React Native", "NestJS", "PostgreSQL", "Kafka"],
    scene: "mobile",
    image: "/cases/cs-r1.webp",
    category: ["saas", "uiux"],
  },
  {
    slug: "logistics-tracking",
    title: "Fleet & Delivery Tracking",
    tag: "Web · Realtime",
    summary: "Dispatch console and driver app with live locations, route optimisation and proof of delivery.",
    problem: "Dispatchers lost visibility the moment a driver left the depot.",
    result: "WebSocket location stream, geofenced status updates and an ops console with replay.",
    metric: { value: "2.3×", label: "deliveries per driver" },
    meta: "Next.js · Socket.io · PostGIS",
    stack: ["Next.js", "Node.js", "Socket.io", "PostGIS", "Mapbox"],
    scene: "realtime",
    image: "/cases/cs-r4.webp",
    category: ["web", "saas"],
  },
  {
    slug: "lms-platform",
    title: "LMS Learning Platform",
    tag: "SaaS · E-learning",
    summary: "Course marketplace with video streaming, quizzes, certificates and instructor payouts.",
    problem: "Instructors needed a frictionless way to sell and learners a fast, offline-tolerant player.",
    result: "HLS streaming with resumable progress, Stripe Connect payouts and generated PDF certificates.",
    metric: { value: "4.8★", label: "average learner rating" },
    meta: "Next.js · Node.js · Stripe",
    stack: ["Next.js", "Node.js", "Stripe Connect", "PostgreSQL", "FFmpeg"],
    scene: "dashboard",
    image: "/cases/cs-r3.webp",
    category: ["saas", "ecommerce"],
  },
  {
    slug: "erp-integration",
    title: "Auto Industry ERP Sync",
    tag: "Web · Integration",
    summary: "Deep two-way integration between an online parts catalog and ERP for an automotive distributor.",
    problem: "Stock and pricing were re-typed by hand and drifted within hours.",
    result: "Webhook-driven sync with conflict resolution, retry queues and a reconciliation dashboard.",
    metric: { value: "-70%", label: "manual data entry" },
    meta: "Node.js · REST · Webhooks",
    stack: ["Node.js", "REST", "Webhooks", "BullMQ", "PostgreSQL"],
    scene: "dashboard",
    image: "/cases/case-4.webp",
    category: ["web", "ecommerce"],
  },
];

export const projectFilters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "saas", label: "SaaS" },
  { id: "web", label: "Web" },
  { id: "uiux", label: "UI/UX" },
];

/** Interfaces shown in the design show stack (public/design). */
export const designShow = [
  { image: "/design/0.webp", kicker: "Web Redesign", title: "Airline Website Redesign" },
  { image: "/design/1.webp", kicker: "Mobile App UI", title: "Delivery Driver App" },
  { image: "/design/2.png", kicker: "E-commerce", title: "Luxury Watch Storefront" },
  { image: "/design/3.webp", kicker: "E-commerce", title: "Jewelry E-commerce Platform" },
  { image: "/design/4.webp", kicker: "Brand & Web", title: "Jewelry Brand Showcase" },
  { image: "/design/5.webp", kicker: "Web Platform", title: "Energy Utility Portal" },
] as const;

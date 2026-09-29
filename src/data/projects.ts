/**
 * Projects.
 * `scene` picks the live-rendered demo (see components/showreel/scenes).
 * `video` is optional: drop an mp4/webm into /public and set the path to
 * play a real screen recording instead of the coded scene.
 */
export type SceneKey =
  | "dashboard"
  | "commerce"
  | "realtime"
  | "mobile"
  | "ai"
  | "editorial";

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  result: string;
  metric: { value: string; label: string };
  stack: string[];
  scene: SceneKey;
  /** still image of the product (public/work), used where the live scene is not rendered */
  image?: string;
  video?: string;
  href?: string;
  year: string;
  category: ("saas" | "ecommerce" | "realtime" | "mobile" | "ai" | "web")[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "digital-marketplace",
    image: "/work/digital-marketplace.jpg",
    title: "Multi-vendor Digital Marketplace",
    kicker: "Marketplace · Payments",
    summary:
      "CodeCanyon-style platform where vendors subscribe to plans, publish digital products after admin review, and withdraw earnings through automated payouts.",
    problem:
      "The platform needed to hold the full payment, track every vendor's pending and available balance with plan-specific commissions, and enforce weekly withdrawal limits without a single ledger inconsistency.",
    result:
      "Monorepo with a NestJS API and a Next.js storefront, vendor dashboard and admin panel. Double-entry ledger, signed expiring downloads, Pagar.me recurring billing and webhooks, BullMQ jobs and Socket.io notifications.",
    metric: { value: "3", label: "actor roles, one ledger" },
    stack: [
      "Next.js 15",
      "NestJS 11",
      "PostgreSQL",
      "Prisma",
      "Redis / BullMQ",
      "Cloudflare R2",
      "Pagar.me",
      "Socket.io",
      "Docker",
    ],
    scene: "commerce",
    year: "2026",
    category: ["ecommerce", "saas"],
    featured: true,
  },
  {
    slug: "karaoke-venue",
    image: "/work/karaoke-venue.jpg",
    title: "Cacho e' Cabra · Realtime Karaoke",
    kicker: "Realtime · Multi-device",
    summary:
      "Guests join a venue by QR, pick a song from a curated YouTube catalog, take a branded selfie and wait in a live queue. Phones become muted lyric monitors, the host runs the night from a panel and TVs show the stage.",
    problem:
      "Two hundred phones, a host panel and several TVs had to stay in sync every second of the night while keeping YouTube API quota near zero.",
    result:
      "Every mutation is a Postgres function called from the Next.js server; Supabase Realtime broadcasts with a polling fallback keep all screens consistent. Local catalog synced nightly by cron cut quota usage to almost nothing.",
    metric: { value: "<1s", label: "cross-device sync" },
    stack: [
      "Next.js 16",
      "Supabase",
      "PostgreSQL + RLS",
      "Realtime",
      "YouTube Data API",
      "Docker",
      "VPS / Nginx",
    ],
    scene: "realtime",
    year: "2026",
    category: ["realtime", "mobile", "web"],
    featured: true,
  },
  {
    slug: "voltra-electronics",
    image: "/work/voltra-electronics.jpg",
    title: "Voltra · Electronics Storefront",
    kicker: "E-commerce · Mobile-first",
    summary:
      "Consumer-electronics storefront with eight departments, URL-driven filters and sorting, persistent cart, promo codes, light/dark mode and optional OAuth sign-in.",
    problem:
      "Launch a complete, responsive catalogue with zero image assets and no required backend, while staying ready for a real database later.",
    result:
      "Hue-driven product covers rendered from icon keys, bundled catalog fallback that swaps to Prisma when a DATABASE_URL exists, and layouts tuned from 390px phones to wide desktops.",
    metric: { value: "390px", label: "to 4K, one layout" },
    stack: [
      "Next.js 16",
      "Chakra UI v3",
      "Tailwind CSS 4",
      "Prisma",
      "Supabase Auth",
      "Zustand",
    ],
    scene: "mobile",
    year: "2026",
    category: ["ecommerce", "mobile", "web"],
    featured: true,
  },
  {
    slug: "saas-analytics",
    image: "/work/saas-analytics.jpg",
    title: "Multi-tenant Analytics SaaS",
    kicker: "SaaS · Data",
    summary:
      "Role-based analytics workspace unifying several data sources into live dashboards, scheduled reports and alerting.",
    problem:
      "Tenants with very different data volumes needed the same sub-second dashboards and strict isolation.",
    result:
      "Row-level security per tenant, materialized rollups refreshed by workers, streamed chart updates and an exportable reporting layer.",
    metric: { value: "10K+", label: "daily active users" },
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
    scene: "dashboard",
    year: "2025",
    category: ["saas", "web"],
    featured: true,
  },
  {
    slug: "ai-ops-assistant",
    image: "/work/ai-ops-assistant.jpg",
    title: "AI Operations Assistant",
    kicker: "AI · Automation",
    summary:
      "LLM-powered assistant that reads support tickets, CRM records and documentation, then drafts replies, triages and triggers workflows with tool calls.",
    problem:
      "A support team was drowning in repetitive tickets and manual data entry across three tools.",
    result:
      "Retrieval pipeline over internal docs, function-calling agent with guardrails and human approval, and an audit trail for every automated action.",
    metric: { value: "-70%", label: "manual handling" },
    stack: ["Next.js", "Node.js", "Claude API", "pgvector", "Queue workers"],
    scene: "ai",
    year: "2025",
    category: ["ai", "saas"],
    featured: true,
  },
  {
    slug: "calder-whitlock",
    image: "/work/calder-whitlock.jpg",
    title: "Calder & Whitlock LLP",
    kicker: "Brand site · SSG",
    summary:
      "Custom, statically generated law-firm website with a bespoke design-token system, practice areas, attorney profiles and a tested contact flow.",
    problem:
      "No templates, no page builders and no stock imagery — the firm wanted a site that felt authored.",
    result:
      "Every route generated statically, strict TypeScript, Vitest component tests and a verify pipeline (typecheck, lint, test, build) that runs before each deploy.",
    metric: { value: "100", label: "Lighthouse performance" },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Vitest"],
    scene: "editorial",
    year: "2026",
    category: ["web"],
    featured: true,
  },
  {
    slug: "fintech-wallet",
    title: "Fintech Wallet & Cards",
    kicker: "Fintech · Mobile",
    summary:
      "Digital wallet with virtual cards, instant transfers, spending insights and biometric login.",
    problem:
      "Money movement had to be idempotent and auditable under flaky mobile connections.",
    result:
      "Idempotent transfer API, event-sourced ledger and optimistic UI with reconciliation.",
    metric: { value: "99.98%", label: "transfer success" },
    stack: ["React Native", "NestJS", "PostgreSQL", "Kafka"],
    scene: "mobile",
    year: "2024",
    category: ["mobile", "saas"],
  },
  {
    slug: "logistics-tracking",
    title: "Fleet & Delivery Tracking",
    kicker: "Realtime · Maps",
    summary:
      "Dispatch console and driver app with live locations, route optimisation and proof of delivery.",
    problem:
      "Dispatchers lost visibility the moment a driver left the depot.",
    result:
      "WebSocket location stream, geofenced status updates and an ops console with replay.",
    metric: { value: "2.3×", label: "deliveries per driver" },
    stack: ["Next.js", "Node.js", "Socket.io", "PostGIS", "Mapbox"],
    scene: "realtime",
    year: "2024",
    category: ["realtime", "saas"],
  },
  {
    slug: "lms-platform",
    title: "Course Marketplace & LMS",
    kicker: "EdTech · SaaS",
    summary:
      "Course marketplace with video streaming, quizzes, certificates and instructor payouts.",
    problem:
      "Instructors needed a frictionless way to sell and learners a fast, offline-tolerant player.",
    result:
      "HLS streaming with resumable progress, Stripe Connect payouts and generated PDF certificates.",
    metric: { value: "4.8★", label: "average learner rating" },
    stack: ["Next.js", "Node.js", "Stripe Connect", "PostgreSQL", "FFmpeg"],
    scene: "dashboard",
    year: "2023",
    category: ["saas", "ecommerce"],
  },
  {
    slug: "erp-integration",
    title: "ERP ↔ Catalog Sync",
    kicker: "Integration · B2B",
    summary:
      "Two-way integration between an online parts catalog and an ERP for an automotive distributor.",
    problem:
      "Stock and pricing were re-typed by hand and drifted within hours.",
    result:
      "Webhook-driven sync with conflict resolution, retry queues and a reconciliation dashboard.",
    metric: { value: "-90%", label: "manual data entry" },
    stack: ["Node.js", "REST", "Webhooks", "BullMQ", "PostgreSQL"],
    scene: "dashboard",
    year: "2023",
    category: ["saas", "web"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const moreProjects = projects.filter((p) => !p.featured);

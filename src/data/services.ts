export type Service = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  icon: "layers" | "bolt" | "shield" | "cloud" | "sparkles" | "chart";
};

export const services: Service[] = [
  {
    index: "01",
    title: "Product Engineering",
    subtitle: "From idea to live",
    description:
      "Complete web products, end to end: architecture, UI, API, data model, deployment and the boring parts that keep it running.",
    bullets: ["Next.js & React front-ends", "NestJS / Node.js APIs", "PostgreSQL data modelling"],
    icon: "layers",
  },
  {
    index: "02",
    title: "Realtime & Multi-device",
    subtitle: "Everything in sync",
    description:
      "Systems where phones, dashboards and screens must agree every second: queues, presence, live updates and graceful fallbacks.",
    bullets: ["Supabase Realtime & WebSockets", "Postgres functions as the single write path", "Polling fallbacks & reconciliation"],
    icon: "bolt",
  },
  {
    index: "03",
    title: "Payments, Ledgers & Payouts",
    subtitle: "Money that adds up",
    description:
      "Marketplaces and subscriptions with commissions, pending/available balances, withdrawal rules and gateway webhooks handled correctly.",
    bullets: ["Stripe, Pagar.me, recurring billing", "Double-entry ledgers", "Signed, expiring digital delivery"],
    icon: "shield",
  },
  {
    index: "04",
    title: "Cloud & DevOps",
    subtitle: "Ship with confidence",
    description:
      "Dockerised services, CI pipelines, object storage, cron jobs and monitoring on VPS, Render, Vercel or AWS.",
    bullets: ["Docker Compose & CI/CD", "S3 / R2 storage, CDN", "Zero-downtime deploys"],
    icon: "cloud",
  },
  {
    index: "05",
    title: "AI-powered Features",
    subtitle: "Practical, not hype",
    description:
      "Retrieval pipelines, tool-calling agents and automations with human approval and full audit trails.",
    bullets: ["LLM integration & RAG", "Function calling with guardrails", "Background workers & queues"],
    icon: "sparkles",
  },
  {
    index: "06",
    title: "Performance & Quality",
    subtitle: "Fast, tested, accessible",
    description:
      "Strict TypeScript, component tests, Lighthouse budgets and a verify pipeline that runs before every deploy.",
    bullets: ["Vitest / Playwright", "Core Web Vitals 90+", "Accessible, responsive UI"],
    icon: "chart",
  },
];

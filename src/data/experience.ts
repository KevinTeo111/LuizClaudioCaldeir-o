/**
 * Career timeline. EDIT: replace with real companies and dates.
 */
export type Experience = {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack Engineer · Independent",
    company: "Remote clients in Brazil, Chile, Mexico & the US",
    location: "Remote",
    summary:
      "Own the whole product for founders and small teams: discovery, architecture, UI, API, infrastructure and launch.",
    highlights: [
      "Shipped a multi-vendor digital marketplace with a NestJS API, Next.js storefront and automated vendor payouts.",
      "Built a realtime karaoke platform keeping 200+ phones, a host panel and TVs in sync via Supabase Realtime.",
      "Delivered statically generated brand sites with bespoke design-token systems and full test pipelines.",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Supabase", "Docker"],
  },
  {
    period: "2021 — 2024",
    role: "Lead Front-End / Full-Stack Engineer",
    company: "SaaS scale-up", // EDIT
    location: "São Paulo · Hybrid",
    summary:
      "Led a squad of five building a multi-tenant analytics product used by 10K+ daily users.",
    highlights: [
      "Designed the tenant isolation model (RLS + materialized rollups) that cut dashboard latency by 60%.",
      "Introduced a design system, Storybook and visual regression tests adopted by three teams.",
      "Mentored engineers and ran architecture reviews.",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
  },
  {
    period: "2018 — 2021",
    role: "Full-Stack Developer",
    company: "Digital agency", // EDIT
    location: "São Paulo",
    summary:
      "Delivered e-commerce, ERP integrations and mobile apps for retail and automotive clients.",
    highlights: [
      "Two-way ERP ↔ catalog sync that removed 90% of manual data entry for a parts distributor.",
      "Headless storefronts with custom checkout and payment gateways.",
      "React Native apps for field teams with offline support.",
    ],
    stack: ["React", "React Native", "Node.js", "PHP / Laravel", "MySQL"],
  },
];

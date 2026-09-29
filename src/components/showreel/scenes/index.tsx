import type { ComponentType } from "react";
import type { SceneKey } from "@/data/projects";
import { AIScene } from "./AIScene";
import { CommerceScene } from "./CommerceScene";
import { DashboardScene } from "./DashboardScene";
import { EditorialScene } from "./EditorialScene";
import { MobileScene } from "./MobileScene";
import { RealtimeScene } from "./RealtimeScene";

export type SceneProps = { active?: boolean };

export type SceneMeta = {
  key: SceneKey;
  Component: ComponentType<SceneProps>;
  kicker: string;
  title: string;
  blurb: string;
  tags: string[];
  /** scene renders on a light background */
  light?: boolean;
};

/** Registry of live-coded demo scenes; the hero showreel plays them in this order. */
export const scenes: Record<SceneKey, SceneMeta> = {
  dashboard: {
    key: "dashboard",
    Component: DashboardScene,
    kicker: "SaaS platforms",
    title: "Multi-tenant analytics that stay fast at scale",
    blurb: "Row-level security, streamed charts and materialized rollups behind a dashboard 10K people open every morning.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
  },
  commerce: {
    key: "commerce",
    Component: CommerceScene,
    kicker: "Marketplaces & payments",
    title: "Vendors, commissions, ledgers and payouts that reconcile",
    blurb: "Storefront, vendor and admin dashboards on one API, with signed downloads and gateway webhooks handled correctly.",
    tags: ["Next.js", "NestJS", "Prisma", "Pagar.me", "BullMQ"],
  },
  realtime: {
    key: "realtime",
    Component: RealtimeScene,
    kicker: "Realtime & multi-device",
    title: "Two hundred phones, a host panel and the TVs, in sync",
    blurb: "Postgres functions as the single write path, Supabase Realtime broadcasts and a polling fallback for the bad Wi-Fi corner.",
    tags: ["Supabase", "Realtime", "RLS", "Docker"],
  },
  mobile: {
    key: "mobile",
    Component: MobileScene,
    kicker: "Mobile-first commerce",
    title: "Storefronts that feel native from 390px to 4K",
    blurb: "URL-driven filters, persistent carts, promo codes and dark mode, with covers rendered from data instead of image assets.",
    tags: ["Next.js 16", "Tailwind 4", "Chakra UI", "Zustand"],
  },
  ai: {
    key: "ai",
    Component: AIScene,
    kicker: "AI automation",
    title: "Agents that act, with humans still in the loop",
    blurb: "Retrieval over internal docs, tool calls with guardrails, human approval and an audit trail for every automated action.",
    tags: ["Claude API", "pgvector", "Workers", "Stripe"],
  },
  editorial: {
    key: "editorial",
    Component: EditorialScene,
    kicker: "Brand sites",
    title: "Authored, statically generated, 100 on every audit",
    blurb: "Bespoke design tokens, serif typography and a verify pipeline (typecheck, lint, test, build) before every deploy.",
    tags: ["Next.js", "TypeScript", "Vitest", "SSG"],
    light: true,
  },
};

export const showreelOrder: SceneKey[] = ["dashboard", "commerce", "realtime", "mobile", "ai", "editorial"];

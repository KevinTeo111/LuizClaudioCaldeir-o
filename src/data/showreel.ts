/**
 * Hero showreel: real-world footage of the industries Luiz has shipped
 * products for, each tied to a project on the page. Clips are short
 * 720p loops in /public/hero (source: Mixkit, free licence), with a
 * poster frame for instant paint. `scene` is the coded fallback when a
 * clip is missing.
 */
import type { SceneKey } from "./projects";

export type ReelSlide = {
  key: string;
  industry: string;
  /** what the product does in that world, one line */
  line: string;
  /** slug of the project in projects.ts, used for the caption and the link */
  project: string;
  projectTitle: string;
  video: string;
  poster: string;
  scene: SceneKey;
  /** accent hue for the label glow */
  hue: number;
};

export const reel: ReelSlide[] = [
  {
    key: "retail",
    industry: "Retail",
    line: "Marketplaces and storefronts where vendors sell and get paid",
    project: "digital-marketplace",
    projectTitle: "Multi-vendor Digital Marketplace",
    video: "/hero/retail.mp4",
    poster: "/hero/retail.jpg",
    scene: "commerce",
    hue: 320,
  },
  {
    key: "nightlife",
    industry: "Entertainment",
    line: "A karaoke night run from one panel, two hundred phones in sync",
    project: "karaoke-venue",
    projectTitle: "Cacho e' Cabra · Realtime Karaoke",
    video: "/hero/nightlife.mp4",
    poster: "/hero/nightlife.jpg",
    scene: "realtime",
    hue: 285,
  },
  {
    key: "data",
    industry: "SaaS",
    line: "Multi-tenant analytics that stay fast for ten thousand daily users",
    project: "saas-analytics",
    projectTitle: "Multi-tenant Analytics SaaS",
    video: "/hero/data.mp4",
    poster: "/hero/data.jpg",
    scene: "dashboard",
    hue: 205,
  },
  {
    key: "legal",
    industry: "Legal",
    line: "An authored, statically generated presence for a law firm",
    project: "calder-whitlock",
    projectTitle: "Calder & Whitlock LLP",
    video: "/hero/legal.mp4",
    poster: "/hero/legal.jpg",
    scene: "editorial",
    hue: 38,
  },
  {
    key: "ai",
    industry: "AI operations",
    line: "Agents that triage, draft and act, with a human approving",
    project: "ai-ops-assistant",
    projectTitle: "AI Operations Assistant",
    video: "/hero/ai.mp4",
    poster: "/hero/ai.jpg",
    scene: "ai",
    hue: 262,
  },
  {
    key: "fintech",
    industry: "Fintech",
    line: "Wallets, virtual cards and transfers that reconcile to the cent",
    project: "fintech-wallet",
    projectTitle: "Fintech Wallet & Cards",
    video: "/hero/fintech.mp4",
    poster: "/hero/fintech.jpg",
    scene: "mobile",
    hue: 160,
  },
  {
    key: "logistics",
    industry: "Logistics",
    line: "Dispatch consoles and driver apps with live fleet locations",
    project: "logistics-tracking",
    projectTitle: "Fleet & Delivery Tracking",
    video: "/hero/logistics.mp4",
    poster: "/hero/logistics.jpg",
    scene: "realtime",
    hue: 25,
  },
  {
    key: "education",
    industry: "Education",
    line: "Course marketplaces with streaming, quizzes and instructor payouts",
    project: "lms-platform",
    projectTitle: "Course Marketplace & LMS",
    video: "/hero/education.mp4",
    poster: "/hero/education.jpg",
    scene: "dashboard",
    hue: 190,
  },
];

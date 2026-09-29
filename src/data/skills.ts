/**
 * Skills grouped by area. `icon` is a simple-icons slug (see lib/icons.ts).
 * `level` is 1–5 and drives the proficiency bar.
 */
export type Skill = { name: string; icon: string; level: number };
export type SkillGroup = { id: string; label: string; blurb: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Front-end",
    blurb: "Interfaces that feel instant, animate with purpose and hold up on every device.",
    skills: [
      { name: "React", icon: "react", level: 5 },
      { name: "Next.js", icon: "nextdotjs", level: 5 },
      { name: "TypeScript", icon: "typescript", level: 5 },
      { name: "Tailwind CSS", icon: "tailwindcss", level: 5 },
      { name: "Motion", icon: "framer", level: 4 },
      { name: "React Native", icon: "react", level: 4 },
      { name: "Vue / Nuxt", icon: "vuedotjs", level: 3 },
      { name: "Storybook", icon: "storybook", level: 4 },
      { name: "Figma", icon: "figma", level: 4 },
      { name: "Chakra UI", icon: "chakraui", level: 4 },
    ],
  },
  {
    id: "backend",
    label: "Back-end",
    blurb: "Typed APIs, correct money flows and data models that survive scale.",
    skills: [
      { name: "Node.js", icon: "nodedotjs", level: 5 },
      { name: "NestJS", icon: "nestjs", level: 5 },
      { name: "PostgreSQL", icon: "postgresql", level: 5 },
      { name: "Prisma", icon: "prisma", level: 5 },
      { name: "Supabase", icon: "supabase", level: 5 },
      { name: "Redis / BullMQ", icon: "redis", level: 4 },
      { name: "GraphQL", icon: "graphql", level: 4 },
      { name: "Socket.io", icon: "socketdotio", level: 4 },
      { name: "Stripe", icon: "stripe", level: 4 },
      { name: "Python", icon: "python", level: 3 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Tooling",
    blurb: "Reproducible environments and deploys nobody has to babysit.",
    skills: [
      { name: "Docker", icon: "docker", level: 5 },
      { name: "GitHub Actions", icon: "githubactions", level: 4 },
      { name: "AWS", icon: "amazonwebservices", level: 4 },
      { name: "Cloudflare", icon: "cloudflare", level: 4 },
      { name: "Vercel", icon: "vercel", level: 5 },
      { name: "Nginx", icon: "nginx", level: 4 },
      { name: "Vitest", icon: "vitest", level: 4 },
      { name: "Playwright", icon: "playwright", level: 4 },
      { name: "Git", icon: "git", level: 5 },
      { name: "Linux", icon: "linux", level: 4 },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    blurb: "LLM features that are useful, observable and safe to automate.",
    skills: [
      { name: "Claude API", icon: "anthropic", level: 4 },
      { name: "OpenAI API", icon: "openai", level: 4 },
      { name: "pgvector / RAG", icon: "postgresql", level: 4 },
      { name: "LangChain", icon: "langchain", level: 3 },
      { name: "Kafka", icon: "apachekafka", level: 3 },
      { name: "Elasticsearch", icon: "elasticsearch", level: 3 },
    ],
  },
];

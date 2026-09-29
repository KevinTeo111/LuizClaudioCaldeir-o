/**
 * Site-wide profile and copy.
 * EDIT: everything in this file is personal data.
 */
export const site = {
  name: "Luiz", // short form used in the logo and preloader
  fullName: "Luiz Claudio",
  role: "Senior Full-Stack Engineer",
  tagline: "I design and ship products that work in the real world.",
  location: "São Paulo, Brazil · Remote worldwide",
  email: "hello@luizclaudio.dev", // EDIT
  availability: "Open for new projects",
  workana: "https://www.workana.com/freelancer/5aa15a6f0ebb0a8d3454eed8e0e256a9",
  url: "https://luizclaudio.dev", // EDIT: production URL (used for metadata)
  description:
    "Luiz Claudio, senior full-stack engineer: SaaS platforms, marketplaces, realtime systems and AI-powered products with Next.js, NestJS, PostgreSQL and Supabase.",
  socials: [
    { label: "GitHub", href: "https://github.com/", id: "github" }, // EDIT
    { label: "LinkedIn", href: "https://linkedin.com/in/", id: "linkedin" }, // EDIT
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
] as const;

export const heroStats = [
  { value: 8, suffix: "+", label: "Years shipping" },
  { value: 40, suffix: "+", label: "Products launched" },
  { value: 12, suffix: "", label: "Countries served" },
  { value: 100, suffix: "%", label: "Delivered on scope" },
] as const;

/** Core stack shown in the proof strip under the hero (simple-icons slugs). */
export const coreStack = [
  ["nextdotjs", "Next.js"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["nestjs", "NestJS"],
  ["nodedotjs", "Node.js"],
  ["postgresql", "PostgreSQL"],
  ["prisma", "Prisma"],
  ["supabase", "Supabase"],
  ["redis", "Redis"],
  ["tailwindcss", "Tailwind CSS"],
  ["docker", "Docker"],
  ["amazonwebservices", "AWS"],
  ["cloudflare", "Cloudflare"],
  ["stripe", "Stripe"],
  ["anthropic", "Claude API"],
] as const;

/**
 * Site-wide profile and copy.
 * EDIT: everything in this file is personal data — update to match Luiz.
 */
export const site = {
  name: "Luiz",
  fullName: "Luiz",
  role: "Senior Full-Stack Engineer",
  tagline: "I design and ship products that feel effortless.",
  location: "São Paulo, Brazil · Remote worldwide",
  email: "hello@luiz.dev", // EDIT
  availability: "Open for new projects",
  url: "https://luiz.dev", // EDIT: production URL (used for metadata)
  description:
    "Senior full-stack engineer building SaaS platforms, marketplaces, realtime systems and AI-powered products with Next.js, NestJS, PostgreSQL and Supabase.",
  socials: [
    { label: "GitHub", href: "https://github.com/", id: "github" }, // EDIT
    { label: "LinkedIn", href: "https://linkedin.com/in/", id: "linkedin" }, // EDIT
    { label: "Workana", href: "https://www.workana.com/", id: "workana" }, // EDIT
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "About", href: "#about" },
] as const;

export const heroStats = [
  { value: 8, suffix: "+", label: "Years shipping" },
  { value: 40, suffix: "+", label: "Products launched" },
  { value: 12, suffix: "", label: "Countries served" },
  { value: 100, suffix: "%", label: "Delivered on scope" },
] as const;

export const marqueeItems = [
  "SaaS Platforms",
  "Marketplaces",
  "Realtime Systems",
  "Mobile-first Apps",
  "AI Automation",
  "Design Systems",
  "Payments & Payouts",
  "Cloud Infrastructure",
] as const;

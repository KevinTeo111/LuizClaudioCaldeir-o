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
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Client Testimonial", href: "#testimonials" },
  { label: "Technology Stacks", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "About Me", href: "#about" },
] as const;

export const heroStats = [
  { value: 8, suffix: "+", label: "Years experience" },
  { value: 40, suffix: "+", label: "Products shipped" },
  { value: 2.5, suffix: "×", label: "Faster delivery" },
  { value: 100, suffix: "%", label: "Tested & quality" },
] as const;

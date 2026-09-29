export type Service = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Wonderful Design",
    subtitle: "UI/UX that appeals to users",
    description: "Beautiful, intuitive interfaces designed around your users, every screen crafted to engage and convert.",
    bullets: ["UI/UX design for web & mobile", "Design systems & prototypes (Figma)", "Conversion-focused landing pages"],
  },
  {
    index: "02",
    title: "2.5× Faster Delivery",
    subtitle: "Speed without shortcuts",
    description: "Proven workflows and battle-tested components mean your product goes live faster than you would expect.",
    bullets: ["Rapid MVP in weeks, not months", "Weekly demos & transparent progress", "Direct communication, no middlemen"],
  },
  {
    index: "03",
    title: "Seamless Performance",
    subtitle: "Without small errors",
    description: "Fast load times, smooth interactions and stability under load, engineered for a flawless experience.",
    bullets: ["90+ Lighthouse performance scores", "Optimized APIs & databases", "Responsive on every device"],
  },
  {
    index: "04",
    title: "100% Quality, Fully Tested",
    subtitle: "Every case covered",
    description: "Every feature is tested across all cases before release: automated tests, edge cases and real-device QA.",
    bullets: ["Automated unit & E2E testing", "Cross-browser & device QA", "Code reviews & clean architecture"],
  },
  {
    index: "05",
    title: "Free 1-Month Support",
    subtitle: "After launching your product",
    description: "Launch is the beginning, not the end. One month of free support: fixes, tweaks and guidance included.",
    bullets: ["Bug fixes at no extra cost", "Deployment & monitoring setup", "Handover docs & training"],
  },
  {
    index: "06",
    title: "SEO & Growth",
    subtitle: "Rank higher, convert more",
    description: "Beautiful and fast means nothing if no one finds it. Technical SEO, Core Web Vitals and clean content structure from day one.",
    bullets: ["Technical SEO & Core Web Vitals", "On-page, schema & metadata", "Keyword strategy & analytics"],
  },
];

export const processSteps = [
  { no: "01", title: "Design", sub: "Wireframes → Figma", text: "Every screen designed and approved by you before a single line of code is written.", note: "You approve each screen", icon: "pen" },
  { no: "02", title: "Build MVP First", sub: "Core product, live early", text: "A working MVP in weeks: you test it with real users while changes are still cheap.", note: "Live demo in weeks", icon: "rocket" },
  { no: "03", title: "Implement Full Requirements", sub: "Feature by feature", text: "The complete requirement list, built iteratively with weekly demos and your feedback each sprint.", note: "Weekly demos", icon: "layers" },
  { no: "04", title: "Test & Publish", sub: "QA → deploy → live", text: "Automated and manual QA across all cases, then deployment and monitoring: your product goes live.", note: "+1 month free support", icon: "shield" },
] as const;

export const processNotes = ["Milestones & payments fully protected", "Weekly progress you can see", "Free support for 1 month after launch"];

/** Client map: stats and city pins (left/top in % of the world-map.svg). */
export const clientStats = [
  { value: "8", label: "Years of experience in software engineering and design" },
  { value: "40", label: "Products designed, built and launched from idea to live" },
  { value: "20", label: "Active clients across South America, the US, Europe and the Middle East" },
] as const;

export const clientPins = [
  ["São Paulo", 30, 70, true],
  ["Rio de Janeiro", 31.5, 68.5, false],
  ["Buenos Aires", 27, 77, false],
  ["Santiago", 24.5, 77.5, true],
  ["Lima", 22, 63, false],
  ["Bogotá", 23.5, 55, false],
  ["Mexico City", 18.5, 46, true],
  ["New York", 26, 33, false],
  ["Miami", 24, 42, false],
  ["Austin", 20.5, 40, false],
  ["Toronto", 25, 30, false],
  ["London", 46.5, 22, false],
  ["Madrid", 46, 30, false],
  ["Berlin", 51, 23, false],
  ["Riyadh", 58.5, 44, false],
] as const;

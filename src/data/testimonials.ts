/**
 * Client testimonials. EDIT: replace with real, verifiable reviews.
 */
export type Testimonial = {
  name: string;
  role: string;
  country: string;
  quote: string;
  rating: number;
  source?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rafael M.",
    role: "Founder, digital marketplace",
    country: "Brazil",
    quote:
      "Luiz delivered the whole marketplace — API, storefront, vendor dashboard and payouts — with a ledger that reconciles to the cent. Weekly demos, zero surprises.",
    rating: 5,
    source: "Contract",
  },
  {
    name: "Catalina R.",
    role: "Venue owner",
    country: "Chile",
    quote:
      "Two hundred phones, the host panel and the TVs stayed perfectly in sync all night. Our guests loved it and the team runs the whole show from one screen.",
    rating: 5,
    source: "Contract",
  },
  {
    name: "Daniel S.",
    role: "Engineering lead, SaaS",
    country: "Mexico",
    quote:
      "Clean architecture, thoughtful questions early on and documentation our team actually uses. He adapted to our internal tooling in days.",
    rating: 5,
    source: "Contract",
  },
  {
    name: "Amir K.",
    role: "Operations director",
    country: "USA",
    quote:
      "He took a messy legacy platform, cleaned up the architecture and shipped features our customers love. Works autonomously and asks the right questions at the right time.",
    rating: 5,
    source: "Contract",
  },
  {
    name: "Elena V.",
    role: "Managing partner, law firm",
    country: "Spain",
    quote:
      "Fast, precise and a pleasure to work with. The site feels authored, not templated, and it scored 100 on every audit.",
    rating: 5,
    source: "Contract",
  },
];

/**
 * Certifications.
 *
 * TODO (Luiz): the real certification details were not present in the
 * workspace when this site was built. The entries below are PLACEHOLDERS
 * that show how the section renders. Replace each one with the actual
 * credential: title, issuer, date, credential id, verify URL and, if you
 * have it, an image of the certificate in /public/certs (the card renders
 * a generated badge when `image` is omitted).
 */
export type Certification = {
  title: string;
  issuer: string;
  issuerId: string; // simple-icons slug used for the badge mark
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: string; // e.g. "/certs/aws-saa.png"
  skills: string[];
  size: "lg" | "md" | "sm";
  placeholder?: boolean;
};

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issuerId: "amazonwebservices",
    date: "2025",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["Cloud architecture", "High availability", "Cost optimisation"],
    size: "lg",
    placeholder: true,
  },
  {
    title: "Professional Cloud Developer",
    issuer: "Google Cloud",
    issuerId: "googlecloud",
    date: "2024",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["Cloud Run", "CI/CD", "Observability"],
    size: "md",
    placeholder: true,
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta · Coursera",
    issuerId: "meta",
    date: "2023",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["React", "UX principles", "Accessibility"],
    size: "md",
    placeholder: true,
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    issuerId: "mongodb",
    date: "2023",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["Data modelling", "Aggregation", "Performance"],
    size: "sm",
    placeholder: true,
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker",
    issuerId: "docker",
    date: "2022",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["Containers", "Compose", "Networking"],
    size: "sm",
    placeholder: true,
  },
  {
    title: "Responsive Web Design & JavaScript Algorithms",
    issuer: "freeCodeCamp",
    issuerId: "freecodecamp",
    date: "2021",
    credentialId: "PLACEHOLDER-ID",
    verifyUrl: "#",
    skills: ["HTML/CSS", "Algorithms", "Data structures"],
    size: "lg",
    placeholder: true,
  },
];

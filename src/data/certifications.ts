/**
 * Certifications.
 *
 * TODO (Luiz): the real certification details were not present in the
 * workspace when this site was built. The entries below are PLACEHOLDERS
 * that show how the section renders. Replace each one with the actual
 * credential: title, issuer, date, credential id, verify URL, a one-line
 * description and the certificate image itself. Export the certificate the
 * issuer gave you (PDF → PNG/WebP, ~1600px wide, 16:10) into /public/certs
 * and point `image` at it. When `image` is omitted the card renders a styled
 * face from `track`, `level`, `focus` and `seal`, and `placeholder: true`
 * marks it "sample" — remove that flag once the entry is real.
 */
export type Certification = {
  title: string;
  issuer: string;
  issuerId: string; // simple-icons slug used for the badge mark
  date: string;
  description: string;
  track: string; // headline on the certificate face
  level: string; // tier shown in gold under the headline
  focus: string; // one line on what the credential covers
  seal: string; // short issuer label on the gold seal
  credentialId?: string;
  verifyUrl?: string;
  image?: string; // e.g. "/certs/aws-saa.webp"
  skills: string[];
  placeholder?: boolean;
};

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issuerId: "amazonwebservices",
    date: "2025",
    description: "Validates the ability to design secure, resilient and cost-efficient distributed systems on AWS, choosing the right compute, storage and networking services for each workload.",
    track: "Solutions Architect",
    level: "Associate",
    focus: "Designing resilient, secure and cost-optimised architectures on AWS",
    seal: "AWS",
    verifyUrl: "#",
    skills: ["Well-Architected design", "High availability & disaster recovery", "Cost optimisation"],
    placeholder: true,
  },
  {
    title: "Google Cloud Professional Cloud Developer",
    issuer: "Google Cloud",
    issuerId: "googlecloud",
    date: "2024",
    description: "Professional-level certification for building, deploying and monitoring scalable cloud-native applications with Google Cloud managed services.",
    track: "Cloud Developer",
    level: "Professional",
    focus: "Building and operating cloud-native applications on Google Cloud",
    seal: "Google Cloud",
    verifyUrl: "#",
    skills: ["Cloud Run & GKE deployments", "CI/CD with Cloud Build", "Logging, tracing & observability"],
    placeholder: true,
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta · Coursera",
    issuerId: "meta",
    date: "2023",
    description: "Multi-course professional program covering modern front-end engineering — semantic HTML, JavaScript, React, UX/UI principles and accessible interface design.",
    track: "Front-End Developer",
    level: "Professional Certificate",
    focus: "React, UX/UI design and accessible front-end engineering",
    seal: "Meta",
    verifyUrl: "#",
    skills: ["React component architecture", "UX/UI principles", "Web accessibility (WCAG)"],
    placeholder: true,
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    issuerId: "mongodb",
    date: "2023",
    description: "Attests to practical skill in modelling documents, writing CRUD and aggregation queries, and tuning indexes for MongoDB-backed applications.",
    track: "MongoDB Developer",
    level: "Associate",
    focus: "Document modelling, aggregation pipelines and query performance",
    seal: "MongoDB",
    verifyUrl: "#",
    skills: ["Schema & document modelling", "Aggregation pipelines", "Indexing & performance"],
    placeholder: true,
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker",
    issuerId: "docker",
    date: "2022",
    description: "Confirms working knowledge of building images, running multi-container applications and managing networking, storage and orchestration with Docker.",
    track: "Docker",
    level: "Certified Associate",
    focus: "Image builds, orchestration, networking and storage with Docker",
    seal: "Docker",
    verifyUrl: "#",
    skills: ["Dockerfiles & image optimisation", "Compose & Swarm orchestration", "Container networking & volumes"],
    placeholder: true,
  },
  {
    title: "freeCodeCamp Responsive Web Design & JavaScript Algorithms",
    issuer: "freeCodeCamp",
    issuerId: "freecodecamp",
    date: "2021",
    description: "Project-based certifications completed by shipping responsive layouts and solving JavaScript algorithm and data-structure challenges.",
    track: "Web Design & Algorithms",
    level: "Curriculum Completed",
    focus: "Responsive layouts and JavaScript algorithms & data structures",
    seal: "freeCodeCamp",
    verifyUrl: "#",
    skills: ["Responsive HTML & CSS", "JavaScript algorithms", "Data structures"],
    placeholder: true,
  },
];

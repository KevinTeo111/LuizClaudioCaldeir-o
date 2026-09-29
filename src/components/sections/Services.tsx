import { Marquee } from "@/components/ui/Marquee";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { services, type Service } from "@/data/services";
import { marqueeItems } from "@/data/site";

const icons: Record<Service["icon"], React.ReactNode> = {
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.98A7 7 0 0 0 4.7 12.4 4 4 0 0 0 6 19h11.5z" />,
  sparkles: (
    <>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7L19 17zM5 2l.6 1.4L7 4l-1.4.6L5 6l-.6-1.4L3 4l1.4-.6L5 2z" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 4 3 5-7" />
    </>
  ),
};

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="border-y border-line py-5">
        <Marquee speed={38}>
          {marqueeItems.map((m) => (
            <span key={m} className="flex items-center gap-8 px-4 text-[clamp(20px,2.4vw,34px)] font-extrabold tracking-tight text-ink-2/80">
              {m}
              <span className="size-2 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="wrap mt-20">
        <SectionHeader
          kicker="What I do"
          title={
            <>
              Design. Build. Ship. <span className="text-grad">Keep it running.</span>
            </>
          }
          sub="One senior engineer, end-to-end delivery. Every project runs from idea to live: designed carefully, engineered properly and supported after launch."
        />

        <Reveal className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" amount={0.1} stagger={0.1}>
          {services.map((s) => (
            <RevealItem key={s.index} className="h-full">
              <TiltCard as="article" tilt={6} className="grad-border flex h-full flex-col rounded-[var(--r-m)] border border-line bg-bg-2 p-8 transition-shadow duration-500 hover:shadow-[var(--shadow),var(--glow)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgba(124,92,255,.25),rgba(34,211,238,.12))] text-accent-2">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {icons[s.icon]}
                    </svg>
                  </span>
                  <span className="font-mono text-[12px] text-muted-2">{s.index}</span>
                </div>
                <h3 className="mt-7 text-[21px] font-extrabold leading-tight tracking-tight">
                  {s.title}
                  <small className="mt-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-2">{s.subtitle}</small>
                </h3>
                <p className="mt-4 text-[14.5px] font-medium text-muted">{s.description}</p>
                <ul className="mt-auto pt-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="relative border-t border-line py-2.5 pl-6 text-[13.5px] font-semibold text-ink-2">
                      <span className="absolute left-0 top-3 text-[11px] text-accent-2">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

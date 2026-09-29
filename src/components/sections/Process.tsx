import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processNotes, processSteps } from "@/data/services";

const icons: Record<(typeof processSteps)[number]["icon"], React.ReactNode> = {
  pen: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

/** Light section: the four-step delivery flow with a connecting gradient line. */
export function Process() {
  return (
    <section id="process" className="light relative py-24 md:py-32">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="flowgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#695efe" />
            <stop offset="1" stopColor="#ff6af8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="wrap">
        <SectionHeader
          align="center"
          kicker="My Process"
          title={
            <>
              From idea to live, <span className="text-grad">step by step.</span>
            </>
          }
          sub="You always know exactly where your project stands: a clear four-step flow with demos and approvals at every stage. No black box, no surprises."
        />

        <Reveal className="relative mt-18 grid gap-11 md:grid-cols-2 lg:grid-cols-4 lg:gap-7" amount={0.2} stagger={0.15}>
          <span aria-hidden className="absolute left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] top-[52px] hidden h-[3px] rounded bg-[linear-gradient(90deg,#695efe,#a05dfd,#ff6af8)] opacity-85 lg:block" />
          {processSteps.map((s, i) => (
            <RevealItem key={s.no} className="group relative px-2 text-center">
              <div className="relative z-[1] mx-auto grid size-[104px] place-items-center rounded-[32px] border border-line bg-bg-2 transition duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_24px_50px_-20px_rgba(105,94,254,.55)]">
                <svg viewBox="0 0 24 24" className="size-11" fill="none" stroke="url(#flowgrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icons[s.icon]}
                </svg>
                <span className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full border-[3px] border-bg bg-[linear-gradient(92deg,#695efe,#ff6af8)] text-[13.5px] font-black text-white">{s.no}</span>
              </div>
              {i < processSteps.length - 1 ? <span aria-hidden className="absolute right-[-22px] top-11 z-[1] hidden text-[19px] font-black text-pink lg:block">➤</span> : null}
              <h3 className="mt-6 text-[19px] font-extrabold">{s.title}</h3>
              <div className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-accent">{s.sub}</div>
              <p className="mx-auto mt-3 max-w-[250px] text-[14px] font-medium text-muted">{s.text}</p>
              <span className="mt-3.5 inline-flex rounded-full border border-line bg-[rgba(105,94,254,.1)] px-4 py-1.5 text-[11.5px] font-extrabold text-ink-2">{s.note}</span>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-3.5" amount={0.3}>
          {processNotes.map((n) => (
            <RevealItem key={n} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-2 px-5 py-2.5 text-[13px] font-bold text-ink-2">
              <span className="text-pink">✓</span> {n}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

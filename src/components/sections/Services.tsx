import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Services"
          title={
            <>
              Design. Build. Test. <span className="text-grad">Launch.</span>
            </>
          }
          sub="One senior engineer, end-to-end delivery. Every project runs from idea to live: designed carefully, engineered properly and supported after launch."
        />

        <Reveal className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" amount={0.1} stagger={0.1}>
          {services.map((s) => (
            <RevealItem key={s.index} className="h-full">
              <TiltCard as="article" tilt={6} className="grad-border flex h-full flex-col rounded-[var(--r-m)] border border-line bg-bg-2 p-8 transition-shadow duration-500 hover:shadow-[var(--shadow),var(--glow)]">
                <span className="inline-grid size-[52px] place-items-center rounded-2xl bg-[rgba(105,94,254,.16)] text-[15px] font-extrabold text-accent-2">{s.index}</span>
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

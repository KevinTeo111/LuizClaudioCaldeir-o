"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";

const cols = "md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Experience"
          title={
            <>
              Eight years, <span className="text-grad">forty products.</span>
            </>
          }
          sub="Agencies, a scale-up and independent work for founders across Latin America, the US and Europe."
        />

        <div ref={ref} className="relative mt-16 flex flex-col gap-10">
          {/* progress line */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-line md:left-[calc(220px-1px)] lg:left-[calc(260px-1px)]">
            <motion.div className="h-full w-full origin-top bg-[linear-gradient(180deg,#7c5cff,#22d3ee)]" style={{ scaleY: line }} />
          </div>

          {experience.map((e, i) => (
            <Reveal key={e.period} className={`grid gap-5 md:gap-10 ${cols}`} amount={0.25}>
              <RevealItem className="relative pl-8 md:pl-0 md:pr-12">
                <span className="absolute left-0 top-1.5 size-[15px] rounded-full border-[3px] border-bg bg-[linear-gradient(135deg,#7c5cff,#22d3ee)] shadow-[0_0_0_4px_rgba(124,92,255,.2)] md:left-auto md:right-[-8px]" />
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent-2">{e.period}</div>
                <div className="mt-2 text-[15px] font-bold text-ink-2">{e.company}</div>
                <div className="text-[13px] text-muted">{e.location}</div>
              </RevealItem>
              <RevealItem className="grad-border ml-8 rounded-[var(--r-m)] border border-line bg-bg-2 p-6 md:ml-0 md:p-8">
                <h3 className="text-[clamp(20px,1.8vw,26px)] font-extrabold tracking-tight">{e.role}</h3>
                <p className="mt-3 text-[15px] font-medium text-muted">{e.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[14px] text-ink-2">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-2" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[11px] text-ink-2">
                      {s}
                    </span>
                  ))}
                </div>
                {i === 0 ? (
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1.5 text-[12px] font-bold text-green">
                    <span className="size-1.5 animate-pulse rounded-full bg-green" /> Current
                  </span>
                ) : null}
              </RevealItem>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

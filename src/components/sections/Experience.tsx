"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const cols = "md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]";

/** Timeline with a scroll-filled line; each role unfolds to its highlights (latest open by default). */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
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

        <div ref={ref} className="relative mt-16 flex flex-col gap-6">
          <div className="absolute left-[7px] top-0 h-full w-px bg-line md:left-[calc(220px-1px)] lg:left-[calc(260px-1px)]">
            <motion.div className="h-full w-full origin-top bg-[linear-gradient(180deg,#695efe,#ff6af8)]" style={{ scaleY: line }} />
          </div>

          {experience.map((e, i) => {
            const on = open === i;
            return (
              <Reveal key={e.period} className={`grid gap-4 md:gap-10 ${cols}`} amount={0.2}>
                <RevealItem className="relative pl-8 md:pl-0 md:pr-12">
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 size-[15px] rounded-full border-[3px] border-bg transition-colors md:left-auto md:right-[-8px]",
                      on ? "bg-[linear-gradient(135deg,#695efe,#ff6af8)] shadow-[0_0_0_4px_rgba(105,94,254,.2)]" : "bg-muted-2",
                    )}
                  />
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent-2">{e.period}</div>
                  <div className="mt-2 text-[15px] font-bold text-ink-2">{e.company}</div>
                  <div className="text-[13px] text-muted">{e.location}</div>
                </RevealItem>

                <RevealItem className={cn("grad-border ml-8 rounded-[var(--r-m)] border bg-bg-2 transition-colors md:ml-0", on ? "is-on border-line-2" : "border-line")}>
                  <button
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <span>
                      <span className="block text-[clamp(19px,1.8vw,26px)] font-extrabold tracking-tight">{e.role}</span>
                      <span className="mt-1.5 block text-[14.5px] font-medium text-muted">{e.summary}</span>
                    </span>
                    <span className={cn("grid size-9 shrink-0 place-items-center rounded-full border border-line-2 text-white transition duration-500", on ? "rotate-45 border-accent bg-accent" : "")}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div
                        key="body"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                          <ul className="space-y-2.5 border-t border-line pt-5">
                            {e.highlights.map((h) => (
                              <li key={h} className="flex gap-3 text-[14px] text-ink-2">
                                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-2" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap items-center gap-1.5">
                            {e.stack.map((s) => (
                              <span key={s} className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[11px] text-ink-2">
                                {s}
                              </span>
                            ))}
                            {i === 0 ? (
                              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-3 py-1.5 text-[12px] font-bold text-green">
                                <span className="size-1.5 animate-pulse rounded-full bg-green" /> Current
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </RevealItem>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

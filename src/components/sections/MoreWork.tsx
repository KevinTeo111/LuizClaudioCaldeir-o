"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ScenePreview } from "@/components/showreel/ScenePreview";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { moreProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Accordion of further projects: one line each, unfolding to the full case and a live demo. */
export function MoreWork() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="more-work" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="More projects"
          title={
            <>
              Across industries, <span className="text-grad">one standard.</span>
            </>
          }
          sub="Open a line to unfold the challenge, the result and a live demo of the product type."
        />

        <Reveal className="mt-12 border-t border-line" amount={0.1} stagger={0.06}>
          {moreProjects.map((p, i) => {
            const on = open === p.slug;
            return (
              <RevealItem key={p.slug} className="border-b border-line">
                <button
                  onClick={() => setOpen(on ? null : p.slug)}
                  aria-expanded={on}
                  aria-controls={`more-${p.slug}`}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left md:grid-cols-[56px_1fr_200px_120px_40px] md:gap-8"
                >
                  <span className="font-mono text-[12px] text-muted-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className={cn("block text-[clamp(20px,2vw,28px)] font-extrabold tracking-tight transition-colors", on ? "text-grad" : "group-hover:text-white")}>
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.14em] text-muted md:hidden">{p.kicker}</span>
                  </span>
                  <span className="hidden text-[12px] font-bold uppercase tracking-[0.14em] text-muted md:block">{p.kicker}</span>
                  <span className="hidden font-mono text-[12px] text-muted-2 md:block">{p.year}</span>
                  <span className={cn("grid size-10 place-items-center rounded-full border border-line-2 text-white transition duration-500", on ? "rotate-45 border-accent bg-accent" : "group-hover:border-accent-2")}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      id={`more-${p.slug}`}
                      key="panel"
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.1fr] md:pl-[88px]">
                        <div>
                          <p className="text-[15px] font-medium text-muted">{p.summary}</p>
                          <dl className="mt-5 text-[13.5px]">
                            <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">Challenge</dt>
                            <dd className="mt-1 text-ink-2">{p.problem}</dd>
                            <dt className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">Result</dt>
                            <dd className="mt-1 text-ink-2">{p.result}</dd>
                          </dl>
                          <div className="mt-5 flex items-end gap-6">
                            <div>
                              <b className="text-grad block text-[34px] font-extrabold leading-none tracking-tight">{p.metric.value}</b>
                              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{p.metric.label}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {p.stack.map((t) => (
                                <span key={t} className="rounded-full border border-line-2 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-2">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2, duration: 0.7, ease }}>
                          <ScenePreview scene={p.scene} video={p.video} className="rounded-2xl border border-line-2 shadow-[var(--shadow)]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

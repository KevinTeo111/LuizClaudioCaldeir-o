"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clientPins, clientStats } from "@/data/services";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { cn, initials } from "@/lib/utils";

/**
 * Reference-style testimonial stage: the active card centred, neighbours
 * receding at the sides, "Recent" and "Workana Contract" badges, arrows and
 * dots. Followed by the "My Clients" world-map panel.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const n = testimonials.length;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 6000);
    return () => clearInterval(id);
  }, [inView, n, index]);

  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          align="center"
          kicker="Testimonials"
          title={
            <>
              What clients <span className="text-grad">say.</span>
            </>
          }
          sub="Real feedback from real, verified contracts."
        />

        <div ref={ref} className="relative mt-12 h-[520px] sm:h-[460px]">
          {testimonials.map((t, i) => {
            const d = offsetOf(i);
            const on = d === 0;
            return (
              <motion.article
                key={t.name}
                className={cn(
                  "absolute left-1/2 top-0 flex w-[min(680px,86%)] flex-col items-center rounded-[var(--r-l)] border px-6 pb-10 pt-[76px] text-center md:px-16",
                  on ? "border-line bg-bg-2 shadow-[var(--shadow)]" : "border-line bg-bg-3",
                )}
                initial={false}
                animate={{
                  x: on ? "-50%" : d < 0 ? "-122%" : "22%",
                  scale: on ? 1 : 0.96,
                  opacity: Math.abs(d) > 1 ? 0 : on ? 1 : 0.3,
                  zIndex: on ? 2 : 1,
                  top: on ? 0 : 26,
                }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                onClick={() => !on && setIndex(i)}
                aria-hidden={!on}
              >
                <div className="absolute left-6 right-6 top-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-green/35 bg-green/[0.08] px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-green">
                    <span className="size-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(93,247,147,.8)]" /> Recent
                  </span>
                  <a href={site.workana} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(92deg,#695efe,#ff6af8)] px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M9 12l2 2 4-5" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    Workana Contract
                  </a>
                </div>
                <span className="grid size-[74px] place-items-center rounded-full bg-[linear-gradient(92deg,#695efe,#ff6af8)] text-[22px] font-extrabold text-white">{initials(t.name)}</span>
                <div className="mt-4 text-[15.5px] font-extrabold">{t.name}</div>
                <div className="mt-1 text-[12px] font-semibold tracking-[0.04em] text-muted">
                  {t.role} · {t.country}
                </div>
                <div className="mt-1 mb-3.5 text-[14px] tracking-[2px] text-amber">
                  {"★".repeat(t.rating)}
                  <b className="ml-1.5 text-[13px] tracking-normal text-ink-2">{t.rating.toFixed(1)}</b>
                  <small className="ml-1 text-[12px] tracking-normal text-muted">· {t.when}</small>
                </div>
                <p className="max-w-[52ch] text-[16px] italic leading-relaxed text-ink-2">&ldquo;{t.quote}&rdquo;</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-9 flex justify-center gap-3.5">
          <button onClick={() => setIndex((v) => (v - 1 + n) % n)} aria-label="Previous testimonial" className="grid size-[50px] place-items-center rounded-full border-[1.5px] border-line text-white transition hover:border-accent hover:bg-accent">
            ←
          </button>
          <button onClick={() => setIndex((v) => (v + 1) % n)} aria-label="Next testimonial" className="grid size-[50px] place-items-center rounded-full border-[1.5px] border-line text-white transition hover:border-accent hover:bg-accent">
            →
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button key={t.name} aria-label={`Go to testimonial ${i + 1}`} onClick={() => setIndex(i)} className={cn("size-2 rounded-full transition", i === index ? "scale-[1.3] bg-[linear-gradient(92deg,#695efe,#ff6af8)]" : "bg-line")} />
          ))}
        </div>

        {/* my clients */}
        <div className="mt-24">
          <SectionHeader
            kicker="My Clients"
            title={
              <>
                Clients around <span className="text-grad">the world.</span>
              </>
            }
            sub="Trusted by clients on four continents, with deep roots in South America and teams across the US, Europe and the Middle East."
          />
          <Reveal className="mt-14 grid overflow-hidden rounded-[var(--r-l)] border border-line bg-bg-2 shadow-[var(--shadow)] md:grid-cols-[340px_1fr]" amount={0.2}>
            <RevealItem className="flex flex-row md:flex-col md:justify-center">
              {clientStats.map((s) => (
                <div key={s.label} className="flex flex-1 flex-col items-center gap-2 border-r border-line px-3.5 py-5 text-center last:border-r-0 md:flex-row md:items-center md:gap-5 md:border-b md:border-r-0 md:px-8 md:py-7 md:text-left md:last:border-b-0">
                  <b className="whitespace-nowrap text-[clamp(28px,2.6vw,40px)] font-black tracking-tight text-accent-2">
                    <i className="align-[.28em] text-[.62em] not-italic text-pink">+</i>
                    {s.value}
                  </b>
                  <span className="text-[12px] font-semibold leading-snug text-ink-2 md:text-[14px]">{s.label}</span>
                </div>
              ))}
            </RevealItem>
            <RevealItem className="relative border-t border-line bg-[radial-gradient(900px_420px_at_70%_20%,rgba(105,94,254,.12),transparent_60%)] p-[clamp(14px,2.4vw,34px)] md:border-l md:border-t-0">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/world-map.svg" alt="World map of client locations" className="w-full opacity-95" />
                {clientPins.map(([city, left, top, big]) => (
                  <span
                    key={city}
                    className={cn(
                      "group absolute -translate-x-1/2 -translate-y-full rotate-[-45deg] rounded-[50%_50%_50%_0] shadow-[0_8px_20px_rgba(0,0,0,.5)]",
                      big
                        ? "size-[46px] bg-[linear-gradient(160deg,#ffe066,#ff9f2e)] shadow-[0_0_0_7px_rgba(255,216,77,.16),0_12px_30px_rgba(255,170,40,.5)]"
                        : "size-[34px] bg-[linear-gradient(92deg,#695efe,#ff6af8)]",
                    )}
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <span className={cn("absolute rounded-full", big ? "inset-[13px] bg-bg" : "inset-[9px] bg-white")} />
                    {big ? <span className="absolute -inset-2.5 rounded-[50%_50%_50%_0] border-[2.5px] border-[rgba(255,216,77,.75)] [animation:pulse-ring_1.6s_ease-out_infinite]" /> : null}
                    <span className="pointer-events-none absolute left-1/2 top-[-12px] -translate-x-1/2 rotate-45 whitespace-nowrap rounded-full border border-line bg-[#10101d] px-3 py-1 text-[11.5px] font-bold text-white opacity-0 transition group-hover:top-[-20px] group-hover:opacity-100">
                      {city}
                    </span>
                  </span>
                ))}
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn, initials } from "@/lib/utils";

/**
 * 3D coverflow: the active card sits centre, neighbours recede and tilt
 * behind it. Autoplays while on screen; arrows, dots and drag navigate.
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_60%,rgba(255,79,216,.08),transparent_70%)]" />
      <div className="wrap">
        <SectionHeader
          align="center"
          kicker="Testimonials"
          title={
            <>
              What clients <span className="text-grad">say.</span>
            </>
          }
          sub="Feedback from founders and engineering leads on delivered contracts."
        />

        <div ref={ref} className="relative mt-14 h-[430px] [perspective:1400px] sm:h-[400px]">
          {testimonials.map((t, i) => {
            const d = offsetOf(i);
            const visible = Math.abs(d) <= 1;
            return (
              <motion.article
                key={t.name}
                className={cn(
                  "absolute left-1/2 top-0 flex w-[min(640px,88vw)] cursor-grab flex-col items-center rounded-[var(--r-l)] border p-9 text-center md:p-12",
                  d === 0 ? "border-line-2 bg-bg-2 shadow-[var(--shadow),var(--glow)]" : "border-line bg-bg-3",
                )}
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${d * 66}%)`,
                  scale: d === 0 ? 1 : 0.82,
                  rotateY: d * -20,
                  z: d === 0 ? 0 : -180,
                  opacity: visible ? (d === 0 ? 1 : 0.28) : 0,
                  filter: d === 0 ? "blur(0px)" : "blur(2px)",
                  zIndex: 10 - Math.abs(d),
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                drag={d === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setIndex((v) => (v + 1) % n);
                  else if (info.offset.x > 60) setIndex((v) => (v - 1 + n) % n);
                }}
                onClick={() => d !== 0 && setIndex(i)}
                aria-hidden={d !== 0}
              >
                <span className="grid size-16 place-items-center rounded-full bg-[linear-gradient(135deg,#7c5cff,#22d3ee)] text-[18px] font-extrabold text-white">
                  {initials(t.name)}
                </span>
                <div className="mt-4 text-[16px] font-extrabold">{t.name}</div>
                <div className="text-[12.5px] font-semibold text-muted">
                  {t.role} · {t.country}
                </div>
                <div className="mt-2 text-[14px] tracking-[2px] text-amber">
                  {"★".repeat(t.rating)}
                  <span className="ml-2 font-mono text-[12px] tracking-normal text-ink-2">{t.rating.toFixed(1)}</span>
                  {t.source ? <span className="ml-2 rounded-full border border-green/40 bg-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-green">{t.source}</span> : null}
                </div>
                <p className="mt-5 max-w-[52ch] text-[16px] italic leading-relaxed text-ink-2">“{t.quote}”</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setIndex((v) => (v - 1 + n) % n)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-line-2 text-white transition hover:border-accent hover:bg-accent">
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-8 bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" : "w-2 bg-white/15 hover:bg-white/30")}
              />
            ))}
          </div>
          <button onClick={() => setIndex((v) => (v + 1) % n)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-line-2 text-white transition hover:border-accent hover:bg-accent">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

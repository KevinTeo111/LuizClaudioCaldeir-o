"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReelSlide } from "@/data/showreel";
import { cn } from "@/lib/utils";
import { ScenePreview } from "./ScenePreview";

/* ------------------------------------------------------------------ */
/* autoplay state                                                       */
/* ------------------------------------------------------------------ */

export function useReel(count: number, slideMs: number) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const last = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const go = useCallback(
    (i: number, d?: number) => {
      const next = ((i % count) + count) % count;
      setDir(d ?? (next > index ? 1 : -1));
      setIndex(next);
      elapsed.current = 0;
      progress.set(0);
    },
    [count, index, progress],
  );

  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      if (last.current == null) last.current = t;
      const dt = t - last.current;
      last.current = t;
      if (!pausedRef.current && document.visibilityState === "visible") {
        elapsed.current += dt;
        const p = Math.min(1, elapsed.current / slideMs);
        progress.set(p);
        if (p >= 1) {
          elapsed.current = 0;
          progress.set(0);
          setDir(1);
          setIndex((i) => (i + 1) % count);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [count, slideMs, progress]);

  const setPaused = useCallback((v: boolean) => {
    pausedRef.current = v;
  }, []);

  return { index, dir, go, next: () => go(index + 1, 1), prev: () => go(index - 1, -1), progress, setPaused };
}

/* ------------------------------------------------------------------ */
/* stage: footage with a diagonal wipe                                  */
/* ------------------------------------------------------------------ */

const ease = [0.76, 0, 0.24, 1] as const;
const WIPE = 1.15;

// four-point polygons so clip-path can interpolate; the edge is slanted like "\"
const wipe = {
  enter: (d: number) =>
    d > 0
      ? { clipPath: "polygon(0% 0%, 0% 0%, -25% 100%, -25% 100%)" }
      : { clipPath: "polygon(125% 0%, 100% 0%, 100% 100%, 100% 100%)" },
  center: (d: number) => ({
    clipPath: d > 0 ? "polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 100%, -25% 100%)",
    transition: { duration: WIPE, ease },
  }),
  exit: {
    scale: 1.08,
    filter: "brightness(0.35)",
    transition: { duration: WIPE, ease },
  },
};

const fade = {
  enter: () => ({ opacity: 0 }),
  center: () => ({ opacity: 1, transition: { duration: 0.8 } }),
  exit: { opacity: 0, transition: { duration: 0.8 } },
};

type StageProps = { slides: ReelSlide[]; index: number; dir: number; slideMs: number; className?: string };

export function ReelStage({ slides, index, dir, slideMs, className }: StageProps) {
  const reduce = useReducedMotion();
  const slide = slides[index];
  const next = slides[(index + 1) % slides.length];
  const variants = reduce ? fade : wipe;

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-bg-3", className)} aria-hidden>
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={slide.key}
          className="absolute inset-0 will-change-[clip-path,transform]"
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* slow push-in for the life of the slide */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.02 }}
            animate={{ scale: reduce ? 1.02 : 1.14 }}
            transition={{ duration: slideMs / 1000 + WIPE, ease: "linear" }}
          >
            {slide.video ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={slide.video}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <ScenePreview scene={slide.scene} className="absolute inset-0" ratio="" />
            )}
          </motion.div>
          {/* colour wash matching the industry accent */}
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{ background: `radial-gradient(70% 60% at 70% 40%, hsl(${slide.hue} 90% 60% / .4), transparent 70%)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* glowing edge that rides the wipe */}
      {!reduce ? (
        <motion.div
          key={`edge-${index}`}
          className="pointer-events-none absolute top-[-20%] h-[140%] w-[3px] bg-[linear-gradient(180deg,transparent,#22d3ee,#7c5cff,transparent)] shadow-[0_0_40px_6px_rgba(124,92,255,.45)]"
          style={{ rotate: 14 }}
          initial={{ left: dir > 0 ? "-30%" : "130%", opacity: 1 }}
          animate={{ left: dir > 0 ? "130%" : "-30%", opacity: [1, 1, 0] }}
          transition={{ duration: WIPE, ease }}
        />
      ) : null}

      {/* warm the next clip */}
      <video className="hidden" src={next.video} preload="auto" muted />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* overlays                                                             */
/* ------------------------------------------------------------------ */

const textEase = [0.22, 1, 0.36, 1] as const;

export function ReelLabel({ slide, index, total }: { slide: ReelSlide; index: number; total: number }) {
  return (
    <div className="relative min-h-[84px] md:min-h-[150px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.key}
          className="absolute inset-x-0 bottom-0 text-left md:text-right"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: textEase }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-2/80">
            Industry {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div
            className="mt-1 text-[clamp(44px,7.4vw,118px)] font-medium leading-[0.95] tracking-[-0.035em] text-white"
            style={{ textShadow: `0 0 60px hsl(${slide.hue} 90% 60% / .55)` }}
          >
            {slide.industry}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ReelCaption({ slide, onOpen }: { slide: ReelSlide; onOpen: () => void }) {
  return (
    <div className="relative min-h-[112px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.key}
          className="absolute inset-x-0 bottom-0 max-w-[440px]"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: textEase, delay: 0.15 }}
        >
          <span className="block truncate font-mono text-[11px] uppercase tracking-[0.24em] text-accent-2">Shipped · {slide.projectTitle}</span>
          <p className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-ink-2">{slide.line}</p>
          <button onClick={onOpen} className="group mt-2 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-white">
            See the case
            <svg viewBox="0 0 24 24" className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type ProgressProps = {
  slides: ReelSlide[];
  index: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Story-style segments: the active one fills as the clip plays. */
export function ReelProgress({ slides, index, progress, onSelect, onPrev, onNext }: ProgressProps) {
  const btn = "grid size-9 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur transition hover:border-accent hover:bg-accent";
  return (
    <div className="flex items-center gap-3">
      <button className={btn} onClick={onPrev} aria-label="Previous industry">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      </button>
      <div className="flex flex-1 items-center gap-1.5" role="tablist" aria-label="Industries">
        {slides.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={i === index}
            aria-label={s.industry}
            onClick={() => onSelect(i)}
            className="group h-6 flex-1"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
              {i === index ? (
                <motion.span className="block h-full origin-left bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" style={{ scaleX: progress }} />
              ) : i < index ? (
                <span className="block h-full bg-white/60" />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <button className={btn} onClick={onNext} aria-label="Next industry">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

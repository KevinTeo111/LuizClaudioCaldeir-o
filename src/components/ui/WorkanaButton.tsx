"use client";

import { motion, useMotionValue, useSpring, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";
import { site } from "@/data/site";
import { cn, initials } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

const sizes = {
  sm: "h-11 pl-1.5 pr-4 text-[13px] gap-2.5",
  md: "h-13 pl-2 pr-6 text-[14.5px] gap-3",
  lg: "h-15 pl-2 pr-7 text-[15.5px] gap-3.5",
};
const marks = { sm: "size-8 text-[11px]", md: "size-9 text-[12px]", lg: "size-11 text-[13px]" };

/**
 * The one call to action that leads to Luiz's Workana profile:
 * a magnetic gradient pill with an animated glow ring, a sheen sweep,
 * his initials as the mark and a live "available" dot.
 */
export function WorkanaButton({ size = "md", label = "Meet Luiz Claudio on Workana", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={site.workana}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center rounded-full font-extrabold tracking-tight text-white select-none",
        "bg-[linear-gradient(92deg,#695efe,#a05dfd_55%,#ff6af8)] shadow-[0_18px_44px_-14px_rgba(105,94,254,.9)]",
        "transition-shadow duration-500 hover:shadow-[0_22px_56px_-12px_rgba(255,106,248,.8)]",
        sizes[size],
        className,
      )}
    >
      {/* breathing glow ring */}
      <span aria-hidden className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-[linear-gradient(92deg,#695efe,#ff6af8)] opacity-60 blur-md [animation:pulse-ring_2.2s_ease-out_infinite]" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/40" />
      {/* sheen sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)] [animation:sheen_3.2s_ease-in-out_infinite]" />
      </span>

      {/* mark */}
      <span className={cn("relative grid shrink-0 place-items-center rounded-full bg-bg/90 font-extrabold text-white ring-2 ring-white/30", marks[size])}>
        {initials(site.fullName)}
        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-bg bg-green">
          <span className="absolute inset-0 rounded-full bg-green [animation:pulse-ring_1.6s_ease-out_infinite]" />
        </span>
      </span>

      <span className="relative whitespace-nowrap">{label}</span>

      <svg viewBox="0 0 24 24" className="relative size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </motion.a>
  );
}

/** Floating version that slides in once the visitor scrolls past the hero. */
export function FloatingWorkana() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > window.innerHeight * 0.9));

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[100] md:bottom-7 md:right-7"
      initial={false}
      animate={show ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      <WorkanaButton size="sm" label="Meet Luiz on Workana" />
    </motion.div>
  );
}

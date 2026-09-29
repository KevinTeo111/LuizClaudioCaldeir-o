"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "line" | "white" | "ghost";

type Props = {
  href?: string;
  variant?: Variant;
  size?: "md" | "sm" | "lg";
  className?: string;
  children: ReactNode;
  target?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  accent:
    "bg-accent text-white shadow-[0_18px_40px_-16px_rgba(124,92,255,.8)] hover:shadow-[0_22px_50px_-14px_rgba(124,92,255,.9)]",
  line: "border border-line-2 text-ink hover:border-accent-2/70 hover:text-white bg-white/[0.02]",
  white: "bg-white text-bg hover:bg-ink-2",
  ghost: "text-ink-2 hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14.5px]",
  lg: "px-8 py-4 text-[15.5px]",
};

/** Pill button with a magnetic hover and a sliding sheen. */
export function Button({
  href,
  variant = "accent",
  size = "md",
  className,
  children,
  target,
  onClick,
  type = "button",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.36);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight",
    "transition-[box-shadow,border-color,background-color,color] duration-500 overflow-hidden select-none",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === "accent" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,.35)_50%,transparent_70%)] transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
        />
      ) : null}
    </>
  );

  const style = { x: sx, y: sy };

  if (href) {
    const external = target === "_blank" || /^https?:/.test(href);
    return (
      <motion.a
        ref={(n) => {
          ref.current = n;
        }}
        href={href}
        target={target}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(n) => {
        ref.current = n;
      }}
      type={type}
      className={classes}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {inner}
    </motion.button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4 transition-transform duration-500 group-hover:translate-x-1", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

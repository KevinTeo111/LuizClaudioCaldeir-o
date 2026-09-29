"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cycles through phases with the given durations (ms) forever.
 * Scenes use it to tell a short looping product story.
 */
export function useLoopPhase(steps: readonly number[], active = true) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    let t = 0;
    const tick = () => {
      t = window.setTimeout(() => {
        i = (i + 1) % steps.length;
        setPhase(i);
        tick();
      }, steps[i]);
    };
    tick();
    return () => window.clearTimeout(t);
  }, [active, steps]);
  return phase;
}

/** Typewriter that restarts whenever `text` (or `runKey`) changes. */
export function useTypewriter(text: string, speed = 22, runKey: string | number = text) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, runKey]);
  return out;
}

/* ---------- tiny presentational atoms shared by scenes ---------- */

export function Chrome({
  url,
  children,
  className,
  dark = true,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden",
        dark ? "bg-[#0c0c16] text-ink" : "bg-[#f6f6f9] text-[#12121c]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-[1cqw] border-b px-[1.6cqw] py-[0.9cqw]",
          dark ? "border-white/[0.06] bg-[#0f0f1a]" : "border-black/[0.06] bg-white",
        )}
      >
        <span className="flex gap-[0.5cqw]">
          <i className="block size-[0.9cqw] rounded-full bg-[#ff5f57]" />
          <i className="block size-[0.9cqw] rounded-full bg-[#febc2e]" />
          <i className="block size-[0.9cqw] rounded-full bg-[#28c840]" />
        </span>
        <span
          className={cn(
            "mx-auto flex w-[46%] items-center gap-[0.8cqw] rounded-full px-[1.2cqw] py-[0.45cqw] font-mono text-[1.05cqw]",
            dark ? "bg-white/[0.05] text-muted" : "bg-black/[0.05] text-black/50",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-[1.1cqw]" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {url}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export function Phone({ children, className, glow }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[3.2cqw] border-[0.35cqw] border-[#1d1d2c] bg-[#0b0b14] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,.8)]",
        glow && "shadow-[0_0_6cqw_-1cqw_rgba(105,94,254,.5)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-[0.9cqw] z-10 h-[1.4cqw] w-[28%] -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}

export function Avatar({ i, size = "2cqw" }: { i: number; size?: string }) {
  const hues = [262, 190, 320, 40, 140, 210];
  const h = hues[i % hues.length];
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${h} 90% 65%), hsl(${h + 40} 90% 50%))`,
      }}
    />
  );
}

export function Cover({ i, className }: { i: number; className?: string }) {
  const hues = [262, 190, 320, 30, 150, 205, 0, 100];
  const h = hues[i % hues.length];
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(140deg, hsl(${h} 80% 60% / .9), hsl(${h + 50} 80% 45% / .9))`,
      }}
    >
      <span
        className="absolute rounded-full bg-white/25 blur-[1cqw]"
        style={{ width: "60%", height: "60%", right: "-15%", top: "-15%" }}
      />
      <span
        className="absolute rounded-[20%] bg-black/20"
        style={{ width: "34%", height: "34%", left: "12%", bottom: "12%", transform: "rotate(12deg)" }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "green" | "amber" | "pink";
  className?: string;
}) {
  const tones = {
    muted: "bg-white/[0.06] text-ink-2",
    accent: "bg-accent/20 text-[#c4b5ff]",
    green: "bg-green/15 text-green",
    amber: "bg-amber/15 text-amber",
    pink: "bg-pink/15 text-pink",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.4cqw] rounded-full px-[0.9cqw] py-[0.3cqw] text-[0.95cqw] font-bold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-[1.2cqw]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

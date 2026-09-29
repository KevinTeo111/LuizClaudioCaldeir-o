"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  tilt?: number;
  /** lift on hover in px */
  lift?: number;
  spotlight?: boolean;
  as?: "div" | "article" | "a";
  href?: string;
  target?: string;
};

/**
 * Card that tilts toward the cursor with a moving light spot,
 * the "screen transform" hover used across services, projects and skills.
 */
export function TiltCard({
  children,
  className,
  tilt = 8,
  lift = 8,
  spotlight = true,
  as = "div",
  href,
  target,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rx = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), { stiffness: 200, damping: 20 });
  const ty = useSpring(useTransform(hover, [0, 1], [0, -lift]), { stiffness: 200, damping: 20 });
  const mx = useTransform(px, (v) => `${v * 100}%`);
  const my = useTransform(py, (v) => `${v * 100}%`);
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx} ${my}, rgba(124,92,255,.18), rgba(34,211,238,.06) 40%, transparent 70%)`;
  const spotOpacity = useSpring(hover, { stiffness: 200, damping: 25 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = () => hover.set(1);
  const onLeave = () => {
    hover.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  const Comp = motion[as];

  return (
    <div className="[perspective:1200px]" ref={ref}>
      <Comp
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, y: ty, transformStyle: "preserve-3d" }}
        className={cn("relative will-change-transform", className)}
      >
        {spotlight ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
            style={{ background: spot, opacity: spotOpacity }}
          />
        ) : null}
        {children}
      </Comp>
    </div>
  );
}

"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};
const finePointer = () =>
  window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Soft cursor glow that follows the pointer and swells over interactive
 * elements. Only mounts on devices with a fine pointer.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribeNoop, finePointer, () => false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block" style={{ x: sx, y: sy }}>
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(105,94,254,.45),rgba(255,106,248,.18)_45%,transparent_70%)] mix-blend-screen"
        animate={{ width: active ? 140 : 56, height: active ? 140 : 56, opacity: active ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

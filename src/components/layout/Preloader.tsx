"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/providers/Intro";
import { useLenis } from "@/components/providers/SmoothScroll";
import { site } from "@/data/site";

const letters = site.name.split("");

/**
 * Intro curtain: name letters rise, a counter runs to 100, then two
 * panels wipe away (the kaho-enterprise style reveal) and the hero begins.
 */
export function Preloader() {
  const { setReady } = useIntro();
  const lenis = useLenis();
  const [done, setDone] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  // hold the page still while the curtain is up
  useEffect(() => {
    if (done) lenis?.start();
    else lenis?.stop();
  }, [lenis, done]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
    });
    const t = setTimeout(() => {
      setDone(true);
      setReady(true);
    }, 1900);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [setReady]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[400] overflow-hidden"
          aria-hidden
          exit={{ pointerEvents: "none" }}
        >
          {/* two curtain panels */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-bg-2"
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-bg-2"
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          />
          {/* accent sweep */}
          <motion.div
            className="absolute inset-0 origin-left bg-[linear-gradient(92deg,#7c5cff,#22d3ee)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1], originX: [0, 0, 1] }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 1.4, times: [0, 0.5, 1], ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
            style={{ mixBlendMode: "screen", opacity: 0.35 }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center"
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex overflow-hidden text-[clamp(56px,12vw,150px)] font-extrabold leading-none tracking-[-0.05em]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", rotate: 6, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
              <motion.span
                className="text-grad inline-block"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + letters.length * 0.07, type: "spring", stiffness: 300, damping: 14 }}
              >
                .
              </motion.span>
            </div>
            <motion.div
              className="mt-6 flex items-center gap-4 font-mono text-[13px] uppercase tracking-[0.3em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>{site.role}</span>
              <span className="h-px w-10 bg-line-2" />
              <span ref={counterRef} className="tabular-nums text-ink">
                000
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

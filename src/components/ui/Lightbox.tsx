"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

type Props = {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  caption?: string;
  children: ReactNode;
};

/** Full-screen modal with keyboard navigation; pauses smooth scrolling while open. */
export function Lightbox({ open, onClose, onPrev, onNext, caption, children }: Props) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, onClose, onPrev, onNext, lenis]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(5,5,12,.88)] p-[4vh_4vw] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-full max-w-full"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>

          {caption ? (
            <span className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-line-2 bg-bg-2/90 px-6 py-2.5 text-[13px] font-bold text-ink">
              {caption}
            </span>
          ) : null}

          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-6 top-6 grid size-12 place-items-center rounded-full border border-line-2 bg-bg-2/80 text-xl text-white transition hover:border-accent hover:bg-accent"
          >
            ×
          </button>
          {onPrev ? (
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg-2/80 text-white transition hover:border-accent hover:bg-accent md:left-6"
            >
              ←
            </button>
          ) : null}
          {onNext ? (
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg-2/80 text-white transition hover:border-accent hover:bg-accent md:right-6"
            >
              →
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

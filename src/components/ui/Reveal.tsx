"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";
import { easeOutExpo } from "@/lib/utils";

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  header: motion.header,
  figure: motion.figure,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
  as?: Tag;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  stagger?: number;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Scroll-triggered entrance. Direct <RevealItem> children animate in sequence.
 */
export function Reveal({ as = "div", delay = 0, y = 32, once = true, amount = 0.2, stagger = 0.08, className, children }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = tags[as];

  const parent: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: easeOutExpo,
        delay,
        staggerChildren: stagger,
        delayChildren: delay + 0.05,
      },
    },
  };

  return (
    <MotionTag className={className} variants={parent} initial="hidden" whileInView="show" viewport={{ once, amount }}>
      {children}
    </MotionTag>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOutExpo } },
};

export function RevealItem({ className, children, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
  return (
    <motion.div className={className} variants={revealItem} {...rest}>
      {children}
    </motion.div>
  );
}

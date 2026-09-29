"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [tab, setTab] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === tab)!;

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,92,255,.12),transparent_70%)]" />
      <div className="wrap">
        <SectionHeader
          kicker="Skills & tools"
          title={
            <>
              The stack I <span className="text-grad">ship with.</span>
            </>
          }
          sub="A modern, production-proven toolkit. The right technology for each product, front to back."
        />

        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Skill areas">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={tab === g.id}
              onClick={() => setTab(g.id)}
              className={cn(
                "relative rounded-full border px-6 py-3 text-[14px] font-bold transition-colors duration-500",
                tab === g.id ? "border-accent text-white" : "border-line-2 text-muted hover:border-accent-2/60 hover:text-ink",
              )}
            >
              {tab === g.id ? <motion.span layoutId="skill-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 30 }} /> : null}
              <span className="relative">{g.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-6 max-w-[60ch] text-[15px] font-medium text-muted">{group.blurb}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {group.skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard tilt={9} lift={6} className="grad-border flex h-full flex-col items-center rounded-[var(--r-s)] border border-line bg-bg-2 px-3 py-6 text-center">
                    <span className="grid size-16 place-items-center rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                      <BrandIcon slug={s.icon} label={s.name} className="size-9" color />
                    </span>
                    <h4 className="mt-4 text-[14px] font-bold text-ink-2">{s.name}</h4>
                    <div className="mt-3 flex gap-1" aria-label={`Proficiency ${s.level} of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <motion.span
                          key={n}
                          className={cn("h-1 w-4 rounded-full", n <= s.level ? "bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" : "bg-white/10")}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + i * 0.04 + n * 0.05, duration: 0.4 }}
                          style={{ originX: 0 }}
                        />
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

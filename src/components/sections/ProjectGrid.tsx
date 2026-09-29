"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ScenePreview } from "@/components/showreel/ScenePreview";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { projectFilters, projects, type Project, type SceneKey } from "@/data/projects";
import { cn } from "@/lib/utils";

const hues: Record<SceneKey, [number, number]> = {
  dashboard: [262, 200],
  commerce: [320, 20],
  realtime: [190, 262],
  mobile: [200, 150],
  ai: [280, 330],
  editorial: [35, 10],
};

/** Abstract cover generated from the scene key, used by the grid cards. */
function Cover({ scene }: { scene: SceneKey }) {
  const [a, b] = hues[scene];
  return (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
      style={{ background: `linear-gradient(140deg, hsl(${a} 70% 22%), hsl(${b} 70% 14%))` }}
    >
      <span className="absolute -right-[10%] -top-[30%] size-[70%] rounded-full opacity-70 blur-2xl" style={{ background: `hsl(${a} 90% 60% / .55)` }} />
      <span className="absolute -bottom-[25%] left-[10%] size-[55%] rounded-full opacity-60 blur-2xl" style={{ background: `hsl(${b} 90% 55% / .45)` }} />
      <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full opacity-70" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1">
        {scene === "dashboard" && <path d="M20 90 L60 60 L95 75 L135 40 L180 30" strokeWidth="2" />}
        {scene === "commerce" && (
          <>
            <rect x="30" y="30" width="40" height="50" rx="4" />
            <rect x="80" y="30" width="40" height="50" rx="4" />
            <rect x="130" y="30" width="40" height="50" rx="4" />
          </>
        )}
        {scene === "realtime" && (
          <>
            <circle cx="50" cy="60" r="14" />
            <circle cx="150" cy="60" r="14" />
            <path d="M64 60 H136" strokeDasharray="4 4" />
          </>
        )}
        {scene === "mobile" && <rect x="80" y="18" width="40" height="84" rx="8" strokeWidth="2" />}
        {scene === "ai" && (
          <>
            <path d="M40 60 h30 M130 60 h30" />
            <rect x="70" y="40" width="60" height="40" rx="8" strokeWidth="2" />
          </>
        )}
        {scene === "editorial" && (
          <>
            <path d="M30 40 h140 M30 55 h100 M30 70 h120" strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
}

export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "all" || p.category.includes(filter));

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="More projects"
          title={
            <>
              Across industries, <span className="text-grad">one standard.</span>
            </>
          }
          sub="Filter by type. Open a card to see the challenge, the result and a live demo of the product category."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-[13.5px] font-bold transition-colors duration-500",
                filter === f.id ? "border-accent text-white" : "border-line-2 text-muted hover:border-accent-2/60 hover:text-ink",
              )}
            >
              {filter === f.id ? <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 30 }} /> : null}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard tilt={7} className="group grad-border h-full overflow-hidden rounded-[var(--r-m)] border border-line bg-bg-2">
                  <button onClick={() => setOpen(p)} className="flex h-full w-full flex-col text-left" aria-label={`Open ${p.title}`}>
                    <div className="relative h-[190px] w-full overflow-hidden">
                      <Cover scene={p.scene} />
                      <div className="absolute inset-0 bg-[linear-gradient(200deg,transparent_20%,rgba(7,7,13,.85)_95%)]" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                        {p.kicker}
                      </span>
                      <div className="absolute bottom-4 left-4">
                        <b className="block text-[32px] font-extrabold leading-none tracking-tight text-white">{p.metric.value}</b>
                        <span className="text-[12px] font-semibold text-ink-2/80">{p.metric.label}</span>
                      </div>
                      <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 bg-bg/60 text-white opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100">
                        ⤢
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[17px] font-extrabold leading-tight tracking-tight">{p.title}</h3>
                      <p className="mt-2 line-clamp-3 text-[13.5px] font-medium text-muted">{p.summary}</p>
                      <span className="mt-auto pt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">
                        {p.stack.slice(0, 3).join(" · ")} · {p.year}
                      </span>
                    </div>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox open={!!open} onClose={() => setOpen(null)}>
        {open ? (
          <div className="grid max-h-[88vh] w-[min(1100px,92vw)] overflow-y-auto rounded-[var(--r-l)] border border-line-2 bg-bg-2 md:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col p-7 md:p-9">
              <span className="kicker self-start">{open.kicker}</span>
              <h3 className="mt-5 text-[clamp(24px,2.4vw,32px)] font-extrabold leading-tight tracking-tight">{open.title}</h3>
              <p className="mt-3 text-[14.5px] font-medium text-muted">{open.summary}</p>
              <dl className="mt-5 text-[13.5px]">
                <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">Challenge</dt>
                <dd className="mt-1 text-ink-2">{open.problem}</dd>
                <dt className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-2">Result</dt>
                <dd className="mt-1 text-ink-2">{open.result}</dd>
              </dl>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {open.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line-2 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-2">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <b className="text-grad text-[36px] font-extrabold leading-none tracking-tight">{open.metric.value}</b>
                <span className="ml-2 text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{open.metric.label}</span>
              </div>
            </div>
            <div className="bg-bg-3 p-4 md:p-6">
              <ScenePreview scene={open.scene} video={open.video} className="rounded-2xl border border-line-2" />
            </div>
          </div>
        ) : null}
      </Lightbox>
    </section>
  );
}

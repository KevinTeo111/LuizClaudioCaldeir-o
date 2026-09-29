"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ScenePreview } from "@/components/showreel/ScenePreview";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectFilters, projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Filterable case grid (image, metric, title, summary, meta); a card opens the full case with its live demo. */
export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "all" || p.category.includes(filter));

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Projects"
          title={
            <>
              Web projects I&apos;ve <span className="text-grad">shipped.</span>
            </>
          }
          sub="Designed, built, tested and launched end to end. Filter by type, open a card for the case and a live demo."
        />

        <div className="mt-9 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full border-[1.5px] px-6 py-2.5 text-[13.5px] font-bold transition-colors duration-500",
                filter === f.id ? "border-accent text-white" : "border-line text-muted hover:border-accent-2 hover:text-ink",
              )}
            >
              {filter === f.id ? <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 30 }} /> : null}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-9 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.a
                key={p.slug}
                id={`work-${p.slug}`}
                href={p.href ?? "#"}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(p);
                }}
                className="group flex flex-col overflow-hidden rounded-[var(--r-m)] border border-line bg-bg-2 transition duration-[.35s] hover:-translate-y-1.5 hover:border-accent hover:shadow-[var(--shadow)]"
              >
                <div className="relative h-[210px] overflow-hidden bg-bg-3">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.07]" style={{ backgroundImage: `url(${p.image})` }} />
                  <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(22,22,38,.05)_0%,rgba(22,22,38,.82)_88%)]" />
                  <span className="absolute left-4.5 top-4 z-[2] rounded-full border border-white/25 bg-accent/35 px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">{p.tag}</span>
                  <div className="absolute bottom-4 left-5 z-[2]">
                    <b className="block bg-[linear-gradient(92deg,#fff,#d9d7ff)] bg-clip-text text-[38px] font-black leading-none tracking-tight text-transparent">{p.metric.value}</b>
                    <span className="mt-1.5 block max-w-[240px] text-[12.5px] font-semibold text-muted">{p.metric.label}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[17px] font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] font-medium text-muted">{p.summary}</p>
                  <span className="mt-auto pt-4 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-muted-2">{p.meta}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox open={!!open} onClose={() => setOpen(null)}>
        {open ? (
          <div className="grid max-h-[88vh] w-[min(1100px,92vw)] overflow-y-auto rounded-[var(--r-l)] border border-line bg-bg-2 md:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col p-7 md:p-9">
              <span className="kicker self-start">{open.tag}</span>
              <h3 className="mt-5 text-[clamp(24px,2.4vw,32px)] font-extrabold leading-tight">{open.title}</h3>
              <p className="mt-3 text-[14.5px] font-medium text-muted">{open.summary}</p>
              <dl className="mt-5 text-[13.5px]">
                <dt className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-2">Challenge</dt>
                <dd className="mt-1 text-ink-2">{open.problem}</dd>
                <dt className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-2">Result</dt>
                <dd className="mt-1 text-ink-2">{open.result}</dd>
              </dl>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {open.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11.5px] font-bold text-ink-2">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <b className="text-grad text-[36px] font-black leading-none">{open.metric.value}</b>
                <span className="ml-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">{open.metric.label}</span>
              </div>
            </div>
            <div className="bg-bg-3 p-4 md:p-6">
              <ScenePreview scene={open.scene} video={open.video} className="rounded-2xl border border-line" />
            </div>
          </div>
        ) : null}
      </Lightbox>
    </section>
  );
}

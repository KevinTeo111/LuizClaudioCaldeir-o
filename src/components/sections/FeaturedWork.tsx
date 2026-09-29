"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScenePreview } from "@/components/showreel/ScenePreview";
import { ArrowIcon } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { featuredProjects, type Project } from "@/data/projects";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Sticky stack: each project card pins near the top and the next one
 * slides over it while the pinned card recedes (scale + dim), the
 * overlapping effect from the reference sites.
 */
export function FeaturedWork() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Selected work"
          title={
            <>
              Products I&apos;ve <span className="text-grad">shipped.</span>
            </>
          }
          sub="Every card runs a live, coded demo of the product type, not a screenshot. Scroll to stack them."
        />
        <div className="mt-14 flex flex-col gap-6">
          {featuredProjects.map((p, i) => (
            <StackCard key={p.slug} project={p} index={i} total={featuredProjects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96px", "end 96px"] });
  const recede = desktop && index !== total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, recede ? 0.9 : 1]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, recede ? 0.45 : 1]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);
  const y = useTransform(scrollYProgress, [0, 1], [0, recede ? -24 : 0]);

  return (
    <div ref={ref} id={`work-${project.slug}`} className="md:h-[92svh]">
      <motion.article
        style={{ scale, filter, y, top: desktop ? 96 + index * 10 : undefined }}
        className="grad-border is-on origin-top overflow-hidden rounded-[var(--r-l)] border border-line bg-bg-2 shadow-[var(--shadow)] md:sticky"
      >
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col p-7 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="kicker">{project.kicker}</span>
              <span className="font-mono text-[12px] text-muted-2">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.year}
              </span>
            </div>
            <h3 className="mt-7 text-[clamp(26px,2.6vw,38px)] font-extrabold leading-[1.05] tracking-tight">{project.title}</h3>
            <p className="mt-4 text-[15px] font-medium text-muted">{project.summary}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="rounded-2xl border border-line bg-bg-3 px-5 py-4">
                <b className="text-grad block text-[clamp(30px,3vw,44px)] font-extrabold leading-none tracking-tight">{project.metric.value}</b>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{project.metric.label}</span>
              </div>
              <dl className="text-[13.5px]">
                <dt className="font-bold uppercase tracking-[0.12em] text-[11px] text-muted-2">Challenge</dt>
                <dd className="mt-1 text-ink-2">{project.problem}</dd>
                <dt className="mt-3 font-bold uppercase tracking-[0.12em] text-[11px] text-muted-2">Result</dt>
                <dd className="mt-1 text-ink-2">{project.result}</dd>
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="rounded-full border border-line-2 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-2">
                  {t}
                </span>
              ))}
            </div>

            {project.href ? (
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="group mt-auto inline-flex items-center gap-2 pt-8 text-[14.5px] font-extrabold text-accent-2 hover:text-white">
                Visit project <ArrowIcon />
              </a>
            ) : null}
          </div>

          <div className="relative bg-bg-3 p-4 md:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_20%,rgba(124,92,255,.18),transparent_60%)]" />
            <TiltCard tilt={4} lift={4} spotlight={false} className="relative">
              <ScenePreview scene={project.scene} video={project.video} className="rounded-2xl border border-line-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]" />
            </TiltCard>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { designShow } from "@/data/projects";

/**
 * Sticky stack of shipped interfaces riding over a looping background video
 * (the reference's "design show"): each card pins under the header while the
 * next slides over it; any card opens full-screen with prev/next.
 */
export function DesignShow() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const [idx, setIdx] = useState<number | null>(null);
  const n = designShow.length;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <section id="designshow" ref={ref} className="relative py-24 md:py-32">
      {/* sticky viewport-tall video layer with readability overlay and soft edge fades */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="sticky top-0 h-svh overflow-hidden">
          <video ref={video} className="absolute inset-0 h-full w-full object-cover" src="/fancy-background.mp4" muted loop playsInline preload="none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,22,38,.72),rgba(22,22,38,.72)),radial-gradient(1000px_500px_at_80%_8%,rgba(105,94,254,.22),transparent_60%)]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(var(--bg),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(transparent,var(--bg))]" />
      </div>

      <div className="wrap relative z-[1]">
        <SectionHeader
          kicker="Design Show"
          title={
            <>
              Designs that make users <span className="text-grad">stare.</span>
            </>
          }
          sub="Real interfaces I've designed and shipped. Click any piece to view it full-screen."
        />

        <div className="mt-14 flex flex-col gap-8">
          {designShow.map((d, i) => (
            <Reveal key={d.title} amount={0.15}>
              <RevealItem>
                <figure
                  onClick={() => setIdx(i)}
                  className="group relative cursor-zoom-in overflow-hidden rounded-[var(--r-m)] border border-line bg-bg-2 shadow-[0_-24px_60px_-30px_rgba(0,0,0,.75)] transition-colors hover:border-accent md:sticky md:top-24"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.title} loading="lazy" className="h-[54vw] min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[min(76vh,640px)]" />
                  <figcaption className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-accent/85 px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-white">{d.kicker}</span>
                    <span className="rounded-full border border-white/20 bg-[rgba(16,16,29,.78)] px-4.5 py-2 text-[13px] font-extrabold text-white backdrop-blur">{d.title}</span>
                  </figcaption>
                  <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/20 bg-[rgba(16,16,29,.72)] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">⤢</span>
                </figure>
              </RevealItem>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        open={idx !== null}
        onClose={() => setIdx(null)}
        onPrev={() => setIdx((i) => (i === null ? null : (i - 1 + n) % n))}
        onNext={() => setIdx((i) => (i === null ? null : (i + 1) % n))}
        caption={idx !== null ? designShow[idx].title : undefined}
      >
        {idx !== null ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={designShow[idx].image} alt={designShow[idx].title} className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,.6)]" />
        ) : null}
      </Lightbox>
    </section>
  );
}

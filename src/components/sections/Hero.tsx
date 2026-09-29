"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useIntro } from "@/components/providers/Intro";
import { useLenis } from "@/components/providers/SmoothScroll";
import { ReelCaption, ReelLabel, ReelProgress, ReelStage, useReel } from "@/components/showreel/IndustryReel";
import { Button } from "@/components/ui/Button";
import { WorkanaButton } from "@/components/ui/WorkanaButton";
import { Counter } from "@/components/ui/Counter";
import { projects } from "@/data/projects";
import { reel } from "@/data/showreel";
import { heroStats, site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6500;

/**
 * Full-bleed hero. After the preloader the stage rises from a tilted card
 * into the viewport, then plays real-world footage of each industry Luiz
 * has shipped for, wiping diagonally between them with the project named
 * on every clip. Copy stays fixed in the centre, stats sit on the bottom edge.
 */
export function Hero() {
  const { ready } = useIntro();
  const lenis = useLenis();
  const r = useReel(reel.length, SLIDE_MS);
  const slide = reel[r.index];
  const image = projects.find((p) => p.slug === slide.project)?.image;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const openCase = () => lenis?.scrollTo(`#work-${slide.project}`, { offset: -140, duration: 1.6 });

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-bg [perspective:1600px]">
      {/* footage layer */}
      <motion.div
        className="absolute inset-0 origin-center overflow-hidden will-change-transform"
        initial={{ opacity: 0, scale: 0.82, rotateX: 14, y: 120, borderRadius: 40 }}
        animate={ready ? { opacity: 1, scale: 1, rotateX: 0, y: 0, borderRadius: 0 } : {}}
        transition={{ duration: 1.6, ease }}
        onHoverStart={() => r.setPaused(true)}
        onHoverEnd={() => r.setPaused(false)}
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <ReelStage slides={reel} index={r.index} dir={r.dir} slideMs={SLIDE_MS} />
        </motion.div>
        {/* legibility: dark wash, vignette, blueprint grid on the copy side */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_45%,rgba(7,7,13,.62),rgba(7,7,13,.78)_70%,rgba(7,7,13,.92))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,13,.7)_0%,transparent_30%,transparent_55%,rgba(7,7,13,.96)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(100deg,#000_0%,#000_30%,transparent_60%)]" />
        <div className="noise pointer-events-none absolute inset-0" />
      </motion.div>

      {/* copy */}
      <motion.div className="wrap relative z-10 flex min-h-[100svh] flex-col pt-[96px] pb-8" style={{ opacity: fade }}>
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <motion.span
            className="kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            {site.fullName} · {site.role}
            <span className="hidden lg:inline"> · {site.availability}</span>
          </motion.span>

          <h1 className="mt-6 text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[0.98] tracking-[-0.04em]">
            {["From idea", "to live."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={i === 1 ? "text-grad inline-block" : "inline-block"}
                  initial={{ y: "110%", rotate: 2 }}
                  animate={ready ? { y: 0, rotate: 0 } : {}}
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-5 max-w-[600px] text-[clamp(15px,1.2vw,17px)] font-medium text-ink-2"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.95, ease }}
          >
            Wonderful design, seamless performance, 2.5× faster delivery. I design and build web products
            that ship: UI/UX, web development, SaaS and e-commerce.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1, ease }}
          >
            <WorkanaButton size="lg" />
            <Button href="#projects" variant="line" size="lg">
              Explore the work
            </Button>
          </motion.div>
        </div>

        {/* showreel overlays: project caption · progress · industry label */}
        <motion.div
          className="grid items-end gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4, ease }}
        >
          <div className="order-2 md:order-1">
            <ReelCaption slide={slide} image={image} onOpen={openCase} />
          </div>
          <div className="order-1 md:order-2">
            <ReelLabel slide={slide} index={r.index} total={reel.length} />
          </div>
          <div className="order-3 md:col-span-2">
            <ReelProgress slides={reel} index={r.index} progress={r.progress} onSelect={(i) => r.go(i)} onPrev={r.prev} onNext={r.next} />
          </div>
        </motion.div>

        {/* stats on the bottom edge */}
        <motion.div
          className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6, ease }}
        >
          {heroStats.map((s) => (
            <div key={s.label} className="glass rounded-[var(--r-s)] px-5 py-4 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-accent/20">
              <b className="block text-[clamp(26px,2.6vw,38px)] font-extrabold leading-none tracking-tight">
                <Counter value={s.value} decimals={Number.isInteger(s.value) ? 0 : 1} />
                <em className="text-grad not-italic">{s.suffix}</em>
              </b>
              <span className="mt-1.5 block text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-2/80">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

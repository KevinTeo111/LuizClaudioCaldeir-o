"use client";

import { useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { certifications, type Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

const spans: Record<Certification["size"], string> = {
  lg: "md:col-span-7",
  md: "md:col-span-5",
  sm: "md:col-span-4",
};

/** Credential card rendered from data (issuer mark, title, id) with a holographic sheen. */
function CertCard({ c, large = false }: { c: Certification; large?: boolean }) {
  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[var(--r-m)] border border-line bg-bg-2", large ? "p-9 md:p-12" : "p-6 md:p-7")}>
      {/* holo sheen */}
      <span className="pointer-events-none absolute -inset-1 bg-[conic-gradient(from_200deg_at_80%_0%,rgba(124,92,255,.22),rgba(34,211,238,.14),rgba(255,79,216,.14),transparent_60%)] opacity-70" />
      <span className="pointer-events-none absolute inset-0 shimmer opacity-40" />
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.image} alt={c.title} className="relative mb-5 w-full rounded-xl border border-line-2 object-cover" />
      ) : null}
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/[0.08]">
          <BrandIcon slug={c.issuerId} label={c.issuer} className="size-7" color />
        </span>
        <span className="rounded-full border border-line-2 px-3 py-1 font-mono text-[11px] text-muted">{c.date}</span>
      </div>
      <div className="relative mt-6">
        <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent-2">{c.issuer}</div>
        <h3 className={cn("mt-1.5 font-extrabold leading-tight tracking-tight", large ? "text-[clamp(22px,2.2vw,30px)]" : "text-[18px]")}>{c.title}</h3>
      </div>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {c.skills.map((s) => (
          <span key={s} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">
            {s}
          </span>
        ))}
      </div>
      <div className="relative mt-auto flex items-end justify-between gap-3 pt-6">
        <span className="font-mono text-[11px] text-muted-2">
          ID · {c.credentialId ?? "—"}
        </span>
        {c.verifyUrl ? (
          <a
            href={c.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[12.5px] font-extrabold text-pink hover:text-white"
          >
            Verify credential →
          </a>
        ) : null}
      </div>
      {c.placeholder ? (
        <span className="absolute -right-10 top-5 rotate-45 bg-amber px-12 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-bg">
          sample
        </span>
      ) : null}
    </div>
  );
}

export function Certifications() {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null ? certifications[idx] : null;

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Certifications"
          title={
            <>
              Verified <span className="text-grad">credentials.</span>
            </>
          }
          sub="Click any credential to enlarge it. Each one links to its issuer's verification page."
        />

        <Reveal className="mt-14 grid gap-4 md:grid-cols-12" amount={0.1} stagger={0.08}>
          {certifications.map((c, i) => (
            <RevealItem key={c.title} className={cn("h-full", spans[c.size])}>
              <TiltCard tilt={5} lift={6} className="h-full cursor-zoom-in rounded-[var(--r-m)]" as="div">
                <div onClick={() => setIdx(i)} className="h-full" role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setIdx(i)}>
                  <CertCard c={c} />
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      <Lightbox
        open={open !== null}
        onClose={() => setIdx(null)}
        onPrev={() => setIdx((i) => (i === null ? null : (i - 1 + certifications.length) % certifications.length))}
        onNext={() => setIdx((i) => (i === null ? null : (i + 1) % certifications.length))}
        caption={open?.title}
      >
        {open ? (
          <div className="w-[min(760px,90vw)]">
            <CertCard c={open} large />
          </div>
        ) : null}
      </Lightbox>
    </section>
  );
}

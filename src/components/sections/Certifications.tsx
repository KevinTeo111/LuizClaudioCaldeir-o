"use client";

import { useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, type Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

/** Asymmetric mosaic: 12 columns, 52px rows, tiles spanning 8/6/4 columns like the reference. */
const spans: Record<Certification["size"], string> = {
  lg: "md:[grid-column:span_8] md:[grid-row:span_6]",
  md: "md:[grid-column:span_6] md:[grid-row:span_6]",
  sm: "md:[grid-column:span_4] md:[grid-row:span_6]",
};

/** Certificate face: the real image when one exists, otherwise a document rendered from the credential data. */
function CertFace({ c, large = false }: { c: Certification; large?: boolean }) {
  if (c.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />;
  }
  return (
    <div className={cn("absolute inset-0 flex flex-col bg-[linear-gradient(160deg,#ffffff,#eef0fa)] text-[#27273d]", large ? "p-10" : "p-6")}>
      <div className="absolute inset-3 rounded-lg border border-[#c9c9e0]" />
      <div className="absolute inset-4 rounded-md border border-[#e4e4ef]" />
      <div className="relative flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,128,.08)]">
          <BrandIcon slug={c.issuerId} label={c.issuer} className="size-7" color />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7e7ea6]">{c.issuer}</span>
      </div>
      <div className="relative mt-auto">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">Certificate of completion</div>
        <div className={cn("mt-1.5 font-black leading-tight", large ? "text-[30px]" : "text-[18px]")}>{c.title}</div>
        <div className="mt-2 text-[12px] font-semibold text-[#6f6f90]">
          Issued {c.date} · ID {c.credentialId ?? "—"}
        </div>
      </div>
      {c.placeholder ? <span className="absolute left-1/2 top-6 -translate-x-1/2 bg-amber px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#27273d]">sample</span> : null}
    </div>
  );
}

export function Certifications() {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null ? certifications[idx] : null;

  return (
    <section id="certifications" className="light relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Certifications"
          title={
            <>
              Verified <span className="text-grad">credentials.</span>
            </>
          }
          sub="Click any certificate to view it full size. Each one links to the issuer's verification page."
        />

        <Reveal className="mt-13 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:[grid-auto-rows:52px]" amount={0.1} stagger={0.08}>
          {certifications.map((c, i) => (
            <RevealItem key={c.title} className={cn("aspect-[3/2] md:aspect-auto", spans[c.size])}>
              <figure
                onClick={() => setIdx(i)}
                className="group relative h-full w-full cursor-zoom-in overflow-hidden rounded-[var(--r-s)] border border-line bg-bg-2 transition duration-[.35s] hover:z-[2] hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow)]"
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                  <CertFace c={c} />
                </div>
                <figcaption className="absolute bottom-3 left-3 z-[2] max-w-[calc(100%-24px)] truncate rounded-full border border-white/15 bg-[rgba(16,16,29,.72)] px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white backdrop-blur">
                  {c.title}
                </figcaption>
              </figure>
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
          <div className="relative aspect-[3/2] w-[min(960px,92vw)] overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,.6)]">
            <CertFace c={open} large />
            {open.verifyUrl ? (
              <a href={open.verifyUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 rounded-full bg-accent px-4 py-2 text-[12.5px] font-extrabold text-white">
                Verify credential →
              </a>
            ) : null}
          </div>
        ) : null}
      </Lightbox>
    </section>
  );
}

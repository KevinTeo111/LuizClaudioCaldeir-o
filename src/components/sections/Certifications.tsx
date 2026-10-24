"use client";

import { useId, useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, type Certification } from "@/data/certifications";
import { resolveIcon } from "@/lib/icons";

const GOLD = "#e8b931";

/** Scalloped rosette outline for the seal, as an SVG polygon on a 100×100 box. */
const SEAL_POINTS = Array.from({ length: 64 }, (_, i) => {
  const a = (i / 64) * Math.PI * 2;
  const r = i % 2 ? 44.5 : 48;
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

/** Gold certification seal: issuer label on a ribbon band, year underneath. */
function CertSeal({ label, year }: { label: string; year: string }) {
  const id = useId().replace(/:/g, "");
  const long = label.length > 7;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0.8cqw_1.6cqw_rgba(0,0,0,.55)]" aria-hidden>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe7a1" />
          <stop offset=".45" stopColor="#d9a520" />
          <stop offset="1" stopColor="#8a5a0b" />
        </linearGradient>
        <radialGradient id={`${id}c`} cx=".5" cy=".35" r=".7">
          <stop offset="0" stopColor="#5a4520" />
          <stop offset="1" stopColor="#2a1f0c" />
        </radialGradient>
      </defs>
      <polygon points={SEAL_POINTS} fill={`url(#${id}g)`} />
      <circle cx="50" cy="50" r="38" fill={`url(#${id}c)`} stroke="#f6d77a" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#f6d77a" strokeOpacity=".45" strokeWidth=".8" strokeDasharray="1.5 2" />
      <text x="50" y="31" textAnchor="middle" fontSize="5.2" fontWeight="800" letterSpacing=".8" fill="#f6d77a">
        CERTIFIED
      </text>
      <path d="M4 42h92l-5 8 5 8H4l5-8z" fill={`url(#${id}g)`} stroke="#7a4f08" strokeWidth=".6" />
      <text
        x="50"
        y="53.6"
        textAnchor="middle"
        fontSize={long ? 9 : 11}
        fontWeight="900"
        fontStyle="italic"
        fill="#2a1f0c"
        {...(long ? { textLength: 74, lengthAdjust: "spacingAndGlyphs" } : {})}
      >
        {label}
      </text>
      <text x="50" y="72" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="1" fill="#f6d77a">
        {year}
      </text>
    </svg>
  );
}

/** Certificate face: the real image when one exists, otherwise a styled certificate rendered from the credential data. */
function CertFace({ c }: { c: Certification }) {
  if (c.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={c.image} alt={`${c.title} certificate`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />;
  }
  const brand = `#${resolveIcon(c.issuerId)?.hex ?? "695efe"}`;
  return (
    <div
      className="@container absolute inset-0 overflow-hidden text-white"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 18% 22%, rgba(255,255,255,.5) 0 0.6px, transparent 1.2px)",
          "radial-gradient(circle at 72% 64%, rgba(255,255,255,.35) 0 0.5px, transparent 1px)",
          "linear-gradient(118deg, transparent 38%, rgba(255,255,255,.045) 48%, transparent 58%)",
          `radial-gradient(90% 80% at 100% 0%, ${brand}2e, transparent 60%)`,
          "radial-gradient(70% 70% at 0% 100%, rgba(232,185,49,.08), transparent 60%)",
          "linear-gradient(160deg, #1d1c2e 0%, #121220 55%, #0d0d18 100%)",
        ].join(","),
        backgroundSize: "37px 41px, 53px 47px, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
      }}
    >
      {/* double gold frame */}
      <div className="absolute inset-[2.6cqw] rounded-[1cqw] border-[0.25cqw]" style={{ borderColor: `${GOLD}cc` }} />
      <div className="absolute inset-[3.6cqw] rounded-[0.6cqw] border-[0.12cqw]" style={{ borderColor: `${GOLD}55` }} />
      {/* issuer watermark */}
      <BrandIcon slug={c.issuerId} label={c.issuer} className="pointer-events-none absolute -right-[4cqw] top-1/2 size-[42cqw] -translate-y-1/2 text-white opacity-[.035]" />

      <div className="absolute inset-[6.5cqw] flex flex-col">
        <div className="flex items-start justify-between gap-[3cqw]">
          <div className="flex items-center gap-[1.6cqw]">
            <span className="grid size-[6.6cqw] place-items-center rounded-[1.2cqw] bg-white">
              <BrandIcon slug={c.issuerId} label={c.issuer} className="size-[4.2cqw]" color />
            </span>
            <span className="text-[length:2.5cqw] font-extrabold leading-tight">{c.issuer}</span>
          </div>
          <div className="text-right text-[length:1.8cqw] font-semibold leading-snug text-white/70">
            {c.seal} Certification
            <div className="font-extrabold" style={{ color: GOLD }}>
              {c.level}
            </div>
          </div>
        </div>

        <div className="mt-[3.4cqw] text-center">
          <div className="text-[length:4.6cqw] font-medium uppercase leading-[1.1] tracking-[0.04em]">{c.track} Certification</div>
          <div className="mt-[1.4cqw] text-[length:3.6cqw] font-extrabold" style={{ color: GOLD }}>
            {c.level}
          </div>
          <div className="mx-auto mt-[1.4cqw] max-w-[72%] text-[length:1.75cqw] font-semibold uppercase leading-snug tracking-[0.04em] text-white/80">{c.focus}</div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="size-[15cqw]">
              <CertSeal label={c.seal} year={c.date} />
            </div>
            <div className="mt-[1cqw] text-[length:1.8cqw] font-extrabold" style={{ color: GOLD }}>
              DATE: <span className="text-white">{c.date}</span>
            </div>
          </div>
          <div className="w-[30%] border-t-[0.15cqw] border-white/40 pt-[1cqw] text-center text-[length:1.6cqw] font-semibold leading-snug text-white/70">
            {c.placeholder ? (
              <>
                <span className="font-extrabold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
                  Sample
                </span>
                <br />
                not an issued certificate
              </>
            ) : (
              <>
                Verified by
                <br />
                {c.issuer}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[3px] size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M17 9.2V10a7 7 0 1 1-4.15-6.4" strokeLinecap="round" />
      <path d="m7 9.5 3 3L18 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CertCard({ c, onOpen }: { c: Certification; onOpen: () => void }) {
  return (
    <article className="group flex h-full flex-col rounded-[var(--r-m)] border border-line bg-bg-2 p-4 shadow-[0_0_2px_rgba(0,0,128,.06)] transition duration-[.35s] hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${c.title} certificate`}
        className="relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[var(--r-s)] bg-bg-3 ring-1 ring-line"
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <CertFace c={c} />
        </div>
      </button>

      <div className="mt-5 flex items-center gap-3.5 px-1">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-bg-3">
          <BrandIcon slug={c.issuerId} label={c.issuer} className="size-6" color />
        </span>
        <div className="min-w-0">
          <h3 className="text-[16px] font-extrabold leading-snug text-ink">{c.title}</h3>
          <div className="mt-0.5 text-[13px] font-semibold text-accent">Issued by {c.issuer}</div>
        </div>
      </div>

      <p className="mt-4 px-1 text-[14.5px] leading-relaxed text-muted">{c.description}</p>

      <ul className="mt-4 space-y-2 px-1 pb-1 text-[14px] text-ink-2">
        {c.skills.map((s) => (
          <li key={s} className="flex gap-2.5">
            <CheckIcon />
            {s}
          </li>
        ))}
        <li className="flex gap-2.5">
          <CheckIcon />
          Issued {c.date}
        </li>
      </ul>

      {c.verifyUrl && c.verifyUrl !== "#" ? (
        <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-auto self-start px-1 pt-4 text-[13px] font-extrabold text-accent hover:underline">
          Verify credential →
        </a>
      ) : null}
    </article>
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

        <Reveal className="mt-13 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.1} stagger={0.08}>
          {certifications.map((c, i) => (
            <RevealItem key={c.title}>
              <CertCard c={c} onOpen={() => setIdx(i)} />
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
          <div className="relative aspect-[16/10] w-[min(960px,92vw)] overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,.6)]">
            <CertFace c={open} />
            {open.verifyUrl && open.verifyUrl !== "#" ? (
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

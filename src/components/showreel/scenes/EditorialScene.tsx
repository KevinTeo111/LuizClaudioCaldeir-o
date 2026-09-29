"use client";

import { motion } from "motion/react";
import { Chrome } from "./shared";

const gauges = [
  ["Performance", 100],
  ["Accessibility", 100],
  ["Best practices", 100],
  ["SEO", 100],
] as const;

export function EditorialScene({ active = true }: { active?: boolean }) {
  return (
    <Chrome url="calderwhitlock.law" dark={false}>
      <div className="absolute inset-0 overflow-hidden bg-[#f6f5f1] text-[#14140f]">
        {/* the page slowly scrolls */}
        <motion.div
          className="absolute inset-x-0 top-0"
          animate={{ y: ["0%", "-38%", "-38%", "0%"] }}
          transition={{ duration: 16, repeat: Infinity, times: [0, 0.45, 0.6, 1], ease: "easeInOut" }}
        >
          <header className="flex items-center justify-between px-[3cqw] py-[1.4cqw]">
            <span className="font-serif text-[1.4cqw] font-semibold tracking-tight">Calder &amp; Whitlock</span>
            <nav className="flex gap-[1.6cqw] text-[0.95cqw] font-medium text-black/60">
              {["Practice", "Attorneys", "Insights", "Careers"].map((n) => (
                <span key={n}>{n}</span>
              ))}
              <span className="rounded-full bg-[#14140f] px-[1.1cqw] py-[0.3cqw] text-white">Contact</span>
            </nav>
          </header>

          <section className="grid grid-cols-[1.1fr_1fr] items-center gap-[3cqw] px-[3cqw] pt-[2cqw]">
            <div>
              <motion.span
                className="text-[0.85cqw] font-bold uppercase tracking-[0.2em] text-[#8a6d3b]"
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                Litigation · Corporate · Estates
              </motion.span>
              <h1 className="mt-[0.8cqw] font-serif text-[4.2cqw] leading-[1] tracking-tight">
                {["Counsel that", "reads the", "fine print."].map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: active ? 0 : "100%" }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="mt-[1.2cqw] max-w-[36ch] text-[1.05cqw] leading-relaxed text-black/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                A boutique firm serving founders, families and institutions across three practice areas since 1994.
              </motion.p>
              <motion.div
                className="mt-[1.4cqw] flex gap-[0.8cqw]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 }}
              >
                <span className="rounded-full bg-[#14140f] px-[1.4cqw] py-[0.6cqw] text-[0.95cqw] font-semibold text-white">Book a consultation</span>
                <span className="rounded-full border border-black/15 px-[1.4cqw] py-[0.6cqw] text-[0.95cqw] font-semibold">Our attorneys</span>
              </motion.div>
            </div>
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[1.2cqw] bg-[linear-gradient(160deg,#d9d2c2,#8a6d3b)]"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: active ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-[8%] rounded-[0.8cqw] border border-white/40" />
              <div className="absolute bottom-[10%] left-[10%] font-serif text-[1.4cqw] text-white">Est. 1994</div>
            </motion.div>
          </section>

          <section className="mt-[3cqw] grid grid-cols-3 gap-[1.2cqw] px-[3cqw]">
            {[
              ["01", "Commercial litigation", "Disputes resolved before they reach a courtroom, and won when they do."],
              ["02", "Corporate & M&A", "Formation, financing rounds and exits for growth-stage companies."],
              ["03", "Trusts & estates", "Succession plans that survive the people who wrote them."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-[1cqw] border border-black/10 bg-white p-[1.4cqw]">
                <span className="font-mono text-[0.8cqw] text-[#8a6d3b]">{n}</span>
                <div className="mt-[0.6cqw] font-serif text-[1.4cqw] leading-tight">{t}</div>
                <p className="mt-[0.6cqw] text-[0.9cqw] leading-relaxed text-black/60">{d}</p>
              </div>
            ))}
          </section>

          <section className="mt-[3cqw] grid grid-cols-[1fr_1fr] gap-[2cqw] bg-[#14140f] px-[3cqw] py-[3cqw] text-white">
            <div className="font-serif text-[2.4cqw] leading-tight">“They read the fine print so we didn&apos;t have to.”</div>
            <div className="grid grid-cols-2 gap-[1cqw]">
              {["30 yrs", "1,200+", "98%", "3"].map((s, i) => (
                <div key={s} className="rounded-[0.8cqw] border border-white/10 p-[1cqw]">
                  <div className="font-serif text-[1.8cqw]">{s}</div>
                  <div className="text-[0.8cqw] text-white/60">{["practising", "matters closed", "client retention", "offices"][i]}</div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* audit overlay */}
        <motion.div
          className="absolute bottom-[1.6cqw] right-[1.6cqw] flex gap-[1cqw] rounded-[1cqw] border border-black/10 bg-white/90 p-[1cqw] shadow-[0_1cqw_3cqw_-1cqw_rgba(0,0,0,.25)] backdrop-blur"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {gauges.map(([label, v], i) => (
            <div key={label} className="flex flex-col items-center gap-[0.3cqw]">
              <svg viewBox="0 0 40 40" className="size-[3.4cqw]">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#0cce6b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform="rotate(-90 20 20)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: active ? v / 100 : 0 }}
                  transition={{ delay: 1.6 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                />
                <text x="20" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0cce6b">
                  {v}
                </text>
              </svg>
              <span className="text-[0.7cqw] font-semibold text-black/60">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Chrome>
  );
}

"use client";

import { motion } from "motion/react";
import { Avatar, Chrome, Pill } from "./shared";

const bars = [42, 58, 51, 70, 64, 88, 76, 92, 84, 97, 90, 100];
const rows = [
  ["Acme Corp", "Enterprise", "+12.4%", "green"],
  ["Nimbus Labs", "Growth", "+8.1%", "green"],
  ["Orbit Retail", "Starter", "-2.3%", "pink"],
  ["Kestrel Health", "Enterprise", "+21.0%", "green"],
] as const;

const linePath =
  "M0 78 C 40 70, 60 82, 90 60 S 150 48, 180 52 S 240 26, 280 32 S 340 10, 380 18 S 430 6, 460 4";

export function DashboardScene({ active = true }: { active?: boolean }) {
  return (
    <Chrome url="app.tenantly.io/workspace/analytics">
      <div className="absolute inset-0 grid grid-cols-[15%_1fr]">
        {/* sidebar */}
        <aside className="flex flex-col gap-[1.2cqw] border-r border-white/[0.06] bg-[#0f0f1a] p-[1.4cqw]">
          <div className="flex items-center gap-[0.7cqw] text-[1.2cqw] font-extrabold">
            <span className="size-[1.6cqw] rounded-[0.5cqw] bg-[linear-gradient(135deg,#695efe,#ff6af8)]" />
            Tenantly
          </div>
          <div className="mt-[0.8cqw] flex flex-col gap-[0.5cqw]">
            {["Overview", "Analytics", "Customers", "Reports", "Alerts", "Settings"].map((l, i) => (
              <span
                key={l}
                className={
                  "rounded-[0.6cqw] px-[0.9cqw] py-[0.6cqw] text-[1.05cqw] font-semibold " +
                  (i === 1 ? "bg-accent/20 text-white" : "text-muted")
                }
              >
                {l}
              </span>
            ))}
          </div>
          <div className="mt-auto rounded-[0.8cqw] border border-white/[0.06] p-[0.9cqw] text-[0.9cqw] text-muted">
            <div className="mb-[0.5cqw] flex justify-between font-semibold text-ink-2">
              <span>Usage</span>
              <span>81%</span>
            </div>
            <div className="h-[0.5cqw] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#695efe,#ff6af8)]"
                initial={{ width: "20%" }}
                animate={{ width: ["20%", "81%", "81%", "20%"] }}
                transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}
              />
            </div>
          </div>
        </aside>

        {/* main */}
        <main className="flex flex-col gap-[1.3cqw] p-[1.6cqw]">
          <header className="flex items-center justify-between">
            <div>
              <div className="text-[1.7cqw] font-extrabold tracking-tight">Analytics</div>
              <div className="text-[1cqw] text-muted">Last 30 days · all regions</div>
            </div>
            <div className="flex items-center gap-[0.8cqw]">
              <Pill tone="green">
                <span className="size-[0.6cqw] animate-pulse rounded-full bg-green" /> Live
              </Pill>
              <span className="rounded-[0.6cqw] bg-white/[0.06] px-[1cqw] py-[0.5cqw] text-[1cqw] font-semibold">
                Export
              </span>
              <Avatar i={0} size="2.4cqw" />
            </div>
          </header>

          {/* KPI tiles */}
          <div className="grid grid-cols-4 gap-[1cqw]">
            {[
              ["MRR", "$248.6k", "+14.2%", "green"],
              ["Active users", "10,482", "+6.8%", "green"],
              ["Churn", "1.9%", "-0.4%", "green"],
              ["Latency p95", "212 ms", "-38%", "accent"],
            ].map(([k, v, d, tone], i) => (
              <motion.div
                key={k}
                className="rounded-[1cqw] border border-white/[0.06] bg-white/[0.03] p-[1.1cqw]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-[0.95cqw] font-semibold text-muted">{k}</div>
                <div className="mt-[0.3cqw] text-[1.7cqw] font-extrabold tracking-tight">{v}</div>
                <Pill tone={tone as "green" | "accent"} className="mt-[0.5cqw]">
                  {d}
                </Pill>
              </motion.div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-[1cqw]">
            {/* area chart */}
            <div className="relative flex flex-col overflow-hidden rounded-[1cqw] border border-white/[0.06] bg-white/[0.03] p-[1.1cqw]">
              <div className="flex items-center justify-between">
                <div className="text-[1.1cqw] font-bold">Revenue</div>
                <div className="flex gap-[0.5cqw]">
                  <Pill tone="accent">This year</Pill>
                  <Pill>Last year</Pill>
                </div>
              </div>
              <svg viewBox="0 0 460 90" className="mt-[1cqw] min-h-0 w-full flex-1" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#695efe" stopOpacity=".5" />
                    <stop offset="1" stopColor="#695efe" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="dashStroke" x1="0" x2="1">
                    <stop offset="0" stopColor="#695efe" />
                    <stop offset="1" stopColor="#ff6af8" />
                  </linearGradient>
                </defs>
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" x2="460" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />
                ))}
                <motion.path
                  d={`${linePath} L460 90 L0 90 Z`}
                  fill="url(#dashFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                />
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="url(#dashStroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: active ? 1 : 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.circle
                  cx="460"
                  cy="4"
                  r="4"
                  fill="#ff6af8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1], scale: [0, 1.6, 1] }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                />
              </svg>
              <div className="mt-[0.6cqw] flex justify-between font-mono text-[0.8cqw] text-muted-2">
                {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* bars */}
            <div className="flex flex-col rounded-[1cqw] border border-white/[0.06] bg-white/[0.03] p-[1.1cqw]">
              <div className="text-[1.1cqw] font-bold">Signups by week</div>
              <div className="mt-auto flex h-[62%] items-end gap-[0.45cqw]">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 origin-bottom rounded-t-[0.3cqw] bg-[linear-gradient(180deg,#ff6af8,#695efe)]"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0.85, 1] }}
                    transition={{
                      duration: 6,
                      delay: 0.5 + i * 0.06,
                      repeat: Infinity,
                      times: [0, 0.15, 0.6, 0.8, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* table */}
          <div className="rounded-[1cqw] border border-white/[0.06] bg-white/[0.03]">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-[1cqw] border-b border-white/[0.06] px-[1.1cqw] py-[0.6cqw] text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">
              <span>Tenant</span>
              <span>Plan</span>
              <span>Growth</span>
              <span>Status</span>
            </div>
            {rows.map(([n, p, g, tone], i) => (
              <motion.div
                key={n}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-[1cqw] border-b border-white/[0.04] px-[1.1cqw] py-[0.55cqw] text-[1cqw]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.6 }}
              >
                <span className="flex items-center gap-[0.7cqw] font-semibold">
                  <Avatar i={i + 1} size="1.6cqw" /> {n}
                </span>
                <span className="text-muted">{p}</span>
                <span className={tone === "green" ? "text-green" : "text-pink"}>{g}</span>
                <Pill tone="green" className="w-max">
                  Healthy
                </Pill>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </Chrome>
  );
}

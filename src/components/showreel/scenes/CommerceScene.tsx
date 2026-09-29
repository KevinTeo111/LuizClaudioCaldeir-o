"use client";

import { AnimatePresence, motion } from "motion/react";
import { Avatar, Check, Chrome, Cover, Pill, useLoopPhase } from "./shared";

const products = [
  ["Admin Dashboard Kit", "UI template", "$49"],
  ["Invoice API Starter", "Software", "$129"],
  ["Motion Course", "Course", "$89"],
  ["Brand Guidelines", "E-book", "$19"],
  ["SaaS Boilerplate", "Software", "$199"],
  ["Icon Pack Pro", "Template", "$29"],
] as const;

// story: browse → add to cart → paid → ledger updates → withdrawal → paid out
const steps = [1600, 1400, 1600, 1800, 1800, 1600] as const;

export function CommerceScene({ active = true }: { active?: boolean }) {
  const phase = useLoopPhase(steps, active);
  const paid = phase >= 2;
  const ledger = phase >= 3;
  const withdrawal = phase >= 4;
  const payout = phase >= 5;

  return (
    <Chrome url="market.dev/vendor/dashboard">
      <div className="absolute inset-0 grid grid-cols-[1.35fr_1fr]">
        {/* storefront */}
        <div className="flex flex-col border-r border-white/[0.06] p-[1.5cqw]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[1cqw]">
              <span className="text-[1.3cqw] font-extrabold">
                Market<span className="text-accent-2">.</span>
              </span>
              {["Templates", "Software", "Courses"].map((c) => (
                <span key={c} className="text-[1cqw] font-semibold text-muted">
                  {c}
                </span>
              ))}
            </div>
            <div className="relative">
              <span className="grid size-[2.2cqw] place-items-center rounded-full bg-white/[0.06]">
                <svg viewBox="0 0 24 24" className="size-[1.2cqw]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l2.4 12.4a1 1 0 0 0 1 .8H19a1 1 0 0 0 1-.8L22 7H6" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </span>
              <AnimatePresence>
                {phase >= 1 ? (
                  <motion.span
                    key="badge"
                    className="absolute -right-[0.4cqw] -top-[0.4cqw] grid size-[1.3cqw] place-items-center rounded-full bg-pink text-[0.8cqw] font-extrabold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  >
                    1
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-[1.4cqw] grid grid-cols-3 gap-[1cqw]">
            {products.map(([name, cat, price], i) => (
              <motion.div
                key={name}
                className="overflow-hidden rounded-[1cqw] border border-white/[0.06] bg-white/[0.03]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Cover i={i} className="aspect-[4/3]" />
                <div className="p-[0.9cqw]">
                  <div className="text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">{cat}</div>
                  <div className="mt-[0.2cqw] truncate text-[1.05cqw] font-bold">{name}</div>
                  <div className="mt-[0.5cqw] flex items-center justify-between">
                    <span className="text-[1.1cqw] font-extrabold text-accent-2">{price}</span>
                    <motion.span
                      className={
                        "rounded-full px-[0.8cqw] py-[0.3cqw] text-[0.85cqw] font-bold " +
                        (i === 1 && phase >= 1 ? "bg-green text-bg" : "bg-accent text-white")
                      }
                      animate={i === 1 && phase === 1 ? { scale: [1, 0.85, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {i === 1 && phase >= 1 ? "Added" : "Add"}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {paid ? (
              <motion.div
                key="toast"
                className="mt-auto flex items-center gap-[0.8cqw] self-start rounded-full border border-green/40 bg-green/10 px-[1.1cqw] py-[0.6cqw] text-[1cqw] font-bold text-green"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Check /> Payment confirmed · order #48213 · signed download link sent
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* vendor dashboard */}
        <div className="flex flex-col gap-[1.1cqw] bg-[#0f0f1a] p-[1.5cqw]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[1.3cqw] font-extrabold">Vendor balance</div>
              <div className="text-[0.95cqw] text-muted">Plan Pro · 12% commission</div>
            </div>
            <Avatar i={2} size="2.4cqw" />
          </div>

          <div className="grid grid-cols-2 gap-[0.9cqw]">
            <div className="rounded-[0.9cqw] border border-white/[0.06] bg-white/[0.03] p-[1cqw]">
              <div className="text-[0.9cqw] font-semibold text-muted">Pending</div>
              <motion.div
                key={`p-${ledger}`}
                className="text-[1.6cqw] font-extrabold tabular-nums"
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {ledger ? "$1,243.52" : "$1,130.00"}
              </motion.div>
            </div>
            <div className="rounded-[0.9cqw] border border-accent/40 bg-accent/10 p-[1cqw]">
              <div className="text-[0.9cqw] font-semibold text-[#c4b5ff]">Available</div>
              <motion.div
                key={`a-${payout}`}
                className="text-[1.6cqw] font-extrabold tabular-nums"
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {payout ? "$0.00" : "$3,980.00"}
              </motion.div>
            </div>
          </div>

          {/* ledger */}
          <div className="rounded-[0.9cqw] border border-white/[0.06] bg-white/[0.03]">
            <div className="border-b border-white/[0.06] px-[1cqw] py-[0.6cqw] text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">
              Ledger
            </div>
            <div className="flex flex-col">
              <AnimatePresence initial={false}>
                {ledger ? (
                  <motion.div
                    key="new"
                    className="grid grid-cols-[1fr_auto] items-center gap-[0.6cqw] overflow-hidden border-b border-white/[0.04] px-[1cqw] text-[0.95cqw]"
                    initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, backgroundColor: "rgba(74,222,128,.25)" }}
                    animate={{ opacity: 1, height: "auto", paddingTop: "0.55cqw", paddingBottom: "0.55cqw", backgroundColor: "rgba(74,222,128,0)" }}
                    transition={{ duration: 0.8 }}
                  >
                    <span>
                      <span className="font-semibold">Sale</span> · Invoice API Starter
                      <span className="ml-[0.5cqw] text-muted">(fee -$15.48)</span>
                    </span>
                    <span className="font-mono font-semibold text-green">+$113.52</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {[
                ["Sale · SaaS Boilerplate", "+$175.12"],
                ["Sale · Motion Course", "+$78.32"],
                ["Pending → available", "$920.00"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="grid grid-cols-[1fr_auto] items-center gap-[0.6cqw] border-b border-white/[0.04] px-[1cqw] py-[0.55cqw] text-[0.95cqw] text-ink-2"
                >
                  <span>{l}</span>
                  <span className="font-mono text-muted">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* withdrawal stepper */}
          <div className="mt-auto rounded-[0.9cqw] border border-white/[0.06] bg-white/[0.03] p-[1cqw]">
            <div className="flex items-center justify-between">
              <span className="text-[1cqw] font-bold">Withdrawal · $3,980.00</span>
              <Pill tone={payout ? "green" : withdrawal ? "amber" : "muted"}>
                {payout ? "Paid out" : withdrawal ? "Admin review" : "Weekly limit OK"}
              </Pill>
            </div>
            <div className="mt-[0.9cqw] flex items-center gap-[0.5cqw]">
              {["Requested", "Approved", "Pagar.me transfer", "Paid"].map((s, i) => {
                const done = (i <= 1 && withdrawal) || (i >= 2 && payout);
                return (
                  <div key={s} className="flex flex-1 items-center gap-[0.5cqw]">
                    <motion.span
                      className={
                        "grid size-[1.5cqw] shrink-0 place-items-center rounded-full text-[0.8cqw] font-bold " +
                        (done ? "bg-green text-bg" : "bg-white/10 text-muted")
                      }
                      animate={{ scale: done ? [1, 1.25, 1] : 1 }}
                    >
                      {done ? <Check className="size-[0.9cqw]" /> : i + 1}
                    </motion.span>
                    <span className="truncate text-[0.8cqw] text-muted">{s}</span>
                    {i < 3 ? <span className={"h-px flex-1 " + (done ? "bg-green/60" : "bg-white/10")} /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

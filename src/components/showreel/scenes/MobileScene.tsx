"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Cover, Phone, useLoopPhase } from "./shared";

// 0 browse · 1 open product · 2 add to cart · 3 checkout sheet · 4 confirmed
const steps = [1800, 1500, 1300, 1600, 1900] as const;

const items = [
  ["Aurora Buds", "$129"],
  ["Nova Watch 3", "$249"],
  ["Pixel Slate", "$599"],
  ["Halo Cam", "$189"],
] as const;

export function MobileScene({ active = true }: { active?: boolean }) {
  const phase = useLoopPhase(steps, active);
  const detail = phase >= 1;
  const carted = phase >= 2;
  const sheet = phase >= 3;
  const done = phase >= 4;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(70%_70%_at_70%_30%,rgba(34,211,238,.16),transparent_60%),#0a0a12] text-ink">
      {/* orbiting rings */}
      <div className="absolute left-1/2 top-1/2 size-[70cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="absolute left-1/2 top-1/2 size-[52cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

      {/* background phones (light mode variant) */}
      <motion.div
        className="absolute left-[16%] top-[14%] w-[15%] opacity-60 [transform:perspective(60cqw)_rotateY(22deg)_rotateX(4deg)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Phone className="border-[#d7d7e2] bg-white">
          <div className="absolute inset-0 bg-[#f7f7fb] p-[0.9cqw] pt-[2.6cqw] text-[#12121c]">
            <div className="h-[1cqw] w-[60%] rounded bg-black/10" />
            <div className="mt-[0.8cqw] grid grid-cols-2 gap-[0.6cqw]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rounded-[0.6cqw] bg-white p-[0.4cqw] shadow-sm">
                  <Cover i={i + 2} className="aspect-square rounded-[0.4cqw]" />
                  <div className="mt-[0.4cqw] h-[0.5cqw] w-[70%] rounded bg-black/10" />
                </div>
              ))}
            </div>
          </div>
        </Phone>
      </motion.div>
      <motion.div
        className="absolute right-[16%] top-[22%] w-[15%] opacity-60 [transform:perspective(60cqw)_rotateY(-22deg)_rotateX(4deg)]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Phone>
          <div className="absolute inset-0 p-[0.9cqw] pt-[2.6cqw]">
            <div className="text-[0.8cqw] font-bold">Departments</div>
            {["Smartphones", "Laptops", "Audio", "Wearables", "Gaming"].map((d, i) => (
              <div key={d} className="mt-[0.5cqw] flex items-center gap-[0.5cqw] rounded-[0.5cqw] bg-white/[0.05] px-[0.6cqw] py-[0.45cqw] text-[0.7cqw]">
                <Cover i={i} className="size-[1.2cqw] rounded-[0.3cqw]" /> {d}
              </div>
            ))}
          </div>
        </Phone>
      </motion.div>

      {/* floating facts */}
      {[
        ["390px → 4K", "left-[7%] top-[62%]"],
        ["URL-driven filters", "right-[7%] top-[60%]"],
        ["Light / dark", "left-[9%] top-[30%]"],
        ["Persistent cart", "right-[9%] top-[12%]"],
      ].map(([t, pos], i) => (
        <motion.span
          key={t}
          className={`absolute ${pos} rounded-full border border-white/10 bg-white/[0.05] px-[1cqw] py-[0.45cqw] font-mono text-[0.85cqw] text-ink-2 backdrop-blur`}
          animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          {t}
        </motion.span>
      ))}

      {/* hero phone */}
      <div className="absolute left-1/2 top-1/2 w-[19%] -translate-x-1/2 -translate-y-1/2">
        <Phone glow>
          <div className="absolute inset-0 flex flex-col bg-[#0b0b14] pt-[2.4cqw]">
            {/* app bar */}
            <div className="flex items-center justify-between px-[1cqw]">
              <span className="text-[1cqw] font-extrabold">
                Voltra<span className="text-accent-2">.</span>
              </span>
              <span className="relative grid size-[1.7cqw] place-items-center rounded-full bg-white/[0.07]">
                <svg viewBox="0 0 24 24" className="size-[0.9cqw]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l2.4 12.4a1 1 0 0 0 1 .8H19a1 1 0 0 0 1-.8L22 7H6" />
                </svg>
                <AnimatePresence>
                  {carted ? (
                    <motion.b
                      key="b"
                      className="absolute -right-[0.3cqw] -top-[0.3cqw] grid size-[0.9cqw] place-items-center rounded-full bg-pink text-[0.55cqw] text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 16 }}
                    >
                      1
                    </motion.b>
                  ) : null}
                </AnimatePresence>
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!detail ? (
                <motion.div
                  key="list"
                  className="flex flex-1 flex-col px-[1cqw] pt-[0.8cqw]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="rounded-[0.6cqw] bg-white/[0.06] px-[0.7cqw] py-[0.45cqw] font-mono text-[0.7cqw] text-muted">
                    Search devices…
                  </div>
                  <div className="no-scrollbar mt-[0.7cqw] flex gap-[0.4cqw] overflow-hidden">
                    {["All", "Audio", "Wearables", "Laptops"].map((c, i) => (
                      <span
                        key={c}
                        className={
                          "shrink-0 rounded-full px-[0.7cqw] py-[0.3cqw] text-[0.65cqw] font-bold " +
                          (i === 1 ? "bg-accent text-white" : "bg-white/[0.06] text-muted")
                        }
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-[0.8cqw] grid grid-cols-2 gap-[0.6cqw]">
                    {items.map(([n, p], i) => (
                      <motion.div
                        key={n}
                        className={
                          "rounded-[0.7cqw] bg-white/[0.04] p-[0.5cqw] " + (i === 0 ? "ring-1 ring-accent-2/60" : "")
                        }
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Cover i={i + 1} className="aspect-square rounded-[0.5cqw]" />
                        <div className="mt-[0.4cqw] truncate text-[0.75cqw] font-bold">{n}</div>
                        <div className="text-[0.7cqw] text-accent-2">{p}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  className="flex flex-1 flex-col px-[1cqw] pt-[0.8cqw]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Cover i={1} className="aspect-[5/4] rounded-[0.8cqw]" />
                  <div className="mt-[0.7cqw] flex gap-[0.3cqw]">
                    {[262, 190, 30].map((h) => (
                      <span key={h} className="size-[0.9cqw] rounded-full" style={{ background: `hsl(${h} 80% 60%)` }} />
                    ))}
                  </div>
                  <div className="mt-[0.5cqw] text-[0.95cqw] font-extrabold">Aurora Buds</div>
                  <div className="text-[0.7cqw] text-muted">ANC · 32h battery · USB-C</div>
                  <div className="mt-[0.4cqw] flex items-baseline gap-[0.4cqw]">
                    <span className="text-[1.1cqw] font-extrabold text-accent-2">$129</span>
                    <span className="text-[0.65cqw] text-muted line-through">$159</span>
                  </div>
                  <motion.button
                    className={
                      "mt-auto mb-[1cqw] rounded-full py-[0.6cqw] text-[0.8cqw] font-bold " +
                      (carted ? "bg-green text-bg" : "bg-accent text-white")
                    }
                    animate={phase === 2 ? { scale: [1, 0.93, 1.04, 1] } : {}}
                  >
                    {carted ? "Added to cart" : "Add to cart"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* checkout sheet */}
            <AnimatePresence>
              {sheet ? (
                <motion.div
                  key="sheet"
                  className="absolute inset-x-0 bottom-0 rounded-t-[1.4cqw] bg-[#15152a] p-[1cqw] pt-[0.8cqw]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  <div className="mx-auto mb-[0.7cqw] h-[0.25cqw] w-[25%] rounded-full bg-white/20" />
                  {!done ? (
                    <>
                      <div className="flex justify-between text-[0.75cqw]">
                        <span className="text-muted">Aurora Buds ×1</span>
                        <span>$129.00</span>
                      </div>
                      <div className="mt-[0.3cqw] flex justify-between text-[0.75cqw]">
                        <span className="text-muted">Promo LAUNCH25</span>
                        <span className="text-green">-$32.25</span>
                      </div>
                      <div className="mt-[0.3cqw] flex justify-between text-[0.75cqw]">
                        <span className="text-muted">Shipping</span>
                        <span className="text-green">Free</span>
                      </div>
                      <div className="mt-[0.6cqw] flex justify-between border-t border-white/10 pt-[0.5cqw] text-[0.9cqw] font-extrabold">
                        <span>Total</span>
                        <span>$96.75</span>
                      </div>
                      <div className="mt-[0.7cqw] rounded-full bg-white py-[0.6cqw] text-center text-[0.8cqw] font-bold text-bg">
                        Pay now
                      </div>
                    </>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center py-[0.6cqw]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.span
                        className="grid size-[2.6cqw] place-items-center rounded-full bg-green text-bg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 14 }}
                      >
                        <Check className="size-[1.4cqw]" />
                      </motion.span>
                      <div className="mt-[0.6cqw] text-[0.9cqw] font-extrabold">Order confirmed</div>
                      <div className="text-[0.7cqw] text-muted">#VLT-2048 · arrives Thu</div>
                    </motion.div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Phone>
      </div>
    </div>
  );
}

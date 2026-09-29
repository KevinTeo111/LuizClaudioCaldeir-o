"use client";

import { AnimatePresence, motion } from "motion/react";
import { Avatar, Check, Phone, Pill, useLoopPhase } from "./shared";

// 0 pick song · 1 queued on panel · 2 host starts, TV + phone switch · 3 ratings · 4 hold
const steps = [1700, 1500, 2200, 1900, 1200] as const;

const queue = [
  ["Table 4", "Livin' on a Prayer"],
  ["Table 9", "Dancing Queen"],
  ["Table 2", "Wonderwall"],
] as const;

const lyrics = ["Is this the real life?", "Is this just fantasy?", "Caught in a landslide", "No escape from reality"];

export function RealtimeScene({ active = true }: { active?: boolean }) {
  const phase = useLoopPhase(steps, active);
  const picked = phase >= 1;
  const singing = phase >= 2;
  const rating = phase >= 3;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(60%_80%_at_50%_100%,rgba(105,94,254,.22),transparent_60%),#08080f] text-ink">
      {/* stage lights */}
      <div className="absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(40%_100%_at_30%_0%,rgba(255,106,248,.18),transparent),radial-gradient(40%_100%_at_70%_0%,rgba(255,79,216,.16),transparent)]" />

      {/* sync links */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
        <path d="M18 30 C 28 30, 30 30, 40 30" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth=".3" strokeDasharray="1 1" />
        <path d="M62 30 C 68 30, 70 30, 76 30" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth=".3" strokeDasharray="1 1" />
        <AnimatePresence>
          {phase === 1 ? (
            <motion.circle
              key="p1"
              r=".9"
              cy="30"
              fill="#ff6af8"
              initial={{ cx: 18, opacity: 0 }}
              animate={{ cx: 40, opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          ) : null}
          {phase === 2 ? (
            <motion.circle
              key="p2"
              r=".9"
              cy="30"
              fill="#ff6af8"
              initial={{ cx: 62, opacity: 0 }}
              animate={{ cx: 76, opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          ) : null}
        </AnimatePresence>
      </svg>

      <div className="absolute inset-0 grid grid-cols-[18%_1fr_30%] items-center gap-[3cqw] px-[4cqw] py-[3cqw]">
        {/* guest phone */}
        <div className="relative">
          <Phone glow={phase === 0}>
            <div className="absolute inset-0 flex flex-col bg-[#0b0b14] p-[1cqw] pt-[2.6cqw]">
              <div className="text-[0.95cqw] font-extrabold">
                Cacho e&apos; Cabra <span className="text-pink">♪</span>
              </div>
              <AnimatePresence mode="wait">
                {!singing ? (
                  <motion.div
                    key="pick"
                    className="mt-[1cqw] flex flex-col gap-[0.6cqw]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <div className="rounded-[0.7cqw] bg-white/[0.06] px-[0.8cqw] py-[0.5cqw] font-mono text-[0.75cqw] text-muted">
                      Search karaoke…
                    </div>
                    {["Bohemian Rhapsody", "Sweet Caroline", "Mr. Brightside"].map((s, i) => (
                      <motion.div
                        key={s}
                        className={
                          "flex items-center justify-between rounded-[0.7cqw] px-[0.8cqw] py-[0.6cqw] text-[0.8cqw] font-semibold " +
                          (i === 0 && picked ? "bg-accent text-white" : "bg-white/[0.04]")
                        }
                        animate={i === 0 && phase === 1 ? { scale: [1, 0.95, 1] } : {}}
                      >
                        <span className="truncate">{s}</span>
                        {i === 0 && picked ? <Check className="size-[0.9cqw]" /> : <span className="text-muted">+</span>}
                      </motion.div>
                    ))}
                    {picked ? (
                      <motion.div
                        className="mt-auto rounded-[0.7cqw] border border-accent-2/40 bg-accent-2/10 p-[0.7cqw] text-[0.75cqw] text-accent-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        In queue · position <b>4</b>
                      </motion.div>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key="monitor"
                    className="mt-[1cqw] flex flex-1 flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Pill tone="pink" className="self-start text-[0.7cqw]">
                      You&apos;re on! · lyrics monitor
                    </Pill>
                    <div className="mt-[1cqw] flex flex-col gap-[0.5cqw]">
                      {lyrics.map((l, i) => (
                        <motion.div
                          key={l}
                          className="text-[0.85cqw] font-bold leading-tight"
                          animate={{ color: ["#5b5b74", "#ffffff", "#5b5b74"] }}
                          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.8 }}
                        >
                          {l}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Phone>
          <span className="absolute -bottom-[2cqw] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.85cqw] uppercase tracking-widest text-muted">
            Guest phone
          </span>
        </div>

        {/* host panel */}
        <div className="relative overflow-hidden rounded-[1.4cqw] border border-white/[0.08] bg-[#0f0f1a] shadow-[0_2cqw_6cqw_-2cqw_rgba(0,0,0,.9)]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-[1.4cqw] py-[0.9cqw]">
            <div className="text-[1.15cqw] font-extrabold">Host panel · Friday night</div>
            <div className="flex items-center gap-[0.6cqw]">
              <Pill tone="green">
                <span className="size-[0.55cqw] animate-pulse rounded-full bg-green" /> 212 phones online
              </Pill>
              <Avatar i={3} size="1.8cqw" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_38%]">
            <div className="p-[1.2cqw]">
              <div className="mb-[0.7cqw] text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">Queue</div>
              <div className="flex flex-col gap-[0.5cqw]">
                {queue.map(([t, s], i) => (
                  <div
                    key={s}
                    className="flex items-center gap-[0.8cqw] rounded-[0.8cqw] bg-white/[0.04] px-[0.9cqw] py-[0.6cqw] text-[0.95cqw]"
                  >
                    <span className="font-mono text-muted">{i + 1}</span>
                    <Avatar i={i + 1} size="1.4cqw" />
                    <span className="font-semibold">{t}</span>
                    <span className="ml-auto truncate text-muted">{s}</span>
                  </div>
                ))}
                <AnimatePresence>
                  {picked ? (
                    <motion.div
                      key="new"
                      className="flex items-center gap-[0.8cqw] rounded-[0.8cqw] border border-accent-2/40 bg-accent-2/10 px-[0.9cqw] py-[0.6cqw] text-[0.95cqw]"
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="font-mono text-muted">4</span>
                      <Avatar i={0} size="1.4cqw" />
                      <span className="font-semibold">Table 12</span>
                      <span className="ml-auto truncate text-ink-2">Bohemian Rhapsody</span>
                      <Pill tone="accent" className="text-[0.7cqw]">
                        new
                      </Pill>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
            <div className="border-l border-white/[0.06] p-[1.2cqw]">
              <div className="mb-[0.7cqw] text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">Now</div>
              <div className="rounded-[0.9cqw] bg-[linear-gradient(135deg,rgba(105,94,254,.35),rgba(255,79,216,.2))] p-[0.9cqw]">
                <div className="text-[0.8cqw] text-ink-2">{singing ? "Table 12" : "Table 7"}</div>
                <div className="truncate text-[1.05cqw] font-extrabold">{singing ? "Bohemian Rhapsody" : "Don't Stop Me Now"}</div>
                <div className="mt-[0.7cqw] h-[0.4cqw] overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    className="h-full bg-white"
                    animate={{ width: singing ? ["0%", "65%"] : ["70%", "100%"] }}
                    transition={{ duration: singing ? 4 : 3, ease: "linear" }}
                  />
                </div>
              </div>
              <motion.button
                className={
                  "mt-[0.9cqw] w-full rounded-full py-[0.6cqw] text-[0.9cqw] font-bold " +
                  (phase === 2 ? "bg-white text-bg" : "bg-accent text-white")
                }
                animate={phase === 2 ? { scale: [1, 0.94, 1] } : {}}
              >
                {singing ? "Next performer" : "Start next ▶"}
              </motion.button>
              <div className="mt-[0.9cqw] flex items-center justify-between text-[0.8cqw] text-muted">
                <span>Selfie ready</span>
                <Check className="size-[1cqw] text-green" />
              </div>
            </div>
          </div>
          <span className="absolute bottom-[0.6cqw] right-[1cqw] font-mono text-[0.75cqw] uppercase tracking-widest text-muted-2">
            supabase realtime · postgres fn
          </span>
        </div>

        {/* TV */}
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-[1cqw] border-[0.4cqw] border-[#1b1b28] bg-black shadow-[0_2cqw_6cqw_-2cqw_rgba(0,0,0,.9)]">
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,79,216,.35),transparent_60%),linear-gradient(180deg,#141428,#05050a)]" />
            <div className="absolute inset-0 flex flex-col p-[1.2cqw]">
              <div className="flex items-center justify-between">
                <span className="text-[0.9cqw] font-extrabold">
                  STAGE <span className="text-pink">♪</span>
                </span>
                <span className="font-mono text-[0.7cqw] text-muted">tv-01</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={singing ? "b" : "a"}
                  className="mt-auto"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                >
                  <div className="text-[0.75cqw] uppercase tracking-widest text-muted">Now singing</div>
                  <div className="text-[1.3cqw] font-extrabold leading-tight">{singing ? "Table 12" : "Table 7"}</div>
                  <div className="text-[0.9cqw] text-ink-2">{singing ? "Bohemian Rhapsody" : "Don't Stop Me Now"}</div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-[0.8cqw] flex items-end gap-[0.25cqw]">
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-full origin-bottom rounded-t-[0.2cqw] bg-[linear-gradient(180deg,#ff6af8,#695efe)]"
                    style={{ height: `${0.6 + ((i * 7) % 5) * 0.35}cqw` }}
                    animate={{ scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
                    transition={{ duration: 1.2 + (i % 4) * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
            {/* ratings */}
            <AnimatePresence>
              {rating
                ? [0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute right-[1cqw] text-[1.1cqw] text-amber"
                      style={{ bottom: `${1 + i * 0.4}cqw` }}
                      initial={{ opacity: 0, y: 10, scale: 0.6 }}
                      animate={{ opacity: [0, 1, 0], y: -40 - i * 10, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: i * 0.35 }}
                    >
                      ★
                    </motion.span>
                  ))
                : null}
            </AnimatePresence>
          </div>
          <span className="absolute -bottom-[2cqw] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.85cqw] uppercase tracking-widest text-muted">
            Venue TV
          </span>
        </div>
      </div>
    </div>
  );
}

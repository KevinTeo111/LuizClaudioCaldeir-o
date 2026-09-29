"use client";

import { AnimatePresence, motion } from "motion/react";
import { Avatar, Check, Chrome, Pill, useLoopPhase, useTypewriter } from "./shared";

// 0 ticket in · 1 thinking · 2 tool 1 · 3 tool 2 · 4 stream reply · 5 approve · 6 sent
const steps = [1300, 900, 1000, 1000, 2800, 1400, 1600] as const;

const reply =
  "Hi Marina — your invoice #2291 was issued twice because the retry job ran after the first webhook already succeeded. I've voided the duplicate and refunded $240.00; it will show within 3–5 business days.";

const tools = [
  { name: "search_docs", args: '{ query: "duplicate invoice webhook retry" }', out: "3 matches · billing-runbook.md" },
  { name: "crm.lookup", args: '{ email: "marina@orbit.co" }', out: "Orbit Retail · Growth plan · 2 open invoices" },
] as const;

export function AIScene({ active = true }: { active?: boolean }) {
  const phase = useLoopPhase(steps, active);
  const typed = useTypewriter(phase >= 4 ? reply : "", 18, phase >= 4 ? "run" : "idle");
  const approved = phase >= 5;
  const sent = phase >= 6;

  return (
    <Chrome url="ops.assistant.internal/inbox/#2291">
      <div className="absolute inset-0 grid grid-cols-[22%_1fr_26%]">
        {/* inbox */}
        <aside className="flex flex-col border-r border-white/[0.06] bg-[#0f0f1a]">
          <div className="flex items-center justify-between px-[1.2cqw] py-[1cqw]">
            <span className="text-[1.1cqw] font-extrabold">Inbox</span>
            <Pill tone="accent">12 new</Pill>
          </div>
          {[
            ["Marina O.", "Charged twice this month", true],
            ["Theo K.", "Export to CSV fails", false],
            ["Ana P.", "Add seat to workspace", false],
            ["Jules R.", "SSO login loop", false],
            ["Sam W.", "API rate limits?", false],
          ].map(([n, s, on], i) => (
            <motion.div
              key={n as string}
              className={
                "flex gap-[0.7cqw] border-b border-white/[0.04] px-[1.2cqw] py-[0.8cqw] " +
                (on ? "bg-accent/15" : "")
              }
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Avatar i={i} size="1.8cqw" />
              <div className="min-w-0">
                <div className="truncate text-[0.95cqw] font-bold">{n as string}</div>
                <div className="truncate text-[0.85cqw] text-muted">{s as string}</div>
              </div>
            </motion.div>
          ))}
        </aside>

        {/* thread */}
        <main className="flex flex-col gap-[1cqw] p-[1.5cqw]">
          <div className="flex items-center justify-between">
            <div className="text-[1.2cqw] font-extrabold">Charged twice this month</div>
            <Pill tone={sent ? "green" : "amber"}>{sent ? "Resolved" : "Triage · P2"}</Pill>
          </div>

          <motion.div
            className="max-w-[80%] rounded-[1cqw] rounded-tl-[0.3cqw] bg-white/[0.05] p-[1cqw] text-[1cqw] leading-snug text-ink-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="mb-[0.3cqw] block text-[0.8cqw] font-bold text-muted">Marina · Orbit Retail</span>
            Hi, we were charged twice for invoice #2291. Can you check and refund the duplicate?
          </motion.div>

          {/* agent block */}
          <div className="ml-auto flex w-[86%] flex-col gap-[0.6cqw]">
            <AnimatePresence>
              {phase === 1 ? (
                <motion.div
                  key="thinking"
                  className="flex items-center gap-[0.5cqw] self-end text-[0.9cqw] text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-grad font-bold">Assistant</span> is reasoning
                  {[0, 1, 2].map((i) => (
                    <motion.i
                      key={i}
                      className="size-[0.45cqw] rounded-full bg-accent-2"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {tools.map((t, i) =>
              phase >= i + 2 ? (
                <motion.div
                  key={t.name}
                  className="rounded-[0.8cqw] border border-white/[0.08] bg-[#0f0f1a] px-[1cqw] py-[0.7cqw] font-mono text-[0.85cqw]"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <div className="flex items-center gap-[0.6cqw]">
                    <span className="text-accent-2">⚡ {t.name}</span>
                    <span className="truncate text-muted">{t.args}</span>
                    <span className="ml-auto flex items-center gap-[0.3cqw] text-green">
                      <Check className="size-[0.9cqw]" /> ok
                    </span>
                  </div>
                  <div className="mt-[0.3cqw] text-muted-2">↳ {t.out}</div>
                </motion.div>
              ) : null,
            )}

            {phase >= 4 ? (
              <motion.div
                className="rounded-[1cqw] rounded-tr-[0.3cqw] border border-accent/40 bg-accent/10 p-[1cqw] text-[1cqw] leading-snug"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="mb-[0.3cqw] block text-[0.8cqw] font-bold text-[#c4b5ff]">Draft reply · claude-sonnet</span>
                {typed}
                {typed.length < reply.length ? <span className="animate-blink ml-[0.1cqw] inline-block h-[1cqw] w-[0.4cqw] translate-y-[0.15cqw] bg-accent-2" /> : null}
              </motion.div>
            ) : null}

            {phase >= 4 && typed.length >= reply.length ? (
              <motion.div className="flex items-center gap-[0.6cqw] self-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="rounded-full border border-white/10 px-[1cqw] py-[0.45cqw] text-[0.9cqw] font-bold text-muted">Edit</span>
                <motion.span
                  className={
                    "flex items-center gap-[0.4cqw] rounded-full px-[1cqw] py-[0.45cqw] text-[0.9cqw] font-bold " +
                    (approved ? "bg-green text-bg" : "bg-accent text-white")
                  }
                  animate={!approved ? { boxShadow: ["0 0 0 0 rgba(124,92,255,.6)", "0 0 0 0.8cqw rgba(124,92,255,0)"] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  {approved ? <Check className="size-[0.9cqw]" /> : null}
                  {sent ? "Sent" : approved ? "Approved" : "Approve & send"}
                </motion.span>
              </motion.div>
            ) : null}
          </div>
        </main>

        {/* audit */}
        <aside className="flex flex-col border-l border-white/[0.06] bg-[#0f0f1a] p-[1.2cqw]">
          <div className="text-[0.85cqw] font-bold uppercase tracking-wider text-muted-2">Audit trail</div>
          <div className="mt-[0.9cqw] flex flex-col gap-[0.6cqw] font-mono text-[0.8cqw]">
            {[
              ["09:41:02", "ticket.received", 0],
              ["09:41:03", "agent.plan → 2 tools", 1],
              ["09:41:04", "search_docs · 3 hits", 2],
              ["09:41:05", "crm.lookup · ok", 3],
              ["09:41:07", "draft.created · 412 chars", 4],
              ["09:41:19", "human.approved (luiz)", 5],
              ["09:41:19", "stripe.refund $240.00 ✓", 6],
              ["09:41:20", "email.sent · ticket closed", 6],
            ].map(([t, e, p], i) =>
              phase >= (p as number) ? (
                <motion.div
                  key={i}
                  className="flex gap-[0.6cqw] text-ink-2"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-muted-2">{t as string}</span>
                  <span className={i >= 6 ? "text-green" : ""}>{e as string}</span>
                </motion.div>
              ) : null,
            )}
          </div>
          <div className="mt-auto rounded-[0.8cqw] border border-white/[0.06] p-[0.9cqw]">
            <div className="text-[0.8cqw] text-muted">Guardrails</div>
            <div className="mt-[0.4cqw] flex flex-wrap gap-[0.4cqw]">
              {["refund ≤ $500", "human approval", "PII redaction"].map((g) => (
                <Pill key={g} tone="green" className="text-[0.7cqw]">
                  {g}
                </Pill>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Chrome>
  );
}

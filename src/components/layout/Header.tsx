"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 40));

  // highlight the section currently in view
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (href: string) => {
    setOpen(false);
    lenis?.scrollTo(href, { offset: -84, duration: 1.4 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-[background-color,border-color,backdrop-filter] duration-500",
          stuck || open
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="wrap flex h-[76px] items-center gap-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="text-[22px] font-extrabold tracking-tight"
            aria-label="Back to top"
          >
            {site.name}
            <span className="text-grad">.</span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="relative rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink-2 transition-colors hover:text-white"
              >
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="#contact" size="sm">
              Let&apos;s talk <ArrowIcon />
            </Button>
          </div>

          <button
            className="ml-auto grid size-11 place-items-center rounded-xl border border-line-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-full rounded bg-white transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] h-0.5 w-full rounded bg-white transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-full rounded bg-white transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-bg/95 pt-[96px] backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="wrap flex flex-col" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="flex items-center justify-between border-b border-line py-5 text-[28px] font-extrabold tracking-tight"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                  <span className="text-accent-2">→</span>
                </motion.a>
              ))}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button href="#contact" size="lg" onClick={() => setOpen(false)} className="w-full">
                  Let&apos;s talk <ArrowIcon />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

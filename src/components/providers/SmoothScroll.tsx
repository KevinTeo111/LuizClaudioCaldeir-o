"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

type LenisStore = {
  get: () => Lenis | null;
  set: (l: Lenis | null) => void;
  subscribe: (cb: () => void) => () => void;
};

const noopStore: LenisStore = { get: () => null, set: () => {}, subscribe: () => () => {} };
const LenisContext = createContext<LenisStore>(noopStore);

function createLenisStore(): LenisStore {
  let instance: Lenis | null = null;
  const subs = new Set<() => void>();
  return {
    get: () => instance,
    set: (l) => {
      instance = l;
      subs.forEach((cb) => cb());
    },
    subscribe: (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
  };
}

/** The live Lenis instance (null on the server and before mount). */
export function useLenis() {
  const store = useContext(LenisContext);
  return useSyncExternalStore(store.subscribe, store.get, () => null);
}

/**
 * Site-wide smooth scrolling (Lenis). The instance lives in a tiny external
 * store so any component can scroll programmatically or pause scrolling
 * for modals without extra renders.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [store] = useState(createLenisStore);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.09,
      smoothWheel: !reduce,
      anchors: { offset: -84 },
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    store.set(lenis);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      store.set(null);
    };
  }, [store]);

  return <LenisContext.Provider value={store}>{children}</LenisContext.Provider>;
}

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Intro = { ready: boolean; setReady: (v: boolean) => void };

const IntroContext = createContext<Intro>({ ready: false, setReady: () => {} });

/** Shared flag: true once the preloader has finished, so the hero can start its entrance. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}

"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import type { SceneKey } from "@/data/projects";
import { cn } from "@/lib/utils";
import { scenes } from "./scenes";

type Props = {
  scene: SceneKey;
  video?: string;
  className?: string;
  /** aspect ratio class, defaults to 16/10; pass "" when the parent sizes it */
  ratio?: string;
};

/** A single framed scene that only animates while on screen. */
export function ScenePreview({ scene, video, className, ratio = "aspect-[16/10]" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const Scene = scenes[scene];
  return (
    <div ref={ref} className={cn("@container relative isolate w-full overflow-hidden bg-bg-3", ratio, className)} data-cursor>
      {video ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={video} autoPlay muted loop playsInline />
      ) : (
        <Scene active={inView} />
      )}
    </div>
  );
}

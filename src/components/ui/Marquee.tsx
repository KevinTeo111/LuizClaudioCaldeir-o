import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/** Infinite horizontal ticker; content is duplicated for a seamless loop. */
export function Marquee({ children, speed = 40, reverse, className }: Props) {
  return (
    <div
      className={cn(
        "group/marquee relative flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "animate-marquee flex w-max shrink-0 items-center [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

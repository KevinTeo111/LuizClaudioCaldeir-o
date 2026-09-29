import { cn } from "@/lib/utils";
import { Reveal, RevealItem } from "./Reveal";

type Props = {
  kicker: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ kicker, title, sub, align = "left", className }: Props) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <RevealItem>
        <span className="kicker">{kicker}</span>
      </RevealItem>
      <RevealItem>
        <h2 className="h2">{title}</h2>
      </RevealItem>
      {sub ? (
        <RevealItem>
          <p className={cn("sub", align === "center" && "mx-auto")}>{sub}</p>
        </RevealItem>
      ) : null}
    </Reveal>
  );
}

import { BrandIcon } from "@/components/ui/BrandIcon";
import { Marquee } from "@/components/ui/Marquee";
import { coreStack } from "@/data/site";

/** Proof strip right under the hero: the production stack as brand marks. */
export function StackStrip() {
  return (
    <section aria-label="Core stack" className="border-y border-line bg-bg-2/60 py-5">
      <div className="wrap mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Production stack</span>
        <span className="hidden text-[12.5px] font-semibold text-muted sm:block">The tools behind every project below</span>
      </div>
      <Marquee speed={46}>
        {coreStack.map(([slug, label]) => (
          <span key={slug} className="flex items-center gap-3 px-7 text-[15px] font-bold text-ink-2/85">
            <BrandIcon slug={slug} label={label} className="size-6" color />
            {label}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

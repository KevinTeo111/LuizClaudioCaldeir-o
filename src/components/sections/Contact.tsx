import { BrandIcon } from "@/components/ui/BrandIcon";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { WorkanaButton } from "@/components/ui/WorkanaButton";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="wrap">
        <Reveal className="noise relative overflow-hidden rounded-[var(--r-l)] bg-[linear-gradient(120deg,#695efe_0%,#a05dfd_45%,#ff6af8_100%)] px-6 py-16 text-center md:px-12 md:py-24" amount={0.3}>
          <span className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full bg-white/20 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-40 -left-24 size-[380px] rounded-full bg-[#ff6af8]/30 blur-3xl" />
          <RevealItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
              <span className="size-2 animate-pulse rounded-full bg-white" /> {site.availability}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="mx-auto mt-6 max-w-[16ch] text-[clamp(34px,5.4vw,72px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
              Have a product in mind? Let&apos;s build it.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] font-semibold text-white/85">
              Tell me what you&apos;re building and where it hurts. I reply within 24 hours with a plan, a timeline and a
              first demo date.
            </p>
          </RevealItem>
          <RevealItem className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <WorkanaButton size="lg" className="ring-2 ring-white/60" />
            <Button href={`mailto:${site.email}`} variant="white" size="lg">
              {site.email} <ArrowIcon />
            </Button>
            {site.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-13 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-bg"
              >
                <BrandIcon slug={s.id} label={s.label} className="size-5" />
              </a>
            ))}
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

const facts = [
  ["Experience", "8+ years · 40+ products"],
  ["Specialty", "SaaS, marketplaces, realtime"],
  ["Location", site.location],
  ["Response", "Within 24 hours"],
] as const;

/** Server component: uses /public/me.jpg when it exists, otherwise a generated frame. */
export function About() {
  const photo = existsSync(path.join(process.cwd(), "public", "me.jpg")) ? "/me.jpg" : null;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="About"
          title={
            <>
              The engineer behind <span className="text-grad">the work.</span>
            </>
          }
        />
        <Reveal className="mt-14 grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]" amount={0.15}>
          <RevealItem className="relative mx-auto w-full max-w-[420px]">
            <div className="grad-border is-on relative aspect-[4/4.8] overflow-hidden rounded-[var(--r-l)] border border-line bg-[linear-gradient(160deg,#141424,#0f0f1a)]">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={`Portrait of ${site.name}`} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(124,92,255,.35),transparent_70%)]" />
                  <span className="text-grad relative text-[clamp(120px,22vw,220px)] font-extrabold leading-none tracking-tighter">{site.name[0]}</span>
                  <span className="absolute bottom-24 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">add /public/me.jpg</span>
                </div>
              )}
              <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full px-5 py-3 text-[13px] font-bold">
                <span>{site.availability}</span>
                <span className="flex items-center gap-2 text-green">
                  <span className="size-2 animate-pulse rounded-full bg-green" /> Open
                </span>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <h3 className="text-[clamp(24px,2.4vw,32px)] font-extrabold tracking-tight">{site.role}</h3>
            <p className="mt-4 max-w-[58ch] text-[15.5px] font-medium text-muted">
              I&apos;ve spent eight years building web and mobile products for startups, agencies and a SaaS scale-up,
              from the first wireframe to the production deploy. I care about the whole thing: an interface that feels
              instant, an API that stays correct under load, a ledger that reconciles and a deploy nobody has to babysit.
            </p>
            <p className="mt-4 max-w-[58ch] text-[15.5px] font-medium text-muted">
              Lately that means Next.js and NestJS on PostgreSQL and Supabase, realtime systems that keep hundreds of
              devices in sync, marketplaces with automated payouts and AI features that act with a human still in the loop.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {facts.map(([k, v]) => (
                <div key={k} className="grad-border rounded-[var(--r-s)] border border-line bg-bg-2 px-5 py-4">
                  <b className="block text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted-2">{k}</b>
                  <span className="mt-1 block text-[14.5px] font-bold text-ink-2">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact">
                Work with me <ArrowIcon />
              </Button>
              <Button href={site.socials[1].href} variant="line" target="_blank">
                LinkedIn
              </Button>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

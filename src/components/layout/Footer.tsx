import { BrandIcon } from "@/components/ui/BrandIcon";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#05050a] py-12 text-muted">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#top" className="text-[22px] font-extrabold tracking-tight text-white">
            {site.name}
            <span className="text-grad">.</span>
          </a>
          <nav className="flex flex-wrap gap-1" aria-label="Footer">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition hover:bg-white/[0.06] hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            {site.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-line-2 text-ink-2 transition hover:border-accent hover:bg-accent hover:text-white"
              >
                <BrandIcon slug={s.id} label={s.label} className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[12.5px] font-medium">
          <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
          <span className="font-mono text-[11.5px] tracking-wide">
            Next.js 16 · React 19 · Tailwind 4 · Motion · Lenis
          </span>
        </div>
      </div>
    </footer>
  );
}

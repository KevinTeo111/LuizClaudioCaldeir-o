# Luiz — Portfolio

Single-page portfolio for a senior full-stack engineer. The hero plays a
cinematic showreel of real-world footage for each industry a project shipped
in (retail, entertainment, SaaS, legal, AI operations, fintech, logistics,
education) with a diagonal wipe between clips and the project named on every
one. Further down, every project card runs a live, coded UI scene (dashboard,
marketplace, realtime multi-device, mobile storefront, AI agent, editorial
site) rather than a screenshot, so the work is shown, not described.

## Stack

| Layer     | Choice                                                     |
| --------- | ---------------------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19, static prerender)        |
| Styling   | Tailwind CSS 4 with design tokens in `src/app/globals.css` |
| Animation | Motion 13 (`motion/react`) + Lenis smooth scrolling        |
| Icons     | simple-icons (tree-shaken per brand)                       |
| Fonts     | Manrope + JetBrains Mono, self-hosted in `src/app/fonts`   |

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

`dev` and `build` pass `--webpack` because Turbopack crashes with a native
exception on the Windows machine this was built on. Remove the flag to use
Turbopack where it works.

## Deploy

`.github/workflows/ci.yaml` is a quality gate: every push and pull request runs
install, typecheck, lint and build.

Deployment is done by Vercel's GitHub integration on the repository connected to
the Vercel project, so a push to `main` becomes a production deployment and a pull
request a preview, with no tokens or secrets in this repo. The `origin` remote is
configured to push to both GitHub repositories at once, so `git push` is the whole
release process.

## Edit the content

All copy lives in `src/data`; nothing personal is hard-coded in components.

| File                          | What it holds                                              |
| ----------------------------- | ---------------------------------------------------------- |
| `site.ts`                     | name, role, location, email, Workana link, socials, stats  |
| `projects.ts`                 | featured + more projects, metrics, stack, scene, image     |
| `showreel.ts`                 | hero clips: industry, one-line story, linked project, video|
| `services.ts`                 | the six service cards                                      |
| `experience.ts`               | career timeline                                            |
| `skills.ts`                   | skill groups, simple-icons slugs, proficiency levels       |
| `certifications.ts`           | credentials (**placeholders until real ones are added**)   |
| `testimonials.ts`             | client quotes                                              |

Optional assets:

- `public/me.jpg` — portrait for the About section (a generated frame shows until it exists).
- `public/work/*.jpg` — product images of the featured projects (captured from the live scenes);
  they appear as thumbnails in the hero captions. `src/app/opengraph-image.jpg` is the link preview.
- `public/certs/*.png` — set `image` on a certification to show the real certificate.
- `public/hero/*.mp4` + `.jpg` — the hero clips (6 s, 720p, ~1 MB each, sourced from Mixkit's
  free licence) and their poster frames. Swap any of them for your own footage or a screen
  recording of the real product; keep the same file names or update `showreel.ts`.
- `public/*.mp4` — set `video` on a project to play a real screen recording instead of the coded scene.

## Structure

```text
src/app                 layout, page, globals.css, icon.svg, fonts
src/data                all editable content
src/components/layout   Preloader, Header, Footer
src/components/sections Hero, StackStrip, FeaturedWork (sticky stack), MoreWork (accordion),
                        Skills, Experience (accordion timeline), Certifications,
                        Testimonials, Services, About, Contact
src/components/showreel IndustryReel (hero footage: autoplay, diagonal wipe, label,
                        caption, progress), ScenePreview and the six coded demo scenes
src/components/ui       Reveal, TiltCard, Button (magnetic), Marquee, Lightbox,
                        Counter, BrandIcon, Cursor
src/components/providers SmoothScroll (Lenis), Intro (preloader state)
```

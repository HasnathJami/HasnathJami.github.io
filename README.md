# Portfolio — Hasnath Jami Chowdhury

Personal portfolio site for **Hasnath Jami Chowdhury**, Android & cross-platform
engineer. Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4, and
laid out in clean-architecture layers.

Live sections: hero → experience → shipped apps (with Google Play screenshots)
→ open source → skills → about → contact.

---

## Stack

| Concern    | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, RSC)         |
| Language   | TypeScript 5 (strict)                            |
| Styling    | Tailwind CSS v4 with CSS-variable design tokens  |
| Motion     | `motion` (Framer Motion 13)                      |
| Icons      | `lucide-react` + inline brand SVGs               |
| Theming    | `next-themes` (class strategy, system-aware)     |
| Output     | Fully static export — deployable anywhere        |

---

## Architecture

Dependencies point inward. The domain knows nothing about React, Next.js or
where the content is stored.

```
src/
├── domain/                  Enterprise rules — entities + repository ports.
│   ├── entities/            Profile, Experience, AppProduct, CodeProject, …
│   └── repositories/        Interfaces the outer layers must satisfy.
│
├── application/             Use cases. Orchestrate the domain, framework-free.
│   └── use-cases/           GetProfile, GetAppShowcase, GetCareerTimeline, …
│
├── infrastructure/          Adapters. The only layer that knows the data source.
│   ├── content/             Typed, build-time content (the "database").
│   │   └── generated/       Screenshot manifest emitted by `npm run sync:media`.
│   └── repositories/        Static implementations of the domain ports.
│
├── di/                      Composition root — binds use cases to adapters.
│   └── container.ts
│
├── presentation/            React. Consumes use cases, never infrastructure.
│   ├── components/
│   │   ├── ui/              Primitives: Section, Chip, ActionLink, Reveal, …
│   │   ├── layout/          Header, footer, theme toggle.
│   │   └── sections/        One component per page section.
│   ├── hooks/               useActiveSection, useScrolled.
│   └── providers/           Theme provider.
│
├── shared/                  Cross-cutting: site config, `cn()` helper.
└── app/                     Next.js routing, metadata, sitemap, OG image.
```

**Dependency rule:** `app` → `presentation` → `di` → `application` → `domain`.
`infrastructure` also depends on `domain`, and nothing depends on
`infrastructure` except `di`.

Swapping the static content for a CMS or the live GitHub API means rewriting
`infrastructure/repositories/static-repositories.ts` and nothing else.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script                | What it does                                              |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | Dev server with hot reload                                 |
| `npm run build`       | Static production build → `out/`                           |
| `npm run build:server`| Node.js build instead (for `npm start`)                    |
| `npm run preview`     | Serve the built `out/` folder locally                      |
| `npm run typecheck`   | `tsc --noEmit`                                             |
| `npm run lint`        | ESLint                                                     |
| `npm run check`       | Typecheck + lint                                           |
| `npm run sync:media`  | Regenerate the screenshot manifest from `public/apps/`     |

---

## Editing the content

All copy lives in `src/infrastructure/content/` — no JSX edits required.

| File                      | Holds                                             |
| ------------------------- | ------------------------------------------------- |
| `profile.content.ts`      | Name, headline, bio, socials, headline metrics     |
| `experience.content.ts`   | Roles, achievements, stack, shipped products       |
| `apps.content.ts`         | Google Play apps, descriptions, contributions      |
| `projects.content.ts`     | Curated GitHub repositories                        |
| `skills.content.ts`       | Skill groups, language proficiency, tooling        |
| `credentials.content.ts`  | Education, awards, competitive-programming record  |

### Brand assets

| File                     | Used for                                        |
| ------------------------ | ----------------------------------------------- |
| `public/profile.jpg`     | Hero portrait                                    |
| `public/icon.svg`        | Favicon (vector, sharp at every size)            |
| `public/apple-icon.png`  | 512×512 touch icon                               |
| `public/og.png`          | 1200×630 social preview card                     |

These are plain files rather than Next.js generated routes, so static hosts
serve them with the correct `Content-Type`. Replace them in place to rebrand.

### Adding or refreshing app screenshots

1. Drop WebP files into `public/apps/<slug>/` named `<slug>-1.webp`, `-2.webp`, …
   and the icon as `<slug>-icon.webp`.
2. Run `npm run sync:media` — dimensions are read from the files themselves.
3. If the app is new, add an entry to `apps.content.ts` using that same slug.

---

## Deploying

`npm run build` produces a static `out/` directory with no server requirement.

Set the canonical URL first so metadata, sitemap and OG tags are correct:

```bash
# .env.local (or your host's environment settings)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Vercel** — import the repo; the defaults work as-is.

**Netlify** — build `npm run build`, publish directory `out`.

**GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes `out/` on
every push to `master`. Enable it once under *Settings → Pages → Source: GitHub
Actions*. The repo is a user site (`HasnathJami.github.io`), so it serves from
the root and needs no `basePath`. To host it from a project repo instead, set
`basePath` and `assetPrefix` to `/<repo-name>` for the static export.

**Any nginx / Apache / cPanel host** — upload the contents of `out/` to the web
root. `trailingSlash` is enabled, so clean URLs resolve to `index.html` without
extra rewrite rules.

**Node.js host** — `npm run build:server && npm start`.

---

## Accessibility & performance

- Fully keyboard navigable, including the screenshot lightbox (`←` `→` `Esc`).
- Skip-to-content link, semantic landmarks and labelled interactive controls.
- Respects `prefers-reduced-motion` — all animation is disabled when requested.
- Light and dark themes with system detection and no flash on load.
- Images are pre-sized WebP with intrinsic dimensions, so layout never shifts.
- `schema.org/Person` JSON-LD, sitemap, robots and a generated OG card.

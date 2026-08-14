# Liquid Portfolio

A one-page personal site with a liquid-glass segmented tab bar, a serpentine
career timeline, and three themes. All the content lives in a single file.

Built on the current Next.js (16, App Router), React 19, and Tailwind CSS 4.
Four runtime dependencies, no component library, no CMS, no analytics you
didn't ask for.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JonathanSeriesX/liquid-folio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JonathanSeriesX/liquid-folio)

Neither needs configuration — there are no required environment variables, so
a one-click deploy lands a working site.

## What you get

- **A tab bar with no JavaScript.** Hidden radio inputs plus `:has()`. The
  sliding thumb, the active label, and the panel swap are all CSS. It takes
  two to six tabs and folds onto two rows on phones (4 → 2+2, 5 → 3+2,
  6 → 3+3), centring a short bottom row.
- **Three themes** — light, dark, and a true-black variant — with a
  cross-fading picker and no flash on load.
- **A career timeline** that snakes between alternating cards, colours each
  segment from the entry above it, and can render a deliberate gap as a dashed
  stretch rather than pretending your CV is continuous.
- **Live project stats.** Each project can declare an async `stats()` that
  fetches real numbers — GitHub stars, rows in a CSV — cached and revalidated
  daily.
- **Motion that behaves.** Staggered entrances, a rolling word list in the
  hero, a drifting background glow; all of it disabled under
  `prefers-reduced-motion`.
- **Self-hosted fonts** via `next/font`, so no request ever leaves for Google.

## Quick start

```bash
pnpm install && pnpm dev
```

Then open http://localhost:3000. npm and yarn work too — delete
`pnpm-lock.yaml` first so your package manager writes its own.

## Making it yours

Everything you need to change is in **`site.config.tsx`**. The components in
`app/` read from it and hardcode nothing, so in most cases it is the only file
you will touch. It ships filled in with a fictional person — Ada Fernwright,
who does not exist — so you can see every feature working before you delete
her.

| Export | What it controls |
| --- | --- |
| `site` | Wordmark, title, description, URL, share image, theme colour, analytics token |
| `bodyFont` / `fontCredit` | The typeface, and an optional footer credit for licences that require one |
| `socials` | Footer icon links |
| `tabs` | The tab bar — two to six entries |
| `home` | Portrait, headline, the rolling word list, interests |
| `projects` | Project cards, their live stats, and the dashed "coming soon" ones |
| `career` | Timeline entries, and `{ gap: true }` rows |

The types are annotated, so an editor will autocomplete the fields and reject a
misspelled accent colour before you ever reload the page.

### Adding a tab

Two edits, and they have to agree:

1. Add an entry to `tabs` in `site.config.tsx`.
2. Render a matching `<article className="tab-panel">` in `app/page.tsx`, in
   the same position.

Tabs and panels are matched **by position** — the third tab shows the third
panel — so nothing needs an id, but the two lists must stay in the same order.
Short labels look best; six long ones will get cramped on a laptop.

### Portrait, favicon, share image

- **Portrait** — drop a square image in `public/` and set `home.photo`. Leave
  it `null` and the hero simply runs full width.
- **Favicon** — replace `app/icon.svg`. Any `icon.png` / `icon.ico` there works
  too; Next picks it up automatically.
- **Share image** — drop a 1200×630 file in `public/` and point `site.ogImage`
  at it. Left `null`, link previews fall back to title and description.

### Colours

The palette lives at the top of `app/globals.css` as custom properties:
`--paper`, `--ink`, `--accent` and friends, redefined under `html.dark` and
`html.black`. Change `--accent` in all three blocks and the whole site follows
— links, pills, the cycler, the timeline.

The named palette (`--c-azure`, `--c-amber`, `--c-violet`, `--c-emerald`) backs
the `accent-*` classes that individual cards and timeline rows can opt into.
Add your own by declaring `--c-yours` and a matching `.accent-yours` beside the
others, then add the name to the `Accent` type in the config.

### Analytics

Optional, and off unless you ask for it. Set `NEXT_PUBLIC_CF_BEACON_TOKEN` for
[Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/)
and the beacon renders; leave it unset and no script tag is emitted at all.
See `.env.example`.

`NEXT_PUBLIC_*` values are inlined at build time, so a token you add after a
deploy only takes effect on the next one.

## A note on fonts

The default is Montserrat, self-hosted through `next/font/google`. Swapping it
is a two-block comment change in `site.config.tsx` — the rest of the site only
ever refers to `--font-body`.

If you switch to a licensed retail face, check what you are allowed to do
before you push: most licences forbid redistributing the font file, which a
public repo does by definition. Keep those in a private fork. Some also ask
for on-page attribution — set `fontCredit` and it renders in the footer.

## Licence

MIT — see [LICENSE](LICENSE). Use it for anything, no attribution required
(though a link back is always nice). The sample content and the fictional
persona are yours to delete.

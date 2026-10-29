# Retina Paints — website

A redesign of [retinapaints.com](https://www.retinapaints.com), built with [Astro](https://astro.build) as a fast, fully static site. All business content was taken from the live site (crawled 29 Oct 2026). See **[AUDIT.md](./AUDIT.md)** for the content inventory and the source discrepancies that need a decision from Retina Paints.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run verify     # type-check + production build + link/route check
npm run preview    # serve the production build from ./dist
```

Requires Node 22.23+.

| Script | What it does |
| --- | --- |
| `npm run check` | `astro check`: TypeScript and template diagnostics |
| `npm run build` | Static build to `./dist` (images optimised to WebP, responsive `srcset`) |
| `npm run check:links` | Confirms every internal link and `#anchor` resolves and every URL crawled from the live site still exists |

## Configuration

Copy `.env.example` to `.env`.

- **`PUBLIC_FORM_ENDPOINT`**: an HTTPS endpoint that accepts `multipart/form-data`. The franchise, expert-advice/callback, contact and job-application forms POST here. Field names match the original WordPress forms (Forminator #4899, #4919, #4805 and Simple Job Board), and each submission includes `form=franchise|advice|contact|job`. **When this is unset, forms open a pre-filled email** to the right inbox (franchisee@, info@, careers@). Set this before going live.
- **`PUBLIC_DOCS_ORIGIN`**: where `/policy-documents/` and `/technical-docs/` PDFs are served from. It defaults to the live site. Set it to an empty string if those folders are deployed alongside this build.

## Structure

```
src/
  data/          All content. Edit here, not in templates.
    site.ts          company facts, contacts, navigation
    products.ts      categories, products, specs, warranties
    shades.json      1,002 shades from colors-all.xml, grouped into 7-shade strips
    stores.json      store locator data
    jobs.json        job posts (sanitised HTML)
    investor-documents.json   IR document lists, generated from the live pages
    about.ts, franchise.ts, news.ts, investors.ts, colours.ts, jobs.ts, pages.ts
  components/    Header, Footer, ProductCard, Visualizer, EnquiryForm, DocBlocks, …
  layouts/       BaseLayout, AboutLayout, InvestorLayout
  pages/         Routes mirror the live URLs exactly (see below)
  scripts/       site.ts (menus, dialogs, reveal, forms, search), visualizer.ts
  styles/        tokens.css (design tokens), global.css
scripts/check-links.mjs, live-routes.json, generate-lightmaps.py
```

### Colour visualizer

`src/components/Visualizer.astro` and `src/scripts/visualizer.ts` power both `/colors/` and the homepage section. Each room is drawn as four stacked layers:

1. **Paint**: a plain fill in the selected shade (`--wall-a`; `--wall-b` is the right half in compare mode).
2. **Shade map** (`mix-blend-mode: multiply`): contact shadows around furniture, ceiling fall-off and faint paint texture.
3. **Light map** (`mix-blend-mode: screen`): soft daylight from the room's window.
4. **Room overlay**: the original room image with its walls cut out (transparent).

The overlay is on top and opaque everywhere except the walls, so furniture, floors, curtains and plants are never tinted. This was verified pixel by pixel in tests.

The maps in `src/assets/rooms/light/` are generated from each overlay's wall mask:

```bash
python3 scripts/generate-lightmaps.py   # needs numpy and Pillow
```

Re-run it whenever a room overlay changes. Per-room settings (shadow strength, window position) are at the top of the script.

Other behaviour:
- Shades come only from `src/data/shades.json` (the live `colors-all.xml`).
- The Light/Medium/Dark filter uses each shade's CIE L* lightness (cut points 84 and 66 split the catalogue into near-equal thirds).
- `/colors/#QC0131` deep-links to a shade.

### URLs

Every route on the live site is preserved, including legacy slugs: `/products/emulsion/whether-expert/`, `/coarse-putty/`, `/elementor-3030/` (Financial Results), `/egm/`, `/postal-ballot/` and the two news posts at the site root. New routes: `/investor-relations/` (overview), `/search-index.json` and `/sitemap.xml`. Redirects: `/about-us/` → Company Profile, `/blog/` (a 404 on the live site) → News & Events. The WordPress search URL `/?s=keyword` opens the site search.

## Design system

- **Colour**: white and warm white dominate. `--orange-500` (#F28020, matched to the logo) is used for fills and accents. Text on orange is near-black (#1B1714, 6.4:1). Orange text on white uses `--orange-700` (#AD4C0A, 5.6:1). See `src/styles/tokens.css`.
- **Type**: Manrope (display and UI) with Inter (body), self-hosted via Fontsource and preloaded. Fluid `clamp()` scale: display 42→76px, H2 30→48px, body 16→17px.
- **Layout**: 1320px container, fluid gutters, 8px spacing rhythm, 12-column grids.
- **Motion**: CSS only. Restrained reveal-on-scroll and hover states, all disabled under `prefers-reduced-motion`.

## Quality checks (last run)

- `astro check`: 0 errors, 0 warnings, 0 hints across 72 files.
- `check:links`: 64 pages and about 10,000 internal links, all resolving. All 59 live routes are present.
- Responsive sweep at 375, 390, 768, 1024 and 1440px on every route: no console errors, no failed requests, no horizontal overflow.
- Lighthouse (mobile, throttled), 12 pages: Performance 96–100, Accessibility 100, Best Practices 100, SEO 100. CLS 0 everywhere.
- Interaction tests (puppeteer, run outside the repo): 23/23 site checks (search, forms, dialogs, store locator, careers filter, tabs, mega menu, mobile drawer) and 30/30 visualizer checks. The visualizer checks cover family and shade selection, wall-only repainting compared pixel by pixel, room switching, search, reset, keyboard navigation, compare, deep links and mobile at 375, 390 and 430px.

## Deployment

The output in `dist/` is plain static files and can be hosted anywhere (Vercel, Netlify, Hostinger, S3 or nginx). If it replaces the WordPress site on the same domain, keep `/policy-documents/`, `/technical-docs/` and the WordPress uploads used by some investor PDFs (see AUDIT.md), or migrate them first.

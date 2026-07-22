---
title: mikemurphy.ai Site Build Log
created: 2026-07-11
updated: 2026-07-22
status: living-doc
---

# mikemurphy.ai Site Build Log

_Renamed from SITE_BUILD_LOG.md → BUILD_LOG.md (2026-07-17)._

Living note for the Astro rebuild. Use it for memory, future blog seeds, and “what did I ship?” check-ins.

- **Site:** https://mikemurphy.ai
- **Repo:** https://github.com/mikemurphyco/mikemurphy-ai
- **Local:** `~/Code/Projects/mikemurphy-ai`
- **Related:** [POST_LAUNCH.md](./POST_LAUNCH.md)

> Tip: if Obsidian is messy, keep *this* file as the source of truth and link/copy into the vault when useful.

---

## Tech stack (current)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Astro 6 | Static output |
| Content | Content Collections + MDX | `articles`, `aiUnplugged` (local MD); `fieldNotes`, `resources` (Directus) |
| Styling | Tailwind 4 + `global.css` tokens | Design System v2026.3 (`--mm-*`) |
| Search | Pagefind 1.5 | Indexed in `postbuild` |
| Newsletter send | Beehiiv | Archive owned by Astro |
| Hosting | Cloudflare Pages | Deploy on push to `main` |
| Node | ≥ 22.12 | See `package.json` engines |

### Scripts

```bash
npm run dev          # local Astro (Pagefind index missing until build)
npm run build        # astro build → postbuild runs Pagefind
npm run preview      # serve dist (search works here)
npm run qa:launch    # smoke-check key routes in dist
```

### Pitfall: `npm run import:ai-unplugged` (migration-only)

**Do not run casually.**

- Script: `scripts/import-ai-unplugged-from-obsidian.mjs`
- Purpose: one-shot Obsidian → Astro **bulk migration** of the AI Unplugged archive
- Behavior: **deletes all** `.md`/`.mdx` in `src/content/ai-unplugged/`, then regenerates every issue from the MikeOS newsletter folder
- Not the weekly publish path — keep for history; day-to-day publish is Beehiiv → Astro (publish skill / manual content edit)
- Optional args exist (`[sourceDir] [outputDir]`), but the default run is still a full wipe-and-rewrite

### Important paths

```text
src/content/articles/YYYY/*.md     # tutorials, articles, podcast episodes
src/content/ai-unplugged/*.md      # newsletter issues
src/styles/global.css              # brand tokens + mm-* utilities
src/lib/articles.ts                # content helpers, SITE_URL
src/lib/site.ts                    # email, socials, feeds
src/lib/agent.ts                   # agentReadable helpers
src/lib/rss.ts                     # RSS XML builder
public/assets/                     # media + brand
```

---

## Human hubs

| Hub | URL | Role |
|-----|-----|------|
| Home | `/` | Hub + inline search |
| Tutorials | `/tutorials/` | Flagship |
| AI Unplugged | `/ai-unplugged/` | Newsletter archive + subscribe |
| Articles | `/articles/` | Long-form / archive |
| Podcast | `/podcast/` | MMU episodes (on-site hub) |
| Search | `/search/` | Full Pagefind UI |
| About | `/about/` | Story + socials |
| Contact | `/contact/` | Intent routing + mailto (no form) |
| Resources | `/resources/` | Resource guides |
| Topics | `/topics/` | Topic index |

---

## Machine-readable surfaces

Not an AI-SEO cheat code. These make the site followable and easy for tools/agents pointed at the domain.

| Surface | URL | Benefit |
|---------|-----|---------|
| Tutorials RSS | `/tutorials/rss.xml` | Follow new tutorials |
| AI Unplugged RSS | `/ai-unplugged/rss.xml` | Open-web follow path next to Beehiiv |
| Agent index | `/ai-unplugged/agent.json` | Issues with summary / claims / entities |
| Per-issue JSON | `/ai-unplugged/issues/{slug}.json` | One issue, structured |
| Markdown mirrors | `{any content URL minus trailing slash}.md` | Raw Markdown of every tutorial / article / podcast episode / issue / field note — static files emitted at build time |
| Resources Markdown | `/resources.md` | Full resource list as one Markdown file |
| llms.txt | `/llms.txt` | Short hub map for machines |
| Sitemap | `/sitemap.xml` | Standard discovery |
| robots.txt | `/robots.txt` | Allow + sitemap |

Every page also gets `<link rel="alternate" type="application/rss+xml">` for both feeds.

### Why future Mike will be glad

1. Beehiiv stays email; RSS is the open archive follow path
2. `agentReadable` frontmatter is now a real API (not buried YAML)
3. Next agent/MCP/RAG demo has endpoints instead of HTML scraping
4. Brand fit for an AI-builder audience
5. Surfaces rebuild with the site — low maintenance after deploy

---

## Feature inventory (highlights)

### Design system
- Tokens in `global.css` (`--mm-cream`, `--mm-navy`, `--mm-orange`, …)
- Shared utilities: `mm-container`, `mm-button`, `mm-card`, `mm-polaroid`, `mm-prose`
- IBM Plex Sans / Mono + Murphydoodle
- Light Shiki code blocks (chalk ground, navy ink)

### Search (Pagefind)
- Full-body index via `data-pagefind-body` on content templates
- Type filters: Tutorial | Article | Podcast | Issue
- `InlineSearch` on home + hub indexes; full UI on `/search/`
- Index only exists after `npm run build` / preview

### About & Contact
- Shared `SocialLinks` (YouTube, Apple Podcasts icon, X, LinkedIn, Instagram, GitHub)
- URLs centralized in `src/lib/site.ts`
- About: polaroid + bio + “Find me”
- Contact: say hi / work with me / follow along → mailto or AI Unplugged
- No contact form (yet)
- Footer social icons; Connect “Podcast” still goes to `/podcast/`
- Apple Podcasts URL is **social icon only** — does not replace the podcast page

### Newsletter
- Beehiiv magic-link subscribe forms
- Astro owns the native issue archive
- Issues carry `agentReadable` in frontmatter

---

## Changelog

### 2026-07-22 — Markdown emission migration: runtime Worker → build-time files

**Context:** `.md` URLs (agent-readable Markdown mirrors of content pages) were
served by a runtime Cloudflare Worker (`src/worker.js`) that intercepted every
`.md` request, looked the slug up in a generated manifest
(`scripts/generate-content-manifest.mjs`, `prebuild` step), fetched the raw
file from GitHub raw, and stripped frontmatter/MDX on the fly. Per the
markdown-emission-migration plan, replaced with **real `.md` files emitted at
build time** — straight from content-collection source, no HTML round trip, no
Worker invocation, free edge-cached static assets.

**Added** (all modeled on the existing `field-notes/[slug].md.ts`):
- `src/pages/tutorials/[slug].md.ts` (397 files), `articles/[slug].md.ts` (36),
  `podcast/[slug].md.ts` (162) — same `getStaticPaths` filters as their
  `.astro` siblings, so `.md` coverage matches HTML routes 1:1
- `src/pages/ai-unplugged/issues/[slug].md.ts` (67) — links its companion
  `.json` agent doc in frontmatter
- `src/pages/resources.md.ts` — single grouped index (resources have no detail pages)
- `src/lib/markdown-endpoint.ts` — shared frontmatter builder (title,
  description, date, author, canonical, tags) + response helper
- `public/_headers` — `/*.md → Content-Type: text/plain` so browsers render
  inline instead of downloading (`text/markdown` triggers downloads)
- `llms.txt` now documents the "append `.md`" convention + links `/resources.md`

**Removed (Worker fully retired):** `src/worker.js`, the manifest script +
`prebuild` step, and `main` from `wrangler.toml` — the deployment is now pure
static assets, zero Worker invocations. No coverage regression: the old Worker
only served the `articles` collection; build-time now covers strictly more
(662 emitted `.md` files + resources index). URL contract unchanged.

**Verified locally:** `wrangler dev` serves all `.md` routes 200 as
`text/plain`, HTML routes unaffected, `dist/` contains no
`content-manifest.json`. Rollback = revert the commit (worker + manifest come
back intact).

### 2026-07-22 — Directus-driven Field Notes & Resources (build-time fetch)

**Context:** Field Notes (new) and Resources (was a hardcoded array) now come from
Directus as the source of truth; Articles stay local Markdown (hybrid model).
Astro fetches published items at build time with a committed JSON snapshot
fallback (deploys from snapshot + warning if Directus is unreachable — never
hard-fails). Publishing in Directus triggers a rebuild via a Cloudflare deploy
hook. Not yet live — see `SETUP-DIRECTUS.md` for the 3 remaining manual steps
(read-only token, Cloudflare build vars, publish Flow).

**Architecture pivot (same day):** Originally designed around Tailscale-only
Directus, requiring a GitHub Actions runner to join the tailnet (`tag:ci` OAuth +
ACLs + wrangler deploy). Mike then exposed Directus publicly at
`https://cms.imurph.com` (Cloudflare-fronted, hardened: 2FA, brute-force
protection, side-door controls) to use it as intended — including future
AI-agent access to structured data. That retired the entire Tailscale-in-CI
apparatus: `deploy.yml` deleted, deploys stay on Cloudflare Workers Builds as
before, secrets live in Cloudflare build settings. Net simplification.

**LAUNCHED (same day):** Merged to `main` (d552bf4) and verified live in
production — `/field-notes/`, per-note pages, `/resources/`, homepage "Fresh
tips before you go", `/api/field-notes.json`, `/api/resources.json`, per-note
`.md`, and `llms.txt` all 200 on mikemurphy.ai. First live build pulled **5
Field Notes + 38 Resources** (with 38 self-hosted logos) from cms.imurph.com.

**Full publish loop verified:** Directus Flow "Publish → Rebuild Site"
(Event Hook, non-blocking, items.create/update on Field_Notes + Resources) →
POST to Cloudflare deploy hook → rebuild fetches live Directus → deploy.
Hook-triggered builds show "Empty commit message" in Cloudflare build history
(normal — no git commit involved; named commit = code change, empty = Directus
publish). Read-only `astro-bot` token in Cloudflare build vars; old admin
inspection token revoked.

**Same-day refinements after first live preview:**
- Homepage: added "Fresh tips before you go" — the 2 newest Field Notes as
  cards above the footer (Mike's original concept; auto-rotates on publish);
  removed the placeholder "Recent from the archive" section + sidebar.
- Resources categories fully Directus-driven: section blurbs from
  `resource_categories.section_description`, section order from category
  `sort` (drag-and-drop), removed hardcoded "Future shelf" boxes. Page shows
  ALL published resources (shelf filtering reserved for future Books/Studio/
  Favorites pages).
- Decision: Resources stays list-only (no per-resource pages) — the row +
  `recommendation_reason` + Visit link covers it; detail pages become worth
  it later when they can aggregate related tutorials/notes per tool.

**Deferred / known follow-ups:**
- Flow fires on every save incl. drafts → add a `status = published`
  condition in the Flow if build noise bugs us.
- Swap white logos in Directus for dark/color variants (they vanish on light
  badges); next publish picks them up automatically.
- `SETUP-DIRECTUS.md` converted from checklist to how-it-works reference.

**Shipped (code complete, local build green on snapshot fallback):**
- [x] Content Layer loaders + snapshot fallback: `src/lib/directus.ts`,
  `src/lib/directus-loader.ts` (fetch published items, `::warning::` + snapshot on
  failure, self-host Resource logos, flatten M2M tags). Snapshots in
  `src/content/_snapshots/` (committed; currently SAMPLE data until first live build).
- [x] Collections + Zod schemas for `fieldNotes` + `resources` in `content.config.ts`;
  helpers in `src/lib/field-notes.ts`.
- [x] Pages: `/field-notes/` (2 featured boxes + clickable list), `/field-notes/<slug>/`,
  and rewritten `/resources/` (Directus data, grouped by category, affiliate-link
  resolution, hex badge colors, logo/initials fallback). Footer nav gains Field Notes.
- [x] Agent/AI-SEO artifacts: `/api/field-notes.json`, `/api/resources.json`, per-note
  `/field-notes/<slug>.md`, and `llms.txt` extended with both collections.
- [x] `src/worker.js` guard so `/field-notes/*.md` are served as static assets
  (not routed through the Articles GitHub-raw `.md` handler).
- [x] ~~`.github/workflows/deploy.yml`~~ — built for the Tailscale design, then
  deleted after the public-CMS pivot (Cloudflare Workers Builds handles deploys).

**Schema notes (reconciled against live Directus):** Directus TODO — add `excerpt`
to Field_Notes (done 2026-07-22), make `slug` required+unique. Resources page shows
ALL published resources for now; `shelf` filtering reserved for future Books/Studio/
Favorites pages (`MAIN_SHELF_TITLE` in `src/lib/directus.ts`).

**Files:**
- `src/lib/directus.ts`, `src/lib/directus-loader.ts`, `src/lib/field-notes.ts`
- `src/content.config.ts`, `src/content/_snapshots/*.json`
- `src/pages/field-notes/index.astro`, `src/pages/field-notes/[slug].astro`,
  `src/pages/field-notes/[slug].md.ts`, `src/pages/resources/index.astro`
- `src/pages/api/field-notes.json.ts`, `src/pages/api/resources.json.ts`, `src/pages/llms.txt.ts`
- `src/worker.js`, `src/layouts/Layout.astro`, `.github/workflows/deploy.yml`, `SETUP-DIRECTUS.md`

### 2026-07-17 — Fix mid-word wrap on `.mm-display` headings

**Shipped:**
- [x] Fixed the homepage hero headline wrapping "KNOWLEDGE" mid-word into "KNOWL" / "EDGE" at certain viewport widths — looked like a kerning bug (it isn't; `.mm-display` uses IBM Plex Mono, a monospace font with no letter-to-letter kerning at all) but was actually the browser's default line-break behavior splitting a long word instead of wrapping it whole.
- [x] Added `word-break: keep-all` + `overflow-wrap: normal` to `.mm-display` in `src/styles/global.css` — long words now always wrap as whole units. Only two usages site-wide (`/` hero, `/ai-unplugged/` hero), both short headlines, so no regression risk.

**Files:**
- `src/styles/global.css` — `.mm-display` rule

### 2026-07-17 — MurphBot polish, CI, and iOS animation fix

**Shipped:**
- [x] Fixed MurphBot's waving hand visibly detaching from its arm: the hand dot and arm `<line>` weren't grouped, and the dot's rotation origin was its own position instead of the shoulder joint, so the dot spun in place while the arm stayed static. Grouped them and pivot from the shoulder (152, 76) so the whole limb swings together.
- [x] Added a lightweight CI workflow (`.github/workflows/ci.yml`): on every push/PR to `main`, runs `npm ci` → `npm run build` (Astro + Pagefind) → `npm run qa:launch`. No deploy step — Cloudflare's git integration still owns that. First run passed clean in ~46s.
- [x] Needed the `workflow` OAuth scope added to the local `gh`/git credential before GitHub would accept a push touching `.github/workflows/` — a one-time `gh auth refresh -s workflow` device-code approval.
- [x] Fixed two pre-existing bugs in `scripts/qa-launch.mjs` surfaced by actually running it clean: `routeFile()` only special-cased `.xml`/`.txt` extensions, so it checked `agent.json` at the wrong dist path and reported it missing; and a stale redirect sample still expected `adobeauditionnewfile`'s old `/articles/` canonical destination instead of its current `/tutorials/` one.
- [x] Fixed MurphBot not animating on iOS Safari: WebKit doesn't run CSS `@keyframes` declared inside an externally referenced `<img src="*.svg">` — a known platform limitation, not a bug in the SVG. Moved the SVG markup directly into `src/pages/404.astro` instead of loading it via `<img>`. Verified the fix with a real WebKit engine (Playwright), not just Chromium.
- [x] Now that MurphBot is inlined, dark-mode ink color follows the site's own `--mm-navy`/`--mm-chalk` tokens through the manual light/dark toggle (`html[data-theme='dark']`) instead of the OS-level `prefers-color-scheme` media query used previously — an inlined SVG can see the page's `data-theme` attribute, an `<img>`-referenced one can't.

**Decisions:**
- `public/assets/brand/murphbot.svg` is no longer wired into the 404 page but stays in place as a standalone brand asset (same role as `murphbot.png` — thumbnails/social), now stale relative to the inlined version if edited further
- CI is a pre-merge safety net only, not a deploy pipeline — keep Cloudflare's existing git-integration deploy as-is unless something forces a change
- Custom-404 changes must still be smoke-tested with `wrangler dev` (Workers static-asset routing) *and* a real WebKit engine (iOS animation behavior) — Astro's own dev/preview server and Chromium don't reproduce either issue

**Files:**
- `.github/workflows/ci.yml` — new
- `scripts/qa-launch.mjs` — bug fixes
- `src/pages/404.astro` — MurphBot inlined, arm/hand grouping fix, theme-token colors
- `public/assets/brand/murphbot.svg` — arm/hand grouping fix (kept in sync while still linked; now standalone)

### 2026-07-17 — MurphBot 404 page

**Shipped:**
- [x] `src/pages/404.astro` — real Astro page (not a static handoff snippet), built on the shared `Layout` so it gets header/footer/theme-toggle for free; reuses existing `.mm-eyebrow` / `.mm-h1` / `.mm-lede` / `.mm-button` tokens instead of one-off inline CSS
- [x] MurphBot character (Node-mark robot) as the 404 mascot, terminal-style "0 results found" copy block, Home / Tutorials CTAs
- [x] `public/assets/brand/murphbot.svg` — restored the float/blink/wave CSS animation that the design handoff's README promised but the shipped SVG was missing; respects `prefers-reduced-motion`
- [x] Fixed a dark-mode bug: MurphBot's navy limbs/eyes/mouth were invisible against the navy dark background — added a `prefers-color-scheme: dark` swap to chalk inside the SVG's own `<style>` (the `<img>`-embedded SVG can't see the page's `data-theme` toggle, but it does see OS color scheme)
- [x] Verified in both themes with a Playwright screenshot pass (light + dark), plus a production `npm run build` to confirm `dist/404.html` and the SVG land correctly for Cloudflare's static 404 handling
- [x] Seeded `mike-design-system/assets/characters/murphbot/` (svg + png + README) as the character's home for reuse, with a note that it's slated to become an animated Remotion component in `mike-video-factory`
- [x] Cleaned up the now-empty `handoff/` staging folder (was untracked, nothing lost)
- [x] **Fix:** first deploy served Cloudflare's generic "page can't be found" screen instead of `dist/404.html` — this site deploys as Cloudflare **Workers static assets** (`[assets]` in `wrangler.toml`), which does not serve `404.html` on a miss unless told to. Added `not_found_handling = "404-page"` to `wrangler.toml`. Verified locally with `npx wrangler dev` (not just `astro dev`/`astro preview`, which don't reproduce Workers' asset-routing behavior).

**Decisions:**
- 404 page content is a first-class Astro page wired into the design system, not a pasted-in static snippet — keeps chrome, tokens, and dark mode as the single source of truth
- MurphBot lives as a plain `<img>`-referenced SVG (not inlined) for simplicity; dark-mode contrast handled via `prefers-color-scheme` inside the SVG rather than inlining the whole character into the page
- Custom-404 changes must be smoke-tested with `wrangler dev`/`wrangler deploy`, since Astro's own dev/preview servers don't exercise Cloudflare's `not_found_handling` behavior

**Files:**
- `src/pages/404.astro` — new
- `public/assets/brand/murphbot.svg` — new
- `mike-design-system/assets/characters/murphbot/` — new (murphbot.svg, murphbot.png, README.md)

### 2026-07-17 — Theme toggle: icon-only (no labeled button)

**Shipped:**
- [x] Replaced the bordered Dark/Light CTA with a quiet icon-only control so it no longer competes with Subscribe
- [x] Moon icon in light mode; line-style sun icon in dark mode
- [x] Transparent chrome, muted color, orange hover — utility affordance, not a second button
- [x] Home polaroid stays chalk paper in both themes (dark hard shadow, not chalk offset)
- [x] Home “AI Handyman” badge: CSS replaces opaque PNG; polaroid+badge share one 248px centered stack. Hero composition matches design-system row (eyebrow/h1/lede/CTAs | art with `items-center`); stats + topic pills moved below that row so centering isn’t measured against the taller meta block. No viewport `min-h`, no translate offsets.

**Decisions:**
- Theme control stays next to Subscribe in the header, but must read as chrome, not a CTA
- Polaroid is a physical print metaphor — keep chalk paper even on navy page backgrounds
- Brand badge ribbons should be CSS (or truly transparent assets), never cream-plated PNGs

### 2026-07-17 — Light / Dark mode (Phase 3)

**Shipped:**
- [x] Light is default; dark is opt-in via header toggle
- [x] Early inline script reads `localStorage.mm-theme` before paint (no flash)
- [x] `html[data-theme="dark"]` remaps semantic tokens per design-system §10 (navy surface, chalk ink, chalk cut-shadow)
- [x] `ThemeToggle.astro` in header (desktop + mobile) — later simplified to icon-only
- [x] Ink/paper hardcodes moved to semantic tokens across pages/cards/search
- [x] Intentionally left alone: footer navy band, orange SubscribeBand, inverse navy sections, light code blocks

**Decisions:**
- Manual Light/Dark toggle only for v1 (no System auto yet)
- Brand hexes (`--mm-navy`, `--mm-cream`, etc.) stay fixed; semantic roles invert
- Orange/teal unchanged in dark mode
- Code blocks stay chalk/navy paper in both themes

**Files:**
- `src/styles/global.css` — dark remap + code-frame dark border
- `src/components/ThemeToggle.astro` — new
- `src/components/SiteHeader.astro` — toggle + semantic header colors
- `src/layouts/Layout.astro` — anti-flash theme boot script
- Cards / indexes / InlineSearch / Pagefind UI → semantic tokens

### 2026-07-16 — Fix /resources/ shadowed by legacy WordPress article

**Commits:** `3111782`

**Shipped:**
- [x] Deleted `src/content/articles/2022/resources.md` — its frontmatter still carried the old WordPress `permalink: "/resources/"`, which `generate-redirects.mjs` read and wrote as `/resources/ -> /articles/resources/` into `public/_redirects`. That 301'd every visit to the real hand-built page (`src/pages/resources/index.astro`, 12-tool AI-builder stack) away to the messy legacy import before it ever rendered
- [x] Added `/articles/resources/ -> /resources/` to the generator's manual seed redirects (survives regeneration) so old links still land on the current page

**Decisions:**
- When a legacy WordPress article's slug collides with a real Astro page route, delete the article rather than let it coexist — `generate-redirects.mjs` reads any article's `permalink`/`legacyPermalink` frontmatter as a redirect *source*, so a stale legacy permalink can silently shadow a real static route

**For a future post:**
- "The redirect that ate my own page" — how a generated `_redirects` file can outrank a real static route on Cloudflare Pages, and why frontmatter-driven redirects need a collision check against `src/pages/`

### 2026-07-16 — Legal policy pages

**Commits:** `462ddb4`

**Shipped:**
- [x] Four legal pages, styled to match the site's editorial prose system: `/privacy-policy/`, `/terms-of-service/`, `/disclaimer/`, `/accessibility-statement/`
- [x] Linked from the footer's legal nav (`src/layouts/Layout.astro`)

### 2026-07-11 — Sticky header fix + content-lane cleanup

**Commits:** `62b19d2`, `bed7a92`, `eb5b377`

**Shipped:**
- [x] Sticky header actually sticks now — `body` had `height: 100%`, which caps the body box at one viewport; `position: sticky` can never leave its parent's box, so the header un-stuck after one screen of scroll. Fix: `min-height: 100%` in `Layout.astro`
- [x] Moved 42 how-to posts from the Articles lane to Tutorials (lanes now 395 tutorials / 162 podcast / 37 articles). Legacy WordPress categories (`Blog` + topic, no `Tutorials`) were stranding them — including 7 recent AI-era tutorials (rag, telegram, postman, n8nsafeupdates, llmwiki, openclawhttps, sshpasswords)
- [x] Regenerated `public/_redirects` via `scripts/generate-redirects.mjs` — old `/articles/<slug>/` URLs 301 to `/tutorials/<slug>/`
- [x] Tutorial cards no longer show a redundant `TUTORIALS` pill — `TutorialCard.astro` filters it before the 3-term slice, so all three slots go to descriptive topics

**Decisions:**
- Lane routing recap: one collection (`src/content/articles`), lane derived from `categories` in `src/lib/articles.ts` — `Tutorials` → `/tutorials/`, `Episodes` (or `epNN` slug) → `/podcast/`, else `/articles/`. New tutorials MUST include `"Tutorials"` in categories at publish time
- Changing a post's lane = update `categories` + `canonicalUrl`, then re-run `node scripts/generate-redirects.mjs`. Never hand-edit `public/_redirects` (generated file)
- Kept in Articles on judgment: essays, announcements, gear guides/reviews, course pages, workflow overviews (and the corn-on-the-cob recipe)

**For a future post:**
- "The CSS bug that broke my sticky header" — sticky is confined to its parent's box; `height` vs `min-height` on body
- "Auditing 595 migrated WordPress posts with a 60-line Node script" — lane counts, canonical checks, duplicate-slug detection
- Category-driven routing in Astro: one collection, three URL lanes

### 2026-07-11 — Socials + agent surfaces

**Commits**
- `5d8140a` — Add shared social links to About, Contact, and footer
- `84c57f0` — Add RSS feeds, agentReadable JSON, and llms.txt for machine discovery

**Shipped**
- [x] `src/lib/site.ts` — email, socials, feeds
- [x] `SocialLinks.astro` — default / compact / footer
- [x] About “Find me” + Contact intents + footer icons
- [x] `/tutorials/rss.xml` + `/ai-unplugged/rss.xml`
- [x] `/ai-unplugged/agent.json` + per-issue `.json`
- [x] Issue sidebar “For agents” block
- [x] `/llms.txt`
- [x] QA routes updated in `scripts/qa-launch.mjs`

**Decisions**
- No contact form in Phase 2
- No Cmd+K yet (human polish; not agent infrastructure)
- Agent-friendly order: RSS → expose agentReadable → light llms.txt → thin Cmd+K later
- llms.txt/RSS/JSON help agent *usability*, not guaranteed AI citations

### 2026-07-10 (approx) — Search + design momentum

From recent `main` history:
- Pagefind replaces hand-rolled search
- Inline search on home, articles, podcast, issues
- Design system milestones M1–M6 (tokens, type, favicons/OG, nav, Beehiiv band, Pagefind)
- Articles/topics rebrand to mm system
- Light code-block treatment

*(Expand with screenshots / talking points when ready.)*

### 2026-07-11 — Document import:ai-unplugged as migration-only

- Marked `npm run import:ai-unplugged` as a destructive one-shot Obsidian → Astro migration
- Normal weekly path is Beehiiv → Astro, not this importer
- Warning added at top of `scripts/import-ai-unplugged-from-obsidian.mjs`

---

## Explicitly deferred

| Idea | Status | Why wait |
|------|--------|----------|
| System theme (follow OS) | Later | Manual toggle first; avoid surprise dark on first visit |
| Thin Cmd+K search modal | Later | Third UI; a11y/mobile; needs built Pagefind index |
| Copy-code button on `pre` | Later | Remaining Phase 3 polish |
| Full command palette | Much later | Product-sized |
| Contact form | Later | mailto enough until volume/spam hurts |
| Cal.com booking | Later | Only if consulting becomes a real funnel |
| Extra podcast platforms | Later | Apple Podcasts icon is enough for now |
| Re-run `import:ai-unplugged` | Avoid | Migration-only; wipes `src/content/ai-unplugged/` |

---

## Blog / content seeds

1. WordPress → Astro migration story (stack + cutover)
2. What “agent-friendly” meant here (RSS + JSON + llms.txt without hype)
3. Why no contact form (yet)
4. Pagefind on a static Astro site
5. Exposing newsletter `agentReadable` as JSON

---

## Keep this note useful

When you ship something meaningful:

```markdown
### YYYY-MM-DD — Short title

**Commits:** `abc1234`

**Shipped:**
- …

**Decisions:**
- …

**For a future post:**
- …
```

---

## Post-deploy smoke list

- [ ] https://mikemurphy.ai/about/
- [ ] https://mikemurphy.ai/contact/
- [ ] https://mikemurphy.ai/tutorials/rss.xml
- [ ] https://mikemurphy.ai/ai-unplugged/rss.xml
- [ ] https://mikemurphy.ai/ai-unplugged/agent.json
- [ ] https://mikemurphy.ai/ai-unplugged/issues/066.json
- [ ] https://mikemurphy.ai/llms.txt
- [ ] Footer social icons

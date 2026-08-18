---
title: mikemurphy.ai Site Build Log
created: 2026-07-11
updated: 2026-08-18
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
| Framework | Astro 7 | Static output |
| Content | Content Collections + MDX | `articles`, `aiUnplugged` (local MD); `fieldNotes`, `resources`, Brand Kit copy/assets (Directus) |
| Styling | Tailwind 4 + `global.css` tokens | Design System v2026.3 (`--mm-*`) |
| Search | Pagefind 1.5 | Indexed in `postbuild` |
| Newsletter send | Beehiiv | Archive owned by Astro |
| Hosting | Cloudflare Workers static assets | Asset-only deployment from `dist`; no runtime Worker script; deploy on push to `main` |
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
src/lib/brand-kit.ts               # Directus Brand Kit loader + snapshot fallback
src/pages/media-kit/index.astro    # Brand & Media Kit page
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
| Media Kit | `/media-kit/` | Bios, press assets, logos, headshots, one-page PDF |
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
| Schema.org JSON-LD | Inline on applicable pages | Stable WebSite, Person, CollectionPage, article, podcast, profile, and breadcrumb entities |
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
- `--color-bg-raised` for elevated surfaces (chalk in light, `--mm-navy-raised` in dark)
- Shared utilities: `mm-container`, `mm-button`, `mm-card`, `mm-polaroid`, `mm-prose`
- IBM Plex Sans / Mono + Murphydoodle
- Light Shiki code blocks (chalk ground, navy ink)

### Navigation
- 84px sticky header; blurred cream/navy at 88%, no cut-shadow (canon: none on chrome)
- CONTENT dropdown: Tutorials / Articles / Field Notes / Podcast + “Browse all topics”
- Search is an icon button (→ `/search/`), beside the theme toggle and Subscribe
- Full-screen navy sheet below 820px; dropdown and sheet are keyboard-navigable

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

### 2026-08-18 — Astro → Buzzsprout → Directus show-note sync

**Context:** Astro is the canonical source for all 162 Mike Murphy Unplugged
episode show notes. Buzzsprout, its RSS feed, and the Directus
`podcast_episodes` collection had older descriptions. The sync tool keeps those
downstream copies aligned without turning a normal site build into an external
write operation.

**Architecture:** Markdown in `src/content/articles/**/ep*.md` is rendered to
basic RSS-safe HTML. Each file's `podcast.buzzsproutEpisodeId` is the stable
matching key. The tool sends only changed descriptions to Buzzsprout, then
upserts the complete episode object returned by Buzzsprout into Directus using
`buzzsprout_id`. Buzzsprout remains responsible for regenerating the public RSS
feed; podcast apps update on their own schedules.

**Commands:**

```bash
# Local validation only: no credentials and no network writes
npm run check:podcast-sync

# Read Buzzsprout, create a backup/report, and show the proposed changes
npm run sync:podcast:dry-run

# Recommended first write: one episode, followed by another dry run
npm run sync:podcast -- --episode=1
npm run sync:podcast:dry-run

# Apply every remaining changed episode and update Directus
npm run sync:podcast
```

The connected dry-run report is `reports/podcast-sync/latest.json`; the local
validator writes `reports/podcast-sync/offline-latest.json` so it cannot replace
the connected comparison. Every connected run
also writes the complete pre-change Buzzsprout catalog to
`reports/podcast-sync/backups/`. Both paths are intentionally gitignored because
they are operational artifacts.

**Environment:** The ignored `.env` file uses 1Password references for the
Buzzsprout API and dedicated `PODCAST_DIRECTUS_TOKEN` content-bot credentials.
The separate token avoids changing the website's existing Directus access.
Sign in with `op signin` before
the connected commands; `npm run sync:podcast:dry-run` and
`npm run sync:podcast` inject the resolved values through `op run`. The podcast
ID defaults to `1973705`. The Directus token needs read, create, and update
permission on `podcast_episodes`. See `.env.example` for the complete list.
Never expose these tokens in Astro client code or commit `.env`.

**Length and formatting:** Buzzsprout descriptions are limited to 4,000
characters including footer content. The tool deliberately caps generated HTML
at 3,400 characters, leaving room for Buzzsprout's episode footer. Longer Astro
pages get a deterministic shortened RSS version plus a canonical link to the
complete website notes. Basic paragraphs, emphasis, links, lists, blockquotes,
and code are retained; relative links become absolute URLs.

**Safety and recovery:** The default command is a dry run. Remote writes require
the explicit `--apply` embedded in `npm run sync:podcast`; Buzzsprout is updated
before Directus, and a Directus permission check occurs before any Buzzsprout
write. Updates are serial and paced to respect Buzzsprout's rate limit, retry
transient failures and `429` responses, and are idempotent, so the same command
can be rerun after a partial failure. After Buzzsprout completes, all selected
records are refreshed in Directus; this also repairs a run that stopped before
its Directus phase. Use the timestamped backup to
recover an earlier description through the Buzzsprout dashboard or API, then
rerun the Directus sync. `--skip-directus` is available only when Buzzsprout must
be repaired independently.

**Verification:** `npm run check:podcast-sync` validates all 162 unique episode
IDs, generated length limits, link normalization, safe truncation, and the
Buzzsprout-to-Directus field mapping. After a live run, inspect Episode 1 in
Buzzsprout and Directus, open `https://feeds.buzzsprout.com/1973705.rss`, and
allow up to 24 hours for listening apps to refresh.

**Initial migration result:** The Episode 1 pilot passed in Astro, Buzzsprout,
RSS, and Directus. The first bulk attempt hit Buzzsprout's rate limit after 59
additional episodes; the idempotent resume correctly skipped those accepted
descriptions. Request pacing was increased to 1.1 seconds, `429` backoff was
added, and the completed run refreshed all 162 Directus records from the final
Buzzsprout catalog. The post-run dry run reported `0 changed / 162 unchanged`,
and exact comparison found zero Buzzsprout or Directus description mismatches.
The RSS feed refreshed Episode 1 first and continued serving cached text for
some later episodes immediately after completion; this is expected while
Buzzsprout regenerates and distributes the feed.

### 2026-08-12 — Discoverable Markdown alternatives

**Context:** The site already emitted real static Markdown twins for tutorials,
articles, podcast episodes, AI Unplugged issues, field notes, and Resources.
The `.md` convention was documented in `/llms.txt`, but an agent arriving
directly on an HTML page had no standard page-level signal pointing to the
corresponding Markdown representation.

**Shipped:** Added an optional `markdown` property to the shared Layout and now
emit `<link rel="alternate" type="text/markdown" href="…">` on every HTML page
that has a generated Markdown twin. Enabled it for tutorial, article, podcast,
AI Unplugged issue, and field-note detail pages plus `/resources/`. Pages without
a Markdown counterpart, such as `/about/`, deliberately do not advertise one.

**Guardrail:** Extended `check:built-metadata` so every page type expected to
have Markdown must emit the alternate link, and every advertised local `.md`
URL must resolve to a real generated file in `dist`. This prevents the HTML and
Markdown surfaces from silently drifting out of sync.

**Verified:** `npm run build` completed with 792 pages. Content-link, built-link,
and metadata validation passed; Pagefind indexed 668 pages. Spot-checks confirmed
correct absolute Markdown alternate URLs across all supported content types and
confirmed that `/about/` does not advertise the nonexistent `/about.md`.

### 2026-08-12 — Major framework upgrade: Astro 6 → Astro 7

**Context:** Upgraded the site across a major Astro release as part of the
dependency-security cleanup. This was intentionally treated as a compatibility
change, not just a routine dependency bump.

**Shipped:** Updated `astro` from 6.3.5 to 7.2.1 and `@astrojs/mdx` from 5.0.6
to 7.0.5, with the lockfile regenerated for the new dependency graph. The site
remains a statically generated Astro deployment; no hosting, route, canonical,
or content-model changes were required for the upgrade.

**Verified:** The full build completed cleanly under Astro 7's stricter Rust
compiler. All 792 pages generated successfully, content-link, built-link, and
metadata checks passed, `npm audit` reported zero vulnerabilities, and manual
browser spot-checks covered the homepage plus representative article and
tutorial pages. Commit: `14ea159`.

### 2026-08-10 — Website and newsletter collection structured data

**Context:** A follow-up LibreCrawl review exposed a bug in its author-attribution
metric, but also correctly identified that the homepage and AI Unplugged hub
pages did not yet emit JSON-LD. Added useful schema for those page types rather
than adding metadata solely to satisfy the crawler.

**Shipped:** Added a reusable `WebSite` helper and stable
`https://mikemurphy.ai/#website` identity. The homepage now describes the site,
its alternate name, language, description, and Mike Murphy as publisher. Added
reusable `CollectionPage` markup to `/ai-unplugged/` and
`/ai-unplugged/issues/`; both collections connect to the WebSite and the stable
Mike Murphy Person entity. Each collection also emits a canonical
`BreadcrumbList` describing its place in the site hierarchy.

**Decisions:** Kept the graph factual and maintainable: no obsolete sitelinks
`SearchAction`, no invented Organization entity, and no ItemList claiming
content that is not visible on the page. Individual AI Unplugged issues retain
their existing `BlogPosting` and breadcrumb markup.

**Verified:** `npm run build` completed with 797 pages. Content-link,
built-link, metadata, and structured-data validation passed. The generated
JSON-LD on all three routes parsed successfully with the expected canonical
URLs, entity IDs, schema types, and breadcrumb order; `git diff --check` passed.

### 2026-08-10 — Podcast retroactive reformat completed (162/162) + Pretty Links → Shlinks migration

**Context:** Continuation of the 2026-08-09 entry below. Finished the retroactive
`podcast-episode-format` pass across the remaining 151 episodes, then ran a
dedicated Pretty Links → Shlinks migration to resolve the `<!-- REVIEW: ... -->`
comments the formatting pass had deliberately left behind instead of
auto-fixing or guessing at replacement URLs.

**The reformat (151 remaining episodes):** Worked backwards from ep161 in
batches of 5–10, verifying `npm run build` (content-link/built-link/metadata
checks + rendered player + `PodcastEpisode` JSON-LD spot-checks) after every
batch. Commits: `ab4b1fc` (157–161), `defc040` (150–156), `b2374f6`
(140–149), `407a6a0` (135–139), `44f1e1e` (130–134), `07dfe9b` (125–129),
`bbe49d8` (115–124), `d1b72f6` (90–114), `48675c4` (70–89), `bc0b7bc`
(40–69), `b2ca7a1` (1–39). All 162 episodes now carry the standard template:
Buzzsprout player, `PodcastEpisode` structured data, structured `podcast.*`
frontmatter, and clean H2/H3 body structure.

**Real content bugs found and fixed along the way** (beyond the ep50/ep151
pattern already known from the 08-09 batch): ep52's own heading read "Ep51"
(copy-paste artifact, corrected against Buzzsprout pubDate); ep94 had two
different episode cross-links both pointing at the same wrong URL; ep46 had
two different software names ("Camtasia" and "Screenflow") both linking to
an unrelated microphone page; ep22's frontmatter claimed "10 reasons" but
the source text only contained 9. All flagged inline and corrected against
Buzzsprout/cross-episode evidence rather than guessed.

**Two episodes (ep126, ep127) had a real content gap:** their WordPress-era
"Q&A With Ross Brand" sections preserved only the interview questions — the
actual answers were missing from the migrated source, with no way to
recover them from the article body alone. Flagged and left as a content gap
in the reformat pass; recovered afterward (see below) once Mike located the
original episode transcripts.

**The Pretty Links → Shlinks migration:** Extracted every `<!-- REVIEW -->`
flagged link across all 162 files (620 raw occurrences), grouped by unique
destination URL down to 216 rows, and published as an interactive worksheet
artifact — sortable by episode-reach (fix the highest-leverage links first),
with inline destination inputs that autosave to the browser and an
export-to-CSV flow, since the sandboxed artifact iframe silently blocks
triggered file downloads (fixed by swapping to a copy/paste modal instead of
`a.click()`). Mike filled in real Shlink destinations for all 216 rows over
three passes; each CSV export was diffed against the previous one to isolate
only the genuinely new rows before running a script
(`apply_link_fixes.py`) that swapped each old URL for the new one in both
markdown link targets and `showNotesLinks` frontmatter, stripping the now-
resolved REVIEW comment in the same pass. Commits: `c906f6f` (first batch,
75 links / 30 files), `66cec61` (second batch, 40 links / 59 files),
`d3b5131` (third and final batch, 99 links / 31 files) — 214 of 216 rows
successfully applied across the archive, build verified clean after each.

**Cleanup pass (`f2c4f97`, `9d6eb1b`):** Recovered Ross Brand's actual
answers for ep126 and ep127 from Mike's local transcript archive
(`mark-it-down-transcripts/mmu_transcripts/txt/126_*.txt`,
`127_*.txt`) — both Q&A sections now carry full quotes instead of bare
questions. Fixed two broken internal links Mike's own local edits had
introduced (`mikemurphy.ai/amazon` missing the `go.` Shlink subdomain in
ep7 and ep28 — caught by `check:built-links` failing on `/amazon` as an
unresolvable internal route). Stripped ~20 stale REVIEW comments across
episodes where Mike had already resolved the underlying link locally.
Confirmed `writethelife.com` (ep131) is a dead, intentionally-unlinked
project per Mike's call.

**What's left (72 REVIEW comments / 36 files, and OK to stay that way):**
almost entirely intentional — 2018-era pricing/stats/platform mentions
(Blab.im, IGTV, Google Podcasts, Instagram Swipe Up, Evernote/iCloud
pricing, LinkedIn/Twitter stats) that Mike chose to preserve as
period-accurate historical record rather than "correct" to reflect today.
A small number of individual gear-link fixes (ep2, ep7, ep28 had several
products bundled under one dead `goo.gl`/`amzn.to` link, so only the first
product per group got flagged/fixed and siblings were left as unlinked
plain text) remain genuinely optional cleanup, not required for a working
site.

**Verified:** `npm run build` green after every commit in this arc — 797
pages, `check:built-links` and `check:built-metadata` both passing
throughout, including the two-broken-link catch during final cleanup.

**For a future post:** "620 flagged links, 216 unique destinations" — how
grouping a flat list of broken links by destination (not by episode) turns
an unworkable manual-review task into a tractable one, and why an
in-browser worksheet artifact with autosave + CSV export beat a spreadsheet
handoff for a multi-session collaborative cleanup.

### 2026-08-09 — Podcast episode SEO template + retroactive reformat (11/162)

**Context:** All 162 episode posts carried the raw WordPress migration as-is —
weak/empty SEO frontmatter, no audio player at all, no `PodcastEpisode`
structured data, and real content bugs (dead `amzn.to` shortlinks, copy-paste
bugs where multiple products linked to the same wrong URL). Discovered the
podcast is actually hosted on **Buzzsprout** (`feeds.buzzsprout.com/1973705.rss`),
not Megaphone as assumed — its embeds from the old mikemurphy.co site never
made it into the migration, so no episode page had a way to actually listen.

**Shipped in code:**
- Added an optional `podcast` object to the `articles` schema
  (`src/content.config.ts`): `episodeNumber`, `durationSeconds`,
  `buzzsproutEpisodeId`, `audioUrl`, `embedUrl`, `keyTakeaways[]`,
  `showNotesLinks[]` (strict `.url()` — external resources only, not
  internal episode cross-links), `relatedEpisodeSlugs[]`.
- `src/components/BuzzsproutPlayer.astro` — Buzzsprout's own official iframe
  embed (confirmed via their oEmbed API), not a custom player. The
  `{episode_id}` parses straight out of the RSS `<enclosure>` URL, so no
  manual lookup is needed per episode.
- `podcastEpisodeStructuredData()` in `src/lib/structured-data.ts` — real
  schema.org `PodcastEpisode` (episodeNumber, duration as ISO 8601,
  associatedMedia, partOfSeries), wired into `src/pages/podcast/[slug].astro`
  alongside the existing breadcrumb data whenever `podcast.episodeNumber` is
  set.
- Episode number now renders in the existing muted date/era metadata line on
  `ArticleCard` ("Episode 157 · August 19, 2016 · Archive") instead of a new
  pill — reuses an existing pattern rather than adding a UI element.
- `src/content/articles/2025/ep162.md` reformatted as the reference/worked
  example the template was built from.

**Show art decision:** custom per-episode 16:9 thumbnails were dropped
entirely in favor of one reused square cover
(`public/assets/brand/podcast-cover.jpg`, 1200×1200, sourced from the show's
current Buzzsprout art). `ArticleCard` gained an `aspectClass` prop (default
`aspect-video`, unchanged for articles/tutorials) and a `fallbackImage` prop,
used by `/podcast/` specifically with `aspect-square`. The on-page banner
image only renders when an episode has genuine unique art (e.g. ep162) — it
was duplicating the show art already visible inside the Buzzsprout player
for every other episode. Deleted the 107 now-orphaned 16:9 image files from
`public/assets/media/` after confirming each had no other reference in the
codebase. Rationale: a future artwork swap becomes one file replacement
instead of touching 162 posts.

**Fixed:** `writeSnapshot()` in `src/lib/directus.ts` was stamping a fresh
`fetchedAt` on every successful Directus fetch regardless of whether the
underlying items changed, so `Brand_Kit.json` (the only singleton collection)
dirtied every single local build/commit with nothing but a timestamp diff.
Now compares against the existing snapshot and skips the write when content
is identical — verified both directions (identical content → no write;
genuinely changed content → still writes correctly).

**The retroactive content pass:** built a Claude Code skill,
`podcast-episode-format` (`~/.claude/skills/podcast-episode-format/`), with a
helper script (`scripts/buzzsprout_episode.py {N}`) that pulls authoritative
per-episode data from the RSS feed. Workflow per episode: cross-check
pubDate/title against Buzzsprout, reformat frontmatter, restructure the body
into a standard H2 shape (Episode Summary → What You'll Learn → topic
sections → Show Notes & Links → optional Related Episodes), and flag
suspicious/dead links inline with `<!-- REVIEW: ... -->` HTML comments rather
than auto-fixing or guessing replacements — this repo has real Pretty Links
(`mikemurphy.co/...`) that are a separate, later migration to Shlinks.

Ran two batches tonight, working backwards from the most recent episode:
**ep157–ep162** and **ep150–ep156**, 11 episodes total. Ranged from light
reformatting (content already solid) to full rewrites from the raw
transcript archive (ep155, ep161 — WordPress bodies were nearly empty
outlines). Caught and fixed two real link bugs matching the known ep50
pattern: ep151 had a "Episode 150" link pointing at itself, and ep156 had two
different `amzn.to` links both claiming the same book.

**Verified:** `npm run build` green after each batch (797 pages,
content-link/built-link/metadata checks passing); spot-checked rendered
`dist/podcast/epNN/index.html` for the player iframe and `"@type":
"PodcastEpisode"` JSON-LD on every touched episode; confirmed live on
mikemurphy.ai after each push via background polling.

**Remaining:** 151 of 162 episodes still need the content pass — plan is
small batches (5-10) run via the skill, reviewed before commit, working
backwards from ep149. A dedicated Pretty Links → Shlinks pass is intentionally
deferred until the formatting pass is complete, so the flagged-link comments
across all 162 files can be swept in one dedicated project instead of
interleaved with content work.

**For a future post:** "The audio player that never made the move" — how a
WordPress-to-Astro migration can faithfully carry over article text while
silently dropping an embedded player, and why cross-checking an RSS feed
against migrated content caught it.

### 2026-08-08 — Descriptive hub search titles

**Shipped:** Updated the Tutorials, Articles, Field Notes, Podcast, Resources,
Topics, and AI Unplugged hub metadata with concise, descriptive titles. Visible
page headings and URLs remain unchanged. Added an optional layout override for
titles that already contain the site name, preventing duplicate branding on the
Mike Murphy Unplugged Podcast title.

**Verified:** The production build completed with 797 pages. All content-link,
built-link, and metadata validation passed, and the seven rendered hub titles,
social titles, and visible headings were checked directly.

### 2026-08-08 — Post-audit metadata cleanup

**Context:** A fresh LibreCrawl audit completed across 805 URLs with zero 404s,
zero broken links, and zero redirects among the canonical pages it discovered.
The remaining useful findings were a cross-canonical on the generated 404 page,
overlong branded title tags, and an author-attribution counter that did not
recognize Schema.org authorship.

**Shipped:** Made `/404.html` self-canonical and explicitly `noindex,follow`.
Title tags now append `| Mike Murphy` only when the complete title is 60
characters or fewer; longer authored titles remain intact without the suffix.
Open Graph and X titles use the original unbranded title.

Added visible `rel="author"` links to `/about/` across tutorials, articles,
podcast episodes, Field Notes, and AI Unplugged issues. Those 671 authored pages
also emit `meta name="author"`; the 509 article-like pages additionally emit the
valid Open Graph `article:author` URL. Schema.org authors remain connected to the
stable `https://mikemurphy.ai/about/#person` identity.

**Guardrails:** Build validation now enforces 404 indexing/canonical behavior,
the conditional title suffix, unbranded and matching social titles, visible
author links, author metadata, Open Graph article authors, and Schema.org author
identity consistency.

**Verified:** `npm run build` completed with 797 pages. Content-link, built-link,
metadata, structured-data, social-card, title, 404, and author-attribution checks
all passed; `git diff --check` passed.

### 2026-08-07 — Structured data and reliable social cards

**Context:** The post-launch crawl showed that the site had strong conventional
metadata and machine-readable endpoints, but no Schema.org JSON-LD. A related
review found that X cards were generally configured correctly yet could fail on
specific legacy images or show incomplete descriptions from the deployed build.

**Structured data:** Added reusable JSON-LD helpers and connected content to a
stable Mike Murphy identity at `https://mikemurphy.ai/about/#person`.

- `BlogPosting` on tutorials, articles, Field Notes, and AI Unplugged issues
- `BreadcrumbList` on content detail pages, podcast episodes, and `/about/`
- `ProfilePage` with a `Person` main entity on `/about/`
- Article-specific Open Graph types and author/profile relationships

**Social previews:** Added X account attribution and image alt metadata, emitted
accurate image MIME types, and removed globally hard-coded dimensions that were
incorrect for many legacy images. Kept the branded 1200×630 cream default social
card. Fixed three problematic legacy previews: an image over X's 5 MB limit, an
extensionless JPEG served without an image content type, and an excessively wide
podcast banner that now has a dedicated 1200×630 derivative.

**Icons:** Rebuilt the favicon, Apple touch icon, and 192/512 PWA icons from the
official orange loop SVG with transparent backgrounds. The full cream social
card was intentionally left unchanged.

**Guardrails:** Expanded `scripts/check-built-metadata.mjs` to parse every JSON-LD
block and require the expected article, breadcrumb, and profile schemas. It now
also checks Open Graph/X fields, matching image URLs, supported extensions,
local image existence, and the 5 MB social-image limit.

**Verified:** `npm run build` completed with 797 pages; content-link, built-link,
metadata, structured-data, and social-card checks passed; `git diff --check`
passed. The local build used the existing Directus snapshots because credentials
were unavailable, which did not affect these changes.

### 2026-08-07 — Fix GSC "Redirect error" on section root paths (307 → 301)

**Context:** Google Search Console reported `https://mikemurphy.ai/tutorials`
as "URL is not on Google… Redirect error" and refused to index it. `curl`
showed the chain actually resolved fine (`/tutorials` → `/tutorials/` → 200,
no loop) — the problem was the status code, not the destination.

**Root cause:** Cloudflare's static-assets handler (this is a pure
`[assets]` Workers deployment, no Worker script — see 2026-07-22 Markdown
migration entry) auto-redirects any extensionless path missing a trailing
slash using a **307 (Temporary Redirect)**. `public/_redirects` had zero
explicit rules for `/tutorials`, `/articles`, `/field-notes`, or
`/resources` — all four section roots were silently relying on this
default. Google treats 307s far more cautiously than 301s (a temporary
redirect doesn't tell Google to index the destination), and with no
canonical/sitemap signal reinforcing the bare path, it gave up rather than
following it.

**Fix:** Added explicit 301 rules for the four section roots to the
manually-seeded `redirects` Map in `scripts/generate-redirects.mjs` (not
hand-edited into `public/_redirects` — that file is generated and the edit
would be lost on the next `npm run redirects` run):

```js
['/tutorials', '/tutorials/'],
['/articles', '/articles/'],
['/field-notes', '/field-notes/'],
['/resources', '/resources/'],
```

Regenerated `public/_redirects`, verified `npm run build` clean, confirmed
`/tutorials/` was already correctly listed in `dist/sitemap.xml`.

**Verified:** `curl -IL` before/after on apex, `www`, HTTP, and a Googlebot
smartphone UA all showed the same 307→200 chain pre-fix. Post-deploy check
is `curl -I https://mikemurphy.ai/tutorials` should show `301` directly.

**Commit:** `06e1298` on `codex/media-kit`.

**Next:** After deploy, use GSC **Test Live URL** then **Request Indexing**
on the `/tutorials` inspection page.

**For a future post:** "The 307 that isn't a loop" — why GSC's "Redirect
error" doesn't always mean broken redirects, and how Cloudflare's default
trailing-slash behavior on static-assets deployments differs from an
explicit 301 rule.

### 2026-08-01 — Directus-powered Brand & Media Kit

**Context:** Built a public press and collaboration page from the Claude Design
handoff in `Brand and media kit setup/`. The goal was to keep the page design in
Astro while making frequently changing bios, audience numbers, and downloadable
assets maintainable in Directus. The public-facing navigation label is **Media
Kit**; the page heading remains **Brand & Media Kit**.

**Shipped in code:**
- New canonical page at `/media-kit/`, with `/brand-kit/` redirecting to it.
- Added **Media Kit** to the footer and `/media-kit/` to the sitemap.
- Included short and long bios, boilerplate, logo/mark downloads, headshots,
  avatar files, the one-page PDF, and a complete ZIP. Per design review, the
  page does **not** include a color-swatches section.
- Added `src/lib/brand-kit.ts` and expanded `src/lib/directus.ts` to load the
  singleton at build time, self-host its files under `public/assets/brand-kit/`,
  and fall back to `src/content/_snapshots/Brand_Kit.json` when Directus is
  unavailable.
- Kept asset filenames stable so files can be replaced in Directus without
  changing Astro templates or public download URLs.

**Directus:**
- Created and populated the `Brand_Kit` singleton with `intro`, `short_bio`,
  `long_bio`, `boilerplate`, `contact_intro`, `youtube_since`,
  `tutorial_count`, `subscriber_count`, and the multi-file `assets` field.
- Uploaded 13 assets: 11 image/SVG brand files, the one-page PDF, and the ZIP.
- Granted the `Astro Read-Only` policy read access to `Brand_Kit`,
  `Brand_Kit_files`, and the existing `directus_files` collection. No write,
  update, or delete permissions were added.
- Added `Brand_Kit` to the existing **Publish → Rebuild Site** Flow for
  `items.create` and `items.update`. Saving the singleton now calls the same
  Cloudflare deploy hook used by Field Notes and Resources.

**Verified:** Authenticated Directus API returned HTTP 200 with all 13 assets;
`npm run build` completed with 794 pages; `npm run qa:launch` passed; and
`git diff --check` passed.

**Git/deployment:** The implementation was committed as `d8d8d8c`
(`Add Directus-powered media kit`) and merged into `main` on 2026-08-01. An
earlier Directus-triggered deployment returned 404 because Cloudflare rebuilt
`main` before the feature branch had been merged; the Directus Flow itself was
working correctly. Cloudflare deploys automatically after the `main` update.
After this initial code deployment, future singleton saves in Directus rebuild
the page automatically.

**Source-folder housekeeping:** `Brand and media kit setup/` is an untracked
design/source folder and is not required by the site. It can be moved outside
the repository without affecting builds.

### 2026-07-25 — Navigation redesign: CONTENT dropdown, search icon, mobile sheet

**Context:** Claude Design produced a high-fidelity nav redesign; the handoff
(prototype + spec) was delivered in `design_handoff_navigation/` and has been
implemented and removed. The old header carried five flat links including a
`Search` text link, and the growing content types (Articles, Field Notes,
Podcast) had no home in the nav at all.

**Shipped:**
- `SiteHeader.astro` rebuilt. Flat nav → **CONTENT dropdown** (Tutorials /
  Articles / Field Notes / Podcast, each with a one-line description) plus
  AI Unplugged, Resources, About. Footer row links to `/topics/`.
- **Search demoted** from a nav text link to a 38px bordered icon button in the
  utility cluster beside the theme toggle. Still routes to `/search/`.
- **Header height 76px → 84px** and the Loop mark 44px → 42px with a tighter
  two-line wordmark, rebalancing the top-left lockup against the taller bar.
- **Mobile (< 820px):** full-screen navy sheet replacing the inline accordion.
  CONTENT / MORE sections, full-width Subscribe, theme toggle, locked tagline
  footer. Search + hamburger are 44px hit targets.
- Tailwind utility soup in the header replaced with a scoped `<style>` block on
  semantic tokens — the header is now readable as one component.

**Decisions:**
- **Dropdown hover is a neutral wash** (`--color-text-primary` at 5% / 7% dark),
  not a translucent orange fill. Orange over navy muddies to brown; this was
  settled during design review and is worth not re-litigating.
- **Loop mark stays orange in both themes** (matches BRAND-CANON v2026.4, where
  the lockup mark is always `--mm-orange` regardless of scheme). The mobile
  sheet is the one exception — it uses the chalk Loop on the navy ground.
- **New token `--mm-navy-raised` (`#06263F`)** for dark-mode elevated surfaces,
  exposed semantically as `--color-bg-raised`. The dropdown needed to sit above
  `--color-bg-surface` in dark mode and there was no token for that lift. In
  light mode it aliases chalk, so components can consume it unconditionally.
- **Dropdown is click-to-open, not hover-open** — hover menus are hostile on
  trackpads and impossible on touch.
- **Sheet has its own theme toggle** that delegates to `#mm-theme-toggle` via
  `.click()`. The header toggle sits behind the overlay, and duplicating the
  localStorage logic would have created a second source of truth.
- Kept the single orange. A lightened variant for small text on navy was tried
  during design and rejected; orange is only used on 12px **bold** labels there
  (≈5.2:1, passes AA).

**Accessibility:** `aria-expanded` / `aria-haspopup` on the trigger, arrow-key
navigation in the dropdown, Escape closes both surfaces and restores focus, a
Tab focus trap in the sheet, `focus-visible` rings throughout, and a
`prefers-reduced-motion` block. Body scroll locks while the sheet is open and
releases if the viewport crosses back to desktop.

**Verified:** `npm run build` clean; header screenshotted in light and dark at
1280px and 390px, dropdown open in both themes, and the sheet's theme toggle
confirmed to write `localStorage.mm-theme` and release the scroll lock on close.

**Docs:** `DESIGN.md` and `BRAND-CANON.md` in the `mike-design-system` repo were
updated in the same pass (nav-header spec, dropdown component, the new raised
token, and a v2026.5 canon entry). Those edits are left uncommitted for review.

**For a future post:** why a content dropdown beat adding a sixth flat nav link.

### 2026-07-23 — Legacy-domain redirect validation + controlled 404 fallback

**Context:** Completed the post-migration audit for `mikemurphy.co` before
retiring its SiteGround hosting. The old domain is being kept registered as a
legacy redirect domain. Detailed operational notes, individual decisions, and
remaining shutdown steps live in [POST_LAUNCH.md](./POST_LAUNCH.md).

**Completed:**
- Validated all **1,103 logical routes** in the main Cloudflare migration
  manifest: 1,103 passed, 0 failed.
- Reviewed and fixed all **16 Shlinks** tagged `Needs Update`, including the
  Apple Podcasts and Domestika destinations.
- Confirmed targeted Cloudflare Bulk Redirects remain responsible for known
  migrated URLs; no broad redirect to the homepage was added.
- Deployed a separate Cloudflare Worker named `mikemurphy-co-404` on
  `mikemurphy.co/*` and `www.mikemurphy.co/*`. Matching Bulk Redirects execute
  first; only unmatched URLs reach the Worker and receive a true `404 Not
  Found` response with `X-Robots-Tag: noindex`.
- Live-tested apex, `www`, HTTP, and HTTPS: known URLs redirect once to their
  intended `mikemurphy.ai` pages and return `200`; random unknown URLs return
  `404`.

**Important distinction:** This is a small, independent Worker for the retired
`.co` domain. It is unrelated to the Astro Markdown runtime Worker removed on
2026-07-22; `mikemurphy.ai` remains a pure static-assets deployment.

**Next:** Keep SiteGround active for observation as long as desired, download
a final files-and-database backup, cancel hosting only when ready, and keep the
`mikemurphy.co` registration active and renewing.

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

**Addendum (same day) — trailing-slash form restored:** The retired Worker
also accepted `<page>/` + `.md` (i.e. `/tutorials/foo/.md`), and a published
tutorial says both forms work — but the emitted files only covered
`/tutorials/foo.md`. Astro can't emit a dotfile route (`foo/` param collides
with `foo`), so `scripts/copy-md-twins.mjs` now runs in `postbuild`: for every
`<name>.md` with a sibling page directory it copies the file to `<name>/.md`
(668 twins, gitignored `dist/` only). Both URL forms now 200 as `text/plain`;
the `/*.md` `_headers` splat already matched the `/.md` paths.

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

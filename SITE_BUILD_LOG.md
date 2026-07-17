---
title: mikemurphy.ai Site Build Log
created: 2026-07-11
updated: 2026-07-11
status: living-doc
---

# mikemurphy.ai Site Build Log

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
| Content | Content Collections + MDX | `articles`, `aiUnplugged` |
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
| Thin Cmd+K search modal | Later | Third UI; a11y/mobile; needs built Pagefind index |
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

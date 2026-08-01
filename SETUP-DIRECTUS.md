# Directus → Astro: How It Works (setup completed 2026-08-01)

Directus (`https://cms.imurph.com`) is the source of truth for Field Notes,
Resources, and the Brand Kit singleton on mikemurphy.ai. **Setup is complete and
live.** This doc is the reference for how the system works and how to redo any
piece of it.

**The publishing loop:** At build time, Astro fetches published Field Notes and
Resources and Brand Kit from `cms.imurph.com` using a read-only token (stored as Cloudflare
build variables). A Directus Flow ("Publish → Rebuild Site") POSTs to a
Cloudflare deploy hook on every save of those collections, triggering a rebuild.
Publishing in Directus is the only step you take; the site updates in ~1-2 min.

**Build-history tip:** hook-triggered builds show "Empty commit message" in
Cloudflare — that's normal. Named commit = code change; empty = Directus publish.

If Directus is ever unreachable during a build, the site builds from the last
saved snapshot (`src/content/_snapshots/`) with a warning — it never breaks.
Snapshots refresh on every successful live build; commit them occasionally after
local live builds so the fallback stays current.

The three setup steps below are ✅ done — kept for reference/redo.

---

## Step 1 — Create a read-only token in Directus

The build needs a login that can **read** content and nothing more.

- [ ] In Directus: **Settings → Access Policies → Create Policy** — name it
  `Astro Read-Only`. Grant **Read** (only) on: `Field_Notes`, `Resources`,
  `resource_categories`, `shelves`, `tags`, `Field_Notes_tags`, `resources_tags`,
  and `directus_files` (for logos).
- [ ] Create a user (e.g. `astro-bot`) with that policy. Open the user → **Token**
  → generate a **Static Access Token** → copy it. This is `DIRECTUS_TOKEN`.

Also finish the two data-model fixes if not done yet:
- [ ] `Field_Notes.excerpt` field (Textarea, optional) — ✅ already added
- [ ] `Field_Notes.slug` → **Required** + **Unique**

## Step 2 — Give Cloudflare the credentials

- [ ] Cloudflare dashboard → your **mikemurphy-ai** Worker → **Settings** →
  **Build** → **Variables and secrets** (build-time environment variables). Add:
  - `DIRECTUS_URL` = `https://cms.imurph.com`
  - `DIRECTUS_TOKEN` = the token from Step 1 (mark it secret)
- [ ] Trigger a build (push anything, or "Retry deployment") and check the build
  log — you should see `Loaded N Field Notes (live)` instead of the snapshot
  warning.

## Step 3 — Make "Publish" trigger a rebuild

- [ ] Cloudflare → the Worker → **Settings → Build → Deploy hooks** → create one
  (name: `directus-publish`). Copy the hook URL.
- [ ] In Directus: **Settings → Flows → Create Flow**:
  - Trigger: **Event Hook**, non-blocking, on `items.create` + `items.update`,
    collections `Field_Notes` + `Resources` + `Brand_Kit`.
  - Operation: **Webhook / Request URL** → Method **POST** → paste the deploy
    hook URL. No headers or body needed.
  - (Optional) add a condition so it only fires when `status` = `published`.

---

## Day-to-day publishing after setup

1. Write / edit in Directus → set status to **Published** (Field Notes and Resources), or save the Brand Kit singleton.
2. Done. The Flow pings Cloudflare, the site rebuilds with live data, changes are
   live in a few minutes.

## Local development

- `npm run build` with no credentials → uses the committed snapshots (with a
  warning). Normal for quick local work and PR builds.
- To build against live Directus locally, create a `.env` in the project root
  (already gitignored):
  ```
  DIRECTUS_URL=https://cms.imurph.com
  DIRECTUS_TOKEN=your-read-only-token
  ```
  A local live build also refreshes the snapshots — commit them occasionally so
  the fallback stays fresh.

---

## Brand Kit singleton

Create `Brand_Kit` as a Directus **singleton**. Astro owns the page layout and
brand design; this singleton owns the copy, statistics, and replaceable files.

### Text fields

| Key | Interface | Notes |
| --- | --- | --- |
| `intro` | Textarea | Hero introduction |
| `short_bio` | Textarea | Short copy-and-paste bio |
| `long_bio` | Textarea | Long copy-and-paste bio |
| `boilerplate` | Textarea | One-line boilerplate |
| `contact_intro` | Textarea | Contact card introduction |
| `youtube_since` | Input | Display value, e.g. `2015` |
| `tutorial_count` | Input | Display value, e.g. `1,850+` |
| `subscriber_count` | Input | Display value, e.g. `45,000+` |

Enable the standard `date_updated` field so the build can retain update metadata.

### File field

Create `assets` using the Directus **Files** interface (multiple files). Astro
matches each file by its stable download filename, so replacements should retain
the filenames committed under `public/assets/brand-kit/`.

Grant `Astro Read-Only` read access to `Brand_Kit`, `Brand_Kit_files`, and
`directus_files`. Add `Brand_Kit` create/update events to the existing “Publish
→ Rebuild Site” Flow. A successful live build downloads the Directus files into
`public/assets/brand-kit/` and refreshes the committed snapshot; an offline build
uses that snapshot and the already-downloaded assets.

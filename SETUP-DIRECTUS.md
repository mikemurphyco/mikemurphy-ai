# Directus → Astro Setup Guide

Connects Directus (`https://cms.imurph.com`) to the Astro site so publishing a
Field Note or Resource updates mikemurphy.ai automatically.

**How it works:** Directus is the source of truth. At build time, Astro fetches
the published Field Notes and Resources from `cms.imurph.com` using a read-only
token. Cloudflare builds the site as it always has (push to `main` → build →
deploy). A Directus Flow pings a Cloudflare "deploy hook" whenever you publish,
so publishing in Directus is the only step you take.

If Directus is ever unreachable during a build, the site builds from the last
saved snapshot (`src/content/_snapshots/`) with a warning — it never breaks.

Three steps. Do them in order.

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
    collections `Field_Notes` + `Resources`.
  - Operation: **Webhook / Request URL** → Method **POST** → paste the deploy
    hook URL. No headers or body needed.
  - (Optional) add a condition so it only fires when `status` = `published`.

---

## Day-to-day publishing after setup

1. Write / edit in Directus → set status to **Published**.
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

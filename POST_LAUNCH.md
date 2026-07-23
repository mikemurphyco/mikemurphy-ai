# mikemurphy.ai Post-Launch Handoff

Status: Post-launch migration validation completed July 23, 2026. SiteGround hosting remains active temporarily for observation and final backup.

## Current State

- `mikemurphy.ai` is live on Astro via Cloudflare.
- GitHub `main` deploys to Cloudflare.
- Repo is expected to be clean and synced after launch.
- `mikemurphy.co` is now a legacy redirect domain managed at Cloudflare.
- SiteGround hosting remains active temporarily, but normal apex and `www` traffic is handled at Cloudflare before reaching SiteGround.
- Targeted historical redirects are managed with Cloudflare Bulk Redirects.
- Unmatched apex and `www` requests return a true `404` through the `mikemurphy-co-404` Cloudflare Worker.
- Shortlinks are managed in Shlink at `go.mikemurphy.ai`.
- Keep the `mikemurphy.co` domain registration active and renewing. Cancel hosting only when ready.

## Launch Validation Completed

- `npm run build` passed.
- `npm run qa:launch` passed.
- Homepage, tutorials, search, AI Unplugged, robots, sitemap, and representative redirects were checked in production.
- Cloudflare deployment issue was fixed by removing oversized local `ep75.mp4`. The remaining legacy WordPress video shortcode in `ep75.md` is content cleanup, not an active video embed or shutdown blocker.
- Homepage Polaroid alignment was nudged after launch.

## Immediate Post-Launch Tasks

1. Submit sitemap in Google Search Console:
   - `https://mikemurphy.ai/sitemap.xml`
2. Finish `sshalias` tutorial:
   - File: `src/content/articles/2026/sshalias.md`
   - Current state: route is live, but body and featured image need cleanup.
   - Keep `migration.review: true` until fixed.
   - Set `migration.review: false` when complete.
3. Watch Cloudflare analytics/logs for obvious 404s.
4. Confirm `www.mikemurphy.ai` behavior if needed.
5. Continue improving Resources and AI Unplugged without treating them as launch blockers.

## Content Editing Workflow

Article/tutorial Markdown lives in:

```text
src/content/articles/YYYY/slug.md
```

Images live in:

```text
public/assets/media/YYYY/MM/
```

Typical edit loop:

```bash
npm run build
npm run qa:launch
git add .
git commit -m "Update post title here"
git push origin main
```

## Obsidian Publishing Model

- Obsidian is the drafting/writing space.
- Astro `src/content` is the publishable source.
- Do not use Obsidian image embeds like `![[image.png]]` in final Astro posts.
- Use web paths like:

```markdown
![Alt text](/assets/media/2026/06/image-name.png)
```

## Redirect Strategy

- `mikemurphy.ai` is the live Astro site.
- `mikemurphy.co` is retained as a legacy redirect domain.
- Known historical URLs use targeted `301 Permanent Redirects`; do not replace these lists with a broad homepage redirect.
- Shlink manages intentional shortlinks at `go.mikemurphy.ai`.
- Unknown or deleted apex/`www` URLs return a true `404`, not a homepage redirect, soft 404, SiteGround CAPTCHA, or dead-origin error.
- Keep the targeted redirects active for at least one year and preferably as long as the old domain remains registered.

## July 23, 2026 Migration Audit and Shutdown Readiness

### Cloudflare redirect validation

- Validated all 1,103 logical routes in the main migration manifest: **1,103 passed, 0 failed**.
- The local main manifest has 2,206 rows representing the four protocol/hostname variants of those routes. The Cloudflare dashboard currently contains 2,208 entries; do not overwrite the live list from the local CSV without reconciling the two extra entries.
- Confirmed 42 successful two-redirect chains. Most pass through an `/articles/...` URL before reaching the final `/tutorials/...` page. They are not shutdown blockers.
- Active Cloudflare Bulk Redirect lists:
  - `mike_murphy_co_main_redirects`
  - `mikemurphy_co_pretty_links`
  - `migration_audit_fixes`
- Added and live-tested explicit slash and non-slash redirects for:
  - `/articles`
  - `/topics`
  - `/ai-unplugged`
  - `/search`
- `/field-notes` was not restored because that section did not exist on the old WordPress site.
- `/mikeunplugged` was not redirected because the historical source was an ambiguous broken footer link. The actual podcast shortlink `/mmu` remains correct.
- Apple Podcasts shortlinks were corrected and verified, including `go.mikemurphy.ai/applepodcasts` and the legacy `mikemurphy.co/applepodcasts` path.

### Shlink review

- Audited the legacy Pretty Links/Shlink migration manifest containing 227 logical shortlinks.
- Reviewed and fixed all 16 Shlinks carrying the `Needs Update` tag.
- Corrected the `domestika` destination and verified that the legacy `.co` URL now reaches the intended page.
- Some external destinations may return bot-protection statuses to automated validators; evaluate those in a normal browser before treating them as broken.

### Controlled 404 fallback

Created the Cloudflare Worker `mikemurphy-co-404` with these routes:

```text
mikemurphy.co/*
www.mikemurphy.co/*
```

Cloudflare evaluates matching Bulk Redirects first. Known migrated URLs therefore keep their targeted `301` redirects. Only unmatched apex or `www` URLs reach the Worker, which returns:

- HTTP status `404 Not Found`
- A simple Page Not Found message and link to `https://mikemurphy.ai/`
- `X-Robots-Tag: noindex`

Final live verification passed across apex, `www`, HTTP, and HTTPS:

- `/articles/` -> one redirect -> `https://mikemurphy.ai/articles/` -> `200`
- `/topics/` -> one redirect -> `https://mikemurphy.ai/topics/` -> `200`
- `/ai-unplugged/` -> one redirect -> `https://mikemurphy.ai/ai-unplugged/` -> `200`
- `/search/` -> one redirect -> `https://mikemurphy.ai/search/` -> `200`
- Random unmatched apex URL -> `404`
- Random unmatched `www` URL -> `404`

The Worker is a controlled 404 catch-all, not a redirect catch-all. It does not cover unrelated subdomains such as the Shlink host.

### SiteGround dependency review

- Cloudflare is authoritative DNS for `mikemurphy.co`.
- Google Workspace handles the domain's email through Google MX records.
- The Astro content contains 533 old `featuredImageSource` values pointing at WordPress media. These are migration provenance metadata and are not used by runtime components.
- One non-metadata old media reference remains in `src/content/articles/2017/ep75.md`. It is a visible legacy shortcode/link and should be cleaned up later, but it is not an active media embed or hosting-shutdown blocker.

### Remaining SiteGround steps

1. Observe the redirects and Shlinks for as long as desired; there is no need to cancel immediately.
2. Download and retain a final complete SiteGround backup before cancellation. The backup should include files and the WordPress database.
3. Cancel the **SiteGround hosting plan only** when ready.
4. Keep `mikemurphy.co` registered and renewing.
5. After hosting is shut down, rerun the known-redirect and random-404 live checks.

### Audit artifacts

Detailed validation artifacts are maintained in the separate `mike-web-audits` repository:

```text
clients/mike-murphy-co-post-migration/snapshot.md
clients/mike-murphy-co-post-migration/main-redirect-validation.json
clients/mike-murphy-co-post-migration/pretty-link-validation.json
scripts/validate_redirect_manifest.mjs
```

## Known Notes

- `sshalias` is intentionally flagged because the WordPress body appeared mismatched during migration.
- Missing older AI Unplugged issues and unfinished Resources page are not blockers for sitemap submission.
- Google sitemap submission starts discovery/crawl reporting, but does not guarantee indexing or rankings.

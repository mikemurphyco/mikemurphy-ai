# mikemurphy.ai Post-Launch Handoff

Status: Sunday soft launch is complete.

## Current State

- `mikemurphy.ai` is live on Astro via Cloudflare.
- GitHub `main` deploys to Cloudflare.
- Repo is expected to be clean and synced after launch.
- `mikemurphy.co` remains live on WordPress/SiteGround.
- No broad `mikemurphy.co` redirects have been added.
- Pretty Links on `mikemurphy.co` should remain untouched for now.
- Future shortlinks are planned for Shlink at `go.mikemurphy.co`.

## Launch Validation Completed

- `npm run build` passed.
- `npm run qa:launch` passed.
- Homepage, tutorials, search, AI Unplugged, robots, sitemap, and representative redirects were checked in production.
- Cloudflare deployment issue was fixed by removing oversized local `ep75.mp4` and pointing the legacy shortcode to the WordPress-hosted media URL.
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

For now:

- `mikemurphy.ai` is the live Astro site.
- `mikemurphy.co` remains WordPress.
- Do not add broad catch-all redirects from `mikemurphy.co`.

Later:

- Move intentional shortlinks to Shlink at `go.mikemurphy.co`.
- Add targeted `mikemurphy.co` redirects only after Pretty Links and special URLs are accounted for.
- Eventually `mikemurphy.co` can become a legacy redirect domain, but not during the soft-launch window.

## Known Notes

- `sshalias` is intentionally flagged because the WordPress body appeared mismatched during migration.
- Missing older AI Unplugged issues and unfinished Resources page are not blockers for sitemap submission.
- Google sitemap submission starts discovery/crawl reporting, but does not guarantee indexing or rankings.


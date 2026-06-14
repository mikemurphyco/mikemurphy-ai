# mikemurphy.ai Launch Checklist

Launch goal: ship the AI Knowledge Hub as a working publication, then improve it in public through practical DevLog tutorials.

## Launch Bar

Ship when these are true:

- Home clearly points people to Tutorials, AI Unplugged, Search, and the archive.
- Tutorial routes work at `/tutorials/` and `/tutorials/[slug]/`.
- Legacy root slugs redirect to canonical Astro routes.
- Canonical URLs match the live route model.
- Public posts published after the initial WordPress import are either migrated or intentionally deferred.
- Sitemap and robots are generated.
- The production build passes.
- DNS/deploy has a rollback path.

Do not block launch on:

- Perfect homepage composition.
- Final resource database.
- Final search experience.
- Full AI Unplugged back catalog.
- Perfect visual polish.

## Friday: Technical Truth

- [x] Generate redirects from migrated content.
- [x] Update article canonical URLs to `/tutorials/[slug]/` or `/articles/[slug]/`.
- [x] Confirm no missing required article frontmatter.
- [x] Confirm no duplicate slugs.
- [x] Confirm production build passes.
- [x] Confirm `_redirects` is copied to `dist`.
- [x] Decide whether legacy `visibility: "search"` content should stay in sitemap for launch.
  - Keep it in sitemap/search for launch because it is discoverable archive content, not hidden/draft content. Revisit after Search Console has crawl data.
- [x] Sample 20 high-value old URLs and confirm redirect destinations.
  - Covered by `npm run qa:launch`, including recent AI tutorials, flagship AI/VPS tutorials, podcast examples, one standard article, and AI Unplugged aliases.

## Saturday: Good Enough Product Pass

- [x] Audit posts published after the initial WordPress import; manually add any public/indexable keepers.
  - Added recent tutorials: `prune`, `openwebui`, `localaiserver`, `vpscloudflare`, `sshalias`.
  - `sshalias` is routed and searchable, but flagged for review because the live WordPress body appears to contain mismatched legacy content.
- [x] Homepage: make the first viewport say "AI Knowledge Hub" more clearly.
- [x] Homepage: preserve tutorial counter/archive-depth signal.
- [x] Homepage: make search/archive discovery obvious, even if search is V1.1.
- [x] AI Unplugged: calm down any oversized orange subscribe moments.
- [x] Resources: improve boxes enough to feel intentional, not final.
- [x] Nav/footer: ensure top tasks are obvious on mobile.
- [x] Tutorial detail: verify reading/video experience on 3 sample posts.
  - Checked `vpscloudflare`, `highlighter`, and `sshalias`.
  - `vpscloudflare` and `highlighter` have working YouTube embeds, canonical tags, topic links, and no horizontal overflow in the local browser check.
  - `sshalias` has correct route/canonical/topic structure and no overflow, but remains a placeholder body with `migration.review: true`.

## Sunday: Flip Sequence

1. Run `npm run redirects`.
2. Run `npm run build`.
3. Run `npm run qa:launch`.
4. Preview the production build with `npm run preview`.
5. Test a representative URL set:
   - `/`
   - `/tutorials/`
   - `/tutorials/n8nmcpcodex/`
   - `/ai-unplugged/`
   - `/ai-unplugged/issues/001/`
   - `/articles/ep1/`
   - `/n8nmcpcodex/` -> `/tutorials/n8nmcpcodex/`
   - `/aiunplugged/` -> `/ai-unplugged/`
6. Deploy to Cloudflare.
7. Attach/verify `mikemurphy.ai`.
8. Verify HTTPS.
9. Verify `robots.txt`, `sitemap.xml`, and 3 redirects on production.
10. Submit sitemap in Google Search Console.
11. Watch analytics/logs for obvious 404s.

## DNS / Cloudflare Plan

- Keep `mikemurphy.co` pointed at SiteGround/WordPress for the first few weeks after launch.
- Do not add broad `mikemurphy.co/*` redirects during the transition because existing Pretty Links still need WordPress to answer those paths.
- Put the Astro project on Cloudflare Pages or Workers Static Assets from `dist`.
- Attach `mikemurphy.ai` to the Cloudflare deployment and make it the production host.
- Confirm `www.mikemurphy.ai` behavior before launch; either redirect it to apex in Cloudflare or attach it as an alias if both should work.
- Leave `go.mikemurphy.co` reserved for Shlink shortlinks. Do not point it at Astro.
- After the WordPress cooling-off period, migrate intentional shortlinks to Shlink and only then consider targeted `mikemurphy.co` redirects for content slugs.

## Production Smoke Tests

- Fetch `https://mikemurphy.ai/`, `/tutorials/`, `/ai-unplugged/`, `/search/`, `/robots.txt`, and `/sitemap.xml`.
- Check canonical tags on home, one tutorial, one podcast episode, one standard article, and one AI Unplugged issue.
- Check three launch redirects on the production host: `/n8nmcpcodex/`, `/prune/`, and `/aiunplugged/`.
- Confirm `mikemurphy.co` still loads WordPress and at least two known Pretty Links still resolve there.
- Confirm `go.mikemurphy.co` is untouched unless Shlink is ready.

## Rollback

- Keep the previous deployment available in Cloudflare.
- Do not delete old DNS records until production checks pass.
- If production redirects or core routes fail, roll back deployment first, then fix locally.

## First DevLog Tutorial Ideas

- Mapping old WordPress-style URLs to Astro routes.
- Generating Cloudflare `_redirects` from content frontmatter.
- Choosing "good enough" launch scope for a content-heavy Astro site.
- Using an Astro migration to turn a website into an AI knowledge hub.

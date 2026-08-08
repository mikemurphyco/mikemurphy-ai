# mikemurphy.ai

Personal website for Mike Murphy, built with Astro, Tailwind CSS, and MDX.

The Astro site is live at `https://mikemurphy.ai`. The legacy WordPress site at `mikemurphy.co` remains active during the post-launch transition so existing Pretty Links and legacy URLs keep working.

## Stack

- [Astro v6](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [MDX](https://mdxjs.com) — Markdown + components for content
- Cloudflare Workers & Pages — hosting and deployment

## Development

```sh
npm install       # Install dependencies
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build for production
npm run qa:launch # Run launch/content/redirect QA checks
npm run preview   # Preview production build locally
```

Use `npm run build` and `npm run qa:launch` before committing content, routing, or layout changes.

## Deployment

Pushing to `main` triggers a Cloudflare deployment for `mikemurphy.ai`.

```sh
git add .
git commit -m "Describe the change"
git push origin main
```

Cloudflare builds the Astro site and deploys the generated `dist` output. If a deployment fails, check the Cloudflare build log first.

## Content

Articles and tutorials live in:

```text
src/content/articles/YYYY/slug.md
```

AI Unplugged issues live in:

```text
src/content/ai-unplugged/
```

Images and static media live in:

```text
public/assets/media/YYYY/MM/
```

Use public asset paths in Markdown:

```markdown
![Alt text](/assets/media/2026/06/image-name.png)
```

## Notes

- `LAUNCH.md` contains the launch checklist and deployment plan.
- `POST_LAUNCH.md` contains the current post-launch handoff and cleanup list.
- Do not add broad redirects from `mikemurphy.co` yet. WordPress remains active for the transition period.

## Resource Shelves (planned, not yet built)

Directus has a `shelves` collection (Books, Studio & Tech, Favorite Things) and each `Resources` item can link to one via a `shelf` field. That field is fully wired end-to-end (Directus → `src/content.config.ts` → `src/lib/directus-loader.ts`), but `src/pages/resources/index.astro` never reads it — it only groups resources by `category`, and items with no `category` are silently dropped from every section. `MAIN_SHELF_TITLE` in `src/lib/directus.ts` is scaffolding left for this.

To build out a shelf (e.g. Books):

1. Give shelf items a `category` in Directus, or update the grouping logic in `resources/index.astro` to also handle `category: null` (e.g. group by `shelf` when present).
2. Add a dedicated page (e.g. `src/pages/resources/books.astro`) filtering by `r.data.shelf === 'Books'`, or add a distinct "Books" section to the main resources page using the existing `shelf` field.
3. Flip the shelf's `status` in Directus from `coming_soon` to live once the page exists.

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

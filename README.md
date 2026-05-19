# mikemurphy.ai

Personal website for Mike Murphy — built with Astro, Tailwind CSS, and MDX. Migrating from WordPress/Divi to a fully static site.

## Stack

- [Astro v6](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [MDX](https://mdxjs.com) — Markdown + components for content
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting and deployment

## Development

```sh
npm install       # Install dependencies
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## Deployment

Pushed to `main` triggers an automatic deploy via Cloudflare Pages.

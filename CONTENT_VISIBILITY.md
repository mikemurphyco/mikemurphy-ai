# Content visibility

Article, tutorial, and podcast front matter uses `visibility` as the single source of truth.

| Value | HTML route | Site search | Public listings and topics | Sitemap and RSS | Markdown alternate | Search engines |
| --- | --- | --- | --- | --- | --- | --- |
| `public` | Yes | Yes, unless `search.include: false` | Yes | Yes | Yes | Indexable |
| `search` | Yes | Yes, unless `search.include: false` | No | No | No | `noindex,follow` |
| `hidden` | No | No | No | No | No | No route |
| `draft` | No | No | No | No | No | No route |

The separate legacy `draft: true` flag also prevents route generation regardless of the visibility value.

Use `search` for a quiet archive: old inbound links continue to work, and visitors can find the page with the site's Pagefind search, but the site does not promote the URL to search engines or agent-facing Markdown discovery.

Use a redirect only when a genuinely equivalent replacement exists. Use `hidden` when a page should disappear and allow the deployed site to return its normal 404 response.

Run `npm run audit:content` to regenerate `reports/content-audit.csv` after changing classifications.

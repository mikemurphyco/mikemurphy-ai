# Pretty Links to Shlink: Cloudflare Switch Checklist

Import file: `pretty-links-bulk-redirects.csv`

## Before the DNS switch

1. Confirm several destination links at `https://go.mikemurphy.ai/` work.
2. In the Cloudflare account dashboard, open **Bulk Redirects**.
3. Create a list named `mikemurphy-co-pretty-links`.
4. Upload `pretty-links-bulk-redirects.csv`.
5. Review the import count: **908 redirects**.
6. Create a Bulk Redirect Rule that enables this list.
7. Keep the rule disabled until the DNS switch if `mikemurphy.co` is already proxied through Cloudflare.

## At the DNS switch

1. Deploy the latest Astro build.
2. Point `mikemurphy.co` and `www.mikemurphy.co` to the intended Cloudflare-served site.
3. Make both DNS records **Proxied** (orange cloud). Bulk Redirects require proxied traffic.
4. Enable the `mikemurphy-co-pretty-links` Bulk Redirect Rule.
5. Confirm Cloudflare SSL is active.

## Immediate smoke tests

Test both slash and no-slash forms:

- `https://mikemurphy.co/envato`
- `https://mikemurphy.co/envato/`
- `https://www.mikemurphy.co/envato`
- `https://mikemurphy.co/aiunplugged`
- `https://mikemurphy.co/elevenlabs`

Expected behavior:

1. The old Pretty Link returns a **301** to its matching `go.mikemurphy.ai` URL.
2. Shlink then performs its configured redirect to the final destination.

Also test WordPress content migration redirects separately:

- `https://mikemurphy.co/prune/`
- `https://mikemurphy.co/n8nmcpcodex/`
- `https://mikemurphy.co/sshalias/`

These should route to their canonical Astro tutorial URLs, not to Shlink.

## Important

- Do not create a broad `mikemurphy.co/*` catch-all redirect.
- Bulk Redirects are hostname-specific and take place before the request reaches Astro.
- The Astro `_redirects` file remains responsible for migrated WordPress content paths.
- Keep the previous SiteGround DNS values available for rollback until smoke tests pass.

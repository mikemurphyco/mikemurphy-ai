/**
 * Astro Content Layer loaders for the Directus-backed collections.
 *
 * Each loader fetches published items (or falls back to the committed snapshot —
 * see src/lib/directus.ts), normalizes Directus field shapes into the flat data
 * the Zod schema + pages expect, renders the markdown body so `render()` works in
 * pages, and self-hosts Resource logos into public/assets/resources/ at build time.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Loader } from 'astro/loaders';
import { flattenTags, loadDirectusCollection, writeSnapshot } from './directus';

const LOGO_DIR = path.resolve('public/assets/resources');
const LOGO_PUBLIC_BASE = '/assets/resources';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** First non-empty line of markdown, stripped, as a fallback excerpt/teaser. */
function deriveExcerpt(body: string | null | undefined, max = 160): string {
  if (!body) return '';
  const firstLine = body
    .split('\n')
    .map((line) => line.replace(/^#+\s*/, '').replace(/[*_`>#-]/g, '').trim())
    .find((line) => line.length > 0);
  if (!firstLine) return '';
  return firstLine.length > max ? `${firstLine.slice(0, max - 1).trimEnd()}…` : firstLine;
}

/**
 * Download a Directus file asset to public/assets/resources/<slug>.<ext> and
 * return its public path. Only runs when live on the tailnet; offline builds
 * skip download and reuse the snapshot's stored logoPath + committed file.
 */
async function selfHostLogo(
  fileId: string,
  slug: string,
  baseUrl: string,
  token: string,
): Promise<string | null> {
  try {
    const url = new URL(`/assets/${fileId}`, baseUrl);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') ?? '';
    const ext = contentType.includes('svg')
      ? 'svg'
      : contentType.includes('png')
        ? 'png'
        : contentType.includes('webp')
          ? 'webp'
          : contentType.includes('jpeg') || contentType.includes('jpg')
            ? 'jpg'
            : 'png';

    fs.mkdirSync(LOGO_DIR, { recursive: true });
    const buffer = Buffer.from(await res.arrayBuffer());
    const fileName = `${slug}.${ext}`;
    fs.writeFileSync(path.join(LOGO_DIR, fileName), buffer);
    return `${LOGO_PUBLIC_BASE}/${fileName}`;
  } catch {
    return null;
  }
}

export function fieldNotesLoader(): Loader {
  return {
    name: 'directus-field-notes',
    async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
      const { items, live } = await loadDirectusCollection('Field_Notes');
      store.clear();
      const snapshotRows: any[] = [];

      for (const item of items) {
        const slug = (item.slug && String(item.slug).trim()) || slugify(String(item.title ?? ''));
        if (!slug) {
          logger.warn(`Field_Notes id=${item.id} has no slug or title; skipping.`);
          continue;
        }

        const body = typeof item.body === 'string' ? item.body : '';
        const data = {
          title: item.title,
          slug,
          status: item.status ?? 'draft',
          sort: item.sort ?? null,
          noteType: item.note_type ?? null,
          featured: Boolean(item.featured),
          excerpt: (item.excerpt && String(item.excerpt).trim()) || deriveExcerpt(body),
          snippets: Array.isArray(item.snippets) ? item.snippets : [],
          relatedTutorialUrl: item.related_tutorial_url || null,
          relatedResource: item.related_resource
            ? { slug: item.related_resource.slug ?? null, name: item.related_resource.name ?? null }
            : null,
          datePublished: item.date_published ?? null,
          tags: flattenTags(item.tags),
        };

        const parsed = await parseData({ id: slug, data });
        store.set({
          id: slug,
          data: parsed,
          body,
          rendered: await renderMarkdown(body),
          digest: generateDigest(parsed),
        });
        snapshotRows.push({ ...item, slug, body });
      }

      if (live) writeSnapshot('Field_Notes', snapshotRows);
      logger.info(`Loaded ${snapshotRows.length} Field Notes (${live ? 'live' : 'snapshot'}).`);
    },
  };
}

export function resourcesLoader(): Loader {
  return {
    name: 'directus-resources',
    async load({ store, parseData, generateDigest, logger }) {
      const { items, live, baseUrl, token } = await loadDirectusCollection('Resources');
      store.clear();
      const snapshotRows: any[] = [];

      for (const item of items) {
        const slug = (item.slug && String(item.slug).trim()) || slugify(String(item.name ?? ''));
        if (!slug) {
          logger.warn(`Resources id=${item.id} has no slug or name; skipping.`);
          continue;
        }

        // Self-host the logo only when live on the tailnet; otherwise reuse
        // whatever local file the committed snapshot already pointed at.
        let logoPath: string | null = item.logoPath ?? null;
        if (live && item.logo && baseUrl && token) {
          logoPath = await selfHostLogo(String(item.logo), slug, baseUrl, token);
        }

        const data = {
          name: item.name,
          slug,
          status: item.status ?? 'draft',
          sort: item.sort ?? null,
          initials: item.initials ?? null,
          badgeColor: item.badge_color ?? null,
          description: item.description ?? null,
          recommendationReason: item.recommendation_reason ?? null,
          pricingModel: item.pricing_model ?? null,
          usageStatus: item.usage_status ?? null,
          primaryUrl: item.primary_url || null,
          isAffiliate: Boolean(item.is_affiliate),
          affiliateUrl: item.affiliate_url || null,
          featured: Boolean(item.featured),
          logoPath,
          category: item.category?.name ?? null,
          // Directus field is labeled "Section Description" (key: section_description);
          // accept either key so a future rename doesn't silently drop blurbs.
          categoryDescription: item.category?.section_description ?? item.category?.description ?? null,
          categorySort: typeof item.category?.sort === 'number' ? item.category.sort : null,
          shelf: item.shelf?.title ?? null,
          tags: flattenTags(item.tags),
          dateAdded: item.date_added ?? null,
          dateLastReviewed: item.date_last_reviewed ?? null,
        };

        const parsed = await parseData({ id: slug, data });
        store.set({ id: slug, data: parsed, digest: generateDigest(parsed) });
        // Persist normalized shape (incl. resolved logoPath) so offline builds
        // reproduce the render; keep raw M2O/M2M so re-normalization is stable.
        snapshotRows.push({ ...item, slug, logoPath });
      }

      if (live) writeSnapshot('Resources', snapshotRows);
      logger.info(`Loaded ${snapshotRows.length} Resources (${live ? 'live' : 'snapshot'}).`);
    },
  };
}

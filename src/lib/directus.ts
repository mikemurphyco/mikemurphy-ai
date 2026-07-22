/**
 * Directus is the source of truth for Field Notes and Resources (Articles stay
 * local Markdown). Directus is self-hosted on a Tailscale-only VPS, so this fetch
 * only succeeds when the build runs on a machine/CI node joined to the tailnet.
 *
 * Every fetch writes a JSON snapshot into src/content/_snapshots/. If the tailnet
 * fetch fails (Directus down, not on the tailnet, e.g. a Cloudflare/PR build), we
 * fall back to the last-good committed snapshot and emit a loud warning — the site
 * never breaks and staleness is never silent. The snapshot is a fallback cache,
 * never the source of truth.
 */
import fs from 'node:fs';
import path from 'node:path';

const SNAPSHOT_DIR = path.resolve('src/content/_snapshots');

/**
 * RESERVED FOR FUTURE USE. The /resources/ page currently shows ALL published
 * resources (no shelf filter). When the other shelves (Books, Studio, Favorites)
 * get their own pages, filter each page by `shelf` title — set this to the main
 * shelf's title and re-enable the `.filter(r => r.data.shelf === MAIN_SHELF_TITLE)`
 * in src/pages/resources/index.astro.
 */
export const MAIN_SHELF_TITLE = 'Resources';

export type DirectusCollectionName = 'Field_Notes' | 'Resources';

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

function snapshotPath(collection: DirectusCollectionName): string {
  return path.join(SNAPSHOT_DIR, `${collection}.json`);
}

function readSnapshot(collection: DirectusCollectionName): { fetchedAt: string; items: any[] } | null {
  try {
    const raw = fs.readFileSync(snapshotPath(collection), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Persist the last-good snapshot. Loaders call this AFTER normalization so the
 * snapshot stores the enriched shape (e.g. Resources' self-hosted `logoPath`),
 * letting offline/PR builds reproduce the live render without the tailnet.
 */
export function writeSnapshot(collection: DirectusCollectionName, items: any[]): void {
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  const payload = { fetchedAt: new Date().toISOString(), items };
  fs.writeFileSync(snapshotPath(collection), `${JSON.stringify(payload, null, 2)}\n`);
}

/** GitHub Actions surfaces `::warning::` lines as annotations; harmless locally. */
function warn(message: string): void {
  console.warn(`::warning::${message}`);
}

/**
 * Deep-expanded field set per collection. `tags` is an M2M via a junction table,
 * so tags come back as `[{ tags_id: { name } }]` and get flattened downstream.
 */
const FIELD_SETS: Record<DirectusCollectionName, string> = {
  Field_Notes: [
    '*',
    'related_resource.slug',
    'related_resource.name',
    'tags.tags_id.name',
  ].join(','),
  Resources: [
    '*',
    'category.name',
    'shelf.title',
    'tags.tags_id.name',
  ].join(','),
};

async function fetchCollection(
  collection: DirectusCollectionName,
  baseUrl: string,
  token: string,
): Promise<any[]> {
  const url = new URL(`/items/${collection}`, baseUrl);
  url.searchParams.set('filter[status][_eq]', 'published');
  url.searchParams.set('fields', FIELD_SETS[collection]);
  url.searchParams.set('sort', 'sort');
  url.searchParams.set('limit', '-1');

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) {
    throw new Error(`Directus ${collection} responded ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { data?: any[] };
  return json.data ?? [];
}

/**
 * Returns published items for a collection: live from Directus (and refreshes the
 * snapshot) when the tailnet is reachable, otherwise the last-good snapshot.
 * Also returns the Directus base URL + token when live, so the loader can
 * self-host `logo` file assets over the same tailnet connection.
 */
export async function loadDirectusCollection(
  collection: DirectusCollectionName,
): Promise<{ items: any[]; live: boolean; baseUrl?: string; token?: string }> {
  const baseUrl = env('DIRECTUS_URL');
  const token = env('DIRECTUS_TOKEN');

  if (!baseUrl || !token) {
    const snapshot = readSnapshot(collection);
    if (!snapshot) {
      throw new Error(
        `Directus ${collection}: DIRECTUS_URL/DIRECTUS_TOKEN unset and no snapshot at ${snapshotPath(collection)}. ` +
          `Run a build on the tailnet once to seed the snapshot.`,
      );
    }
    warn(
      `Directus unreachable (no credentials); building ${collection} from snapshot dated ${snapshot.fetchedAt}. Content may be stale.`,
    );
    return { items: snapshot.items, live: false };
  }

  try {
    const items = await fetchCollection(collection, baseUrl, token);
    // Snapshot is written by the loader after normalization (so enriched fields
    // like Resources' self-hosted logoPath are captured), not here.
    return { items, live: true, baseUrl, token };
  } catch (error) {
    const snapshot = readSnapshot(collection);
    const reason = error instanceof Error ? error.message : String(error);
    if (!snapshot) {
      throw new Error(`Directus ${collection} fetch failed (${reason}) and no snapshot fallback exists.`);
    }
    warn(
      `Directus fetch failed for ${collection} (${reason}); building from snapshot dated ${snapshot.fetchedAt}. Content may be stale.`,
    );
    return { items: snapshot.items, live: false };
  }
}

/** Flatten the M2M tags junction (`[{ tags_id: { name } }]`) to `string[]`. */
export function flattenTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => (entry && typeof entry === 'object' ? (entry as any).tags_id?.name : entry))
    .filter((name): name is string => typeof name === 'string' && name.length > 0);
}

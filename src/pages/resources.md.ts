import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl } from '../lib/articles';
import { markdownResponse } from '../lib/markdown-endpoint';

const PRICING_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  free_paid: 'Free + Paid',
  freemium: 'Freemium',
  open_source: 'Open Source',
};

// Static Markdown version of the Resources page at /resources.md, emitted at
// build time from the Directus-backed resources collection. Single index file
// (resources have no per-item detail pages).
export const GET: APIRoute = async () => {
  const resources = (await getCollection('resources', (r) => r.data.status === 'published')).sort(
    (a, b) => (a.data.sort ?? 0) - (b.data.sort ?? 0),
  );

  const byCategory = new Map<string, typeof resources>();
  for (const resource of resources) {
    const category = resource.data.category ?? 'Other';
    byCategory.set(category, [...(byCategory.get(category) ?? []), resource]);
  }

  const categories = [...byCategory.entries()].sort(
    (a, b) => (a[1][0]?.data.categorySort ?? 0) - (b[1][0]?.data.categorySort ?? 0),
  );

  const lines = [
    '---',
    'title: "Resources"',
    `canonical: ${JSON.stringify(absoluteUrl('/resources/'))}`,
    `agent_json: ${JSON.stringify(absoluteUrl('/api/resources.json'))}`,
    '---',
    '',
    '# Resources',
    '',
    'Tools and services Mike Murphy uses and recommends.',
  ];

  for (const [category, items] of categories) {
    lines.push('', `## ${category}`, '');
    for (const r of items) {
      const d = r.data;
      const name = d.primaryUrl ? `[${d.name}](${d.primaryUrl})` : d.name;
      const pricing = d.pricingModel ? ` (${PRICING_LABELS[d.pricingModel] ?? d.pricingModel})` : '';
      lines.push(`- **${name}**${pricing}${d.description ? ` — ${d.description}` : ''}`);
      if (d.recommendationReason) lines.push(`  - Why: ${d.recommendationReason}`);
    }
  }

  return markdownResponse(`${lines.join('\n')}\n`);
};

export const prerender = true;

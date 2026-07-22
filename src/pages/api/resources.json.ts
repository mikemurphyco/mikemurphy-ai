import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pricingLabel, resourceLink, usageLabel } from '../../lib/field-notes';

// Agent-facing index of all published Resources, built from the Directus-backed
// collection at build time. Emitted as a static file at /api/resources.json.
export const GET: APIRoute = async () => {
  const resources = (await getCollection('resources', (r) => r.data.status === 'published'))
    .sort((a, b) => (a.data.sort ?? 0) - (b.data.sort ?? 0));

  const items = resources.map((r) => ({
    name: r.data.name,
    slug: r.data.slug,
    category: r.data.category,
    tags: r.data.tags,
    description: r.data.description,
    recommendationReason: r.data.recommendationReason,
    pricing: r.data.pricingModel,
    pricingLabel: pricingLabel(r.data.pricingModel),
    usage: r.data.usageStatus,
    usageLabel: usageLabel(r.data.usageStatus),
    url: resourceLink(r),
    isAffiliate: r.data.isAffiliate,
    dateLastReviewed: r.data.dateLastReviewed,
  }));

  return new Response(JSON.stringify({ count: items.length, items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

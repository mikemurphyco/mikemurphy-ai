import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { fieldNotesLoader, resourcesLoader } from './lib/directus-loader';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),

    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    draft: z.boolean().default(false),
    type: z.string().optional().default("post"),
    slug: z.string(),
    permalink: z.string(),

    legacyPermalink: z.string().optional(),
    canonicalUrl: z.string().optional(),

    contentEra: z.enum(["legacy", "ai"]),
    visibility: z.enum(["public", "search", "hidden", "draft"]),

    author: z.string().optional().default("Mike Murphy"),

    featuredImage: z.string().optional().default(""),
    featuredImageSource: z.string().optional().default(""),

    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    topics: z.array(z.string()).optional().default([]),

    youtube: z.array(z.string()).optional().default([]),

    search: z
      .object({
        include: z.boolean().optional().default(true),
        boost: z.number().optional().default(1),
      })
      .optional(),

    migration: z.record(z.string(), z.any()).optional(),
    wp: z.record(z.string(), z.any()).optional(),
    seo: z.record(z.string(), z.any()).optional(),
  }),
});

const aiUnplugged = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ai-unplugged' }),
  schema: z.object({
    issue: z.number().int().positive(),
    slug: z.string(),
    subject: z.string().max(120),
    lede: z.string().max(240),
    summary: z.string().max(320),
    publishedAt: z.coerce.date(),
    sentAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    source: z
      .object({
        provider: z.literal('beehiiv').default('beehiiv'),
        url: z.string().url().optional(),
        postId: z.string().optional(),
        audienceId: z.string().optional(),
        sendCount: z.number().int().optional(),
        openRate: z.number().min(0).max(1).optional(),
      })
      .default({ provider: 'beehiiv' }),
    sections: z
      .object({
        aiNews: z
          .object({
            headline: z.string(),
            summary: z.string(),
            sources: z.array(z.string().url()).default([]),
          })
          .optional(),
        aiTool: z
          .object({
            name: z.string(),
            url: z.string().url().optional(),
            description: z.string().max(280),
            verdict: z.enum(['keeper', 'trying', 'skipped']).optional(),
          })
          .optional(),
        aiTerm: z
          .object({
            term: z.string(),
            definition: z.string().max(280),
            relatedTo: z.array(z.string()).default([]),
          })
          .optional(),
        aiTutorial: z
          .object({
            title: z.string(),
            href: z.string(),
            author: z.string().optional(),
            internal: z.boolean().default(false),
            refSlug: z.string().optional(),
          })
          .optional(),
        quote: z
          .object({
            text: z.string(),
            attribution: z.string(),
            sourceUrl: z.string().url().optional(),
          })
          .optional(),
      })
      .default({}),
    agentReadable: z
      .object({
        summary120: z.string().max(120).optional(),
        keyClaims: z.array(z.string()).default([]),
        entities: z.array(z.string()).default([]),
      })
      .default({}),
    pgRowId: z.number().int().optional(),
    syncedAt: z.coerce.date().optional(),
    isFlagshipIssue: z.boolean().default(false),
    isDraft: z.boolean().default(false),
    og: z.object({ image: z.string() }).optional(),
  }),
});

// Directus-backed collections (Directus is the source of truth; see
// src/lib/directus.ts). The loaders normalize Directus field shapes into the
// flat data these schemas validate.
const fieldNotes = defineCollection({
  loader: fieldNotesLoader(),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    sort: z.number().nullable().default(null),
    noteType: z
      .enum(['tip', 'shortcut', 'did_you_know', 'snippet', 'definition', 'gotcha'])
      .nullable()
      .default(null),
    featured: z.boolean().default(false),
    excerpt: z.string().default(''),
    snippets: z
      .array(z.object({ label: z.string().default(''), detail: z.string().default('') }))
      .default([]),
    relatedTutorialUrl: z.string().url().nullable().default(null),
    relatedResource: z
      .object({ slug: z.string().nullable(), name: z.string().nullable() })
      .nullable()
      .default(null),
    datePublished: z.coerce.date().nullable().default(null),
    tags: z.array(z.string()).default([]),
  }),
});

const resources = defineCollection({
  loader: resourcesLoader(),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    sort: z.number().nullable().default(null),
    initials: z.string().nullable().default(null),
    badgeColor: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    recommendationReason: z.string().nullable().default(null),
    pricingModel: z
      .enum(['free', 'paid', 'free_paid', 'freemium', 'open_source'])
      .nullable()
      .default(null),
    usageStatus: z
      .enum(['used_daily', 'used_often', 'used_here', 'affiliate', 'planned', 'previously_used', 'testing'])
      .nullable()
      .default(null),
    primaryUrl: z.string().url().nullable().default(null),
    isAffiliate: z.boolean().default(false),
    affiliateUrl: z.string().url().nullable().default(null),
    featured: z.boolean().default(false),
    logoPath: z.string().nullable().default(null),
    category: z.string().nullable().default(null),
    shelf: z.string().nullable().default(null),
    tags: z.array(z.string()).default([]),
    dateAdded: z.coerce.date().nullable().default(null),
    dateLastReviewed: z.coerce.date().nullable().default(null),
  }),
});

export const collections = { articles, aiUnplugged, fieldNotes, resources };

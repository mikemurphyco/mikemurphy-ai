import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

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

export const collections = { articles, aiUnplugged };

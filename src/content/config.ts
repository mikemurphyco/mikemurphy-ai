import { defineCollection } from "astro:content";
import { z } from "zod";

const articles = defineCollection({
  type: "content",
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

export const collections = {
  articles,
};
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isDiscoverableArticle, isPodcastEpisode, podcastUrl, type Article } from '../../lib/articles';
import { buildArticleMarkdown, markdownResponse } from '../../lib/markdown-endpoint';

// Static Markdown version of each podcast episode at /podcast/<slug>.md,
// emitted at build time from the raw content-collection body (not converted
// from rendered HTML at runtime). Same filter as [slug].astro.
export async function getStaticPaths() {
  const episodes = await getCollection('articles', (article) => isDiscoverableArticle(article) && isPodcastEpisode(article));
  return episodes.map((article) => ({ params: { slug: article.data.slug }, props: { article } }));
}

export const GET: APIRoute = ({ props }) => {
  const { article } = props as { article: Article };
  return markdownResponse(buildArticleMarkdown(article, podcastUrl(article)));
};

export const prerender = true;

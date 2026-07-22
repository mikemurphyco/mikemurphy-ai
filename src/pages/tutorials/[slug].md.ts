import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isDiscoverableArticle, isTutorial, tutorialUrl, type Article } from '../../lib/articles';
import { buildArticleMarkdown, markdownResponse } from '../../lib/markdown-endpoint';

// Static Markdown version of each tutorial at /tutorials/<slug>.md, emitted at
// build time from the raw content-collection body (not converted from rendered
// HTML at runtime). Same filter as [slug].astro so coverage matches 1:1.
export async function getStaticPaths() {
  const articles = await getCollection('articles', (article) => isDiscoverableArticle(article) && isTutorial(article));
  return articles.map((article) => ({ params: { slug: article.data.slug }, props: { article } }));
}

export const GET: APIRoute = ({ props }) => {
  const { article } = props as { article: Article };
  return markdownResponse(buildArticleMarkdown(article, tutorialUrl(article)));
};

export const prerender = true;

import { getCollection } from 'astro:content';
import {
  SITE_URL,
  absoluteUrl,
  articleUrl,
  getTopicMap,
  isDiscoverableArticle,
  sortArticlesByDate,
} from '../lib/articles';

export async function GET() {
  const articles = sortArticlesByDate(await getCollection('articles', isDiscoverableArticle));
  const topics = getTopicMap(articles);
  const urls = [
    { loc: absoluteUrl('/'), priority: '1.0' },
    { loc: absoluteUrl('/articles/'), priority: '0.9' },
    { loc: absoluteUrl('/topics/'), priority: '0.8' },
    { loc: absoluteUrl('/search/'), priority: '0.6' },
    ...topics.map((topic) => ({
      loc: absoluteUrl(`/topics/${topic.slug}/`),
      priority: topic.articles.length >= 20 ? '0.8' : '0.7',
    })),
    ...articles.map((article) => ({
      loc: absoluteUrl(articleUrl(article)),
      lastmod: new Date(article.data.updatedDate ?? article.data.pubDate).toISOString(),
      priority: article.data.contentEra === 'ai' ? '0.8' : '0.6',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    return `  <url>
    <loc>${url.loc}</loc>
    ${'lastmod' in url ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const prerender = true;

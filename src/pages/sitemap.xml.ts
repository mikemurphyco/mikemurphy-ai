import { getCollection } from 'astro:content';
import {
  SITE_URL,
  absoluteUrl,
  contentUrl,
  getTopicMap,
  isDiscoverableArticle,
  isPublishedIssue,
  issueUrl,
  sortArticlesByDate,
  sortIssuesByDate,
} from '../lib/articles';
import { fieldNoteUrl, isPublishedNote, sortNotesByDate } from '../lib/field-notes';

export async function GET() {
  const articles = sortArticlesByDate(await getCollection('articles', isDiscoverableArticle));
  const issues = sortIssuesByDate(await getCollection('aiUnplugged', isPublishedIssue));
  const notes = sortNotesByDate(await getCollection('fieldNotes', isPublishedNote));
  const topics = getTopicMap(articles);
  const urls = [
    { loc: absoluteUrl('/'), priority: '1.0' },
    { loc: absoluteUrl('/tutorials/'), priority: '1.0' },
    { loc: absoluteUrl('/ai-unplugged/'), priority: '0.9' },
    { loc: absoluteUrl('/ai-unplugged/issues/'), priority: '0.8' },
    { loc: absoluteUrl('/resources/'), priority: '0.7' },
    { loc: absoluteUrl('/field-notes/'), priority: '0.7' },
    { loc: absoluteUrl('/articles/'), priority: '0.9' },
    { loc: absoluteUrl('/podcast/'), priority: '0.6' },
    { loc: absoluteUrl('/about/'), priority: '0.6' },
    { loc: absoluteUrl('/contact/'), priority: '0.5' },
    { loc: absoluteUrl('/topics/'), priority: '0.8' },
    { loc: absoluteUrl('/search/'), priority: '0.6' },
    ...topics.map((topic) => ({
      loc: absoluteUrl(`/topics/${topic.slug}/`),
      priority: topic.articles.length >= 20 ? '0.8' : '0.7',
    })),
    ...articles.map((article) => ({
      loc: absoluteUrl(contentUrl(article)),
      lastmod: new Date(article.data.updatedDate ?? article.data.pubDate).toISOString(),
      priority: article.data.contentEra === 'ai' ? '0.8' : '0.6',
    })),
    ...issues.map((issue) => ({
      loc: absoluteUrl(issueUrl(issue)),
      lastmod: new Date(issue.data.updatedAt ?? issue.data.publishedAt).toISOString(),
      priority: issue.data.isFlagshipIssue ? '0.8' : '0.7',
    })),
    ...notes.map((note) => ({
      loc: absoluteUrl(fieldNoteUrl(note)),
      ...(note.data.datePublished
        ? { lastmod: new Date(note.data.datePublished).toISOString() }
        : {}),
      priority: '0.6',
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

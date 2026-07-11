import { getCollection } from 'astro:content';
import {
  SITE_TITLE,
  absoluteUrl,
  isPublishedIssue,
  issueUrl,
  sortIssuesByDate,
} from '../../lib/articles';
import { buildRssFeed } from '../../lib/rss';

export async function GET() {
  const issues = sortIssuesByDate(await getCollection('aiUnplugged', isPublishedIssue));

  const body = buildRssFeed({
    title: `${SITE_TITLE} AI Unplugged`,
    description: 'Practical weekly AI notes by Mike Murphy — tools, terms, tutorials, and workflow shifts worth keeping.',
    siteUrl: absoluteUrl('/ai-unplugged/'),
    feedUrl: absoluteUrl('/ai-unplugged/rss.xml'),
    items: issues.map((issue) => ({
      title: issue.data.subject,
      link: absoluteUrl(issueUrl(issue)),
      description: issue.data.summary || issue.data.lede,
      pubDate: issue.data.sentAt ?? issue.data.publishedAt,
    })),
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const prerender = true;

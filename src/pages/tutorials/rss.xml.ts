import { getCollection } from 'astro:content';
import {
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  isDiscoverableArticle,
  sortTutorialsByDate,
  tutorialUrl,
} from '../../lib/articles';
import { buildRssFeed } from '../../lib/rss';

export async function GET() {
  const tutorials = sortTutorialsByDate(await getCollection('articles', isDiscoverableArticle));

  const body = buildRssFeed({
    title: `${SITE_TITLE} Tutorials`,
    description: 'Practical AI, automation, and creative tech tutorials by Mike Murphy.',
    siteUrl: absoluteUrl('/tutorials/'),
    feedUrl: absoluteUrl('/tutorials/rss.xml'),
    items: tutorials.map((tutorial) => ({
      title: tutorial.data.title,
      link: absoluteUrl(tutorialUrl(tutorial)),
      description: tutorial.data.description,
      pubDate: tutorial.data.pubDate,
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

import type { CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export type AiUnpluggedIssue = CollectionEntry<'aiUnplugged'>;

export const SITE_URL = 'https://mikemurphy.ai';
export const SITE_TITLE = 'Mike Murphy';
export const SITE_DESCRIPTION =
  'AI, automation, creative tech, and media production tutorials by Mike Murphy.';

export function isDiscoverableArticle(article: Article) {
  return article.data.draft !== true && article.data.visibility !== 'hidden';
}

export function isPublicArticle(article: Article) {
  return isDiscoverableArticle(article) && article.data.visibility === 'public';
}

export function sortArticlesByDate(articles: Article[]) {
  return [...articles].sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
}

export function articleUrl(article: Article) {
  return `/articles/${article.data.slug}/`;
}

export function tutorialUrl(article: Article) {
  return `/tutorials/${article.data.slug}/`;
}

export function podcastUrl(article: Article) {
  return `/podcast/${article.data.slug}/`;
}

function hasCategory(article: Article, categoryName: string) {
  return article.data.categories.some(
    (category) => category.toLowerCase() === categoryName.toLowerCase(),
  );
}

export function isPodcastEpisode(article: Article) {
  return hasCategory(article, 'Episodes') || /^ep\d+$/i.test(article.data.slug);
}

export function isTutorial(article: Article) {
  return hasCategory(article, 'Tutorials');
}

export function isStandardArticle(article: Article) {
  return !isTutorial(article) && !isPodcastEpisode(article);
}

export function contentUrl(article: Article) {
  if (isPodcastEpisode(article)) return podcastUrl(article);
  if (isTutorial(article)) return tutorialUrl(article);
  return articleUrl(article);
}

export function sortTutorialsByDate(articles: Article[]) {
  return sortArticlesByDate(articles.filter(isTutorial));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function isPublishedIssue(issue: AiUnpluggedIssue) {
  return issue.data.isDraft !== true;
}

export function sortIssuesByDate(issues: AiUnpluggedIssue[]) {
  return [...issues].sort(
    (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime(),
  );
}

export function issueUrl(issue: AiUnpluggedIssue) {
  return `/ai-unplugged/issues/${issue.data.slug}/`;
}

export function getArticleTerms(article: Article) {
  const terms = [
    ...(article.data.topics ?? []),
    ...(article.data.categories ?? []),
    ...(article.data.tags ?? []),
  ];

  return [...new Set(terms.filter(Boolean))];
}

export function getArticleTopicTerms(article: Article) {
  const terms = [...(article.data.topics ?? []), ...(article.data.categories ?? [])];

  return [...new Set(terms.filter(Boolean))];
}

export function slugifyTerm(term: string) {
  return term
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getTopicMap(articles: Article[]) {
  const topics = new Map<string, { name: string; slug: string; articles: Article[] }>();

  for (const article of articles) {
    const articleTopicSlugs = new Set<string>();

    for (const term of getArticleTopicTerms(article)) {
      const slug = slugifyTerm(term);
      if (!slug || articleTopicSlugs.has(slug)) continue;
      articleTopicSlugs.add(slug);

      const existing = topics.get(slug);
      if (existing) {
        existing.articles.push(article);
      } else {
        topics.set(slug, { name: term, slug, articles: [article] });
      }
    }
  }

  return [...topics.values()]
    .map((topic) => ({
      ...topic,
      articles: sortArticlesByDate(topic.articles),
    }))
    .sort((a, b) => b.articles.length - a.articles.length || a.name.localeCompare(b.name));
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

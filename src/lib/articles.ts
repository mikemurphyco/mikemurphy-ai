import type { CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export type AiUnpluggedIssue = CollectionEntry<'aiUnplugged'>;
export type FieldNote = CollectionEntry<'fieldNotes'>;

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

function cleanDescriptionBlock(block: string) {
  return block
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<https?:\/\/[^>]+>/gi, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/^\s*(?:[-*+] |\d+\. )/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\\([\\`*{}[\]()#+.!_-])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function articleMetaDescription(article: Article, maxLength = 160) {
  const authoredDescription = article.data.description.trim();
  if (authoredDescription) return authoredDescription;

  const body = (article.body ?? '').replace(/^---\n[\s\S]*?\n---\n?/, '');
  const candidate = body
    .split(/\n\s*\n/)
    .map(cleanDescriptionBlock)
    .map((block) => block.replace(/^(?:Description|Episode Summary)\s*:\s*/i, ''))
    .find((block) => block.length >= 40 && (block.match(/[a-z]/gi)?.length ?? 0) >= 30);
  const fallback = isPodcastEpisode(article)
    ? `Listen to ${article.data.title}, an episode of Mike Murphy Unplugged.`
    : isTutorial(article)
      ? `Learn ${article.data.title} in this tutorial from Mike Murphy.`
      : `Read ${article.data.title}, an article by Mike Murphy.`;
  const description = candidate || fallback;

  if (description.length <= maxLength) return description;

  const clipped = description.slice(0, maxLength - 1);
  const wordBoundary = clipped.replace(/\s+\S*$/, '').trimEnd();
  return `${wordBoundary || clipped}…`;
}

export function slugifyTerm(term: string) {
  return term
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getTopicMap(articles: Article[]) {
  return getUnifiedTopicMap(articles, []);
}

export function getUnifiedTopicMap(articles: Article[], notes: FieldNote[]) {
  const topics = new Map<
    string,
    { name: string; slug: string; articles: Article[]; notes: FieldNote[] }
  >();

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
        topics.set(slug, { name: term, slug, articles: [article], notes: [] });
      }
    }
  }

  for (const note of notes) {
    const noteTopicSlugs = new Set<string>();

    for (const term of note.data.tags) {
      const slug = slugifyTerm(term);
      if (!slug || noteTopicSlugs.has(slug)) continue;
      noteTopicSlugs.add(slug);

      const existing = topics.get(slug);
      if (existing) {
        existing.notes.push(note);
      } else {
        topics.set(slug, { name: term, slug, articles: [], notes: [note] });
      }
    }
  }

  return [...topics.values()]
    .map((topic) => ({
      ...topic,
      articles: sortArticlesByDate(topic.articles),
      notes: [...topic.notes].sort((a, b) => {
        const at = a.data.datePublished ? new Date(a.data.datePublished).getTime() : 0;
        const bt = b.data.datePublished ? new Date(b.data.datePublished).getTime() : 0;
        return bt - at || (a.data.sort ?? 0) - (b.data.sort ?? 0);
      }),
    }))
    .sort(
      (a, b) =>
        b.articles.length + b.notes.length - (a.articles.length + a.notes.length) ||
        a.name.localeCompare(b.name),
    );
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

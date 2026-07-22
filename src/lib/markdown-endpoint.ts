import { absoluteUrl, type Article } from './articles';

// Shared builder for the static .md endpoints (tutorials/articles/podcast).
// Emits a self-describing Markdown document: minimal YAML frontmatter for
// agents (title, description, dates, canonical URL, tags) plus the raw
// authored Markdown body from the content collection — never converted from
// rendered HTML. See markdown-emission-migration plan / BUILD_LOG.md.

function yamlString(value: string) {
  return JSON.stringify(value);
}

export function buildArticleMarkdown(article: Article, canonicalPath: string) {
  const d = article.data;
  const frontmatter = [
    '---',
    `title: ${yamlString(d.title)}`,
    d.description ? `description: ${yamlString(d.description)}` : null,
    `date: ${new Date(d.pubDate).toISOString().slice(0, 10)}`,
    d.updatedDate ? `updated: ${new Date(d.updatedDate).toISOString().slice(0, 10)}` : null,
    `author: ${yamlString(d.author)}`,
    `canonical: ${yamlString(absoluteUrl(canonicalPath))}`,
    d.tags?.length ? `tags: [${d.tags.map(yamlString).join(', ')}]` : null,
    d.categories?.length ? `categories: [${d.categories.map(yamlString).join(', ')}]` : null,
    '---',
  ].filter((line): line is string => line !== null);

  const body = (article.body ?? '').trim();

  return `${frontmatter.join('\n')}\n\n${body}\n`;
}

export function markdownResponse(body: string) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

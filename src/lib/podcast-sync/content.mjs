import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const ARTICLE_ROOT = 'src/content/articles';
const SITE_URL = 'https://mikemurphy.ai';

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (/\.mdx?$/.test(entry.name)) files.push(file);
  }
  return files;
}

function splitDocument(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`${file}: missing YAML frontmatter`);
  return {
    frontmatter: match[1],
    body: source.slice(match[0].length).trim(),
  };
}

function unquote(value) {
  const quote = value[0];
  return (quote === '"' || quote === "'") && value.endsWith(quote) ? value.slice(1, -1) : value;
}

function scalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'))?.[1]?.trim() ?? '';
  return unquote(value);
}

function podcastScalar(frontmatter, key) {
  const section = frontmatter.match(/^podcast:\s*\r?\n((?:[ \t]+.*(?:\r?\n|$))*)/m)?.[1] ?? '';
  const value = section.match(new RegExp(`^\\s+${key}:\\s*(.*?)\\s*$`, 'm'))?.[1]?.trim() ?? '';
  return unquote(value);
}

function absoluteUrl(value, baseUrl) {
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return value;
  }
}

function cleanHtml(html, canonicalUrl) {
  const headingsAsStrongParagraphs = html.replace(
    /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,
    '<p><strong>$1</strong></p>',
  );
  return sanitizeHtml(headingsAsStrongParagraphs, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr'],
    allowedAttributes: { a: ['href'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: 'a',
        attribs: { href: absoluteUrl(attributes.href ?? '', canonicalUrl) },
      }),
    },
  })
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/\n+/g, '')
    .trim();
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function textFromHtml(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
}

function fallbackParagraph(token, remaining) {
  if (remaining <= 20) return '';
  const text = textFromHtml(marked.parser([token]));
  if (!text) return '';
  const budget = Math.max(0, remaining - 8);
  const shortened = text.length > budget ? `${text.slice(0, Math.max(0, budget - 1)).trimEnd()}…` : text;
  return `<p>${escapeHtml(shortened)}</p>`;
}

export function renderPodcastDescription(markdown, canonicalUrl, maxCharacters = 3400) {
  const footer = `<p><a href="${escapeHtml(canonicalUrl)}">Read the complete show notes and resources on mikemurphy.ai.</a></p>`;
  if (footer.length >= maxCharacters) throw new Error('Description limit is too small for the canonical show-notes link');

  const full = cleanHtml(marked.parse(markdown), canonicalUrl);
  if (full.length + footer.length <= maxCharacters) {
    return { html: `${full}${footer}`, truncated: false, fullHtmlCharacters: full.length };
  }

  const pieces = [];
  let used = 0;
  for (const token of marked.lexer(markdown)) {
    if (token.type === 'space') continue;
    const piece = cleanHtml(marked.parser([token]), canonicalUrl);
    if (!piece) continue;
    if (used + piece.length + footer.length <= maxCharacters) {
      pieces.push(piece);
      used += piece.length;
      continue;
    }

    const fallback = fallbackParagraph(token, maxCharacters - used - footer.length);
    if (fallback && used + fallback.length + footer.length <= maxCharacters) pieces.push(fallback);
    break;
  }

  return {
    html: `${pieces.join('')}${footer}`,
    truncated: true,
    fullHtmlCharacters: full.length,
  };
}

export function loadPodcastEpisodes({ articleRoot = ARTICLE_ROOT, maxCharacters = 3400 } = {}) {
  const episodes = [];

  for (const file of walk(articleRoot)) {
    const source = readFileSync(file, 'utf8');
    const { frontmatter, body } = splitDocument(source, file);
    const rawEpisodeNumber = podcastScalar(frontmatter, 'episodeNumber');
    if (!rawEpisodeNumber) continue;

    const episodeNumber = Number(rawEpisodeNumber);
    const buzzsproutId = podcastScalar(frontmatter, 'buzzsproutEpisodeId');
    const slug = scalar(frontmatter, 'slug') || `ep${episodeNumber}`;
    const canonicalUrl = absoluteUrl(scalar(frontmatter, 'canonicalUrl') || `/podcast/${slug}/`, SITE_URL);
    const rendered = renderPodcastDescription(body, canonicalUrl, maxCharacters);

    episodes.push({
      episodeNumber,
      buzzsproutId,
      title: scalar(frontmatter, 'title'),
      slug,
      canonicalUrl,
      sourceFile: relative('.', file),
      sourceCharacters: body.length,
      ...rendered,
    });
  }

  episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
  validateEpisodes(episodes);
  return episodes;
}

function validateEpisodes(episodes) {
  const errors = [];
  const ids = new Set();
  const numbers = new Set();

  for (const episode of episodes) {
    if (!episode.buzzsproutId) errors.push(`${episode.sourceFile}: missing podcast.buzzsproutEpisodeId`);
    if (!/^\d+$/.test(episode.buzzsproutId)) errors.push(`${episode.sourceFile}: invalid Buzzsprout episode ID`);
    if (ids.has(episode.buzzsproutId)) errors.push(`${episode.sourceFile}: duplicate Buzzsprout ID ${episode.buzzsproutId}`);
    if (numbers.has(episode.episodeNumber)) errors.push(`${episode.sourceFile}: duplicate episode number ${episode.episodeNumber}`);
    ids.add(episode.buzzsproutId);
    numbers.add(episode.episodeNumber);
  }

  if (!episodes.length) errors.push('No podcast episodes were found');
  if (errors.length) throw new Error(`Podcast content validation failed:\n- ${errors.join('\n- ')}`);
}

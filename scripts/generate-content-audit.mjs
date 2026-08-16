import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const articleRoot = 'src/content/articles';
const outputPath = 'reports/content-audit.csv';

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (/\.mdx?$/.test(entry.name)) files.push(file);
  }
  return files;
}

function frontmatter(source) {
  return source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function scalar(fm, key) {
  const raw = fm.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'))?.[1]?.trim() ?? '';
  const quote = raw[0];
  return (quote === '"' || quote === "'") && raw.endsWith(quote) ? raw.slice(1, -1) : raw;
}

function list(fm, key) {
  if (fm.match(new RegExp(`^${key}:\\s*\\[\\]\\s*$`, 'm'))) return [];
  const match = fm.match(new RegExp(`^${key}:\\s*\\n((?:[ \\t]+-.*\\n?)*)`, 'm'));
  if (!match?.[1]) return [];
  return [...match[1].matchAll(/^\s*-\s*["']?(.+?)["']?\s*$/gm)].map((item) => item[1]);
}

function nestedNumber(fm, parent, key) {
  const section = fm.match(new RegExp(`^${parent}:\\s*\\n((?:[ \\t]+.*\\n?)*)`, 'm'))?.[1] ?? '';
  return Number(section.match(new RegExp(`^\\s+${key}:\\s*(\\d+)\\s*$`, 'm'))?.[1] ?? 0);
}

function articleType(slug, categories) {
  if (categories.some((category) => category.toLowerCase() === 'tutorials')) return 'tutorial';
  if (categories.some((category) => category.toLowerCase() === 'episodes') || /^ep\d+$/i.test(slug)) {
    return 'podcast';
  }
  return 'article';
}

function routeFor(type, slug) {
  const section = type === 'podcast' ? 'podcast' : type === 'tutorial' ? 'tutorials' : 'articles';
  return `https://mikemurphy.ai/${section}/${slug}/`;
}

function recommendation({ draft, visibility, type }) {
  if (draft === 'true' || visibility === 'draft') return 'keep_draft';
  if (visibility === 'hidden') return 'review_remove_or_redirect';
  if (visibility === 'public') return 'keep_indexed_verify_quality';
  if (type === 'tutorial') return 'quiet_archive_review_traffic';
  if (type === 'podcast') return 'quiet_archive';
  return 'quiet_archive_review_remove';
}

function reviewPriority({ visibility, type }) {
  if (visibility === 'draft' || visibility === 'hidden') return 'high';
  if (visibility === 'public') return 'protect';
  if (type === 'article') return 'high';
  if (type === 'tutorial') return 'medium';
  return 'low';
}

function bodyWordCount(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n?/, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<https?:\/\/[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\p{L}\p{N}'’-]+/gu, ' ')
    .trim();
  return body ? body.split(/\s+/).length : 0;
}

function csv(value) {
  const string = String(value ?? '');
  return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

const rows = walk(articleRoot).map((file) => {
  const source = readFileSync(file, 'utf8');
  const fm = frontmatter(source);
  const slug = scalar(fm, 'slug');
  const categories = list(fm, 'categories');
  const tags = list(fm, 'tags');
  const topics = list(fm, 'topics');
  const type = articleType(slug, categories);
  const visibility = scalar(fm, 'visibility');
  const draft = scalar(fm, 'draft');
  const youtubeCount = list(fm, 'youtube').length + (fm.match(/^video:\s*$/m) ? 1 : 0);
  const row = {
    review_priority: '',
    recommended_action: '',
    visibility,
    type,
    year: scalar(fm, 'pubDate').slice(0, 4),
    published: scalar(fm, 'pubDate'),
    title: scalar(fm, 'title'),
    slug,
    url: routeFor(type, slug),
    body_words: bodyWordCount(source),
    youtube_count: youtubeCount,
    legacy_live_words: nestedNumber(fm, 'seo', 'liveWordCount'),
    content_era: scalar(fm, 'contentEra'),
    categories: categories.join(' | '),
    topics: topics.join(' | '),
    tags: tags.join(' | '),
    source_file: relative('.', file),
    notes: '',
  };
  row.recommended_action = recommendation({ draft, visibility, type });
  row.review_priority = reviewPriority({ visibility, type });
  return row;
});

rows.sort((a, b) => {
  const priority = { high: 0, medium: 1, low: 2, protect: 3 };
  return priority[a.review_priority] - priority[b.review_priority]
    || b.published.localeCompare(a.published)
    || a.title.localeCompare(b.title);
});

const headers = Object.keys(rows[0]);
const output = [
  headers.join(','),
  ...rows.map((row) => headers.map((header) => csv(row[header])).join(',')),
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${output}\n`);

const counts = rows.reduce((result, row) => {
  result[row.visibility] = (result[row.visibility] ?? 0) + 1;
  return result;
}, {});
console.log(`Wrote ${rows.length} rows to ${outputPath}: ${JSON.stringify(counts)}`);

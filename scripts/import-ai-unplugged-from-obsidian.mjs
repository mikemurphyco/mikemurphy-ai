/**
 * MIGRATION-ONLY — do not run casually.
 *
 * One-shot Obsidian → Astro bulk importer for the AI Unplugged archive.
 * DESTRUCTIVE: deletes all .md/.mdx in src/content/ai-unplugged/, then
 * regenerates every issue from the MikeOS newsletter folder.
 *
 * Not the weekly publish path. Prefer Beehiiv → Astro publish / manual edits.
 * Kept in the repo as historical migration tooling.
 *
 * Usage: npm run import:ai-unplugged
 * Optional: node scripts/import-ai-unplugged-from-obsidian.mjs [sourceDir] [outputDir]
 */
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SOURCE_DIR =
  '/Users/mikemurphy/Library/Mobile Documents/iCloud~md~obsidian/Documents/MikeOS/Content/Newsletters/AI Unplugged Newsletter';
const DEFAULT_OUTPUT_DIR = path.resolve('src/content/ai-unplugged');

const sourceDir = process.argv[2] ?? DEFAULT_SOURCE_DIR;
const outputDir = process.argv[3] ?? DEFAULT_OUTPUT_DIR;

function die(message) {
  console.error(message);
  process.exit(1);
}

function splitFrontmatter(markdown, filePath) {
  if (!markdown.startsWith('---\n')) {
    return { frontmatter: '', body: markdown };
  }

  const end = markdown.indexOf('\n---', 4);
  if (end === -1) die(`Could not find closing frontmatter fence in ${filePath}`);

  return {
    frontmatter: markdown.slice(4, end).trim(),
    body: markdown.slice(end + 4).replace(/^\s+/, ''),
  };
}

function yamlValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

function yamlList(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\n([\\s\\S]*?)(?=^[a-zA-Z0-9_-]+:|\\z)`, 'm'));
  if (!match) return [];

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\z)`, 'm'));
  return match ? match[1].trim() : '';
}

function firstParagraph(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((part) => {
      const original = part.trim();
      if (!original || /^#+\s+/.test(original)) return '';

      return original
        .replace(/^#+\s+/gm, '')
        .replace(/^\s*[-*]\s+/gm, '')
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    })
    .find((part) => part && !part.startsWith('---'));
}

function truncate(text, max) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const sliced = clean.slice(0, max - 1);
  const sentence = sliced.match(/^(.+[.!?])\s+/);
  if (sentence && sentence[1].length > 60) return sentence[1];

  const lastSpace = sliced.lastIndexOf(' ');
  return `${sliced.slice(0, lastSpace > 60 ? lastSpace : sliced.length).trim()}…`;
}

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function subjectFromTitle(title, summarySlug, issueNumber) {
  const clean = title
    .replace(/^AI Unplugged\s*[-–—]\s*/i, '')
    .replace(new RegExp(`^Issue\\s*0?${issueNumber}\\s*[:\\-–—]?\\s*`, 'i'), '')
    .replace(new RegExp(`\\s*[-–—]\\s*Issue\\s*0?${issueNumber}\\s*$`, 'i'), '')
    .replace(new RegExp(`\\s*\\(?Issue\\s*0?${issueNumber}\\)?\\s*$`, 'i'), '')
    .trim();

  return truncate(clean || titleCaseFromSlug(summarySlug), 120);
}

function cleanTopic(value) {
  return value
    .replace(/\[[^\]]+\]\([^)]+\)/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function topicsFromSummary(summaryMarkdown, summaryFrontmatter) {
  const tags = yamlList(summaryFrontmatter, 'tags').filter(
    (tag) =>
      tag &&
      !/^issue-\d+$/i.test(tag) &&
      !['newsletter', 'newsletter-summary', 'ai-unplugged'].includes(tag.toLowerCase()),
  );

  const entities = section(summaryMarkdown, 'Entities and Topics');
  const topicLine = entities.match(/\*\*Topics:\*\*\s*(.+)/i)?.[1] ?? '';
  const toolLine = entities.match(/\*\*Companies \/ Tools:\*\*\s*(.+)/i)?.[1] ?? '';

  const extracted = [...topicLine.split(','), ...toolLine.split(',')]
    .map(cleanTopic)
    .filter(Boolean);

  return [...new Set([...extracted, ...tags])].slice(0, 8);
}

function listItems(sectionText) {
  return sectionText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function cleanIssueBody(body, title) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const cleaned = [];
  let removedTitle = false;
  let skippedIntroMeta = false;

  for (const rawLine of lines) {
    let line = rawLine;
    const trimmed = line.trim();

    if (!removedTitle && /^#\s+/.test(trimmed)) {
      removedTitle = true;
      continue;
    }

    if (!skippedIntroMeta) {
      if (/^##\s+/.test(trimmed)) {
        continue;
      }
      if (/!\[Author\]/i.test(trimmed)) continue;
      if (/^\[Mike Murphy\]\(/.test(trimmed)) continue;
      if (/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(trimmed)) continue;
      if (/^\[\]\(https?:\/\/www\.(facebook|threads|linkedin)\./.test(trimmed)) continue;
      if (/^\[\]\(https?:\/\/twitter\.com/.test(trimmed)) continue;
      if (/^\[\]\(https?:\/\/www\.facebook\.com/.test(trimmed)) continue;
      if (trimmed === '') continue;
      skippedIntroMeta = true;
    }

    if (trimmed.includes('{{rp_referral_hub_url}}')) continue;
    if (/^\[ Share the newsletter \]/i.test(trimmed)) continue;
    if (/^🗳️/.test(trimmed)) continue;
    if (/^\*\*Mike Murphy\*\*\s+—\s+The AI Handyman/i.test(trimmed)) break;

    cleaned.push(line);
  }

  return cleaned
    .join('\n')
    .replace(/^###\s+/gm, '### ')
    .replace(/^###\s+🧠\*\*\s*(.*?)\s*\*\*(.*)$/gm, '### 🧠 $1$2')
    .replace(/^###\s+(💬|🧰)\*{2,}\s*(.*?)\*{2}$/gm, '### $1 $2')
    .replace(/^###\s+\*\*(🛠.*?)\*\*$/gm, '### $1')
    .replace(/(Week:)(\S)/g, '$1 $2')
    .replace(/\*\*([^*\n]+?):\s+\*\*/g, '**$1:**')
    .replace(/\n-\s*\n\s*([^\n])/g, '\n- $1')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/^\s+/, '')
    .trimEnd();
}

function yamlString(value) {
  return JSON.stringify(String(value ?? ''));
}

function yamlArray(values, indent = '') {
  if (!values.length) return ' []';
  return `\n${values.map((value) => `${indent}- ${yamlString(value)}`).join('\n')}`;
}

function astroFrontmatter(issue) {
  const keyClaims = issue.keyClaims.slice(0, 6);

  return `---\nissue: ${issue.issueNumber}\nslug: ${yamlString(issue.slug)}\nsubject: ${yamlString(issue.subject)}\nlede: ${yamlString(issue.lede)}\nsummary: ${yamlString(issue.summary)}\npublishedAt: ${yamlString(issue.publishedAt)}\nsentAt: ${yamlString(issue.sentAt)}\ntags:${yamlArray(issue.tags, '  ')}\ntopics:${yamlArray(issue.topics, '  ')}\nsource:\n  provider: \"beehiiv\"\n  url: ${yamlString(issue.sourceUrl)}\n  postId: ${yamlString(issue.postId)}\nagentReadable:\n  summary120: ${yamlString(truncate(issue.summary, 120))}\n  keyClaims:${yamlArray(keyClaims, '    ')}\n  entities:${yamlArray(issue.topics.slice(0, 8), '    ')}\nisDraft: false\n---\n`;
}

function issueFromFiles(issuePath, summaryPath) {
  const rawIssue = fs.readFileSync(issuePath, 'utf8');
  const rawSummary = fs.readFileSync(summaryPath, 'utf8');
  const { frontmatter: issueFm, body: issueBody } = splitFrontmatter(rawIssue, issuePath);
  const { frontmatter: summaryFm, body: summaryBody } = splitFrontmatter(rawSummary, summaryPath);

  const issueNumber = Number(yamlValue(issueFm, 'issue_number'));
  const padded = String(issueNumber).padStart(3, '0');
  const sourceSlug = yamlValue(summaryFm, 'slug') || issuePath.name.replace(/^AI Unplugged - Issue \d+ - /, '').replace(/\.md$/, '');
  const sourceTitle = yamlValue(issueFm, 'title') || yamlValue(summaryFm, 'issue_title') || titleCaseFromSlug(sourceSlug);
  const subject = subjectFromTitle(sourceTitle, sourceSlug, issueNumber);
  const oneParagraphSummary = section(summaryBody, 'One-Paragraph Summary');
  const keyTakeaways = listItems(section(summaryBody, 'Key Takeaways'));
  const body = cleanIssueBody(issueBody, sourceTitle);
  const bodyFirstParagraph = firstParagraph(body) || subject;
  const publishedAt = yamlValue(issueFm, 'published_at') || yamlValue(summaryFm, 'published_at');
  const tags = yamlList(issueFm, 'tags').filter((tag) => !/^issue-\d+$/i.test(tag)).slice(0, 12);
  const topics = topicsFromSummary(summaryBody, summaryFm);

  let summary = oneParagraphSummary;
  if (!summary || /imported successfully/i.test(summary)) summary = bodyFirstParagraph;

  return {
    issueNumber,
    padded,
    slug: padded,
    fileSlug: sourceSlug,
    subject,
    lede: truncate(bodyFirstParagraph, 240),
    summary: truncate(summary, 320),
    publishedAt,
    sentAt: publishedAt,
    tags,
    topics,
    sourceUrl: yamlValue(issueFm, 'source_url') || yamlValue(summaryFm, 'source_url') || 'https://aiunplug.io',
    postId: yamlValue(issueFm, 'beehiiv_post_id') || yamlValue(summaryFm, 'beehiiv_post_id'),
    keyClaims: keyTakeaways,
    body,
  };
}

const root = path.resolve(sourceDir);
if (!fs.existsSync(root)) die(`Source directory not found: ${root}`);

const issueFiles = fs
  .readdirSync(root)
  .filter((name) => /^AI Unplugged - Issue \d+ - .+\.md$/.test(name) && !name.includes('.summary.'))
  .map((name) => path.join(root, name));

const issues = issueFiles
  .map((file) => {
    const summaryFile = file.replace(/\.md$/, '.summary.md');
    if (!fs.existsSync(summaryFile)) die(`Missing summary file for ${file}`);
    return issueFromFiles(file, summaryFile);
  })
  .sort((a, b) => a.issueNumber - b.issueNumber);

const expected = Array.from({ length: issues.length }, (_, index) => index + 1);
const actual = issues.map((issue) => issue.issueNumber);
const missing = expected.filter((issueNumber) => !actual.includes(issueNumber));
if (missing.length) die(`Missing issue numbers: ${missing.join(', ')}`);

fs.mkdirSync(outputDir, { recursive: true });
for (const entry of fs.readdirSync(outputDir)) {
  if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
    fs.unlinkSync(path.join(outputDir, entry));
  }
}

for (const issue of issues) {
  const outFile = path.join(outputDir, `${issue.padded}-${issue.fileSlug}.md`);
  const content = `${astroFrontmatter(issue)}\n${issue.body}\n`;
  fs.writeFileSync(outFile, content);
}

console.log(`Imported ${issues.length} AI Unplugged issues to ${outputDir}`);
console.log(`First issue: ${issues[0].padded} ${issues[0].subject}`);
console.log(`Latest issue: ${issues.at(-1).padded} ${issues.at(-1).subject}`);

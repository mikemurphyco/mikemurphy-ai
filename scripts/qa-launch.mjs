import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const articleRoot = 'src/content/articles';
const redirectsPath = 'public/_redirects';
const distRoot = 'dist';

const requiredRoutes = [
  '/',
  '/tutorials/',
  '/tutorials/n8nmcpcodex/',
  '/tutorials/prune/',
  '/tutorials/openwebui/',
  '/tutorials/localaiserver/',
  '/tutorials/vpscloudflare/',
  '/tutorials/sshalias/',
  '/ai-unplugged/',
  '/ai-unplugged/issues/',
  '/ai-unplugged/issues/001/',
  '/articles/',
  '/podcast/',
  '/podcast/ep1/',
  '/resources/',
  '/search/',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/tutorials/rss.xml',
  '/ai-unplugged/rss.xml',
  '/ai-unplugged/agent.json',
];

const redirectSamples = new Map([
  ['/n8nmcpcodex/', '/tutorials/n8nmcpcodex/'],
  ['/prune/', '/tutorials/prune/'],
  ['/openwebui/', '/tutorials/openwebui/'],
  ['/localaiserver/', '/tutorials/localaiserver/'],
  ['/vpscloudflare/', '/tutorials/vpscloudflare/'],
  ['/sshalias/', '/tutorials/sshalias/'],
  ['/claudecode/', '/tutorials/claudecode/'],
  ['/ollama/', '/tutorials/ollama/'],
  ['/vpsn8n/', '/tutorials/vpsn8n/'],
  ['/traefik/', '/tutorials/traefik/'],
  ['/n8nmcp/', '/tutorials/n8nmcp/'],
  ['/sshkeys/', '/tutorials/sshkeys/'],
  ['/tailscale/', '/tutorials/tailscale/'],
  ['/claudecodeinstall2026/', '/tutorials/claudecodeinstall2026/'],
  ['/1passworddevtools/', '/tutorials/1passworddevtools/'],
  ['/ep1/', '/podcast/ep1/'],
  ['/ep65/', '/podcast/ep65/'],
  ['/adobeauditionnewfile/', '/tutorials/adobeauditionnewfile/'],
  ['/articles/adobeauditionnewfile/', '/tutorials/adobeauditionnewfile/'],
  ['/aiunplugged/', '/ai-unplugged/'],
  ['/ai-unplugged/issues/1/', '/ai-unplugged/issues/001/'],
]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (/\.(md|mdx)$/.test(entry.name)) files.push(file);
  }

  return files;
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] ?? '';
}

function value(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, 'm'));
  return match?.[1]?.trim();
}

function booleanValue(fm, key) {
  const raw = value(fm, key);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return undefined;
}

function list(fm, key) {
  if (fm.match(new RegExp(`^${key}:\\s*\\[\\]\\s*$`, 'm'))) return [];

  const start = fm.search(new RegExp(`^${key}:\\s*$`, 'm'));
  if (start < 0) return [];

  const lines = fm.slice(start).split('\n').slice(1);
  const values = [];

  for (const line of lines) {
    if (/^\S/.test(line)) break;
    const item = line.match(/^\s*-\s*"?([^"\n]+)"?/);
    if (item) values.push(item[1].trim());
  }

  return values;
}

function nestedBoolean(fm, parent, key) {
  const start = fm.search(new RegExp(`^${parent}:\\s*$`, 'm'));
  if (start < 0) return undefined;

  const lines = fm.slice(start).split('\n').slice(1);
  for (const line of lines) {
    if (/^\S/.test(line)) break;
    const match = line.match(new RegExp(`^\\s+${key}:\\s*(true|false)\\s*$`));
    if (match) return match[1] === 'true';
  }

  return undefined;
}

function routeFile(route) {
  if (route.endsWith('.xml') || route.endsWith('.txt') || route.endsWith('.json')) {
    return join(distRoot, route.slice(1));
  }

  return join(distRoot, route.replace(/^\/|\/$/g, ''), 'index.html');
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function warn(message) {
  console.warn(`WARN ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  failures += 1;
}

let failures = 0;

const articleFiles = walk(articleRoot);
const articles = articleFiles.map((file) => {
  const source = readFileSync(file, 'utf8');
  const fm = frontmatter(source);
  return {
    file,
    title: value(fm, 'title'),
    slug: value(fm, 'slug'),
    canonicalUrl: value(fm, 'canonicalUrl'),
    visibility: value(fm, 'visibility'),
    draft: booleanValue(fm, 'draft'),
    categories: list(fm, 'categories'),
    review: nestedBoolean(fm, 'migration', 'review'),
  };
});

const slugs = new Map();
for (const article of articles) {
  if (!article.slug) {
    fail(`${article.file} is missing slug`);
    continue;
  }

  const existing = slugs.get(article.slug);
  if (existing) fail(`Duplicate slug "${article.slug}" in ${existing} and ${article.file}`);
  else slugs.set(article.slug, article.file);
}

if (failures === 0) pass(`${articles.length} article files have unique slugs`);

const recentKeepers = ['prune', 'openwebui', 'localaiserver', 'vpscloudflare', 'sshalias'];
for (const slug of recentKeepers) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) {
    fail(`Missing recent public tutorial "${slug}"`);
    continue;
  }

  if (article.visibility !== 'public') fail(`${slug} should be visibility: public`);
  if (!article.categories.includes('Tutorials')) fail(`${slug} should include Tutorials category`);
  if (article.canonicalUrl !== `https://mikemurphy.ai/tutorials/${slug}/`) {
    fail(`${slug} canonicalUrl should point to /tutorials/${slug}/`);
  }
}

const sshAlias = articles.find((item) => item.slug === 'sshalias');
if (sshAlias?.review === true) pass('sshalias remains flagged for migration body review');
else fail('sshalias should keep migration.review: true until the body is verified');

const searchVisibilityCount = articles.filter((article) => article.visibility === 'search').length;
pass(`${searchVisibilityCount} search-visibility articles remain discoverable for launch sitemap/search`);

const redirectLines = readFileSync(redirectsPath, 'utf8')
  .split('\n')
  .filter((line) => line.trim() && !line.startsWith('#'));
const redirects = new Map(
  redirectLines.map((line) => {
    const [source, destination, status] = line.trim().split(/\s+/);
    return [source, { destination, status }];
  }),
);

for (const line of redirectLines) {
  const [source] = line.trim().split(/\s+/);
  if (source.includes('*') || source.includes(':splat')) {
    fail(`Broad redirect is not launch-safe while Pretty Links remain on mikemurphy.co: ${line}`);
  }
}
pass(`${redirects.size} explicit redirects found and no broad catch-all redirects detected`);

for (const [source, destination] of redirectSamples) {
  const redirect = redirects.get(source);
  if (!redirect) {
    fail(`Missing sampled redirect ${source} -> ${destination}`);
    continue;
  }

  if (redirect.destination !== destination || redirect.status !== '301') {
    fail(`Sampled redirect ${source} expected ${destination} 301, got ${redirect.destination} ${redirect.status}`);
  }
}

if (existsSync(distRoot)) {
  for (const route of requiredRoutes) {
    if (!existsSync(routeFile(route))) fail(`Built route missing from dist: ${route}`);
  }

  for (const [, destination] of redirectSamples) {
    if (!existsSync(routeFile(destination))) fail(`Sample redirect destination missing from dist: ${destination}`);
  }

  pass('Representative built routes and sampled redirect destinations exist in dist');
} else {
  warn('dist does not exist yet; run npm run build before final launch QA');
}

if (failures > 0) {
  console.error(`\nLaunch QA failed with ${failures} issue${failures === 1 ? '' : 's'}.`);
  process.exit(1);
}

console.log('\nLaunch QA passed.');

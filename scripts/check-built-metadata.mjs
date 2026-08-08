import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const distRoot = resolve('dist');
const failures = [];

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (entry.name.endsWith('.html')) files.push(file);
  }

  return files;
}

function routeForFile(file) {
  const path = `/${relative(distRoot, file).split(sep).join('/')}`;
  return path.endsWith('/index.html') ? path.slice(0, -10) : path;
}

for (const file of walk(distRoot)) {
  const html = readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const description = html.match(/<meta name="description" content="([^"]*)"\s*\/?>/)?.[1]?.trim();

  if (!description) failures.push(`${route} has no non-empty meta description`);
}

const searchHtml = readFileSync(join(distRoot, 'search', 'index.html'), 'utf8');
if (!/<meta name="robots" content="noindex,follow"\s*\/?>/.test(searchHtml)) {
  failures.push('/search/ is missing robots=noindex,follow');
}

const sitemap = readFileSync(join(distRoot, 'sitemap.xml'), 'utf8');
if (sitemap.includes('https://mikemurphy.ai/search/')) {
  failures.push('/search/ is still present in sitemap.xml');
}

if (failures.length > 0) {
  console.error(`FAIL Found ${failures.length} metadata issue${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log('PASS Every built page has a meta description and search indexing controls are correct');

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const distRoot = resolve('dist');
const redirectsPath = 'public/_redirects';
const htmlLink = /href=(?:"([^"]+)"|'([^']+)')/g;
const failures = new Map();

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else files.push(file);
  }

  return files;
}

const redirectPatterns = existsSync(redirectsPath)
  ? readFileSync(redirectsPath, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split(/\s+/)[0])
      .map((source) => {
        const pattern = source
          .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\*/g, '.*')
          .replace(/:[a-zA-Z][a-zA-Z0-9_]*/g, '[^/]+');
        return new RegExp(`^${pattern}$`);
      })
  : [];

function routeForFile(file) {
  const path = `/${relative(distRoot, file).split(sep).join('/')}`;
  return path.endsWith('/index.html') ? path.slice(0, -10) : path;
}

function targetExists(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return false;
  }

  if (redirectPatterns.some((pattern) => pattern.test(decoded))) return true;

  const relativePath = decoded.replace(/^\/+/, '');
  const candidates = decoded.endsWith('/')
    ? [
        join(distRoot, relativePath, 'index.html'),
        join(distRoot, `${relativePath.replace(/\/$/, '')}.html`),
      ]
    : [join(distRoot, relativePath), join(distRoot, relativePath, 'index.html')];

  return candidates.some((candidate) => candidate.startsWith(distRoot) && existsSync(candidate));
}

for (const file of walk(distRoot).filter((entry) => entry.endsWith('.html'))) {
  const source = readFileSync(file, 'utf8');
  const pageUrl = new URL(routeForFile(file), 'https://mikemurphy.ai');

  for (const match of source.matchAll(htmlLink)) {
    const href = (match[1] ?? match[2]).replaceAll('&amp;', '&').trim();
    if (!href || href.includes('${') || href.startsWith('#') || href.startsWith('//')) continue;

    let url;
    try {
      url = new URL(href, pageUrl);
    } catch {
      failures.set(`${routeForFile(file)} -> ${href}`, true);
      continue;
    }

    if (url.origin !== pageUrl.origin) continue;
    if (!targetExists(url.pathname)) failures.set(`${routeForFile(file)} -> ${url.pathname}`, true);
  }
}

if (failures.size > 0) {
  console.error(`FAIL Found ${failures.size} broken internal link target${failures.size === 1 ? '' : 's'}:`);
  for (const failure of failures.keys()) console.error(`  ${failure}`);
  process.exit(1);
}

console.log('PASS Every internal link in the built HTML resolves to a generated file or redirect');

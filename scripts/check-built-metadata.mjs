import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const distRoot = resolve('dist');
const failures = [];
const supportedSocialImageExtensions = new Set(['.gif', '.jpeg', '.jpg', '.png', '.webp']);
const maxSocialImageBytes = 5 * 1024 * 1024;

function metaContent(html, attribute) {
  const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.match(new RegExp(`<meta (?:name|property)="${escaped}" content="([^"]*)"\\s*/?>`))?.[1]?.trim();
}

function structuredDataForHtml(html, route) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  return blocks.flatMap((match, index) => {
    try {
      return [JSON.parse(match[1])];
    } catch (error) {
      failures.push(`${route} has invalid JSON-LD block ${index + 1}: ${error.message}`);
      return [];
    }
  });
}

function isDetailRoute(route, section) {
  return route.startsWith(`/${section}/`) && route !== `/${section}/`;
}

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
  const description = metaContent(html, 'description');
  const structuredData = structuredDataForHtml(html, route);
  const types = new Set(structuredData.map((item) => item['@type']));

  if (!description) failures.push(`${route} has no non-empty meta description`);

  const requiredSocialFields = [
    'og:title',
    'og:description',
    'og:url',
    'og:type',
    'og:image',
    'og:image:type',
    'og:image:alt',
    'twitter:card',
    'twitter:site',
    'twitter:creator',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt',
  ];
  for (const field of requiredSocialFields) {
    if (!metaContent(html, field)) failures.push(`${route} has no non-empty ${field} value`);
  }

  const socialImage = metaContent(html, 'og:image');
  const twitterImage = metaContent(html, 'twitter:image');
  if (socialImage && twitterImage && socialImage !== twitterImage) {
    failures.push(`${route} has mismatched Open Graph and X image URLs`);
  }
  if (socialImage) {
    const imageUrl = new URL(socialImage);
    const extension = extname(imageUrl.pathname).toLowerCase();
    if (!supportedSocialImageExtensions.has(extension)) {
      failures.push(`${route} uses an unsupported social image extension: ${imageUrl.pathname}`);
    }
    if (imageUrl.origin === 'https://mikemurphy.ai') {
      const imageFile = join(distRoot, decodeURIComponent(imageUrl.pathname));
      try {
        const imageSize = statSync(imageFile).size;
        if (imageSize > maxSocialImageBytes) {
          failures.push(`${route} uses a social image larger than 5 MB: ${imageUrl.pathname}`);
        }
      } catch {
        failures.push(`${route} references a missing social image: ${imageUrl.pathname}`);
      }
    }
  }

  const isArticleLike =
    isDetailRoute(route, 'tutorials') ||
    isDetailRoute(route, 'articles') ||
    isDetailRoute(route, 'field-notes') ||
    (route.startsWith('/ai-unplugged/issues/') && route !== '/ai-unplugged/issues/');
  const needsBreadcrumb = isArticleLike || isDetailRoute(route, 'podcast') || route === '/about/';

  if (isArticleLike && !types.has('BlogPosting')) {
    failures.push(`${route} is missing BlogPosting structured data`);
  }
  if (needsBreadcrumb && !types.has('BreadcrumbList')) {
    failures.push(`${route} is missing BreadcrumbList structured data`);
  }
  if (route === '/about/' && !types.has('ProfilePage')) {
    failures.push('/about/ is missing ProfilePage structured data');
  }
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

console.log('PASS Built metadata, indexing controls, and required structured data are correct');

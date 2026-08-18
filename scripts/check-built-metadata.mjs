import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const distRoot = resolve('dist');
const failures = [];
const supportedSocialImageExtensions = new Set(['.gif', '.jpeg', '.jpg', '.png', '.webp']);
const maxSocialImageBytes = 5 * 1024 * 1024;

function metaContent(html, attribute) {
  const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.match(new RegExp(`<meta (?:name|property)="${escaped}" content="([^"]*)"\\s*/?>`))?.[1]?.trim();
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&(amp|apos|gt|lt|quot);/g, (_, entity) => ({
      amp: '&',
      apos: "'",
      gt: '>',
      lt: '<',
      quot: '"',
    })[entity]);
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
  const encodedDocumentTitle = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
  const documentTitle = encodedDocumentTitle ? decodeHtmlEntities(encodedDocumentTitle) : undefined;
  const description = metaContent(html, 'description');
  const robots = metaContent(html, 'robots');
  const structuredData = structuredDataForHtml(html, route);
  const types = new Set(structuredData.map((item) => item['@type']));
  const markdownAlternate = html.match(
    /<link rel="alternate" type="text\/markdown" href="([^"]+)"\s*\/?>/,
  )?.[1];

  if (!description) failures.push(`${route} has no non-empty meta description`);
  if (!documentTitle) failures.push(`${route} has no non-empty title`);
  if (documentTitle?.endsWith(' | Mike Murphy') && documentTitle.length > 60) {
    failures.push(`${route} has an overlong title with the brand suffix (${documentTitle.length} characters)`);
  }

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
  const openGraphTitle = metaContent(html, 'og:title');
  const twitterTitle = metaContent(html, 'twitter:title');
  if (openGraphTitle && twitterTitle && openGraphTitle !== twitterTitle) {
    failures.push(`${route} has mismatched Open Graph and X titles`);
  }
  if (openGraphTitle?.endsWith(' | Mike Murphy')) {
    failures.push(`${route} has an unnecessary brand suffix in its social title`);
  }
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
  const isPodcastEpisode = isDetailRoute(route, 'podcast');
  const hasAuthoredContent = isArticleLike || isPodcastEpisode;
  const isNoindex = robots?.split(',').map((rule) => rule.trim()).includes('noindex') ?? false;
  const shouldHaveMarkdown = (hasAuthoredContent && !isNoindex) || route === '/resources/';
  const needsBreadcrumb = hasAuthoredContent || route === '/about/';

  if (shouldHaveMarkdown && !markdownAlternate) {
    failures.push(`${route} is missing its Markdown alternate link`);
  }
  if (hasAuthoredContent && isNoindex && markdownAlternate) {
    failures.push(`${route} is noindex but still advertises a Markdown alternate`);
  }
  if (markdownAlternate) {
    const markdownUrl = new URL(markdownAlternate);
    if (markdownUrl.origin !== 'https://mikemurphy.ai') {
      failures.push(`${route} has an off-site Markdown alternate: ${markdownAlternate}`);
    } else {
      const markdownFile = join(distRoot, decodeURIComponent(markdownUrl.pathname).replace(/^\//, ''));
      try {
        if (!statSync(markdownFile).isFile()) {
          failures.push(`${route} references a non-file Markdown alternate: ${markdownUrl.pathname}`);
        }
      } catch {
        failures.push(`${route} references a missing Markdown alternate: ${markdownUrl.pathname}`);
      }
    }
  }

  if (hasAuthoredContent && metaContent(html, 'author') !== 'Mike Murphy') {
    failures.push(`${route} is missing the Mike Murphy meta author`);
  }
  if (hasAuthoredContent && (!html.includes('rel="author"') || !html.includes('href="/about/"'))) {
    failures.push(`${route} is missing a visible author link to /about/`);
  }
  if (isArticleLike && metaContent(html, 'article:author') !== 'https://mikemurphy.ai/about/') {
    failures.push(`${route} is missing the Open Graph article author URL`);
  }

  if (isArticleLike && !types.has('BlogPosting')) {
    failures.push(`${route} is missing BlogPosting structured data`);
  }
  const articleSchema = structuredData.find((item) => item['@type'] === 'BlogPosting');
  if (isArticleLike && articleSchema?.author?.['@id'] !== 'https://mikemurphy.ai/about/#person') {
    failures.push(`${route} does not connect its schema author to Mike Murphy's profile`);
  }
  if (needsBreadcrumb && !types.has('BreadcrumbList')) {
    failures.push(`${route} is missing BreadcrumbList structured data`);
  }
  if (route === '/about/' && !types.has('ProfilePage')) {
    failures.push('/about/ is missing ProfilePage structured data');
  }
}

const sitemap = readFileSync(join(distRoot, 'sitemap.xml'), 'utf8');
const visibilitySamples = [
  { route: '/articles/updatecopyright/', visibility: 'public' },
  { route: '/tutorials/googleplay/', visibility: 'search' },
  { route: '/podcast/ep1/', visibility: 'public' },
  { route: '/tutorials/anchorpoint/', visibility: 'public' },
];

for (const sample of visibilitySamples) {
  const htmlFile = join(distRoot, sample.route.replace(/^\//, ''), 'index.html');
  const markdownFile = join(distRoot, sample.route.replace(/^\//, '').replace(/\/$/, '.md'));
  if (!existsSync(htmlFile)) {
    failures.push(`${sample.route} HTML route is missing`);
  } else {
    const html = readFileSync(htmlFile, 'utf8');
    const isNoindex = metaContent(html, 'robots')
      ?.split(',')
      .map((rule) => rule.trim())
      .includes('noindex') ?? false;
    const inSitemap = sitemap.includes(`<loc>https://mikemurphy.ai${sample.route}</loc>`);
    const hasMarkdown = existsSync(markdownFile) && statSync(markdownFile).isFile();

    if (sample.visibility === 'search' && (!isNoindex || inSitemap || hasMarkdown)) {
      failures.push(`${sample.route} does not behave like a search-only page`);
    }
    if (sample.visibility === 'public' && (isNoindex || !inSitemap || !hasMarkdown)) {
      failures.push(`${sample.route} does not behave like a public page`);
    }
  }
}

const absentRoutes = [
  { route: '/tutorials/goldenpath/', reason: 'draft' },
  { route: '/articles/a-little-bit-of-everything/', reason: 'hidden' },
];
for (const sample of absentRoutes) {
  const file = join(distRoot, sample.route.replace(/^\//, ''), 'index.html');
  if (existsSync(file)) failures.push(`${sample.route} ${sample.reason} route was emitted`);
}

const searchHtml = readFileSync(join(distRoot, 'search', 'index.html'), 'utf8');
if (!/<meta name="robots" content="noindex,follow"\s*\/?>/.test(searchHtml)) {
  failures.push('/search/ is missing robots=noindex,follow');
}

const notFoundHtml = readFileSync(join(distRoot, '404.html'), 'utf8');
if (!/<meta name="robots" content="noindex,follow"\s*\/?>/.test(notFoundHtml)) {
  failures.push('/404.html is missing robots=noindex,follow');
}
if (!/<link rel="canonical" href="https:\/\/mikemurphy\.ai\/404\.html"\s*\/?>/.test(notFoundHtml)) {
  failures.push('/404.html does not have a self-referencing canonical URL');
}

if (sitemap.includes('https://mikemurphy.ai/search/')) {
  failures.push('/search/ is still present in sitemap.xml');
}

for (const file of walk(distRoot)) {
  const html = readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const robots = metaContent(html, 'robots');
  const isNoindex = robots?.split(',').map((rule) => rule.trim()).includes('noindex') ?? false;
  if (isNoindex && sitemap.includes(`<loc>https://mikemurphy.ai${route}</loc>`)) {
    failures.push(`${route} is noindex but still present in sitemap.xml`);
  }
}

if (failures.length > 0) {
  console.error(`FAIL Found ${failures.length} metadata issue${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log('PASS Built metadata, indexing controls, and required structured data are correct');

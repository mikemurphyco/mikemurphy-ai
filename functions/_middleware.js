const GITHUB_USER = 'mikemurphyco';
const GITHUB_REPO = 'mikemurphy-ai';
const GITHUB_BRANCH = 'main';
const CONTENT_BASE_PATH = 'src/content/';
const TREE_CACHE_TTL = 600; // seconds

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (!url.pathname.endsWith('.md')) {
    return next();
  }

  // /tutorials/<slug>.md, /articles/<slug>.md, and /podcast/<slug>.md all
  // resolve to the same `articles` content collection, filed under a
  // src/content/articles/<year>/<slug>.md path that has no fixed relation
  // to the URL slug. We can't guess the path, so look it up from the repo
  // tree (cached) by matching the trailing filename.
  const slug = url.pathname.slice(0, -3).split('/').filter(Boolean).pop();

  if (!slug) {
    return next();
  }

  const filePath = await findContentPath(slug, context);

  if (!filePath) {
    return next();
  }

  const githubUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`;
  const response = await fetch(githubUrl);

  if (!response.ok) {
    return next();
  }

  const rawText = await response.text();
  const cleaned = stripFrontmatterAndMdx(rawText);

  return new Response(cleaned, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

async function findContentPath(slug, context) {
  const tree = await getRepoTree(context);
  const match = tree.find((path) => {
    const filename = path.slice(CONTENT_BASE_PATH.length).split('/').pop() || '';
    return filename === `${slug}.md` || filename === `${slug}.mdx`;
  });
  return match || null;
}

async function getRepoTree(context) {
  const cache = caches.default;
  const cacheKey = new Request('https://internal.cache/mikemurphy-ai-content-tree');

  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached.json();
  }

  const treeUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;
  const response = await fetch(treeUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'mikemurphy-ai-md-middleware',
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const paths = (data.tree || [])
    .filter((entry) => entry.type === 'blob' && entry.path.startsWith(CONTENT_BASE_PATH))
    .map((entry) => entry.path);

  const cacheResponse = new Response(JSON.stringify(paths), {
    headers: { 'Cache-Control': `public, max-age=${TREE_CACHE_TTL}` },
  });
  context.waitUntil(cache.put(cacheKey, cacheResponse));

  return paths;
}

function stripFrontmatterAndMdx(text) {
  let result = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  result = result.replace(/^import .*(\n|$)/gm, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, '');
  return result.trim();
}
const GITHUB_USER = 'mikemurphyco';
const GITHUB_REPO = 'mikemurphy-ai';
const GITHUB_BRANCH = 'main';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (!url.pathname.endsWith('.md')) {
    return next();
  }

  // /tutorials/<slug>.md, /articles/<slug>.md, and /podcast/<slug>.md all
  // resolve to the same `articles` content collection, filed under a
  // src/content/articles/<year>/<slug>.md path that has no fixed relation
  // to the URL slug. We can't guess the path, so look it up in a manifest
  // (scripts/generate-content-manifest.mjs, built into public/ at build
  // time) instead of guessing or calling GitHub's rate-limited API.
  const slug = url.pathname.slice(0, -3).split('/').filter(Boolean).pop();

  if (!slug) {
    return next();
  }

  const filePath = await findContentPath(slug, url);

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

async function findContentPath(slug, url) {
  const manifestUrl = new URL('/content-manifest.json', url.origin);
  const response = await fetch(manifestUrl);

  if (!response.ok) {
    return null;
  }

  const manifest = await response.json();
  return manifest[slug] || null;
}

function stripFrontmatterAndMdx(text) {
  let result = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  result = result.replace(/^import .*(\n|$)/gm, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, '');
  return result.trim();
}
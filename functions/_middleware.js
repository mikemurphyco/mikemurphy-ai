export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (!url.pathname.endsWith('.md')) {
    return next();
  }

  const pagePath = url.pathname.slice(0, -3);

  const GITHUB_USER = 'mikemurphyco';
  const GITHUB_REPO = 'mikemurphy-ai';
  const GITHUB_BRANCH = 'main';
  const CONTENT_BASE_PATH = 'src/content/';

  const candidates = [
    `${pagePath}.mdx`,
    `${pagePath}.md`,
    `${pagePath}/index.mdx`,
    `${pagePath}/index.md`,
  ];

  let rawText = null;

  for (const candidate of candidates) {
    const githubUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${CONTENT_BASE_PATH}${candidate}`;
    const response = await fetch(githubUrl);

    if (response.ok) {
      rawText = await response.text();
      break;
    }
  }

  if (!rawText) {
    return next();
  }

  const cleaned = stripFrontmatterAndMdx(rawText);

  return new Response(cleaned, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function stripFrontmatterAndMdx(text) {
  let result = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  result = result.replace(/^import .*(\n|$)/gm, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, '');
  return result.trim();
}
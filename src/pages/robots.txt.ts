import { SITE_URL } from '../lib/articles';

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export const prerender = true;

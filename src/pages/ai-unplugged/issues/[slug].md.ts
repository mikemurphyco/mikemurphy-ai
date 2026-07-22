import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { AiUnpluggedIssue } from '../../../lib/articles';
import { absoluteUrl, isPublishedIssue, issueUrl } from '../../../lib/articles';
import { markdownResponse } from '../../../lib/markdown-endpoint';

// Static Markdown version of each AI Unplugged issue at
// /ai-unplugged/issues/<slug>.md, emitted at build time from the raw
// content-collection body. Structured section data lives in the companion
// [slug].json.ts agent document; this file is the readable issue itself.
export async function getStaticPaths() {
  const issues = await getCollection('aiUnplugged', isPublishedIssue);
  return issues.map((issue) => ({ params: { slug: issue.data.slug }, props: { issue } }));
}

export const GET: APIRoute = ({ props }) => {
  const { issue } = props as { issue: AiUnpluggedIssue };
  const d = issue.data;

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(d.subject)}`,
    `issue: ${d.issue}`,
    d.lede ? `description: ${JSON.stringify(d.lede)}` : null,
    `date: ${new Date(d.publishedAt).toISOString().slice(0, 10)}`,
    `canonical: ${JSON.stringify(absoluteUrl(issueUrl(issue)))}`,
    `agent_json: ${JSON.stringify(absoluteUrl(`/ai-unplugged/issues/${d.slug}.json`))}`,
    d.tags?.length ? `tags: [${d.tags.map((t) => JSON.stringify(t)).join(', ')}]` : null,
    '---',
  ].filter((line): line is string => line !== null);

  const body = (issue.body ?? '').trim();

  return markdownResponse(`${frontmatter.join('\n')}\n\n${body}\n`);
};

export const prerender = true;

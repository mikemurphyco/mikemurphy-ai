import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { AiUnpluggedIssue } from '../../../lib/articles';
import { isPublishedIssue } from '../../../lib/articles';
import { buildIssueAgentDocument } from '../../../lib/agent';

export async function getStaticPaths() {
  const issues = await getCollection('aiUnplugged', isPublishedIssue);
  return issues.map((issue) => ({
    params: { slug: issue.data.slug },
    props: { issue },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { issue } = props as { issue: AiUnpluggedIssue };
  const body = buildIssueAgentDocument(issue);

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;

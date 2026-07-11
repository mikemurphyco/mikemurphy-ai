import { getCollection } from 'astro:content';
import { absoluteUrl, isPublishedIssue, sortIssuesByDate } from '../../lib/articles';
import { buildIssueAgentDocument, issueAgentJsonUrl } from '../../lib/agent';

export async function GET() {
  const issues = sortIssuesByDate(await getCollection('aiUnplugged', isPublishedIssue));

  const body = {
    type: 'ai-unplugged-agent-index',
    generatedAt: new Date().toISOString(),
    count: issues.length,
    issues: issues.map((issue) => {
      const doc = buildIssueAgentDocument(issue);
      return {
        issue: doc.issue,
        slug: doc.slug,
        subject: doc.subject,
        publishedAt: doc.publishedAt,
        url: doc.url,
        jsonUrl: absoluteUrl(issueAgentJsonUrl(issue)),
        agentReadable: doc.agentReadable,
      };
    }),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const prerender = true;

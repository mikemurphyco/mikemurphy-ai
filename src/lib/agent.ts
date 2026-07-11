import type { AiUnpluggedIssue } from './articles';
import { absoluteUrl, issueUrl } from './articles';

export type AgentReadablePayload = {
  summary120?: string;
  keyClaims: string[];
  entities: string[];
};

export function getAgentReadable(issue: AiUnpluggedIssue): AgentReadablePayload {
  const raw = issue.data.agentReadable ?? {};
  return {
    summary120: raw.summary120 || undefined,
    keyClaims: raw.keyClaims ?? [],
    entities: raw.entities ?? [],
  };
}

export function hasAgentReadable(issue: AiUnpluggedIssue) {
  const data = getAgentReadable(issue);
  return Boolean(data.summary120 || data.keyClaims.length || data.entities.length);
}

export function issueAgentJsonUrl(issue: AiUnpluggedIssue) {
  return `/ai-unplugged/issues/${issue.data.slug}.json`;
}

export function buildIssueAgentDocument(issue: AiUnpluggedIssue) {
  const agentReadable = getAgentReadable(issue);
  return {
    type: 'ai-unplugged-issue' as const,
    issue: issue.data.issue,
    slug: issue.data.slug,
    subject: issue.data.subject,
    lede: issue.data.lede,
    summary: issue.data.summary,
    publishedAt: issue.data.publishedAt,
    sentAt: issue.data.sentAt,
    topics: issue.data.topics,
    tags: issue.data.tags,
    url: absoluteUrl(issueUrl(issue)),
    sourceUrl: issue.data.source?.url || null,
    agentReadable,
  };
}

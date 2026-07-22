import { getCollection } from 'astro:content';
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  isDiscoverableArticle,
  isPublishedIssue,
  issueUrl,
  sortIssuesByDate,
  sortTutorialsByDate,
  tutorialUrl,
} from '../lib/articles';
import { getAgentReadable } from '../lib/agent';
import { SITE_EMAIL, SITE_FEEDS, SITE_SOCIAL } from '../lib/site';
import { fieldNoteUrl, isPublishedNote, sortNotesByDate } from '../lib/field-notes';

export async function GET() {
  const tutorials = sortTutorialsByDate(await getCollection('articles', isDiscoverableArticle)).slice(0, 12);
  const issues = sortIssuesByDate(await getCollection('aiUnplugged', isPublishedIssue)).slice(0, 12);
  const notes = sortNotesByDate(await getCollection('fieldNotes', isPublishedNote)).slice(0, 20);
  const resources = (await getCollection('resources', (r) => r.data.status === 'published'))
    .sort((a, b) => (a.data.sort ?? 0) - (b.data.sort ?? 0));

  const lines = [
    `# ${SITE_TITLE}`,
    `> ${SITE_DESCRIPTION}`,
    '',
    `Site: ${SITE_URL}`,
    `Contact: ${SITE_EMAIL}`,
    '',
    '## About',
    '',
    'Mike Murphy makes practical tutorials for AI tools, automation, and creative tech.',
    'This site is the knowledge hub: tutorials, AI Unplugged newsletter archive, podcast episodes, and resources.',
    '',
    '## Primary hubs',
    '',
    `- [Tutorials](${absoluteUrl('/tutorials/')}): step-by-step lessons`,
    `- [AI Unplugged](${absoluteUrl('/ai-unplugged/')}): weekly AI newsletter archive`,
    `- [Articles](${absoluteUrl('/articles/')}): long-form archive`,
    `- [Field Notes](${absoluteUrl('/field-notes/')}): bite-sized tips, shortcuts, and snippets`,
    `- [Podcast](${absoluteUrl('/podcast/')}): Mike Murphy Unplugged episodes`,
    `- [Resources](${absoluteUrl('/resources/')})`,
    `- [Search](${absoluteUrl('/search/')})`,
    `- [About](${absoluteUrl('/about/')})`,
    `- [Contact](${absoluteUrl('/contact/')})`,
    '',
    '## Machine-readable',
    '',
    `- [AI Unplugged agent index](${absoluteUrl('/ai-unplugged/agent.json')}): summaries, key claims, entities`,
    `- [Field Notes agent index](${absoluteUrl('/api/field-notes.json')}): tips, snippets, tags`,
    `- [Resources agent index](${absoluteUrl('/api/resources.json')}): tools, pricing, usage`,
    `- [Tutorials RSS](${absoluteUrl(SITE_FEEDS[0].href)})`,
    `- [AI Unplugged RSS](${absoluteUrl(SITE_FEEDS[1].href)})`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    '',
    '## Social',
    '',
    ...SITE_SOCIAL.map((item) => `- [${item.label}](${item.href})`),
    '',
    '## Recent tutorials',
    '',
    ...tutorials.map(
      (tutorial) =>
        `- [${tutorial.data.title}](${absoluteUrl(tutorialUrl(tutorial))}): ${tutorial.data.description}`,
    ),
    '',
    '## Recent AI Unplugged issues',
    '',
    ...issues.map((issue) => {
      const summary = getAgentReadable(issue).summary120 || issue.data.summary || issue.data.lede;
      return `- [#${issue.data.issue} ${issue.data.subject}](${absoluteUrl(issueUrl(issue))}): ${summary}`;
    }),
    '',
    '## Recent field notes',
    '',
    ...notes.map(
      (note) => `- [${note.data.title}](${absoluteUrl(fieldNoteUrl(note))})${note.data.excerpt ? `: ${note.data.excerpt}` : ''}`,
    ),
    '',
    '## Resources',
    '',
    ...resources.map((r) => `- ${r.data.name}${r.data.description ? `: ${r.data.description}` : ''}`),
    '',
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const prerender = true;

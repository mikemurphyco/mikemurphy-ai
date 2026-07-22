import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublishedNote, noteTypeLabel } from '../../lib/field-notes';

// Static Markdown version of each Field Note at /field-notes/<slug>.md, emitted at
// build time from the Directus body (not converted from rendered HTML at runtime).
// The site worker lets these fall through to static assets; see src/worker.js.
export async function getStaticPaths() {
  const notes = await getCollection('fieldNotes', isPublishedNote);
  return notes.map((note) => ({ params: { slug: note.data.slug }, props: { note } }));
}

export const GET: APIRoute = ({ props }) => {
  const { note } = props as { note: Awaited<ReturnType<typeof getCollection>>[number] };
  const d = note.data as any;

  const lines = [
    `# ${d.title}`,
    '',
    d.noteType ? `**${noteTypeLabel(d.noteType)}**${d.datePublished ? ` · ${new Date(d.datePublished).toISOString().slice(0, 10)}` : ''}` : '',
    d.excerpt ? `\n${d.excerpt}` : '',
    '',
    d.body ?? '',
  ];

  if (Array.isArray(d.snippets) && d.snippets.length > 0) {
    lines.push('', '## Related snippets', '');
    for (const s of d.snippets) {
      lines.push(`- **${s.label}** — ${s.detail}`);
    }
  }

  if (d.tags?.length) lines.push('', `Tags: ${d.tags.join(', ')}`);

  const body = lines.filter((line) => line !== undefined).join('\n').replace(/\n{3,}/g, '\n\n').trim();

  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

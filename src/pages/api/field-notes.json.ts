import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { fieldNoteUrl, isPublishedNote, noteTypeLabel, sortNotesByDate } from '../../lib/field-notes';
import { absoluteUrl } from '../../lib/articles';

// Agent-facing index of all published Field Notes. Emitted as a static file at
// /api/field-notes.json at build time from the same Directus-backed collection
// the HTML pages use (not scraped from rendered HTML).
export const GET: APIRoute = async () => {
  const notes = sortNotesByDate(await getCollection('fieldNotes', isPublishedNote));
  const items = notes.map((note) => ({
    title: note.data.title,
    slug: note.data.slug,
    url: absoluteUrl(fieldNoteUrl(note)),
    type: note.data.noteType,
    typeLabel: noteTypeLabel(note.data.noteType),
    excerpt: note.data.excerpt,
    tags: note.data.tags,
    datePublished: note.data.datePublished,
    featured: note.data.featured,
  }));

  return new Response(JSON.stringify({ count: items.length, items }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

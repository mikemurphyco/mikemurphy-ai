import type { CollectionEntry } from 'astro:content';

export type FieldNote = CollectionEntry<'fieldNotes'>;
export type Resource = CollectionEntry<'resources'>;

export function fieldNoteUrl(note: FieldNote): string {
  return `/field-notes/${note.data.slug}/`;
}

export function isPublishedNote(note: FieldNote): boolean {
  return note.data.status === 'published';
}

export function sortNotesByDate(notes: FieldNote[]): FieldNote[] {
  return [...notes].sort((a, b) => {
    const at = a.data.datePublished ? new Date(a.data.datePublished).getTime() : 0;
    const bt = b.data.datePublished ? new Date(b.data.datePublished).getTime() : 0;
    if (bt !== at) return bt - at;
    // Fall back to the manual `sort` field when dates tie/are absent.
    return (a.data.sort ?? 0) - (b.data.sort ?? 0);
  });
}

const NOTE_TYPE_LABELS: Record<string, string> = {
  tip: 'Tip',
  shortcut: 'Shortcut',
  did_you_know: 'Did You Know',
  snippet: 'Snippet',
  definition: 'Definition',
  gotcha: 'Gotcha',
};

export function noteTypeLabel(value: string | null): string {
  return value ? (NOTE_TYPE_LABELS[value] ?? value) : '';
}

const PRICING_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  free_paid: 'Free + Paid',
  freemium: 'Freemium',
  open_source: 'Open Source',
};

export function pricingLabel(value: string | null): string {
  return value ? (PRICING_LABELS[value] ?? value) : '';
}

const USAGE_LABELS: Record<string, string> = {
  used_daily: 'Used Daily',
  used_often: 'Used Often',
  used_here: 'Used Here',
  affiliate: 'Affiliate',
  planned: 'Planned',
  previously_used: 'Previously Used',
  testing: 'Testing',
};

export function usageLabel(value: string | null): string {
  return value ? (USAGE_LABELS[value] ?? value) : '';
}

/** The outbound link for a resource: affiliate link when flagged, else canonical. */
export function resourceLink(resource: Resource): string | null {
  return resource.data.isAffiliate && resource.data.affiliateUrl
    ? resource.data.affiliateUrl
    : resource.data.primaryUrl;
}

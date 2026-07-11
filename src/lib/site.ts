export const SITE_EMAIL = 'hello@mikemurphy.ai';

export const SITE_SOCIAL = [
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/mikemurphyco' },
  {
    id: 'podcast',
    label: 'Podcast',
    href: 'https://podcasts.apple.com/us/podcast/mike-murphy-unplugged/id1042504120',
  },
  { id: 'x', label: 'X', href: 'https://x.com/mikemurphyai' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikemurphyai/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/mikemurphyai/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/mikemurphyco' },
] as const;

export type SocialId = (typeof SITE_SOCIAL)[number]['id'];

export function mailtoHref(subject?: string) {
  if (!subject) return `mailto:${SITE_EMAIL}`;
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

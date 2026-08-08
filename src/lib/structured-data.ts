import { absoluteUrl } from './articles';
import { SITE_AUTHOR, SITE_SOCIAL } from './site';

export type JsonLd = Record<string, unknown>;

export const PERSON_URL = absoluteUrl(SITE_AUTHOR.href);
export const PERSON_ID = `${PERSON_URL}#person`;

const PERSON_NAME = SITE_AUTHOR.name;
const PERSON_IMAGE = absoluteUrl('/assets/brand/avatar-mike-orange-1200.png');
const PERSON_DESCRIPTION =
  'Mike Murphy creates practical tutorials about AI tools, automation, and creative technology.';

export function personStructuredData(): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    url: PERSON_URL,
    image: PERSON_IMAGE,
    description: PERSON_DESCRIPTION,
    jobTitle: 'AI educator and tutorial creator',
    sameAs: SITE_SOCIAL.filter((profile) => profile.id !== 'podcast').map(
      (profile) => profile.href,
    ),
  };
}

export function profilePageStructuredData(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${PERSON_URL}#profile-page`,
    url: PERSON_URL,
    name: 'About Mike Murphy',
    description: PERSON_DESCRIPTION,
    mainEntity: personStructuredData(),
  };
}

interface ArticleStructuredDataOptions {
  url: string;
  headline: string;
  description: string;
  datePublished?: Date | string | null;
  dateModified?: Date | string | null;
  image?: string | null;
  authorName?: string;
}

export function articleStructuredData({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  authorName = PERSON_NAME,
}: ArticleStructuredDataOptions): JsonLd {
  const canonicalUrl = absoluteUrl(url);
  const author =
    authorName === PERSON_NAME
      ? personStructuredData()
      : { '@type': 'Person', name: authorName };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline,
    description,
    ...(image ? { image: [absoluteUrl(image)] } : {}),
    ...(datePublished ? { datePublished: new Date(datePublished).toISOString() } : {}),
    ...(dateModified || datePublished
      ? { dateModified: new Date(dateModified ?? datePublished!).toISOString() }
      : {}),
    author,
    publisher: { '@id': PERSON_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbStructuredData(items: BreadcrumbItem[], pageUrl: string): JsonLd {
  const canonicalUrl = absoluteUrl(pageUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

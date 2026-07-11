/** Escape text for use inside XML element / attribute content. */
export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: Date | string;
  guid?: string;
};

export function buildRssFeed(options: {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  items: RssItem[];
}) {
  const { title, description, siteUrl, feedUrl, items } = options;

  const itemXml = items
    .map((item) => {
      const pubDate = new Date(item.pubDate).toUTCString();
      const guid = item.guid ?? item.link;
      return `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <guid isPermaLink="true">${escapeXml(guid)}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(item.description)}</description>
  </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>`;
}

import fs from 'node:fs';
import path from 'node:path';
import { loadDirectusCollection, writeSnapshot } from './directus';

const ASSET_DIR = path.resolve('public/assets/brand-kit');
const ASSET_PUBLIC_BASE = '/assets/brand-kit';

export interface BrandKitAssets {
  headshot: string;
  avatarOrange: string;
  avatarTransparent: string;
  primaryLockup: string;
  aiLockup: string;
  loopOrange: string;
  loopNavy: string;
  loopCream: string;
  mMarkNavy: string;
  mMarkOrangeNavy: string;
  mMarkCream: string;
  onePagePdf: string;
  allAssetsZip: string;
}

export interface BrandKitContent {
  intro: string;
  shortBio: string;
  longBio: string;
  boilerplate: string;
  contactIntro: string;
  youtubeSince: string;
  tutorialCount: string;
  subscriberCount: string;
  updatedAt: string | null;
  assets: BrandKitAssets;
}

const DEFAULT_ASSETS: BrandKitAssets = {
  headshot: `${ASSET_PUBLIC_BASE}/headshot-mike.png`,
  avatarOrange: `${ASSET_PUBLIC_BASE}/avatar-mike-orange.png`,
  avatarTransparent: `${ASSET_PUBLIC_BASE}/avatar-mike-transparent.png`,
  primaryLockup: `${ASSET_PUBLIC_BASE}/lockup-primary.png`,
  aiLockup: `${ASSET_PUBLIC_BASE}/lockup-ai.png`,
  loopOrange: `${ASSET_PUBLIC_BASE}/loop-orange.svg`,
  loopNavy: `${ASSET_PUBLIC_BASE}/loop-navy.svg`,
  loopCream: `${ASSET_PUBLIC_BASE}/loop-cream.svg`,
  mMarkNavy: `${ASSET_PUBLIC_BASE}/m-mark-navy.png`,
  mMarkOrangeNavy: `${ASSET_PUBLIC_BASE}/m-mark-orange-navy.png`,
  mMarkCream: `${ASSET_PUBLIC_BASE}/m-mark-cream.png`,
  onePagePdf: `${ASSET_PUBLIC_BASE}/mike-murphy-media-kit-one-page.pdf`,
  allAssetsZip: `${ASSET_PUBLIC_BASE}/mike-murphy-media-kit.zip`,
};

const DEFAULT_CONTENT: Omit<BrandKitContent, 'assets'> = {
  intro:
    "Everything you need if you're having me on a podcast, featuring me in an article, or working with me on a collaboration. Grab the assets, copy the bio, and you're set. If you need something that isn't here, just email me.",
  shortBio:
    "Mike Murphy is the AI Handyman - a creator and podcaster making short, practical AI tutorials for the people the AI industry forgets. He's been teaching on YouTube since 2015, with 1,850+ tutorials, 45,000+ subscribers, a weekly newsletter, and the Mike Murphy Unplugged podcast.",
  longBio:
    "Mike Murphy is the AI Handyman. Since 2015 he's published more than 1,850 tutorials on YouTube, teaching everyday technology to the people the industry tends to forget - the curious, the busy, and the slightly overwhelmed. These days he focuses on practical AI: short screencasts that show what a tool actually does, where people get stuck, and the shortcut he found after wrestling with the confusing part himself. Alongside YouTube, Mike writes a weekly newsletter and hosts the Mike Murphy Unplugged podcast from mikemurphy.ai. His approach is simple: calm, honest, hands-on - no hype, no jargon, just one curious human showing another how to move forward.",
  boilerplate:
    'Mike Murphy | AI Handyman - short, practical AI tutorials for the people the AI industry forgets. mikemurphy.ai',
  contactIntro:
    'Podcast invites, press, and collaborations all go to the same inbox. I read everything.',
  youtubeSince: '2015',
  tutorialCount: '1,850+',
  subscriberCount: '45,000+',
  updatedAt: null,
};

const FILE_SPECS: Record<string, keyof BrandKitAssets> = {
  'headshot-mike.png': 'headshot',
  'avatar-mike-orange.png': 'avatarOrange',
  'avatar-mike-transparent.png': 'avatarTransparent',
  'lockup-primary.png': 'primaryLockup',
  'lockup-ai.png': 'aiLockup',
  'loop-orange.svg': 'loopOrange',
  'loop-navy.svg': 'loopNavy',
  'loop-cream.svg': 'loopCream',
  'm-mark-navy.png': 'mMarkNavy',
  'm-mark-orange-navy.png': 'mMarkOrangeNavy',
  'm-mark-cream.png': 'mMarkCream',
  'mike-murphy-media-kit-one-page.pdf': 'onePagePdf',
  'mike-murphy-media-kit.zip': 'allAssetsZip',
} as const;

function textValue(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function fileId(value: unknown): string | null {
  if (typeof value === 'string' && value) return value;
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === 'string' && id ? id : null;
  }
  return null;
}

async function selfHostFile(
  value: unknown,
  fileName: string,
  baseUrl: string,
  token: string,
): Promise<string | null> {
  const id = fileId(value);
  if (!id) return null;

  try {
    const url = new URL(`/assets/${id}`, baseUrl);
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return null;

    fs.mkdirSync(ASSET_DIR, { recursive: true });
    fs.writeFileSync(path.join(ASSET_DIR, fileName), Buffer.from(await response.arrayBuffer()));
    return `${ASSET_PUBLIC_BASE}/${fileName}`;
  } catch {
    return null;
  }
}

/**
 * Load the one-row Directus Brand_Kit singleton. Until the singleton is created,
 * the committed snapshot and local assets provide a complete, production-safe
 * page. Live Directus files are copied into public/assets/brand-kit at build time.
 */
export async function loadBrandKit(): Promise<BrandKitContent> {
  const { items, live, baseUrl, token } = await loadDirectusCollection('Brand_Kit');
  const item = items[0] ?? {};
  const storedAssets =
    item.assetPaths && typeof item.assetPaths === 'object'
      ? (item.assetPaths as Partial<BrandKitAssets>)
      : {};
  const assets: BrandKitAssets = { ...DEFAULT_ASSETS, ...storedAssets };

  if (live && baseUrl && token) {
    const fileRows = Array.isArray(item.assets) ? item.assets : [];
    for (const row of fileRows) {
      const file = row?.directus_files_id ?? row;
      const fileName = typeof file?.filename_download === 'string' ? file.filename_download : '';
      const key = FILE_SPECS[fileName];
      if (!key) continue;
      const hosted = await selfHostFile(file, fileName, baseUrl, token);
      if (hosted) assets[key] = hosted;
    }
  }

  const content: BrandKitContent = {
    intro: textValue(item.intro, DEFAULT_CONTENT.intro),
    shortBio: textValue(item.short_bio, DEFAULT_CONTENT.shortBio),
    longBio: textValue(item.long_bio, DEFAULT_CONTENT.longBio),
    boilerplate: textValue(item.boilerplate, DEFAULT_CONTENT.boilerplate),
    contactIntro: textValue(item.contact_intro, DEFAULT_CONTENT.contactIntro),
    youtubeSince: textValue(item.youtube_since, DEFAULT_CONTENT.youtubeSince),
    tutorialCount: textValue(item.tutorial_count, DEFAULT_CONTENT.tutorialCount),
    subscriberCount: textValue(item.subscriber_count, DEFAULT_CONTENT.subscriberCount),
    updatedAt:
      typeof item.date_updated === 'string'
        ? item.date_updated
        : typeof item.updated_at === 'string'
          ? item.updated_at
          : null,
    assets,
  };

  if (live) writeSnapshot('Brand_Kit', [{ ...item, assetPaths: assets }]);
  return content;
}

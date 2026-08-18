import { createHash } from 'node:crypto';
import sanitizeHtml from 'sanitize-html';
import { pause, requestJson } from './http.mjs';

function withoutTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function plainText(html = '') {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
}

function payloadHash(payload) {
  const canonical = JSON.stringify(payload, (_key, value) => {
    if (!value || Array.isArray(value) || typeof value !== 'object') return value;
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, value[key]]));
  });
  return createHash('sha256').update(canonical).digest('hex');
}

export function directusPayload(episode, { podcastId, podcastName }) {
  const content = plainText(episode.description);
  return {
    buzzsprout_id: String(episode.id),
    title: episode.title,
    audio_url: episode.audio_url,
    artwork_url: episode.artwork_url,
    canonical_url: episode.custom_url,
    description_html: episode.description,
    summary: episode.summary,
    artist: episode.artist,
    tags: episode.tags,
    published_at: episode.published_at,
    duration_seconds: episode.duration,
    is_hq: episode.hq,
    uses_magic_mastering: episode.magic_mastering,
    guid: episode.guid,
    inactive_at: episode.inactive_at,
    episode_number: episode.episode_number,
    season_number: episode.season_number,
    episode_type: episode.episode_type,
    is_explicit: episode.explicit,
    is_private: episode.private,
    total_plays: episode.total_plays,
    source: 'buzzsprout',
    source_podcast_id: String(podcastId),
    podcast_name: podcastName,
    source_payload: episode,
    source_payload_hash: payloadHash(episode),
    last_synced_at: new Date().toISOString(),
    content_plain: content,
    search_text: [episode.title, episode.summary, content].filter(Boolean).join('\n'),
    tags_normalized: String(episode.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
  };
}

export class DirectusClient {
  constructor({ url, token, collection = 'podcast_episodes' }) {
    this.url = withoutTrailingSlash(url);
    this.collection = collection;
    this.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async episodeIndex() {
    const params = new URLSearchParams({ fields: 'id,buzzsprout_id', limit: '-1' });
    const result = await requestJson(`${this.url}/items/${this.collection}?${params}`, { headers: this.headers });
    return new Map(result.data.map((item) => [String(item.buzzsprout_id), item.id]));
  }

  async upsertEpisodes(episodes, context, onProgress = () => {}) {
    const index = await this.episodeIndex();
    const results = [];

    for (const [position, episode] of episodes.entries()) {
      const existingId = index.get(String(episode.id));
      const endpoint = existingId
        ? `${this.url}/items/${this.collection}/${existingId}`
        : `${this.url}/items/${this.collection}`;
      const result = await requestJson(endpoint, {
        method: existingId ? 'PATCH' : 'POST',
        headers: this.headers,
        body: JSON.stringify(directusPayload(episode, context)),
      });
      results.push(result.data);
      onProgress({ index: position + 1, total: episodes.length, episode, created: !existingId });
      if (position < episodes.length - 1) await pause(75);
    }

    return results;
  }
}

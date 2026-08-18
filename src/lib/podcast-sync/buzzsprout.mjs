import { pause, requestJson } from './http.mjs';

export class BuzzsproutClient {
  constructor({ podcastId, apiToken }) {
    this.baseUrl = `https://www.buzzsprout.com/api/${podcastId}`;
    this.headers = {
      Authorization: `Token token=${apiToken}`,
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'mikemurphy.ai-podcast-sync/1.0 (+https://mikemurphy.ai)',
    };
  }

  listEpisodes() {
    return requestJson(`${this.baseUrl}/episodes.json`, { headers: this.headers });
  }

  updateDescription(episodeId, description) {
    return requestJson(`${this.baseUrl}/episodes/${episodeId}.json`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ description }),
    }, { attempts: 6 });
  }

  async updateDescriptions(changes, onProgress = () => {}) {
    const updated = [];
    for (const [index, change] of changes.entries()) {
      const episode = await this.updateDescription(change.buzzsproutId, change.description);
      updated.push(episode);
      onProgress({ index: index + 1, total: changes.length, episode });
      if (index < changes.length - 1) await pause(1100);
    }
    return updated;
  }
}

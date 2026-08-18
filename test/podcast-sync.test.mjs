import assert from 'node:assert/strict';
import test from 'node:test';
import { directusPayload } from '../src/lib/podcast-sync/directus.mjs';
import { loadPodcastEpisodes, renderPodcastDescription } from '../src/lib/podcast-sync/content.mjs';

test('renders RSS-safe HTML with absolute links and a canonical footer', () => {
  const result = renderPodcastDescription(
    '## Resources\n\nRead the [guide](/resources/) and keep moving.',
    'https://mikemurphy.ai/podcast/ep1/',
    1000,
  );

  assert.match(result.html, /href="https:\/\/mikemurphy\.ai\/resources\/"/);
  assert.match(result.html, /Read the complete show notes/);
  assert.equal(result.truncated, false);
  assert.ok(result.html.length <= 1000);
});

test('shortens long show notes without producing partial HTML', () => {
  const result = renderPodcastDescription(
    `Intro paragraph.\n\n${'A very long paragraph. '.repeat(200)}`,
    'https://mikemurphy.ai/podcast/ep1/',
    500,
  );

  assert.equal(result.truncated, true);
  assert.ok(result.html.length <= 500);
  assert.match(result.html, /<\/p>$/);
  assert.doesNotMatch(result.html, /<script/i);
});

test('all podcast files have unique Buzzsprout IDs and fit the configured limit', () => {
  const episodes = loadPodcastEpisodes({ maxCharacters: 3400 });
  assert.equal(episodes.length, 162);
  assert.equal(new Set(episodes.map((episode) => episode.buzzsproutId)).size, 162);
  assert.ok(episodes.every((episode) => episode.html.length <= 3400));
});

test('maps the accepted Buzzsprout response to Directus fields', () => {
  const source = {
    id: 123,
    title: 'Episode title',
    description: '<p>Hello <strong>world</strong>.</p>',
    summary: 'Summary',
    tags: 'one, two',
    episode_number: 4,
  };
  const payload = directusPayload(source, { podcastId: '1973705', podcastName: 'Mike Murphy Unplugged' });

  assert.equal(payload.buzzsprout_id, '123');
  assert.equal(payload.description_html, source.description);
  assert.equal(payload.content_plain, 'Hello world.');
  assert.deepEqual(payload.tags_normalized, ['one', 'two']);
  assert.equal(payload.source_payload_hash.length, 64);
});

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { BuzzsproutClient } from '../src/lib/podcast-sync/buzzsprout.mjs';
import { loadPodcastEpisodes } from '../src/lib/podcast-sync/content.mjs';
import { DirectusClient } from '../src/lib/podcast-sync/directus.mjs';

const REPORT_DIR = 'reports/podcast-sync';

function usage() {
  console.log(`Usage: node scripts/sync-podcast-show-notes.mjs [options]

Default behavior is a read-only remote dry run.

Options:
  --apply                 Write changed descriptions to Buzzsprout and Directus
  --offline               Validate and render Astro content without API requests
  --skip-directus         Do not upsert successful Buzzsprout responses to Directus
  --episode=1,2,3         Limit the run to specific episode numbers
  --max-description=3400  Maximum generated HTML characters (default: 3400)
  --help                  Show this help

Environment:
  BUZZSPROUT_API_TOKEN       Required except with --offline
  BUZZSPROUT_PODCAST_ID      Defaults to 1973705
  DIRECTUS_URL               Required for --apply unless --skip-directus
  PODCAST_DIRECTUS_TOKEN     Preferred least-privilege token for podcast_episodes
  DIRECTUS_TOKEN             Fallback token for --apply unless --skip-directus
  DIRECTUS_EPISODES_COLLECTION Defaults to podcast_episodes
  PODCAST_NAME               Defaults to Mike Murphy Unplugged`);
}

function parseArgs(argv) {
  const options = {
    apply: false,
    offline: false,
    skipDirectus: false,
    episodeNumbers: null,
    maxDescription: 3400,
  };

  for (const argument of argv) {
    if (argument === '--apply') options.apply = true;
    else if (argument === '--offline') options.offline = true;
    else if (argument === '--skip-directus') options.skipDirectus = true;
    else if (argument === '--help') options.help = true;
    else if (argument.startsWith('--episode=')) {
      options.episodeNumbers = new Set(argument.slice('--episode='.length).split(',').map(Number));
      if ([...options.episodeNumbers].some((number) => !Number.isInteger(number) || number < 1)) {
        throw new Error('--episode must contain positive comma-separated episode numbers');
      }
    } else if (argument.startsWith('--max-description=')) {
      options.maxDescription = Number(argument.slice('--max-description='.length));
      if (!Number.isInteger(options.maxDescription) || options.maxDescription < 500 || options.maxDescription > 4000) {
        throw new Error('--max-description must be an integer between 500 and 4000');
      }
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  if (options.apply && options.offline) throw new Error('--apply and --offline cannot be used together');
  return options;
}

function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function timestamp() {
  return new Date().toISOString().replaceAll(':', '-').replace('.000', '');
}

function reportRows(localEpisodes, remoteIndex = new Map()) {
  return localEpisodes.map((episode) => {
    const remote = remoteIndex.get(episode.buzzsproutId);
    return {
      episode_number: episode.episodeNumber,
      buzzsprout_id: episode.buzzsproutId,
      title: episode.title,
      source_file: episode.sourceFile,
      canonical_url: episode.canonicalUrl,
      source_markdown_characters: episode.sourceCharacters,
      full_html_characters: episode.fullHtmlCharacters,
      generated_html_characters: episode.html.length,
      generated_description_html: episode.html,
      shortened_for_rss: episode.truncated,
      remote_found: Boolean(remote),
      remote_title: remote?.title ?? null,
      remote_description_characters: remote?.description?.length ?? null,
      needs_update: remote ? remote.description !== episode.html : null,
    };
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return usage();

  let episodes = loadPodcastEpisodes({ maxCharacters: options.maxDescription });
  if (options.episodeNumbers) {
    episodes = episodes.filter((episode) => options.episodeNumbers.has(episode.episodeNumber));
    const found = new Set(episodes.map((episode) => episode.episodeNumber));
    const missingSelections = [...options.episodeNumbers].filter((number) => !found.has(number));
    if (missingSelections.length) throw new Error(`Requested episode numbers were not found: ${missingSelections.join(', ')}`);
  }
  if (!episodes.length) throw new Error('No episodes matched the requested selection');

  if (options.offline) {
    const rows = reportRows(episodes);
    const report = {
      generated_at: new Date().toISOString(),
      mode: 'offline',
      max_description_characters: options.maxDescription,
      totals: {
        episodes: rows.length,
        shortened_for_rss: rows.filter((row) => row.shortened_for_rss).length,
      },
      episodes: rows,
    };
    const output = resolve(REPORT_DIR, 'offline-latest.json');
    writeJson(output, report);
    console.log(`Validated ${rows.length} Astro episodes; ${report.totals.shortened_for_rss} require an RSS-length version.`);
    console.log(`Report: ${output}`);
    return;
  }

  const podcastId = process.env.BUZZSPROUT_PODCAST_ID ?? '1973705';
  const apiToken = process.env.BUZZSPROUT_API_TOKEN;
  if (!apiToken) throw new Error('BUZZSPROUT_API_TOKEN is required. Add it to .env or use --offline.');

  const buzzsprout = new BuzzsproutClient({ podcastId, apiToken });
  console.log('Reading the current Buzzsprout episode catalog…');
  const remoteEpisodes = await buzzsprout.listEpisodes();
  const remoteIndex = new Map(remoteEpisodes.map((episode) => [String(episode.id), episode]));
  const rows = reportRows(episodes, remoteIndex);
  const missing = rows.filter((row) => !row.remote_found);
  const changes = rows.filter((row) => row.needs_update).map((row) => ({
    buzzsproutId: row.buzzsprout_id,
    episodeNumber: row.episode_number,
    description: episodes.find((episode) => episode.buzzsproutId === row.buzzsprout_id).html,
  }));

  let directus;
  let directusIndex = new Map();
  if (!options.skipDirectus) {
    const directusUrl = process.env.DIRECTUS_URL;
    const directusToken = process.env.PODCAST_DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN ?? process.env.DIRECTUS_CONTENT_TOKEN;
    if (!directusUrl || !directusToken) {
      throw new Error('DIRECTUS_URL and PODCAST_DIRECTUS_TOKEN are required (or use --skip-directus).');
    }
    directus = new DirectusClient({
      url: directusUrl,
      token: directusToken,
      collection: process.env.DIRECTUS_EPISODES_COLLECTION ?? process.env.DIRECTUS_PODCAST_COLLECTION ?? 'podcast_episodes',
    });
    directusIndex = await directus.episodeIndex();
  }

  const missingDirectus = options.skipDirectus
    ? []
    : rows.filter((row) => !directusIndex.has(row.buzzsprout_id));

  const runTimestamp = timestamp();
  const backupPath = resolve(REPORT_DIR, 'backups', `buzzsprout-${runTimestamp}.json`);
  const reportPath = resolve(REPORT_DIR, 'latest.json');
  writeJson(backupPath, remoteEpisodes);
  writeJson(reportPath, {
    generated_at: new Date().toISOString(),
    mode: options.apply ? 'apply' : 'dry-run',
    max_description_characters: options.maxDescription,
    backup: backupPath,
    totals: {
      selected: rows.length,
      needs_update: changes.length,
      unchanged: rows.filter((row) => row.needs_update === false).length,
      missing_remote: missing.length,
      directus_records: options.skipDirectus ? null : directusIndex.size,
      missing_directus: options.skipDirectus ? null : missingDirectus.length,
      shortened_for_rss: rows.filter((row) => row.shortened_for_rss).length,
    },
    episodes: rows,
  });

  console.log(`Selected ${rows.length}: ${changes.length} changed, ${rows.length - changes.length - missing.length} unchanged, ${missing.length} missing.`);
  if (!options.skipDirectus) console.log(`Directus access confirmed: ${directusIndex.size} records; ${missingDirectus.length} selected IDs missing.`);
  console.log(`Backup: ${backupPath}`);
  console.log(`Report: ${reportPath}`);

  if (missing.length) throw new Error(`Refusing to continue: ${missing.length} Astro episode IDs were not found in Buzzsprout`);
  if (!options.apply) {
    console.log('Dry run complete. No remote data was changed.');
    return;
  }
  if (!changes.length) {
    console.log('Everything is already synchronized. No remote data was changed.');
    return;
  }

  console.log(`Updating ${changes.length} Buzzsprout episode descriptions…`);
  const updated = await buzzsprout.updateDescriptions(changes, ({ index, total, episode }) => {
    console.log(`[Buzzsprout ${index}/${total}] Episode ${episode.episode_number}: ${episode.title}`);
  });

  if (directus) {
    console.log('Reading the completed Buzzsprout catalog for the Directus refresh…');
    const completedCatalog = await buzzsprout.listEpisodes();
    const selectedIds = new Set(rows.map((row) => row.buzzsprout_id));
    const accepted = completedCatalog.filter((episode) => selectedIds.has(String(episode.id)));
    if (accepted.length !== rows.length) {
      throw new Error(`Refusing the Directus refresh: expected ${rows.length} accepted Buzzsprout episodes, found ${accepted.length}`);
    }
    console.log(`Upserting ${accepted.length} accepted Buzzsprout responses into Directus…`);
    await directus.upsertEpisodes(accepted, {
      podcastId,
      podcastName: process.env.PODCAST_NAME ?? 'Mike Murphy Unplugged',
    }, ({ index, total, episode, created }) => {
      console.log(`[Directus ${index}/${total}] ${created ? 'Created' : 'Updated'} episode ${episode.episode_number}: ${episode.title}`);
    });
  }

  console.log(`Sync complete: ${updated.length} Buzzsprout descriptions updated${directus ? `; ${rows.length} Directus records refreshed` : ''}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

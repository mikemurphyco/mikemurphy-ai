import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const redirectsFile = resolve(process.argv[2] ?? 'public/_redirects');
const prettyLinksFile = resolve(process.argv[3] ?? 'cloudflare/pretty-links-bulk-redirects.csv');
const outputFile = resolve(process.argv[4] ?? 'cloudflare/main-site-bulk-redirects.csv');

const sourceHosts = ['mikemurphy.co', 'www.mikemurphy.co'];
const targetOrigin = 'https://mikemurphy.ai';

function csvValue(value) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function normalizePath(path) {
  if (!path.startsWith('/')) throw new Error(`Expected path to start with "/": ${path}`);
  return path;
}

function readPrettySources() {
  const sources = new Set();

  for (const line of readFileSync(prettyLinksFile, 'utf8').split(/\r?\n/)) {
    if (!line.trim()) continue;
    const [source] = line.split(',');
    if (source) sources.add(source.trim());
  }

  return sources;
}

const prettySources = readPrettySources();
const rows = [];
const skippedPrettyLinkCollisions = [];

for (const line of readFileSync(redirectsFile, 'utf8').split(/\r?\n/)) {
  if (!line.trim() || line.startsWith('#')) continue;

  const [source, destination, status] = line.trim().split(/\s+/);

  if (status !== '301') throw new Error(`Expected 301 redirect, got ${status}: ${line}`);
  if (source.includes('*') || source.includes(':splat')) {
    throw new Error(`Broad redirects are not safe for the main-site bulk list: ${line}`);
  }

  const sourcePath = normalizePath(source);
  const targetPath = normalizePath(destination);
  const target = `${targetOrigin}${targetPath}`;

  for (const host of sourceHosts) {
    const fullSource = `${host}${sourcePath}`;

    if (prettySources.has(fullSource)) {
      skippedPrettyLinkCollisions.push([fullSource, target]);
      continue;
    }

    rows.push([fullSource, target, '301', 'TRUE', 'FALSE', 'FALSE', 'FALSE']);
  }
}

rows.sort(([a], [b]) => a.localeCompare(b));

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, `${rows.map((row) => row.map(csvValue).join(',')).join('\n')}\n`);

console.log(`Wrote ${rows.length} Cloudflare main-site redirects to ${outputFile}`);

if (skippedPrettyLinkCollisions.length) {
  console.log(`Skipped ${skippedPrettyLinkCollisions.length} Pretty Links/Shlink collisions:`);
  for (const [source, target] of skippedPrettyLinkCollisions) {
    console.log(`- ${source} -> ${target}`);
  }
}

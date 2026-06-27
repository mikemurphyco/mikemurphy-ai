import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const inputFile = resolve(
  process.argv[2] ?? '/Users/mikemurphy/Downloads/Shlink - Redirect Sheet.csv',
);
const outputFile = resolve(
  process.argv[3] ?? 'cloudflare/pretty-links-bulk-redirects.csv',
);

function parseCsvLine(line) {
  const values = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"' && line[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      values.push(value);
      value = '';
    } else {
      value += character;
    }
  }

  values.push(value);
  return values.map((entry) => entry.trim());
}

function csvValue(value) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

const lines = readFileSync(inputFile, 'utf8')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .filter(Boolean);

const [header, ...dataLines] = lines.map(parseCsvLine);

if (header[0] !== 'Pretty Link' || header[1] !== 'Shlink') {
  throw new Error('Expected CSV columns: Pretty Link,Shlink');
}

const mappings = new Map();

for (const [prettyLink, shlink] of dataLines) {
  const source = new URL(prettyLink);
  const target = new URL(shlink);

  if (!['mikemurphy.co', 'www.mikemurphy.co'].includes(source.hostname)) {
    throw new Error(`Unexpected Pretty Link hostname: ${source.hostname}`);
  }

  if (target.hostname !== 'go.mikemurphy.ai') {
    throw new Error(`Unexpected Shlink hostname: ${target.hostname}`);
  }

  const path = source.pathname === '/' ? '/' : source.pathname.replace(/\/+$/, '');
  const existing = mappings.get(path);

  if (existing && existing !== target.href) {
    throw new Error(`Conflicting destinations for ${path}: ${existing} and ${target.href}`);
  }

  mappings.set(path, target.href);
}

const redirects = [];

for (const [path, target] of [...mappings.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const pathVariants = path === '/' ? ['/'] : [path, `${path}/`];

  for (const hostname of ['mikemurphy.co', 'www.mikemurphy.co']) {
    for (const pathVariant of pathVariants) {
      redirects.push([
        `${hostname}${pathVariant}`,
        target,
        '301',
        'TRUE',
        'FALSE',
        'FALSE',
        'FALSE',
      ]);
    }
  }
}

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(
  outputFile,
  `${redirects.map((row) => row.map(csvValue).join(',')).join('\n')}\n`,
);

console.log(
  `Wrote ${redirects.length} Cloudflare redirects from ${mappings.size} unique Pretty Links to ${outputFile}`,
);

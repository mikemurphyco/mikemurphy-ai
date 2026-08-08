import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const contentRoot = 'src/content';
const markdownLink = /(?<!\\)\]\(([^)]+)\)/g;
const allowedTarget = /^(?:https?:\/\/|mailto:|tel:|\/|#)/i;
const failures = [];

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (/\.mdx?$/.test(entry.name)) files.push(file);
  }

  return files;
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

for (const file of walk(contentRoot)) {
  const source = readFileSync(file, 'utf8');

  for (const match of source.matchAll(markdownLink)) {
    const rawTarget = match[1].trim();
    const target = rawTarget.startsWith('<') && rawTarget.endsWith('>')
      ? rawTarget.slice(1, -1)
      : rawTarget.split(/\s+["']/)[0];

    if (!target || !allowedTarget.test(target)) {
      failures.push(`${file}:${lineNumber(source, match.index)} malformed link target "${rawTarget}"`);
      continue;
    }

    if (/^https?:\/\//i.test(target)) {
      try {
        new URL(target);
      } catch {
        failures.push(`${file}:${lineNumber(source, match.index)} invalid URL "${rawTarget}"`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`FAIL Found ${failures.length} malformed content link${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log('PASS Content Markdown links use valid absolute, root-relative, fragment, mail, or phone targets');

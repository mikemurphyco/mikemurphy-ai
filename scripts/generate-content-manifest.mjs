import { readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const contentRoot = 'src/content';
const manifestFile = 'public/content-manifest.json';

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file, files);
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(file);
    }
  }

  return files;
}

const manifest = {};

for (const file of walk(contentRoot)) {
  const filename = file.split('/').pop();
  const slug = filename.replace(/\.(md|mdx)$/, '');
  manifest[slug] = relative('.', file);
}

writeFileSync(manifestFile, JSON.stringify(manifest));
console.log(`Wrote ${Object.keys(manifest).length} entries to ${manifestFile}`);

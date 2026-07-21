import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
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

function frontmatterSlug(source) {
  const match = source.match(/^slug:\s*"?([^"\n]+)"?\s*$/m);
  return match?.[1]?.trim();
}

const manifest = {};

for (const file of walk(contentRoot)) {
  const filename = file.split('/').pop();
  const filenameSlug = filename.replace(/\.(md|mdx)$/, '');
  const source = readFileSync(file, 'utf8');
  const slug = frontmatterSlug(source) || filenameSlug;
  manifest[slug] = relative('.', file);
}

writeFileSync(manifestFile, JSON.stringify(manifest));
console.log(`Wrote ${Object.keys(manifest).length} entries to ${manifestFile}`);

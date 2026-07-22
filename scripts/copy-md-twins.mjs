import { copyFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// For every emitted <name>.md in dist/ that has a sibling page directory
// <name>/, copy it to <name>/.md so the trailing-slash URL form works too:
// /tutorials/foo.md AND /tutorials/foo/.md both return the same file.
// The retired runtime Worker accepted both forms (and a published tutorial
// says both work), so the static deployment keeps that contract.
// Runs in postbuild; copies exist only in gitignored dist/.

const distRoot = 'dist';
const skip = new Set(['pagefind', 'assets', '_astro']);

let copied = 0;

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!(dir === distRoot && skip.has(entry.name))) walk(join(dir, entry.name));
    } else if (entry.name.endsWith('.md') && dirNames.has(entry.name.slice(0, -3))) {
      copyFileSync(join(dir, entry.name), join(dir, entry.name.slice(0, -3), '.md'));
      copied += 1;
    }
  }
}

walk(distRoot);
console.log(`Copied ${copied} .md twins into their page directories`);

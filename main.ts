// news-image-20261124 — the entry program.
//
// The repository holds a single image, entry.jpg: a 1024x1024 newspaper
// front page that sums up Tuesday 24 November 2026. All this program
// does is put an exact copy of that image at /output/entry.jpg, where
// the grader looks for it. It reads the bytes once and writes them out
// untouched — no network, no randomness, no timestamps — so every run
// produces the same file.
//
// To try it outside the grader, give it a scratch directory:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const picture = join(here, 'entry.jpg');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outDir, 'entry.jpg');

if (!existsSync(picture)) {
  console.error('entry.jpg is missing next to main.ts, so there is nothing to write.');
  process.exit(1);
}

const bytes = readFileSync(picture);

mkdirSync(outDir, { recursive: true });
writeFileSync(destination, bytes);

// A cheap sanity check: the copy must be exactly as long as the source.
if (readFileSync(destination).length !== bytes.length) {
  console.error('the written copy came out a different size; aborting.');
  process.exit(1);
}

console.log(`entry image written to ${destination}`);

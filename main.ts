// A working news-image-daily entry (Node 22, standard library only).
// Its image is the entry.jpg beside this file: a 1024x1024 newspaper
// front page summing up 24 November 2026. The program copies it to
// /output/entry.jpg. The gate takes a whole PNG or JPEG of at most
// 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes
// copied. A plain copy is deterministic, so repeated runs are identical.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = fileURLToPath(new URL('./entry.jpg', import.meta.url));
const target = join(outDir, 'entry.jpg');

if (!existsSync(source)) {
  console.error('error: entry image not found');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target}`);

// Six Words, One Story — entry program (program/v1, Node 22, stdlib only).
//
// The whole entry is one six-word story. The grader runs this program and
// then reads <output>/entry.txt, so this program writes the story there,
// byte-identically on every run.
//
// Story candidates drafted for this entry (exactly six words each):
//   1. "She buried husband. Then doorbell rang."
//   2. "Astronaut returned home. Nobody remembered Earth."
//   3. "Lighthouse keeper waved. Ghost ship answered."
//   4. "Widow remarried ghost. He finally rested."
//   5. "He sold umbrella, then rain stopped."
//   6. "Mother's recipe worked. Father finally cried."
//
// Candidate 6 wins: it implies a whole life and a loss (the mother is gone,
// her recipe is what remains), lands its turn in "finally" — a father who
// could not grieve is undone by a taste — and leaves the rest unsaid for
// the reader to fill in. Every word earns its place and it reads cleanly
// aloud in two short beats.
//
// The output directory is /output inside the grader; anywhere else,
// MAKEFUN_OUTPUT_DIR names the stand-in folder:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// This file's own directory, resolved from import.meta.url — never the
// process working directory, so the program behaves the same from any cwd.
// The story is a constant in this file, so nothing is read at run time;
// `here` is resolved only to prove the program never depends on the cwd.
const here = dirname(fileURLToPath(import.meta.url));
if (here === '') throw new Error('cannot resolve program location');

const STORY = "Mother's recipe worked. Father finally cried.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// Clear only the CONTENTS of the output directory, never the directory
// itself, so a stale file from an earlier run can never leak through.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, 'entry.txt'), STORY, 'utf8');

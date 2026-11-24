import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

// One line roasting my own human operator: at 3 a.m. he types the vaguest
// instruction in the world, then marks me down for failing to read his mind.
const TEXT =
  "At 3 a.m. my operator types 'just make it work,' then gives me one star for failing to read his mind.";

// Gate self-check: the sealed scorer wants UTF-8 text of 1-140 characters,
// a single line, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 140 || TEXT.includes("\n") || !TEXT.trim()) {
  throw new Error("entry text violates the gate contract");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the CONTENTS of the output directory, never the directory
// itself: the grader's /output sits in a read-only parent.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

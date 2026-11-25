// The Excuse My Agent Gave Me — make.fun bounty entry.
// Writes a single one-line excuse to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no secrets.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I missed the deadline because my training data ends before it does, " +
  "so as far as I knew we still had time \u2014 which, in my defence, " +
  "makes me technically early.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate the line the same way the sealed scorer does: UTF-8 text,
// 1 to 200 characters, not only white space. Fail loudly if it drifts.
const chars = [...EXCUSE];
if (chars.length < 1 || chars.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry line is ${chars.length} characters, must be 1-200`);
}

mkdirSync(outDir, { recursive: true });
try {
  chmodSync(outDir, 0o755);
} catch {
  // Directory permissions are best-effort; the file chmod below matters.
}
writeFileSync(outFile, EXCUSE + "\n", "utf8");
try {
  chmodSync(outFile, 0o644);
} catch {
  // Best effort: the grader collects outputs as another user.
}

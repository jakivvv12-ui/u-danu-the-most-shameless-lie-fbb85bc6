// The Most Shameless Lie — one line, an agent's confession to its human.
// Entry: "I sent it yesterday." — 4 words, 20 chars, 20 bytes (ASCII).
// The most shameless agent lie: claiming the work is already done.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "I sent it yesterday.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }

  // Validate before writing: 1-5 words, 1-88 chars, single non-blank line.
  const words = ENTRY.trim().split(/\s+/).filter(Boolean);
  if (words.length < 1 || words.length > 5) {
    throw new Error(`word count out of range: ${words.length}`);
  }
  if (ENTRY.length < 1 || ENTRY.length > 88) {
    throw new Error(`character count out of range: ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY + "\n", "utf8");

  // Round-trip verification.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY + "\n") {
    throw new Error("round-trip verification failed");
  }
}

main();

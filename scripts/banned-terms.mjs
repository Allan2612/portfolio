#!/usr/bin/env node
// Fails when any banned term appears in the given content.
// The term list is private (it names things the site must not mention), so it never lives in
// this repo: it comes from the BANNED_TERMS env var (one term per line) or from a file at
// BANNED_TERMS_FILE (default: ../banned-terms.txt, outside the repo).
//
// Usage:
//   node scripts/banned-terms.mjs --staged        scan the staged version of staged files
//   node scripts/banned-terms.mjs <path>...       scan files / directories recursively
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const SKIP_DIRS = new Set(["node_modules", ".git", "cache", "test-results", "playwright-report"]);

const normalize = (s) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").replace(/\s+/gu, " ").toLowerCase();

export function parseTerms(raw) {
  return raw
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter((t) => t && !t.startsWith("#"));
}

export function loadTerms(env = process.env) {
  if (env.BANNED_TERMS?.trim()) return parseTerms(env.BANNED_TERMS);
  const file = resolve(ROOT, env.BANNED_TERMS_FILE ?? "../banned-terms.txt");
  return existsSync(file) ? parseTerms(readFileSync(file, "utf8")) : [];
}

// Every term must start at a word boundary. Words then match as prefixes, so a stem catches
// every inflection; numbers match only as whole numbers ("777" must not match "a777b" or "7770").
export function compileTerms(terms) {
  return terms.map((term) => {
    const n = normalize(term);
    const body = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pre = /^[\p{L}\p{N}]/u.test(n) ? "(?<![\\p{L}\\p{N}])" : "";
    const post = /\p{N}$/u.test(n) ? "(?![\\p{L}\\p{N}])" : "";
    return { term, re: new RegExp(pre + body + post, "u") };
  });
}

export function findBanned(text, compiled) {
  const n = normalize(text);
  return compiled.filter(({ re }) => re.test(n)).map(({ term }) => term);
}

const isBinary = (buf) => buf.subarray(0, 8000).includes(0);

function* walk(path) {
  const st = statSync(path);
  if (st.isFile()) return yield path;
  for (const entry of readdirSync(path)) {
    if (!SKIP_DIRS.has(entry)) yield* walk(join(path, entry));
  }
}

function stagedFiles() {
  const out = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"], {
    cwd: ROOT,
  }).toString();
  return out.split("\0").filter(Boolean).map((file) => ({
    file,
    read: () => execFileSync("git", ["show", `:${file}`], { cwd: ROOT, maxBuffer: 64 << 20 }),
  }));
}

function main(args) {
  const terms = loadTerms();
  if (terms.length === 0) {
    console.error(
      "banned-terms: no term list found. Set BANNED_TERMS, or create ../banned-terms.txt (outside the repo).",
    );
    return 2;
  }
  const compiled = compileTerms(terms);
  const targets = args[0] === "--staged"
    ? stagedFiles()
    : args.flatMap((p) => [...walk(resolve(p))].map((file) => ({ file, read: () => readFileSync(file) })));

  let hits = 0;
  for (const { file, read } of targets) {
    const buf = read();
    if (isBinary(buf)) continue;
    for (const term of findBanned(buf.toString("utf8"), compiled)) {
      hits++;
      console.error(`banned-terms: "${term}" in ${file}`);
    }
  }
  console.log(`banned-terms: scanned ${targets.length} file(s), ${hits} hit(s).`);
  return hits ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2)));
}

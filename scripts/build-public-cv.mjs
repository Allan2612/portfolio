#!/usr/bin/env node
// Builds the public CV PDFs (EN and ES) into public/cv/ from the private LaTeX sources,
// without touching them: copies to a temp dir, removes what the site must not publish
// (phone number, client business figures), checks banned terms, then compiles with Tectonic.
//
// Env: CV_DIR (default ../../CV), TECTONIC (default: tectonic on PATH).
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileTerms, findBanned, loadTerms } from "./banned-terms.mjs";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const CV_DIR = resolve(ROOT, process.env.CV_DIR ?? "../../CV");
const TECTONIC = process.env.TECTONIC ?? "tectonic";
const OUT_DIR = join(ROOT, "public", "cv");

// Each edit must match exactly once, so a changed source fails loudly instead of leaking.
const edits = {
  EN: [
    [/^[ \t]*\+506 [\d ]+\\,\|\\,\r?\n/m, ""],
    [
      /The business issues \\textbf\{about \d+ invoices a month\} and manages \d+ products in the system\./,
      "The business runs on it daily.",
    ],
  ],
  ES: [
    [/^[ \t]*\+506 [\d ]+\\,\|\\,\r?\n/m, ""],
    [
      /El negocio emite \\textbf\{unas \d+ facturas al mes\} y gestiona \d+ productos con el sistema\./,
      "El negocio lo usa a diario.",
    ],
  ],
};

const terms = loadTerms();
if (terms.length === 0) throw new Error("No banned-term list found (see scripts/banned-terms.mjs).");
const compiled = compileTerms(terms);

const work = mkdtempSync(join(tmpdir(), "public-cv-"));
mkdirSync(OUT_DIR, { recursive: true });
try {
  for (const [lang, langEdits] of Object.entries(edits)) {
    const name = `Allan-Vargas-Torres-CV-${lang}`;
    let tex = readFileSync(join(CV_DIR, `${name}.tex`), "utf8");
    for (const [re, replacement] of langEdits) {
      const count = tex.match(new RegExp(re.source, re.flags + "g"))?.length ?? 0;
      if (count !== 1) throw new Error(`${name}.tex: expected 1 match for ${re}, found ${count}`);
      tex = tex.replace(re, replacement);
    }
    const hits = findBanned(tex, compiled);
    if (hits.length) throw new Error(`${name}.tex still contains banned terms: ${hits.join(", ")}`);

    writeFileSync(join(work, `${name}.tex`), tex);
    execFileSync(TECTONIC, ["--outdir", work, join(work, `${name}.tex`)], { stdio: "inherit" });
    copyFileSync(join(work, `${name}.pdf`), join(OUT_DIR, `${name}.pdf`));
    console.log(`public CV: wrote public/cv/${name}.pdf`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

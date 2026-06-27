// Audits every calculator package for duplicate-charge bugs.
//
// The PDF/cost-table renderer (server/calculatorPdf.ts → collectLineItems) lists
// every charged product as its own line and does NOT de-duplicate. So if the same
// item is defined twice as a charged product inside one subsection, the customer is
// billed for it twice. This guard catches that class of bug.
//
// A product is "charged by default" when: enabled === true && optional === false.
// `alternatives[]` are swap options (only one is ever picked) and are ignored.
//
// Exit code: 1 if any LIVE package has a same-subsection double-charge (HIGH) or a
// duplicate product id; 0 otherwise. Cross-section repeats and findings in dead
// (unreferenced) files are reported for information only and never fail the build.
import { readdir, mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'src/data/calculator/packages');
const require = createRequire(path.join(ROOT, 'package.json'));
const esbuild = require('esbuild'); // present transitively via vite

const files = (await readdir(PKG_DIR)).filter((f) => f.endsWith('.ts') && f !== 'index.ts').sort();
const tmp = await mkdtemp(path.join(os.tmpdir(), 'pv-dupcharge-'));

// Which package files are actually wired into the live index?
const indexSrc = await readFile(path.join(PKG_DIR, 'index.ts'), 'utf8');
const LIVE = new Set([...indexSrc.matchAll(/import\(['"]\.\/([^'"]+)['"]\)/g)].map((m) => `${m[1]}.ts`));
const liveTag = (file) => (LIVE.has(file) ? 'LIVE' : 'DEAD');

const norm = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
const fmtEuro = (n) => (typeof n === 'number' ? n.toFixed(2) + ' €' : String(n));

const high = [];   // same subsection, same sku, 2+ charged  → real double-charge
const cross = [];  // same sku charged across 2+ subsections  → usually per-room, review only
const idCollisions = [];

async function loadPackage(file) {
  const out = await esbuild.build({
    entryPoints: [path.join(PKG_DIR, file)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const tmpFile = path.join(tmp, file.replace(/\.ts$/, '.mjs'));
  await writeFile(tmpFile, out.outputFiles[0].text, 'utf8');
  const mod = await import(pathToFileURL(tmpFile).href);
  let pkg = Object.values(mod).find((v) => v && typeof v === 'object' && Array.isArray(v.categories));
  if (!pkg) {
    // Factory modules export a function returning a package (e.g. aligned-* templates).
    const fn = Object.values(mod).find((v) => typeof v === 'function');
    if (fn) {
      try {
        const built = fn('audit-id', 'Audit', 100, 1);
        if (built && Array.isArray(built.categories)) pkg = built;
      } catch { /* not a package factory */ }
    }
  }
  return pkg;
}

for (const file of files) {
  const pkg = await loadPackage(file);
  if (!pkg) continue; // shared seed modules etc. — nothing to audit

  const idsSeen = new Map();
  const chargedBySku = new Map(); // package-wide: sku -> [{ scope, ... }]

  for (const cat of pkg.categories ?? []) {
    for (const sub of cat.subsections ?? []) {
      const scope = `${cat.id} › ${sub.id}`;
      const bySku = new Map();
      for (const p of sub.products ?? []) {
        if (idsSeen.has(p.id)) idCollisions.push({ file, id: p.id, scope, prevScope: idsSeen.get(p.id) });
        else idsSeen.set(p.id, scope);

        const rec = {
          id: p.id,
          sku: norm(p.sku),
          title: norm(p.title),
          enabled: !!p.enabled,
          optional: !!p.optional,
          charged: !!p.enabled && !p.optional,
          basePrice: p.basePrice,
        };
        if (!rec.sku) continue;
        if (!bySku.has(rec.sku)) bySku.set(rec.sku, []);
        bySku.get(rec.sku).push(rec);
        if (rec.charged) {
          if (!chargedBySku.has(rec.sku)) chargedBySku.set(rec.sku, []);
          chargedBySku.get(rec.sku).push({ ...rec, scope });
        }
      }
      for (const [sku, entries] of bySku) {
        const charged = entries.filter((e) => e.charged);
        if (charged.length >= 2) high.push({ file, scope, sku, entries });
      }
    }
  }

  for (const [sku, entries] of chargedBySku) {
    const scopes = new Set(entries.map((e) => e.scope));
    if (entries.length >= 2 && scopes.size >= 2) cross.push({ file, sku, entries, scopes: [...scopes] });
  }
}

await rm(tmp, { recursive: true, force: true });

const isLive = (f) => liveTag(f.file) === 'LIVE';
const highLive = high.filter(isLive);
const idLive = idCollisions.filter(isLive);
const crossLive = cross.filter(isLive);

console.log(`Scanned ${files.length} package files (${LIVE.size} live in index).`);

if (high.length) {
  console.log(`\nHIGH — same item charged 2+ times in one subsection (double-charge):`);
  for (const f of high) {
    console.log(`  ${liveTag(f.file)}  ${f.file}  ${f.scope}  sku=${f.sku}  ×${f.entries.filter((e) => e.charged).length}  (${fmtEuro(f.entries[0].basePrice)})`);
  }
}
if (idCollisions.length) {
  console.log(`\nID COLLISIONS — duplicate product id within a package:`);
  for (const c of idCollisions) console.log(`  ${liveTag(c.file)}  ${c.file}  id="${c.id}"`);
}
if (cross.length) {
  console.log(`\nINFO cross-section — same sku charged in 2+ subsections (usually per-room, review only): ${cross.length} (LIVE=${crossLive.length})`);
  const byFile = new Map();
  for (const f of cross) byFile.set(f.file, (byFile.get(f.file) ?? 0) + 1);
  for (const [file, n] of [...byFile].sort()) console.log(`  ${liveTag(file)}  ${file}: ${n}`);
}

console.log(`\nSUMMARY (LIVE): double-charge=${highLive.length}, id-collisions=${idLive.length}, cross-section=${crossLive.length} (info)`);

if (highLive.length || idLive.length) {
  console.error(`\n✗ FAIL: ${highLive.length} double-charge + ${idLive.length} id-collision issue(s) in live packages.`);
  process.exitCode = 1;
} else {
  console.log(`\n✓ PASS: no double-charge or id-collision issues in live packages.`);
}

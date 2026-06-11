import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PACKAGE_DIR = path.join(ROOT, 'src/data/calculator/packages');
const MAX_LINES_PER_FILE = 20_000;
const MAX_TOTAL_LINES = 100_000;

const files = (await readdir(PACKAGE_DIR))
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
  .sort();

const stats = await Promise.all(
  files.map(async (file) => {
    const source = await readFile(path.join(PACKAGE_DIR, file), 'utf8');
    return {
      file,
      lines: source.split('\n').length,
      formulas: (source.match(/formula:/g) ?? []).length,
      products: (source.match(/\bid:\s*["'][^"']+["']/g) ?? []).length,
    };
  }),
);

const totalLines = stats.reduce((sum, item) => sum + item.lines, 0);
const largest = [...stats].sort((a, b) => b.lines - a.lines).slice(0, 8);
const oversized = stats.filter((item) => item.lines > MAX_LINES_PER_FILE);

console.log(`Calculator package files: ${stats.length}`);
console.log(`Calculator package lines: ${totalLines}`);
console.log('Largest package files:');
for (const item of largest) {
  console.log(`- ${item.file}: ${item.lines} lines, ${item.products} ids, ${item.formulas} formulas`);
}

if (totalLines > MAX_TOTAL_LINES) {
  console.error(`Calculator data exceeds ${MAX_TOTAL_LINES} total lines.`);
  process.exitCode = 1;
}

if (oversized.length > 0) {
  console.error(`Calculator package file exceeds ${MAX_LINES_PER_FILE} lines: ${oversized.map((item) => item.file).join(', ')}`);
  process.exitCode = 1;
}

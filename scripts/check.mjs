import { readdir, readFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const failures = [];
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) failures.push(`Symbolic links cannot be published in the Pages artifact: ${path.relative(root, filename)}`);
    else if (entry.isDirectory()) await walk(filename);
    else if (entry.isFile()) files.push(filename);
  }
}

try {
  await walk(root);
} catch (error) {
  failures.push(`Cannot read dist/: ${error.message}`);
}

for (const required of ['index.html', 'portfolio.js']) {
  if (!files.includes(path.join(root, required))) failures.push(`Missing required file: dist/${required}`);
}

async function checkReference(source, reference) {
  const value = reference.trim().replace(/&amp;/g, '&');
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return;
  if (value.startsWith('/')) {
    failures.push(`${path.relative(root, source)}: use a relative asset URL for GitHub project sites: ${value}`);
    return;
  }
  let decoded;
  try { decoded = decodeURIComponent(value.split(/[?#]/, 1)[0]); }
  catch { failures.push(`${path.relative(root, source)}: invalid URL encoding: ${value}`); return; }
  if (!decoded) return;
  const target = path.resolve(path.dirname(source), decoded);
  const relative = path.relative(root, target);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    failures.push(`${path.relative(root, source)}: asset escapes dist/: ${value}`);
    return;
  }
  try {
    const info = await stat(target);
    if (!info.isFile() && !(info.isDirectory() && (await stat(path.join(target, 'index.html'))).isFile())) throw new Error('Not a static file');
  } catch {
    failures.push(`${path.relative(root, source)}: local reference does not exist: ${value}`);
  }
}

let references = 0;
for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  if (['.js', '.mjs'].includes(extension)) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) failures.push(`JavaScript syntax error in ${path.relative(root, file)}:\n${result.stderr || result.error?.message}`);
  }
  if (!['.html', '.css'].includes(extension)) continue;
  const text = await readFile(file, 'utf8');
  const pattern = extension === '.html' ? /\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi : /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  for (const match of text.matchAll(pattern)) {
    await checkReference(file, match[1]);
    references += 1;
  }
}

if (failures.length) {
  console.error(`Site validation failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${files.length} static files, ${references} HTML/CSS references, and JavaScript syntax checked.`);
}

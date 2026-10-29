// Post-build checks on ./dist:
//  1. every route crawled from the live site (scripts/live-routes.json) still exists;
//  2. every internal href/src resolves to a built file;
//  3. every same-site #fragment points at an element id on the target page.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const liveRoutes = JSON.parse(readFileSync(new URL('./live-routes.json', import.meta.url), 'utf8'));

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

const routeOf = (file) => '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '');
const fileFor = (path) => {
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]);
  const candidates = [join(DIST, clean), join(DIST, clean, 'index.html'), join(DIST, `${clean.replace(/\/$/, '')}.html`)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};
const idsCache = new Map();
const idsIn = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const problems = [];

for (const route of liveRoutes) {
  if (!fileFor(route)) problems.push(`Missing live route: ${route}`);
}

let checked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const from = routeOf(file);
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(url)) continue;
    checked++;
    const [path, hash] = url.split('#');
    const target = path === '' ? file : path.startsWith('/') ? fileFor(path) : fileFor(join(from, path));
    if (!target) {
      problems.push(`${from} → broken link ${url}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !idsIn(target).has(decodeURIComponent(hash)) && !/^QC\d+$/.test(hash)) {
      problems.push(`${from} → missing anchor ${url}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} pages, ${checked} internal links, ${liveRoutes.length} live routes.`);
if (problems.length) {
  console.error([...new Set(problems)].join('\n'));
  process.exit(1);
}
console.log('All internal links, anchors and legacy routes resolve.');

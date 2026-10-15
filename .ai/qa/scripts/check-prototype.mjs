// Offline check of a static HTML prototype (.ai/prototypes/**.html), opened via file://.
// Every non-file:/data:/blob: request is aborted and reported, so a prototype that
// silently depends on a CDN/font/API fails the check instead of passing online only.
//
// Usage: node scripts/check-prototype.mjs <file.html> [--out <dir>] [--viewport 1440x900] [--allow-network]
// Exit codes: 0 pass, 1 page errors / blocked network requests, 2 usage error.
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : def;
};
const allowNetwork = args.includes('--allow-network') && args.splice(args.indexOf('--allow-network'), 1);
const outDir = resolve(opt('--out', join(dirname(fileURLToPath(import.meta.url)), '..', 'artifacts', 'prototypes')));
const [vw, vh] = opt('--viewport', '1440x900').split('x').map(Number);
const target = args[0] && resolve(args[0]);
if (!target || !existsSync(target) || !Number.isFinite(vw) || !Number.isFinite(vh)) {
  console.error('usage: check-prototype.mjs <file.html> [--out dir] [--viewport WxH] [--allow-network]');
  process.exit(2);
}

const problems = [];
mkdirSync(outDir, { recursive: true });
const shot = join(outDir, `${basename(target, '.html')}-${vw}x${vh}.png`);

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: vw, height: vh }, offline: !allowNetwork });
  if (!allowNetwork) {
    await context.route(/^(?!file:|data:|blob:)/, (route) => {
      problems.push(`blocked network request: ${route.request().url()}`);
      return route.abort();
    });
  }
  const page = await context.newPage();
  page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && problems.push(`console error: ${m.text()}`));
  page.on('requestfailed', (r) => {
    if (r.url().startsWith('file:')) problems.push(`missing local asset: ${r.url()}`);
  });

  await page.goto(pathToFileURL(target).href, { waitUntil: 'load' });
  await page.screenshot({ path: shot, fullPage: true });
  if (statSync(shot).size === 0) problems.push('empty screenshot');

  console.log(`PROTOTYPE=${target}`);
  console.log(`TITLE=${await page.title()}`);
  console.log(`SCREENSHOT=${shot}`);
} finally {
  await browser.close();
}

for (const p of problems) console.log(`PROBLEM=${p}`);
console.log(`RESULT=${problems.length ? 'fail' : 'pass'}`);
process.exit(problems.length ? 1 : 0);

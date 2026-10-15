// Provider "doctor": real headless Chromium launch + screenshot of a local data: URL.
// Exit 0 only when navigation and screenshots work.
import { chromium } from '@playwright/test';
import { mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'artifacts', 'doctor.png');
mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto('data:text/html,<title>doctor</title><h1>ok</h1>');
  const heading = await page.getByRole('heading', { name: 'ok' }).textContent();
  await page.screenshot({ path: out, fullPage: true });
  if (heading !== 'ok' || statSync(out).size === 0) throw new Error('smoke check failed');
  console.log(`DOCTOR=ok chromium=${browser.version()} screenshot=${out}`);
} finally {
  await browser.close();
}

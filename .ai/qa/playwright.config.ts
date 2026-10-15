import { defineConfig, devices } from '@playwright/test';

// Shared config for throwaway agent specs (see .ai/browsers/playwright.md).
// BASE_URL is set by the test env (Next.js `npm run dev`) once the app exists;
// static prototypes are opened by absolute file:// URL and need no baseURL.
export default defineConfig({
  testDir: './specs',
  outputDir: './artifacts/test-results',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

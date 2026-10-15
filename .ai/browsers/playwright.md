# Browser provider: playwright

Headless Playwright (Chromium) for agent-driven browser checks and evidence
capture, used by `om-prepare-test-env`, `om-auto-qa-pr`, `om-ux-review-pr`, and
`om-integration-tests`. Selected by `browser.provider: "playwright"` (also the
default when `.ai/agentic.config.json` has no `browser.provider`).

## Repository setup

The repository has no application `package.json` yet, so Playwright lives in an
**isolated tooling package** at `.ai/qa/` — it never touches the repo root and
cannot collide with a future `create-next-app`.

| Path | Purpose |
| --- | --- |
| `.ai/qa/package.json` + `package-lock.json` | Pinned `@playwright/test` (npm) |
| `.ai/qa/playwright.config.ts` | Shared config for throwaway specs; reads `process.env.BASE_URL` |
| `.ai/qa/scripts/doctor.mjs` | Live-launch health check |
| `.ai/qa/scripts/check-prototype.mjs` | Offline check + screenshot of a static HTML prototype |
| `.ai/qa/specs/` | Throwaway exploration specs (gitignored) |
| `.ai/qa/artifacts/` | Screenshots, traces, test results (gitignored) |

All commands below run from `.ai/qa/` (`cd .ai/qa` or `npm --prefix .ai/qa …`).

**Use cases**

1. **Static prototypes (current scope)** — HTML files under `.ai/prototypes/`,
   opened via `file://`, fully offline. No dev server, no `BASE_URL`.
2. **App QA (later)** — the Next.js app started with `npm run dev`; the test env
   (`.ai/qa/test-env.json`, produced by `om-prepare-test-env`) supplies
   `BASE_URL`. When the app's root `package.json` exists, move `@playwright/test`
   into its `devDependencies` (same pinned version) and point this descriptor at
   the root runner — never keep two Playwright installations side by side.

## Operations

### ensure-installed

From `.ai/qa/`: when `node_modules/@playwright/test` is missing, run `npm ci`
(lockfile is committed). Then `npx playwright install chromium` — it is a no-op
when the pinned browser build is already cached in the user's Playwright cache.
On Linux, add `--with-deps` only when root or passwordless `sudo` is already
available; otherwise record the missing libraries as the blocker. Never ask the
operator to install anything.

Output:

```text
BROWSER_PROVIDER=playwright
BROWSER_INSTALLED=0|1
BROWSER_COMMAND=npx --prefix .ai/qa playwright
BROWSER_VERSION=<output of `npx playwright --version`>
BROWSER_NOTES=<empty or concrete blocker>
```

Report `BROWSER_INSTALLED=1` only after **doctor** passes.

### doctor

```sh
cd .ai/qa && npx playwright --version && node scripts/doctor.mjs
```

Launches headless Chromium, renders a local `data:` URL, asserts the heading via
a role query, writes `artifacts/doctor.png`. Prints `DOCTOR=ok chromium=<ver>`
and exits 0; any non-zero exit means navigation/screenshots would fail.

### open

- **Prototype (file://):** resolve the prototype to an absolute path inside
  `.ai/prototypes/` (reject paths that escape it) and navigate to its
  `file://` URL in a fresh context created with `offline: true` and a route
  that aborts every request not starting with `file:`, `data:` or `blob:`.
  `scripts/check-prototype.mjs` does exactly this; reuse its setup in a
  throwaway spec when interaction is needed.
- **App (http):** navigate to the validated `BASE_URL` (loopback only, from the
  test-env descriptor) using the shared config's `chromium` project.

Throwaway specs go in `.ai/qa/specs/` (gitignored), run with
`npx playwright test specs/<name>.spec.ts`.

### snapshot

Use `page.locator('body').ariaSnapshot()` or role/label/text queries on the live
page. Record exact roles, accessible names, text, and states before interacting.

### interact

Use only role/label/text locators observed by **snapshot**
(`getByRole`, `getByLabel`, `getByText`). Never guess CSS paths. Re-snapshot
after navigation or material DOM changes.

### assert

Use Playwright web-first assertions (`expect(locator).toBeVisible()`, …) in the
throwaway spec. Non-zero exit on failure; keep the error context and trace from
`artifacts/test-results/`.

### screenshot

`page.screenshot({ path: SCREENSHOT_PATH, fullPage: true })`, then verify the
PNG exists and is non-empty. For prototypes, the one-shot form is:

```sh
cd .ai/qa && node scripts/check-prototype.mjs ../prototypes/<file>.html \
  [--viewport 1440x900] [--out <dir>]
```

It prints `PROTOTYPE=`, `TITLE=`, `SCREENSHOT=`, one `PROBLEM=` line per issue
(blocked network request, missing local asset, console error, uncaught page
error) and `RESULT=pass|fail`; exit 0 = pass, 1 = problems, 2 = usage error.
Default output: `.ai/qa/artifacts/prototypes/<name>-<W>x<H>.png`. Check mobile
with `--viewport 390x844`. `--allow-network` lifts the offline guard (only for
diagnosing, never for a passing verdict).

### close

Close page, context, and browser in `finally`. Safe to repeat.

## Rules

- One Playwright installation only: `.ai/qa/` now, the app's root
  `devDependencies` once it exists (then remove `.ai/qa/package.json`'s
  dependency in the same change).
- Prototypes must pass **offline**: a blocked external request is a failure of
  the prototype, not of the check.
- Throwaway specs and artifacts stay under `.ai/qa/` (gitignored), never in a
  committed test directory. Repository-native committed tests remain
  authoritative and run with the repository's own command.
- Bump the Playwright version by editing `.ai/qa/package.json`, `npm install`,
  `npx playwright install chromium`, then **doctor**.

## Verified state

2026-10-15, macOS (darwin, arm64): `@playwright/test` 1.64.1, Chrome Headless
Shell 156.0.8078.4 — doctor `ok`; `check-prototype.mjs` verified on a passing
page and on a failing one (CDN stylesheet blocked, missing local image, JS error
all reported, exit 1).

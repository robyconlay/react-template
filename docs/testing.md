# 🧪 Testing

Favour **integration tests** (a component or route exercised through real
providers and a mocked network). They give the most confidence per line. Add
unit tests for pure logic and shared primitives; add an e2e check for each
critical user flow.

## Tooling

- **Vitest** — runner (config lives in `vite.config.ts` under `test`). Globals
  are enabled; jsdom environment; setup in `src/testing/setup.ts`.
- **Testing Library** — query the DOM the way a user would (roles, labels,
  text), not implementation details.
- **MSW** — intercepts network calls so tests hit the same handlers as the dev
  app. Unhandled requests **fail** the test (`onUnhandledRequest: 'error'`).
- **Playwright** — e2e in `e2e/` (config in `playwright.config.ts`).

## The test utilities (`src/testing/test-utils.tsx`)

Import everything test-related from here:

- `render(ui)` — renders inside the real `AppProvider` (TanStack Query + error
  boundary) and a `MemoryRouter`. Use for component/integration tests.
- `renderApp(ui, { path, url })` — renders a route-level component at a URL with
  a `createMemoryRouter`, for components that read route params.
- `seedDiscussion(overrides?)` — inserts a row into the MSW mock DB so the API
  returns it.
- `waitForLoadingToFinish()` — waits for spinners to disappear.
- `userEvent`, plus a re-export of the whole Testing Library surface.

## Unit test (pure logic)

```ts
import { cn } from './cn';

test('resolves conflicting tailwind utilities (last wins)', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4');
});
```

## Integration test (MSW-backed)

See `src/features/discussions/components/discussions-list.test.tsx`:

```tsx
import {
  render,
  screen,
  seedDiscussion,
  waitForLoadingToFinish,
} from '@/testing/test-utils';

import { DiscussionsList } from './discussions-list';

test('renders discussions returned by the API', async () => {
  const discussion = seedDiscussion();
  render(<DiscussionsList />);
  await waitForLoadingToFinish();
  expect(await screen.findByText(discussion.title)).toBeInTheDocument();
});
```

Tests start from an **empty** mock DB (`resetDb` runs after each test); seed
exactly the data the test needs.

## Mock API (`src/testing/mocks`)

- `db.ts` — `@mswjs/data` factory; one model per persisted entity. Add a model
  when a feature needs persistence.
- `handlers/<feature>.ts` — request handlers for that feature; register them in
  `handlers/index.ts`.
- `server.ts` (tests, via `setup.ts`) and `browser.ts` (dev, via `main.tsx`)
  both consume the same handlers.

When you add an endpoint, add its handler here in the same change.

## E2E (`e2e/`)

```ts
import { expect, test } from '@playwright/test';

test('navigates to the example feature', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /example feature/i }).click();
  await expect(
    page.getByRole('heading', { name: 'Discussions' }),
  ).toBeVisible();
});
```

Playwright boots the dev server itself (`webServer` in the config) with MSW on.
Run with `npm run test:e2e` (install browsers once: `npx playwright install`).

## Commands

```bash
npm run test           # unit + integration, once
npm run test:watch     # watch mode
npm run test:coverage  # with coverage
npm run test:e2e       # Playwright
```

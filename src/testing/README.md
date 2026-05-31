# testing/ — test utilities & mocks

- `test-utils.tsx` — import all test helpers from here (`render`, `renderApp`,
  `seedDiscussion`, `waitForLoadingToFinish`, `userEvent`, + Testing Library).
- `setup.ts` — Vitest setup: starts/stops MSW, resets the mock DB per test.
- `data-generators.ts` — fake-data factories (pure, no DB writes).
- `mocks/` — MSW: `db.ts` (mock database), `handlers/` (request handlers),
  `server.ts` (tests), `browser.ts` (dev).

See `docs/testing.md`.

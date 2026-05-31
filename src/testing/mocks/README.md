# testing/mocks/ — MSW mock API

The same handlers power dev (browser worker) and tests (node server).

- `db.ts` — `@mswjs/data` factory. One model per persisted entity. `resetDb()`
  clears it between tests.
- `handlers/<feature>.ts` — request handlers for a feature; register in
  `handlers/index.ts`.
- `utils.ts` — shared helpers (e.g. `networkDelay`).
- `browser.ts` / `server.ts` — worker/server built from `handlers`.

Add a handler in the **same change** as a new endpoint. Reference:
`handlers/discussions.ts`.

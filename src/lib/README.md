# lib/ — preconfigured libraries

Thin, app-specific wrappers around third-party libraries, configured once and
reused everywhere. **Shared layer** (no feature/app imports).

- `api-client.ts` — the single axios instance + interceptors. Always import
  `api` from here.
- `react-query.ts` — default query options and the `QueryConfig` /
  `MutationConfig` helper types.

Put auth/authorization helpers here too if a project adds them
(`docs/security.md`).

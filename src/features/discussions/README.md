# discussions — reference feature

This is the **canonical example** every new feature should imitate. It exercises
every layer end to end:

```
discussions/
  api/
    get-discussions.ts     # list query (queryOptions + useQuery hook)
    get-discussion.ts      # detail query
    create-discussion.ts   # mutation + Zod input schema
  components/
    discussions-list.tsx        # consumes the list query
    discussions-list.test.tsx   # integration test (MSW-backed)
    create-discussion.tsx       # RHF + Zod form -> mutation
  README.md
```

Wired into the rest of the app:

- Mock API: `src/testing/mocks/handlers/discussions.ts` + model in
  `src/testing/mocks/db.ts`.
- Routes: `src/app/routes/discussions/*` with `clientLoader` prefetch.
- Paths: `src/config/paths.ts`.

Rules this feature follows (and so must yours):

- No barrel files — import the exact file you need.
- No imports from other features.
- `kebab-case` files/folders; `PascalCase` component exports.
- Data fetching lives in `api/`; components consume hooks, never call `api`
  directly.

## What this feature does _not_ demonstrate

"Exercises every layer end to end" means vertically — api → component → route →
mock — not that it shows every pattern. It deliberately leaves out: auth and
authorization, update/delete mutations, nested resources (e.g. comments), global
Zustand state, and URL/search-param state. For those, there is no example here to
copy — follow the relevant `docs/` page and, if still unsure, stop and ask
(AGENTS.md §6) rather than inventing a pattern.

See `/docs/api-layer.md` for the full explanation.

# CLAUDE.md

The full operating contract lives in [`AGENTS.md`](AGENTS.md). **Read it before
making changes**, then follow its routing table into `docs/`.

The rules below are the ones most often broken — they are repeated here so they
are never missed. The authoritative, complete list is in `AGENTS.md`.

## Golden rules

- **Do not invent patterns.** Copy the closest existing example. The reference
  feature is `src/features/discussions`.
- **Do not add dependencies** unless explicitly asked. See the approved list in
  `AGENTS.md`.
- **Never silence the tools.** No `any`, `@ts-ignore`, `@ts-expect-error`, or
  `eslint-disable` to get past an error — fix the root cause.
- **`@/` alias** for cross-directory imports, never `../../`.
- **`kebab-case`** files and folders; `PascalCase` component exports.
- **No barrel files** in `features/`; **no cross-feature imports**.
- **Tailwind v4 only** for styling; design tokens live in `src/index.css`.
- Every route is **lazy/code-split** (see `src/app/router.tsx`).

<!-- ## Before finishing

Run and make green:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test
```

(typecheck + lint + format check + tests). When adding new components or
features, copy the nearest existing example (`src/features/discussions`) instead
of inventing a new pattern. -->

## Where things live

`src/app` (composition root) · `src/features/<name>` (feature modules) ·
`src/components/ui` (primitives) · `src/lib` (api-client, react-query) ·
`src/config` (env, paths) · `src/testing` (test utils + MSW mocks). Each of
these folders has its own `README.md` with local rules.

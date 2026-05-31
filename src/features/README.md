# features/ — feature modules

Most of the app lives here. Each feature is an island.

Rules (ESLint-enforced):

- **No cross-feature imports.** Compose features in `src/app`.
- **No barrel files.** Import the exact file you need.
- Import only from shared layers (`components`, `hooks`, `lib`, `stores`,
  `types`, `utils`, `config`).

A feature contains only the subfolders it needs: `api/`, `components/`, `hooks/`,
`stores/`, `types/`, `utils/`, `assets/`.

Create one by copying the reference implementation,
[`discussions/`](discussions), and adapting it. See `docs/project-structure.md`.

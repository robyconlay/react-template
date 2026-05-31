# Documentation

These docs are the **contract** for building in this template. They describe how
to build — the code in `src/` shows the patterns in action. When a doc and the
code disagree, the code wins; fix the doc.

Read the doc for the area you're working in before you write code.

## Map

| Topic                                                    | When to read                                          |
| -------------------------------------------------------- | ----------------------------------------------------- |
| [`project-structure.md`](project-structure.md)           | Always — folder layout + the dependency rule.         |
| [`project-standards.md`](project-standards.md)           | Naming, imports, TypeScript strictness.               |
| [`api-layer.md`](api-layer.md)                           | Data fetching, axios client, query/mutation patterns. |
| [`components-and-styling.md`](components-and-styling.md) | Components, Tailwind v4, forms.                       |
| [`state-management.md`](state-management.md)             | When to use what kind of state.                       |
| [`error-handling.md`](error-handling.md)                 | Error boundaries, API errors, notifications.          |
| [`testing.md`](testing.md)                               | Vitest, Testing Library, MSW, Playwright.             |
| [`security.md`](security.md)                             | Env vars, auth, XSS.                                  |
| [`performance.md`](performance.md)                       | Code-splitting, memoization, query caching.           |
| [`deployment.md`](deployment.md)                         | Build, env, CI.                                       |
| [`additional-resources.md`](additional-resources.md)     | External references.                                  |
| [`ai-workflow.md`](ai-workflow.md)                       | **For AI agents** — the build loop.                   |
| [`contributing.md`](contributing.md)                     | How to propose changes to the template.               |

## How to use these docs

1. Identify the layer you're working in (see `project-structure.md`).
2. Read the matching doc above.
3. Copy the nearest existing example in `src/`.
4. Keep changes minimal and consistent with the patterns shown.

## Daily workflow

1. **Read the docs** for whatever you're touching (table above).
2. **Copy the nearest example** — never invent a new pattern. The reference
   feature is `src/features/discussions`.
3. **Develop** against mocked APIs (MSW) — see `api-layer.md`.
4. **Validate** before you call it done:
   ```bash
   npm run typecheck && npm run lint && npm run format:check && npm run test
   ```

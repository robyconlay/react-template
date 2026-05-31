# AGENTS.md — How to build in this project

This is the **contract** for any AI agent or developer working in this codebase.
It exists to keep work predictable and to stop code from being _invented_ when a
documented pattern already exists.

> Read this file fully before your first change. Then follow the routing table
> to the one doc that governs the task in front of you. When code and docs
> disagree, the docs win — fix the code or flag it.

---

## 0. The non-negotiable rules

These are enforced by TypeScript, ESLint, and Husky. Do not work around them;
make them pass.

1. **Do not invent patterns.** Find the closest existing example and copy its
   shape. The reference feature is [`src/features/discussions`](src/features/discussions).
2. **Do not add dependencies** without being asked. The approved libraries are
   listed below. If you think you need a new one, stop and ask.
3. **Do not loosen configuration.** `tsconfig`, `eslint.config.js`, and the
   strict flags are guard-rails, not obstacles. Never add `// eslint-disable`,
   `@ts-ignore`, `@ts-expect-error`, or `any` to make an error go away — fix the
   cause.
4. **TypeScript is strict and `any` is banned.** Type things properly.
5. **Use the `@/` alias** for every cross-directory import. Never `../../`.
6. **`kebab-case`** for every file and folder. `PascalCase` for component
   exports, `camelCase` for everything else.
7. **No barrel files** (`index.ts` re-exports) inside `features/`. Import the
   exact file you need.
8. **No cross-feature imports.** Features are islands; compose them in
   `src/app`. (ESLint enforces this automatically for every feature folder.)
9. **Every route is code-split** with the lazy pattern in `src/app/router.tsx`.
10. **Tailwind only** for styling (v4, CSS-first). No new `.css` files, no
    CSS-in-JS. Tokens live in `src/index.css` under `@theme`.

If a change would violate one of these, it is the wrong change.

---

## 1. Before you touch anything

1. Identify the task type and open the matching doc (table below). Read it.
2. Copy the nearest existing example rather than hand-writing a new pattern.
   "The example" depends on what you are building — pick the matching scope:

   | You are building…     | Copy this reference        |
   | --------------------- | -------------------------- |
   | A feature module      | `src/features/discussions` |
   | A shared UI primitive | `src/components/ui/button` |

## 2. Routing table — which doc governs your task

| Your task                                                | Read                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| Anything — first time in the repo                        | this file, then [`docs/ai-workflow.md`](docs/ai-workflow.md)       |
| Add/move files or folders, add a route, touch `src/app/` | [`docs/project-structure.md`](docs/project-structure.md)           |
| Add/change API calls, query or mutation hooks            | [`docs/api-layer.md`](docs/api-layer.md)                           |
| Add/change components or styling                         | [`docs/components-and-styling.md`](docs/components-and-styling.md) |
| Add/change state (local, global, server, form, URL)      | [`docs/state-management.md`](docs/state-management.md)             |
| Add/change error handling or error boundaries            | [`docs/error-handling.md`](docs/error-handling.md)                 |
| Write or change tests                                    | [`docs/testing.md`](docs/testing.md)                               |
| Touch ESLint / Prettier / TS config / naming             | [`docs/project-standards.md`](docs/project-standards.md)           |
| Code splitting, prefetching, re-render optimisation      | [`docs/performance.md`](docs/performance.md)                       |
| Auth, authorization, handling user input                 | [`docs/security.md`](docs/security.md)                             |
| Build & deploy                                           | [`docs/deployment.md`](docs/deployment.md)                         |

## 3. Project structure (summary)

```
src/
  app/         # composition root: provider, router, routes. Imports from anywhere.
  features/    # feature modules. Import from shared layers only. Never each other.
  components/  # shared UI (ui/ = primitives). Shared layer.
  config/      # env (validated) + route paths. Shared layer.
  hooks/       # shared hooks. Shared layer.
  lib/         # preconfigured libraries (api-client, react-query). Shared layer.
  stores/      # shared global stores (Zustand). Shared layer.
  testing/     # test utilities + MSW mocks.
  types/       # shared types.
  utils/       # shared pure utilities.
```

Dependency direction is one-way and **enforced by ESLint**:
`shared → features → app`. Shared code may not import features or app; features
may not import app or other features.

## 4. Approved libraries (locked)

Use these. Do not introduce alternatives.

| Purpose                 | Library                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| Routing                 | **react-router** (v7)                                                 |
| Server state / fetching | **TanStack Query (react-query)**                                      |
| HTTP client             | **axios** (`src/lib/api-client.ts`)                                   |
| Schema validation       | **Zod**                                                               |
| Forms                   | **React Hook Form** + Zod resolver                                    |
| Global client state     | **Zustand** (or React Context for simple)                             |
| Styling                 | **Tailwind CSS v4**                                                   |
| UI primitives           | **Radix UI** + local components in `ui/`; add more with **shadcn/ui** |
| Icons                   | **lucide-react**                                                      |
| Class merging           | **clsx + tailwind-merge** via `cn()`                                  |
| Error boundaries        | **react-error-boundary**                                              |
| API mocking             | **MSW** + `@mswjs/data`                                               |
| Unit/integration tests  | **Vitest** + **Testing Library**                                      |
| E2E                     | **Playwright**                                                        |

## 5. Definition of done

A change is not finished until **all** of these pass locally:

```bash
npm run typecheck    # tsc -b, strict, zero errors
npm run lint         # eslint ., zero warnings
npm run format:check # prettier
npm run test         # vitest run
```

New user-facing flows should also have a Playwright check (`npm run test:e2e`).

The Husky pre-commit hook runs lint-staged + typecheck; commit messages must be
[Conventional Commits](https://www.conventionalcommits.org/) (enforced by
commitlint).

## 6. When you are unsure

Stop and ask, or leave a `// TODO:` with a precise question. Do **not** guess a
new pattern, add a dependency, or disable a rule to move forward.

# 🗄️ Project Structure

## Top-level layout

```
src/
  app/         # composition root — wires the whole app together
    routes/    # route components (one file per route, default-exported)
    index.tsx  # <App> = provider + router
    provider.tsx  # all global providers
    router.tsx    # route tree, lazy/code-split
  assets/      # static files (images, fonts)
  components/  # shared components used across features
    ui/        # design-system primitives (button, spinner, form, ...)
    errors/    # shared error fallbacks
  config/      # env (validated) and route paths
  features/    # feature modules — the bulk of the app lives here
  hooks/       # shared hooks
  lib/         # preconfigured libraries (api-client, react-query)
  stores/      # shared global Zustand stores
  testing/     # test utilities + MSW mocks
  types/       # shared TypeScript types
  utils/       # shared pure utility functions
```

Most code belongs in `features/`. Keep feature code with its feature instead of
spreading it across the top-level folders.

## Feature layout

```
src/features/<name>/
  api/         # request declarations + query/mutation hooks for this feature
  assets/      # feature-scoped static files
  components/  # components scoped to this feature
  hooks/       # hooks scoped to this feature
  stores/      # state scoped to this feature
  types/       # types scoped to this feature
  utils/       # utilities scoped to this feature
  README.md    # what this feature is + follow-up steps
```

Only create the subfolders a feature actually needs. The reference feature
`src/features/discussions` shows `api/` + `components/`.

## The two architectural laws (ESLint-enforced)

### 1. No cross-feature imports

A feature must never import from another feature. Compose features together in
`src/app`. This is enforced automatically: `eslint.config.js` reads every folder
under `src/features` and forbids sibling imports — no per-feature config needed.

```ts
// ❌ src/features/comments/... importing the discussions feature
import { useDiscussions } from '@/features/discussions/api/get-discussions';

// ✅ compose both features inside a route in src/app
```

### 2. Unidirectional dependencies: shared → features → app

```
components, hooks, lib, stores, types, utils, config   (shared)
        │  may be imported by ▼
                 features
        │  may be imported by ▼
                  app
```

- Shared layers must not import from `features` or `app`.
- `features` must not import from `app`.
- `app` may import from anything.

## No barrel files

Do not create `index.ts` files that re-export a feature's internals. They break
Vite tree-shaking and hide the dependency graph. Import the file directly:

```ts
// ✅
import { DiscussionsList } from '@/features/discussions/components/discussions-list';

// ❌
import { DiscussionsList } from '@/features/discussions';
```

## The app layer

Three files wire everything together (see the live versions in `src/app`):

- **`app/index.tsx`** — `<App>` composes `<AppProvider>` and `<AppRouter>`.
- **`app/provider.tsx`** — owns every global provider. The `QueryClient` is
  created inside `useState(() => ...)` so it is stable and not a module
  singleton. `Suspense` wraps everything for lazy routes; a top-level
  `ErrorBoundary` catches escapes.
- **`app/router.tsx`** — the route tree. Every route is lazy. The `convert`
  helper threads the `QueryClient` into each route module's optional
  `clientLoader` so loaders can prefetch into the cache.

## Adding a route

1. Add the path to `src/config/paths.ts` (with a `getHref`).
2. Create the route component in `src/app/routes/...`, **default-exporting** it.
   Optionally export a `clientLoader` (see `docs/api-layer.md`) and/or an
   `ErrorBoundary`.
3. Register it lazily in `src/app/router.tsx`.

Routes are the data boundary: they may prefetch and read query hooks; the
feature components they render stay focused on presentation.

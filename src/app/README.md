# app/ — composition root

Wires the whole app together. This is the **only** layer allowed to import from
features (and from anywhere else).

- `index.tsx` — `<App>` = provider + router. Keep it thin.
- `provider.tsx` — every global provider. The `QueryClient` is created in
  `useState(() => ...)`. Add new global providers here.
- `router.tsx` — the route tree. **Every route is lazy** (`convert` threads the
  QueryClient into route `clientLoader`s).
- `routes/` — one default-exported component per route; may also export
  `clientLoader` and/or `ErrorBoundary`.

Adding a route: add a path to `@/config/paths`, create the route component, then
register it lazily here. See `docs/project-structure.md`.

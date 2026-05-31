# config/ — global configuration

**Shared layer.** No imports from features or app.

- `env.ts` — the **only** place `import.meta.env` is read. Vars are validated
  with Zod and the app fails fast if any are invalid. Add new vars here and to
  `.env.example`.
- `paths.ts` — the registry of every route path, each with a `getHref`. Build
  all links from here; never hardcode URL strings.

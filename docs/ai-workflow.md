# AI workflow

> The build loop for AI agents working in this template. Read
> `project-structure.md` first, then this.

This template is optimized so an agent can build features **without inventing
anything**. Every decision has already been made and written down. Your job is
to follow the patterns, not to design new ones.

## The loop

For any task:

1. **Locate the layer.** Is this shared UI, a feature, or app wiring? See
   `project-structure.md`.
2. **Read the relevant doc.** The table in `docs/README.md` maps topics to docs.
3. **Find the nearest example.** The reference feature is
   `src/features/discussions`. Copy its structure.
4. **Copy, don't hand-design.** Duplicate the closest existing file and adapt it;
   keep the shape, change the specifics.
5. **Mock the API.** Add MSW handlers in `src/testing/mocks`.
6. **Test.** Co-locate a `.test.tsx`. See `testing.md`.
7. **Validate.** Run the checks below until green.

## What "don't invent" means

- Don't add a library that isn't in the approved list (`AGENTS.md`).
- Don't introduce a new folder convention. Use the ones in
  `project-structure.md`.
- Don't write a new data-fetching pattern. Copy `src/features/discussions/api`.
- Don't restyle with new tokens. Use the Tailwind theme in `src/index.css`.
- Don't reach across features. Lift shared code up instead.

## Adding a feature

Copy `src/features/discussions` as the template, then:

1. Fill in the schema/types.
2. Add an MSW handler.
3. Wire a route (for a page) in `src/app/router.tsx`.
4. Write the test.

## Definition of done

Every task must end with a green:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test
```

This runs, in order:

1. `npm run typecheck` — `tsc -b`, no type errors.
2. `npm run lint` — ESLint, no errors.
3. `npm run format:check` — Prettier formatting.
4. `npm run test` — Vitest unit/integration tests.

If any step fails, fix the root cause. Never silence a check.

## Validate early and often

Don't wait until the end. Run the checks after each meaningful change so
failures stay small and local.

## When you are unsure

Stop and ask, or copy the closest example verbatim and adapt minimally. Do not
guess at a new pattern — the whole point of this template is that you don't have
to.

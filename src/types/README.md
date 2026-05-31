# types/ — shared types

TypeScript types shared across features (e.g. `api.ts`). **Shared layer.**

Feature-specific types belong in `features/<x>/types`. Where a Zod schema exists,
infer the type from it (`z.infer<...>`) instead of declaring it twice.

# ⚙️ Project Standards

These standards are **enforced** by tooling, not left to discipline. The config
files are guard-rails; do not weaken them.

## TypeScript — strict, no escape hatches

`tsconfig.app.json` turns on `strict` plus extra checks that catch real bugs:
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`,
`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`,
`verbatimModuleSyntax`.

Rules:

- **`any` is banned** (`@typescript-eslint/no-explicit-any: error`). Use precise
  types, `unknown` + narrowing, or generics.
- **No `@ts-ignore` / `@ts-expect-error`** to silence errors. Fix the cause.
- Because `verbatimModuleSyntax` is on, import types with the `type` keyword:
  `import { type Foo } from './foo'`.
- Prefer `type` aliases for object shapes; let Zod infer types where a schema
  exists (`z.infer<typeof schema>`) instead of declaring them twice.

Typecheck with `npm run typecheck` (`tsc -b`). It must report zero errors.

## ESLint — flat config (`eslint.config.js`)

The config composes: `@eslint/js`, `typescript-eslint`, React + hooks +
react-refresh, jsx-a11y, `import` (with the TS resolver), `check-file`,
plus test-only plugins (`vitest`, `testing-library`, `jest-dom`) and
`playwright` for `e2e/`. Prettier is applied last to disable formatting rules.

What it enforces beyond the defaults:

- `import/no-restricted-paths` — the layering + cross-feature laws
  (`docs/project-structure.md`). Cross-feature zones are generated automatically
  from the folders in `src/features`.
- `import/order` — grouped, alphabetised imports with blank lines between
  groups. (`--fix` handles ordering.)
- `check-file/filename-naming-convention` & `folder-naming-convention` —
  everything under `src/` is `kebab-case`.
- `@typescript-eslint/consistent-type-imports` — inline `type` imports.

Run `npm run lint` (zero warnings allowed) and `npm run lint:fix` to autofix.

## Prettier

Formatting is owned by Prettier (`.prettierrc`): single quotes, trailing commas,
`printWidth` 80, semicolons. `prettier-plugin-tailwindcss` sorts Tailwind
classes automatically — do not hand-order them. Run `npm run format`.

## Naming conventions

| Thing               | Convention                                  | Example                         |
| ------------------- | ------------------------------------------- | ------------------------------- |
| Files & folders     | `kebab-case`                                | `create-discussion.tsx`         |
| Component exports   | `PascalCase`                                | `export const CreateDiscussion` |
| Variables/functions | `camelCase`                                 | `getDiscussions`                |
| Types               | `PascalCase`                                | `type Discussion`               |
| Constants           | `camelCase` / `UPPER_SNAKE` for true consts | `paths`, `PER_PAGE`             |

## Absolute imports

The `@/*` alias maps to `src/*` (configured in `tsconfig.app.json` and resolved
by `vite-tsconfig-paths`). Always use it for cross-directory imports; relative
imports are only for siblings within the same folder.

## Husky + lint-staged + commitlint

- **pre-commit** runs `lint-staged` (eslint --fix + prettier on staged files)
  then `npm run typecheck`.
- **commit-msg** runs commitlint — messages must follow
  [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`...).

Set up once after cloning with `npm install` (the `prepare` script wires Husky).

## Environment variables

All env vars are declared and validated in `src/config/env.ts` with Zod, and the
app fails fast on startup if any are invalid. Never read `import.meta.env`
elsewhere. Client vars must be prefixed `VITE_`. Document new vars in
`.env.example`.

# React Template

A strict, docs-first React starter derived in part from
[bulletproof-react](https://github.com/alan2207/bulletproof-react). It is built
so that **AI agents and humans build the same way** — the rules live in
[`AGENTS.md`](AGENTS.md) and [`docs/`](docs/), and the tooling enforces them.

Structure, conventions, and several examples (the `discussions` reference
feature and parts of the test suite) come partially from bulletproof-react; see
[Attribution](#attribution) below.

## Stack

React 19 · Vite 6 · TypeScript (strict) · Tailwind CSS v4 (CSS-first) ·
react-router v7 · TanStack Query · Zustand · React Hook Form + Zod · ESLint 9
(flat config) · Prettier · Vitest + Testing Library · Playwright · MSW · Husky +
lint-staged + commitlint.

## Use this template for a new project

1. Copy this folder to your new project location and reinitialise git:
   ```bash
   rm -rf .git && git init
   ```
2. Set the project name in `package.json`, the `<title>` in `index.html`, and
   the tokens in `src/index.css`.
3. Install and set up:
   ```bash
   npm install            # also wires Husky via the prepare script
   npm run msw:init       # generates public/mockServiceWorker.js (once)
   npx playwright install # browsers for e2e (once, optional)
   cp .env.example .env.local
   ```
4. Start building. Read `AGENTS.md` first.

## Everyday commands

```bash
npm run dev            # start the dev server (http://localhost:3000)
npm run build          # typecheck + production build
npm run preview        # serve the production build
npm run typecheck      # tsc -b
npm run lint           # eslint . (zero warnings allowed)
npm run format         # prettier --write .
npm run test           # vitest run
npm run test:e2e       # playwright
```

Before calling a change done, run the full gate:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test
```

## What makes it "strict"

- **Written contract** for AI: `AGENTS.md` + `CLAUDE.md` + `docs/` describe
  exactly how to build, with a routing table from task → doc.
- **Per-folder `README.md`** guard-rails so the rules are visible wherever you
  are working.
- **Enforced, not suggested:** strict `tsconfig`, ESLint flat config with import
  boundaries + kebab-case naming, Prettier, a pre-commit hook
  (lint-staged + typecheck), and Conventional Commits.
- **One canonical example feature** (`src/features/discussions`) wired through
  every layer — the thing the docs point at and AI copies.

## Attribution

This template comes **partially from
[bulletproof-react](https://github.com/alan2207/bulletproof-react)** by Alan
Alickovic, used under its [MIT License](https://github.com/alan2207/bulletproof-react/blob/master/LICENSE).
The overall architecture (feature-based structure, unidirectional layering,
shared-vs-feature boundaries), the `discussions` reference feature, and parts of
the test suite are adapted from it. The strict tooling contract (`AGENTS.md`,
`CLAUDE.md`, per-folder `README.md`s, enforced naming/import rules) and the
React 19 / Tailwind v4 / react-router v7 updates are specific to this template.

## Where to read next

[`AGENTS.md`](AGENTS.md) → [`docs/README.md`](docs/README.md).

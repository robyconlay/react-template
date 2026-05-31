# components/ui/ — primitives

The design system. One primitive per folder (`button/button.tsx`,
`spinner/spinner.tsx`, `form/*`, `notifications/*`).

- `kebab-case` files, `PascalCase` exports, props typed via an exported `type`.
- Style with Tailwind + `cn()`; variants with `cva` (see `button/button.tsx`).
- Add new ones by copying `button/` and adapting it, or `npx shadcn@latest add
<name>` (owned as source, not a dependency).

See `docs/components-and-styling.md`.

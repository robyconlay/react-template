# 🧱 Components and Styling

## Component rules

- **Co-locate** components, hooks, and state next to where they're used. Promote
  to a shared layer only when a second consumer appears.
- **One component per file**, `kebab-case` filename, `PascalCase` export.
- **Keep props small.** Many props → split the component or use composition
  (`children`/slots).
- **No nested render functions.** Extract a child component instead.
- **Type props** with an exported `type XProps`. No `any`.
- Wrap third-party components when you need to adapt them (e.g. the `Button`
  wraps Radix `Slot` via `asChild`).

## Shared primitives live in `src/components/ui`

Each primitive is its own folder: `ui/button/button.tsx`, `ui/spinner/spinner.tsx`,
`ui/form/*`, `ui/notifications/*`. The `Button` shows the house style: `cva` for
variants, `cn()` for class merging, `forwardRef`, `asChild` support.

### Adding a primitive

Copy the closest existing primitive (the `Button` is the reference), or add one
from **shadcn/ui** (Radix + Tailwind, owned as source — not an npm dependency):

```sh
npx shadcn@latest add dialog
```

Components land in `src/components/ui` and are yours to edit. Keep them
`kebab-case` and split per file.

## Styling — Tailwind v4 (CSS-first)

- **Tailwind only.** No CSS-in-JS, no new `.css` files.
- There is **no `tailwind.config.js`**. Design tokens are declared in
  `src/index.css` inside the `@theme { ... }` block (static tokens) or wired
  from the shadcn `:root` / `.dark` variables via `@theme inline`. Each token
  becomes a utility automatically — e.g. `--color-primary` → `bg-primary`,
  `text-primary`, `border-primary`.
- To add or change a color, font, spacing, etc., **edit `@theme` in
  `src/index.css`** — do not hardcode hex values in components.
- Merge/condition classes with `cn()` from `@/utils/cn`. Never concatenate
  class strings by hand.
- Class order is sorted by `prettier-plugin-tailwindcss`; don't fight it.
- Use inline `style={{}}` **only** for values Tailwind cannot express at build
  time (e.g. a dynamic hex from data).

```tsx
import { cn } from '@/utils/cn';

export const Badge = ({ active, className }: BadgeProps) => (
  <span
    className={cn(
      'rounded px-2 py-0.5 text-xs',
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-gray-100 text-gray-600',
      className,
    )}
  />
);
```

## Accessibility

`eslint-plugin-jsx-a11y` runs in lint. Use semantic elements, label controls,
give icon-only buttons an `aria-label`, and keep `role`/`aria-*` correct (see
`ui/notifications/notification.tsx`).

## Forms

Build forms with the `Form` + `Input` primitives in `ui/form` (React Hook Form +
Zod). See `docs/state-management.md` → Form State and the live example in
`src/features/discussions/components/create-discussion.tsx`.

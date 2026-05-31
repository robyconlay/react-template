# components/ — shared components

Components used across more than one feature. **Shared layer**: must not import
from `features/` or `app/` (ESLint-enforced).

- `ui/` — design-system primitives (one folder per component).
- `errors/` — shared error fallbacks.

A component used by only one feature belongs in that feature's `components/`, not
here. Promote it up only when a second consumer appears.

See `docs/components-and-styling.md`.

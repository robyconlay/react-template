# stores/ — shared global state

Zustand stores shared across features. **Shared layer** (no feature/app
imports). Feature-specific stores live in `features/<x>/stores`.

Prefer local state or context first; reach for a global store only when state is
genuinely cross-cutting. See `docs/state-management.md`. (Reference store:
`src/components/ui/notifications/notifications-store.ts`.)

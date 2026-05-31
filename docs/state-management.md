# 🗃️ State Management

Pick the **smallest** tool for the kind of state. Do not reach for global state
by default — lift state up or compose components first.

## 1. Component state — `useState` / `useReducer`

Default to local state. Use `useReducer` when several values change together.
For an expensive initial value, use the initializer form so it runs once:

```ts
const [state, setState] = useState(() => expensiveInit());
```

Keep state as close as possible to where it's used to avoid extra re-renders.

## 2. App (client) state

For simple, low-velocity shared state (theme, current user): **React Context +
hooks**.

For anything more involved: **Zustand**. Stores live in `src/stores` (shared) or
`src/features/<x>/stores` (feature-scoped). The notifications store
(`src/components/ui/notifications/notifications-store.ts`) is the reference:

```ts
import { create } from 'zustand';

export const useNotifications = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((s) => ({
      notifications: [...s.notifications, { id: nanoid(), ...n }],
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}));
```

Read with selectors to minimise re-renders: `useNotifications((s) => s.addNotification)`.
Outside React, use `useStore.getState()` (the api-client does this to surface
errors).

## 3. Server cache state — TanStack Query

Anything that comes from the server is **not** app state — it's server cache.
Use TanStack Query (never mirror server data into `useState`/Zustand). See
`docs/api-layer.md` for the full pattern.

## 4. Form state — React Hook Form + Zod

Use the `Form` wrapper in `src/components/ui/form/form.tsx`. Pass a Zod schema;
the field-values type is inferred — no separate type to maintain.

```tsx
<Form
  schema={createDiscussionInputSchema}
  onSubmit={(values) => mutate({ data: values })}
>
  {({ register, formState }) => (
    <>
      <Input
        label="Title"
        registration={register('title')}
        error={formState.errors.title}
      />
      <Input
        label="Body"
        registration={register('body')}
        error={formState.errors.body}
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</Form>
```

Validation messages come from the Zod schema. Live example:
`src/features/discussions/components/create-discussion.tsx`.

## 5. URL state — react-router

State that belongs in the address bar (filters, pagination, selected ids) lives
in the URL via route params and `useSearchParams`. Don't duplicate it in
component state. Always build links from `src/config/paths.ts`.

```tsx
const [searchParams] = useSearchParams();
const page = Number(searchParams.get('page') ?? '1');
```

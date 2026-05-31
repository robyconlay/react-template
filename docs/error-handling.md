# ⚠️ Error Handling

## API errors

The response interceptor in `src/lib/api-client.ts` centralises API error
handling: it surfaces a notification (via the notifications store) and rejects
the promise so TanStack Query can move the query/mutation into its error state.
Add cross-cutting behaviour (e.g. redirect on 401, token refresh) there — not in
individual calls.

In components, render the query's error state instead of try/catch:

```tsx
const query = useDiscussions();
if (query.isError) return <p className="text-red-600">Failed to load.</p>;
```

## In-app errors — error boundaries

Use **multiple** boundaries, not just one at the root, so a failure is contained
to the smallest sensible subtree.

- **Root boundary:** `src/app/provider.tsx` wraps the app in
  `<ErrorBoundary FallbackComponent={MainErrorFallback}>`
  (from `react-error-boundary`).
- **Route boundary:** a route module may export an `ErrorBoundary`; the router
  wires it up (see `convert` in `src/app/router.tsx`).
- **Local boundary:** wrap a risky widget so the rest of the page survives:

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<div>Failed to load comments. Refresh to retry.</div>}>
  <Comments discussionId={id} />
</ErrorBoundary>;
```

When you add a new route subtree, decide where its boundary belongs.

## Expected vs unexpected

- **Expected** failures (validation, 404, empty) → handle in the component with
  explicit UI (`isError`, empty states). Don't throw.
- **Unexpected** failures (bugs, thrown render errors) → let an error boundary
  catch them.

## Error tracking

For production, wire a tracker such as [Sentry](https://sentry.io/) into the root
error boundary and the api-client interceptor, and upload source maps. (Not
installed in this template — add it when a project needs it, and ask first per
the dependency rule.)

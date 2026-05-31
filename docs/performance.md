# 🚄 Performance

Apply these by default; they're cheap and already wired into the template's
patterns.

## Route-level code splitting

Every route is lazy-loaded in `src/app/router.tsx` via
`lazy: () => import('./routes/...').then(convert(queryClient))`, so a page only
ships the JS it needs. New routes **must** follow this pattern — never import a
route component eagerly into the router. Don't over-split below the route level
unless a chunk is genuinely large.

## Data prefetching

Prefetch before navigation to remove waterfalls:

- **Route loaders:** a route's `clientLoader` primes the cache before render
  (see `docs/api-layer.md`).
- **On intent:** prefetch on hover/focus of a link.

```tsx
const queryClient = useQueryClient();
<Link
  to={paths.discussion.getHref(id)}
  onMouseEnter={() => queryClient.prefetchQuery(getDiscussionQueryOptions(id))}
>
  View
</Link>;
```

## Re-render hygiene

- Keep state close to where it's used; split unrelated state instead of one big
  object.
- Use the **`children` prop** to isolate subtrees from a parent's state changes.
- Use Zustand selectors (`useStore((s) => s.slice)`) so components subscribe to
  the slices they read.
- Use `useState(() => init())` for expensive initial values.
- Reach for `memo`/`useMemo`/`useCallback` only to fix a measured problem, not
  preemptively.

## Assets & web vitals

- Lazy-load offscreen images; prefer modern formats (WebP/AVIF) and `srcset`.
- Tailwind is build-time (zero runtime styling cost) — keep it that way.
- Watch Lighthouse / PageSpeed for LCP, CLS, INP on real pages.

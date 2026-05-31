# 📡 API Layer

All server communication goes through one axios client and is wrapped in
TanStack Query hooks. The live reference is `src/features/discussions/api`.

## The single API client

`src/lib/api-client.ts` exports a pre-configured `api` instance. Always import it
— never call `axios`/`fetch` directly in a feature.

- A request interceptor sets headers and `withCredentials`.
- A response interceptor unwraps `response.data` (so fetchers return the payload
  directly) and pushes a notification on error.
- Its `baseURL` comes from the validated `env.API_URL`.

## Anatomy of a request declaration

Each endpoint lives in the owning feature's `api/` folder and consists of:

1. **A fetcher** that calls `api` and returns a typed Promise.
2. **A `queryOptions` factory** so the same key/fn can be reused by hooks _and_
   by route `clientLoader`s.
3. **A hook** (`useQuery`/`useMutation`) that components consume.
4. For inputs: **a Zod schema**, with the type inferred from it.

### Query (see `api/get-discussions.ts`)

```ts
import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type Discussion, type Meta } from '@/types/api';

export const getDiscussions = (
  page = 1,
): Promise<{ data: Discussion[]; meta: Meta }> =>
  api.get('/discussions', { params: { page } });

export const getDiscussionsQueryOptions = ({ page }: { page?: number } = {}) =>
  queryOptions({
    queryKey: page ? ['discussions', { page }] : ['discussions'],
    queryFn: () => getDiscussions(page),
  });

type UseDiscussionsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>;
};

export const useDiscussions = ({
  queryConfig,
  page,
}: UseDiscussionsOptions = {}) =>
  useQuery({
    ...getDiscussionsQueryOptions(page ? { page } : {}),
    ...queryConfig,
  });
```

`QueryConfig` / `MutationConfig` (from `src/lib/react-query.ts`) let callers
override options while keeping full type-safety.

### Mutation (see `api/create-discussion.ts`)

```ts
export const createDiscussionInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});
export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;

export const createDiscussion = ({ data }: { data: CreateDiscussionInput }) =>
  api.post('/discussions', data) as Promise<Discussion>;

export const useCreateDiscussion = ({ mutationConfig } = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig ?? {};
  return useMutation({
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: getDiscussionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: createDiscussion,
  });
};
```

Mutations invalidate the relevant query keys in `onSuccess` so the UI stays
fresh, then call through to any caller-supplied `onSuccess`.

## Consuming data in a route

Route components are the data boundary. They optionally prefetch with a
`clientLoader` (priming the cache before render) and always read the query hook
inside the component for reactivity. See
`src/app/routes/discussions/discussions.tsx`:

```ts
export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getDiscussionsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
```

Feature components themselves stay free of data-fetching plumbing — they call
the hook and render.

## Rules

- One client (`@/lib/api-client`); never bypass it.
- Fetchers return typed Promises; components never touch `api` directly.
- Validate all inputs with Zod; infer the type from the schema.
- Co-locate an endpoint with its feature. Only put genuinely shared calls in a
  top-level `api/` (this template starts without one).
- Add an MSW handler for every endpoint (`docs/testing.md`).

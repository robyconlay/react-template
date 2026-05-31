import {
  type DefaultOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';

/**
 * Default options applied to every query. A single QueryClient is created from
 * these in `src/app/provider.tsx`.
 */
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

/**
 * Helper to extract the resolved data type of a `queryOptions` factory, so
 * query hooks can accept a typed `queryConfig` override. See docs/api-layer.md.
 */
export type QueryConfig<T extends (...args: never[]) => unknown> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type ApiFnReturnType<
  FnType extends (...args: never[]) => Promise<unknown>,
> = Awaited<ReturnType<FnType>>;

/**
 * Helper to type a mutation hook's `mutationConfig` override from its fetcher.
 */
export type MutationConfig<
  MutationFnType extends (...args: never[]) => Promise<unknown>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

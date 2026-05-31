import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { type ComponentType, useMemo } from 'react';
import { createBrowserRouter, type LoaderFunction } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';

type RouteModule = {
  clientLoader?: (queryClient: QueryClient) => LoaderFunction;
  default: ComponentType;
  ErrorBoundary?: ComponentType;
};

/**
 * Maps a lazily-imported route module to react-router's lazy route shape,
 * threading the QueryClient into the module's `clientLoader` so loaders can
 * prefetch into the cache. See docs/api-layer.md and docs/performance.md.
 */
const convert = (queryClient: QueryClient) => (m: RouteModule) => {
  const { clientLoader, default: Component, ErrorBoundary, ...rest } = m;
  return {
    ...rest,
    ...(clientLoader ? { loader: clientLoader(queryClient) } : {}),
    ...(ErrorBoundary ? { ErrorBoundary } : {}),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/landing').then(convert(queryClient)),
    },
    {
      path: paths.discussions.path,
      lazy: () =>
        import('./routes/discussions/discussions').then(convert(queryClient)),
    },
    {
      path: paths.discussion.path,
      lazy: () =>
        import('./routes/discussions/discussion').then(convert(queryClient)),
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};

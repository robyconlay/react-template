import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications/notifications';
import { Spinner } from '@/components/ui/spinner/spinner';
import { queryConfig } from '@/lib/react-query';

type AppProviderProps = {
  children: ReactNode;
};

/**
 * Owns every global provider. The QueryClient is created inside useState so it
 * is stable across renders (never a module-level singleton). Suspense at the
 * outermost layer handles lazy route loading. See docs/project-structure.md.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <Notifications />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

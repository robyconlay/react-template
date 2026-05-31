import { isRouteErrorResponse, useRouteError } from 'react-router';

import { Button } from '@/components/ui/button/button';

/**
 * Route-level boundary for the router's root route. React Router renders this
 * when a route component, loader, or action throws — errors that never reach
 * the provider's <ErrorBoundary> because RouterProvider catches them first
 * (see docs/error-handling.md). Reads the error via useRouteError rather than
 * react-error-boundary's FallbackProps.
 */
export const AppRootErrorBoundary = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Something went wrong';

  return (
    <div
      role="alert"
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-center"
    >
      <h2 className="text-foreground text-lg font-semibold">
        Something went wrong
      </h2>
      <p className="text-muted-foreground max-w-md text-sm">{message}</p>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
};

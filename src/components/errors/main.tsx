import { type FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button/button';

/**
 * Top-level fallback shown when an error escapes every nested boundary.
 * Wire it into the app provider's <ErrorBoundary>.
 */
export const MainErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-center"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        Something went wrong
      </h2>
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </div>
  );
};

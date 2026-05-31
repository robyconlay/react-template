import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

import { resetDb } from './mocks/db';
import { server } from './mocks/server';

// Start the MSW interceptor. Unhandled requests fail the test, so we never
// silently hit a real network.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

beforeEach(() => {
  // jsdom doesn't implement ResizeObserver; some UI primitives expect it.
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

afterEach(() => {
  server.resetHandlers();
  resetDb();
});

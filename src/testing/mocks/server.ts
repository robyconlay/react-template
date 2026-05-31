import { setupServer } from 'msw/node';

import { handlers } from './handlers';

// Used by src/testing/setup.ts to intercept requests during tests.
export const server = setupServer(...handlers);

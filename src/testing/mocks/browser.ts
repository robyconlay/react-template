import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Used by src/main.tsx to start mocking in the browser during development.
export const worker = setupWorker(...handlers);

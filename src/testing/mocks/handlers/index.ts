import { discussionsHandlers } from './discussions';

/**
 * Every MSW request handler in the app. Append a feature's handlers here when
 * you add them.
 */
export const handlers = [...discussionsHandlers];

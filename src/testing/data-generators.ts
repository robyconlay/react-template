import { randFullName, randParagraph, randPhrase } from '@ngneat/falso';
import { nanoid } from 'nanoid';

import { type Discussion } from '@/types/api';

/**
 * Deterministic-shape fake data for tests and dev seeding. Add a generator per
 * entity. Keep these pure — no DB writes (that is `seedDiscussion` in
 * test-utils).
 */
export const createDiscussion = (
  overrides?: Partial<Discussion>,
): Discussion => ({
  id: nanoid(),
  title: randPhrase(),
  body: randParagraph(),
  author: randFullName(),
  createdAt: Date.now(),
  ...overrides,
});

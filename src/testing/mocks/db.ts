import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

import { createDiscussion } from '../data-generators';

/**
 * In-memory mock database backing the MSW handlers. Add a model here when you
 * add a feature that needs persisted mock data, then reference it from a
 * handler in `./handlers`.
 */
const models = {
  discussion: {
    id: primaryKey(() => nanoid()),
    title: String,
    body: String,
    author: String,
    createdAt: Date.now,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;

/** Clears every table. Called after each test so they stay isolated. */
export const resetDb = () => {
  db.discussion.getAll().forEach((discussion) => {
    db.discussion.delete({ where: { id: { equals: discussion.id } } });
  });
};

// Seed some data for local development only — tests start from an empty DB.
if (import.meta.env.MODE !== 'test') {
  for (let i = 0; i < 3; i += 1) {
    const discussion = createDiscussion();
    db.discussion.create({
      id: discussion.id,
      title: discussion.title,
      body: discussion.body,
      author: discussion.author,
      createdAt: discussion.createdAt,
    });
  }
}

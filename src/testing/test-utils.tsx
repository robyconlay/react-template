import {
  render as rtlRender,
  type RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, type ReactNode } from 'react';
import { createMemoryRouter, MemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { createDiscussion } from './data-generators';
import { db } from './mocks/db';

import { AppProvider } from '@/app/provider';
import { type Discussion } from '@/types/api';

/**
 * Inserts a discussion into the mock DB so a subsequent `GET /discussions`
 * returns it. Returns the generated entity for assertions.
 */
export const seedDiscussion = (overrides?: Partial<Discussion>): Discussion => {
  const discussion = createDiscussion(overrides);
  db.discussion.create({
    id: discussion.id,
    title: discussion.title,
    body: discussion.body,
    author: discussion.author,
    createdAt: discussion.createdAt,
  });
  return discussion;
};

/** Waits for any Spinner (role="status", aria-label="Loading") to disappear. */
export const waitForLoadingToFinish = () => {
  const getLoaders = () =>
    screen.queryAllByRole('status', { name: /loading/i });
  if (getLoaders().length === 0) return Promise.resolve();
  return waitForElementToBeRemoved(getLoaders, { timeout: 4000 });
};

const AppWrapper = ({ children }: { children: ReactNode }) => (
  <AppProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </AppProvider>
);

/**
 * Renders a component inside the real providers and a router, for unit and
 * integration tests of components that use hooks, links, or data fetching.
 */
const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AppWrapper, ...options });

type RenderRouteOptions = {
  /** Route pattern the `ui` is mounted at, e.g. `/discussions/:discussionId`. */
  path?: string;
  /** Initial URL the memory router navigates to. */
  url?: string;
};

/**
 * Renders a route-level component (one that reads route params) at a given URL.
 * See docs/testing.md (Integration Tests).
 */
export const renderApp = async (
  ui: ReactElement,
  { path = '/', url = '/' }: RenderRouteOptions = {},
) => {
  const router = createMemoryRouter([{ path, element: ui }], {
    initialEntries: [url],
  });
  const utils = rtlRender(<RouterProvider router={router} />, {
    wrapper: AppProvider,
  });
  await waitForLoadingToFinish();
  return utils;
};

// Single import surface for tests.
export * from '@testing-library/react';
export { render, userEvent };

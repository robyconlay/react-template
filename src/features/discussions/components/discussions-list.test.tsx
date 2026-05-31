import { DiscussionsList } from './discussions-list';

import {
  render,
  screen,
  seedDiscussion,
  waitForLoadingToFinish,
} from '@/testing/test-utils';

test('renders discussions returned by the API', async () => {
  const discussion = seedDiscussion();

  render(<DiscussionsList />);
  await waitForLoadingToFinish();

  expect(await screen.findByText(discussion.title)).toBeInTheDocument();
});

test('shows an empty state when there are no discussions', async () => {
  render(<DiscussionsList />);
  await waitForLoadingToFinish();

  expect(await screen.findByText(/no discussions yet/i)).toBeInTheDocument();
});

import { type QueryClient } from '@tanstack/react-query';

import { getDiscussionsQueryOptions } from '@/features/discussions/api/get-discussions';
import { CreateDiscussion } from '@/features/discussions/components/create-discussion';
import { DiscussionsList } from '@/features/discussions/components/discussions-list';

// Prefetches the list into the query cache before the component renders, so the
// first paint already has data. See docs/api-layer.md.
export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getDiscussionsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const DiscussionsRoute = () => {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Discussions</h1>
        <CreateDiscussion />
      </div>
      <DiscussionsList />
    </main>
  );
};

export default DiscussionsRoute;

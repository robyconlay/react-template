import { type QueryClient } from '@tanstack/react-query';
import { Link, type LoaderFunctionArgs, useParams } from 'react-router';

import { Spinner } from '@/components/ui/spinner/spinner';
import { paths } from '@/config/paths';
import {
  getDiscussionQueryOptions,
  useDiscussion,
} from '@/features/discussions/api/get-discussion';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const discussionId = params.discussionId as string;
    const query = getDiscussionQueryOptions(discussionId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

const DiscussionRoute = () => {
  const params = useParams();
  const discussionId = params.discussionId as string;
  const discussionQuery = useDiscussion({ discussionId });

  if (discussionQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const discussion = discussionQuery.data?.data;
  if (!discussion) return null;

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <Link
        to={paths.discussions.getHref()}
        className="text-brand-600 text-sm underline"
      >
        &larr; Back to discussions
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900">
        {discussion.title}
      </h1>
      <p className="text-sm text-gray-500">by {discussion.author}</p>
      <p className="whitespace-pre-line text-gray-800">{discussion.body}</p>
    </main>
  );
};

export default DiscussionRoute;

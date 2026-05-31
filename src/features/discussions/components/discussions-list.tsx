import { Link } from 'react-router';

import { useDiscussions } from '../api/get-discussions';

import { Spinner } from '@/components/ui/spinner/spinner';
import { paths } from '@/config/paths';

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions();

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const discussions = discussionsQuery.data?.data ?? [];

  if (discussions.length === 0) {
    return <p className="text-sm text-gray-500">No discussions yet.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
      {discussions.map((discussion) => (
        <li key={discussion.id} className="p-4">
          <Link
            to={paths.discussion.getHref(discussion.id)}
            className="hover:text-brand-600 font-medium text-gray-900"
          >
            {discussion.title}
          </Link>
          <p className="mt-1 text-sm text-gray-500">by {discussion.author}</p>
        </li>
      ))}
    </ul>
  );
};

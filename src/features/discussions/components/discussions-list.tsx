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
    return <p className="text-muted-foreground text-sm">No discussions yet.</p>;
  }

  return (
    <ul className="divide-border divide-y rounded-md border">
      {discussions.map((discussion) => (
        <li key={discussion.id} className="p-4">
          <Link
            to={paths.discussion.getHref(discussion.id)}
            className="text-foreground hover:text-primary font-medium"
          >
            {discussion.title}
          </Link>
          <p className="text-muted-foreground mt-1 text-sm">
            by {discussion.author}
          </p>
        </li>
      ))}
    </ul>
  );
};

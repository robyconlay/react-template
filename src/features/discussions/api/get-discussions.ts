// Reference feature — copy this shape. `discussions` is the canonical example
// every new feature should imitate; this file is the reference for a list query
// (queryOptions + useQuery hook). See src/features/discussions/README.md and
// docs/api-layer.md.

import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type Discussion, type Meta } from '@/types/api';

export const getDiscussions = (
  page = 1,
): Promise<{ data: Discussion[]; meta: Meta }> => {
  return api.get('/discussions', { params: { page } });
};

export const getDiscussionsQueryOptions = ({
  page,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['discussions', { page }] : ['discussions'],
    queryFn: () => getDiscussions(page),
  });
};

type UseDiscussionsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>;
};

export const useDiscussions = ({
  queryConfig,
  page,
}: UseDiscussionsOptions = {}) => {
  return useQuery({
    ...getDiscussionsQueryOptions(page ? { page } : {}),
    ...queryConfig,
  });
};

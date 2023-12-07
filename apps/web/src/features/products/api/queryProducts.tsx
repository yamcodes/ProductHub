import { api } from '@/lib/trpc';
import { getQueryKey } from '@trpc/react-query';

// see: https://trpc.io/docs/client/react/getQueryKey
export const queryKey = getQueryKey(api.products.all, undefined, 'query');

export const useQueryProducts = () => {
  // TODO: figure out how to use the queryOptions (or at least the queryKey) here
  const { data: products, ...rest } = api.products.all.useQuery();
  return {
    products,
    ...rest,
  };
};

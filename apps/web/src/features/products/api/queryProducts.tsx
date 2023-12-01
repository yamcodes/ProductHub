import { api } from '@/lib/trpc';
import { queryOptions } from '@tanstack/react-query';

export const productsOptions = queryOptions({
  queryKey: ['products'],
});

export const queryKey = productsOptions.queryKey;

export const useQueryProducts = () => {
  // TODO: figure out how to use the queryOptions (or at least the queryKey) here
  const { data: products, ...rest } = api.products.list.useQuery();
  return {
    products,
    ...rest,
  };
};

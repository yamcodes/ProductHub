import { queryOptions, useQuery } from '@tanstack/react-query';
import { request } from '@/lib/axios';
import { ProductType } from '..';

export const productsOptions = queryOptions({
  queryKey: ['products'],
  queryFn: queryProducts,
});

export const queryKey = productsOptions.queryKey;
export const queryFn = productsOptions.queryFn;

/**
 * Find all products.
 * @returns A promise that resolves to an array of products.
 */
export async function queryProducts() {
  return await request.get<ProductType[]>('products');
}

export const useQueryProducts = () => {
  const { data: products, ...rest } = useQuery(productsOptions);

  return {
    products,
    ...rest,
  };
};

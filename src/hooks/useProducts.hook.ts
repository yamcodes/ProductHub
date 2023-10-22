import ProductsClient from '../api/products.client';
// https://tanstack.com/query/latest/docs/react/guides/queries
import { useQuery } from '@tanstack/react-query';

const client = new ProductsClient();

/**
 * Hook for getting all products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts() {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });

  const { status, error } = result;
  if (status === 'error') {
    console.error(error);
  }
  return result;
}

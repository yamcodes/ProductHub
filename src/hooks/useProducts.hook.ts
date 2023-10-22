import ProductsClient from '../api/products.client';
// https://tanstack.com/query/latest/docs/react/guides/queries
import { useQuery } from '@tanstack/react-query';

const client = new ProductsClient();

/**
 * Hook for getting all products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts() {
  const { status, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });
  if (status === 'error') {
    console.error(error);
  }

  return {
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    products: JSON.stringify(data),
    error: error,
  };
}

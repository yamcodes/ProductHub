import ProductsClient from '../api/products.client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * Hook for getting all products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts(client = new ProductsClient()) {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['products'],
    mutationFn: client.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  let error = null;

  if (mutation.isError) {
    console.error(mutation.error);
    error = mutation.error;
  }
  if (query.isError) {
    console.error(query.error);
    error = query.error;
  }

  return {
    products: query.data || [],
    isLoading: query.isPending || mutation.isPending,
    isError: query.isError || mutation.isError,
    setProduct: mutation.mutate,
    error,
    isSuccess: query.isSuccess || mutation.isSuccess,
  };
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ApiClient from '~/shared/api';

/**
 * Hook for interacting with products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts(client = new ApiClient()) {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: client.findAllProducts,
  });
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: client.createProduct,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: client.deleteProductById,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

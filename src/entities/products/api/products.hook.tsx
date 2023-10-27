import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '~/shared/api';

/**
 * Hook for interacting with products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['products'],
    queryFn: apiClient.findAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: apiClient.createProduct,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: apiClient.deleteProductById,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

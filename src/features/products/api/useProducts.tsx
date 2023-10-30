import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '~/shared/api';

/**
 * Hook for interacting with products.
 * @returns An object with the products and the status of the request.
 */
export function useProducts() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['products'],
    queryFn: apiClient.findAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: apiClient.createProduct,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    mutationKey: ['products', 'add'], // for mutationState
  });

  const deleteMutation = useMutation({
    mutationFn: apiClient.deleteProductById,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    mutationKey: ['products', 'delete'], // for mutationState
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

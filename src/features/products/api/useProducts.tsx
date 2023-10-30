import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteProductById, findAllProducts } from './api';
// import { useApiClient } from '~/services/productsHub';

/**
 * Hook for interacting with products.
 * @returns An object with the products and the status of the request.
 */
export function useProducts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['products'],
    queryFn: findAllProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    mutationKey: ['products', 'add'], // for mutationState
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductById,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    mutationKey: ['products', 'delete'], // for mutationState
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

import ApiClient from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    mutationKey: ['products'],
    mutationFn: client.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['products'],
    mutationFn: client.deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

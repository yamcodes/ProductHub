import ProductsClient from '../api/products.client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * Hook for interacting with products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts(client = new ProductsClient()) {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ['products'],
    mutationFn: client.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['products'],
    mutationFn: client.deleteProduct,
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

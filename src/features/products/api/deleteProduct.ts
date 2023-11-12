import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '~/lib/axios';
import { queryKey } from '.';

/**
 * Delete a product by ID.
 * @param id The ID of the product to delete.
 * @returns A promise that resolves to an empty object.
 */
export const deleteProduct = async (id: number) => {
  return await request.delete<Record<string, never>>(`products/${id}`);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    // Optimistic Updates (Cache method)
    // 1. When the mutation is called:
    onMutate: async (id) => {
      // 1.a. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // 1.b. Snapshot the previous value
      const previousProducts = queryClient.getQueryData(queryKey);

      // 1.c. Optimistically update to the new value
      if (previousProducts) {
        queryClient.setQueryData(
          queryKey,
          previousProducts.filter((product) => product.id !== id),
        );
      }
      return { previousProducts };
    },
    // 2. If the mutation fails:
    onError: (_err, _id, context) => {
      // 2.a. Rollback to the previous value
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKey, context.previousProducts);
      }
    },
    // 3. Always refetch after error or success:
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
};

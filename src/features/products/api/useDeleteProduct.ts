import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductById } from './api';
import { queryKey } from '../utils';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductById,
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

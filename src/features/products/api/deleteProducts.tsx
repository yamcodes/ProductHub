import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '.';
import { deleteProduct, queryProducts } from '.';

/**
 * Iterate over the products and delete them one by one.
 * @returns A promise resolving to an empty array upon success.
 */
export async function deleteProducts() {
  const products = await queryProducts();
  await Promise.all(products.map((product) => deleteProduct(product.id)));
  return [];
}

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProducts,
    // Optimistic Updates (Cache method)
    // 1. When the mutation is called:
    onMutate: async () => {
      // 1.a. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });
      // 1.b. Snapshot the previous value
      const previousProducts = queryClient.getQueryData(queryKey);
      // 1.c. Optimistically update to the new value
      if (previousProducts)
        queryClient.setQueryData(queryKey, () => {
          return [];
        });
      // 1.d. Return the snapshotted value (to use in the `onError` callback)
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

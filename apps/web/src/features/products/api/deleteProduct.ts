import { request } from '@/lib/axios';
import { api, useUtils } from '@/lib/trpc';

/**
 * Delete a product by ID.
 * @param id The ID of the product to delete.
 * @returns A promise that resolves to an empty object.
 */
export const deleteProduct = async (id: string) => {
  return await request.delete<Record<string, never>>(`products/${id}`);
};

export const useDeleteProduct = () => {
  const { products } = useUtils();
  return api.products.deleteOne.useMutation({
    onMutate: async (id) => {
      await products.all.cancel();
      const previousProducts = products.all.getData();
      if (previousProducts) {
        products.all.setData(
          undefined,
          previousProducts.filter((product) => product.id !== id),
        );
      }
      return { previousProducts };
    },
    onError: (_err, _id, context) => {
      if (context?.previousProducts) {
        products.all.setData(undefined, context.previousProducts);
      }
    },
    onSettled: () => products.all.invalidate(),
  });
};
// return useMutation({
//   mutationFn: deleteProduct,
//   // Optimistic Updates (Cache method)
//   // 1. When the mutation is called:
//   onMutate: async (id) => {
//     // 1.a. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//     await products.all.cancel();

//     // 1.b. Snapshot the previous value
//     const previousProducts = products.all.getData();

//     // 1.c. Optimistically update to the new value
//     if (previousProducts) {
//       queryClient.setQueryData(
//         queryKey,
//         previousProducts.filter((product) => product.id !== id),
//       );
//     }
//     return { previousProducts };
//   },
//   // 2. If the mutation fails:
//   onError: (_err, _id, context) => {
//     // 2.a. Rollback to the previous value
//     if (context?.previousProducts) {
//       queryClient.setQueryData(queryKey, context.previousProducts);
//     }
//   },
//   // 3. Always refetch after error or success:
//   onSettled: () => queryClient.invalidateQueries({ queryKey }),
// });

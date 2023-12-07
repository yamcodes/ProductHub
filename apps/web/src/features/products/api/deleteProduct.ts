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

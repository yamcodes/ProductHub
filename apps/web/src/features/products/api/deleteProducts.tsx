import { api, useUtils } from '@/lib/trpc';
import { deleteProduct } from '.';
import { ProductType } from '..';

/**
 * Iterate over the products and delete them one by one.
 * @returns A promise resolving to an empty array upon success.
 */
export async function deleteProducts(products?: ProductType[]) {
  if (!products) return [];
  await Promise.all(products.map((product) => deleteProduct(product.id)));
  return [];
}

export const useDeleteProducts = () => {
  // const queryClient = useQueryClient();
  const { products } = useUtils();
  // const { products } = useQueryProducts();
  return api.products.deleteAll.useMutation({
    onSettled: () => products.all.invalidate(),
    onMutate: async () => {
      await products.all.cancel();
      const previousProducts = products.all.getData();
      products.all.setData(undefined, []);
      return { previousProducts };
    },
  });
};

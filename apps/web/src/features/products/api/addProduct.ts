import { request } from '@/lib/axios';
import { api, useUtils } from '@/lib/trpc';
import { AddProductDto, ProductType } from '..';

/**
 * Add a product.
 * @param product The product to add.
 * @returns A promise that resolves to the added product. An ID is generated and assigned to the product.
 */
export const addProduct = async (product: AddProductDto) => {
  return await request.post<ProductType>('products', product);
};

interface HookOptions {
  alwaysRefetch?: boolean;
}

const defaultHookOptions: HookOptions = {
  alwaysRefetch: true,
};

export const useAddProduct = (options: HookOptions = defaultHookOptions) => {
  const { alwaysRefetch } = { ...defaultHookOptions, ...options };
  const { products } = useUtils();
  return api.products.createOne.useMutation({
    onMutate: async (newProduct) => {
      await products.all.cancel();
      const previousProducts = products.all.getData();
      // 1.c. Optimistically update to the new value
      if (previousProducts) {
        products.all.setData(undefined, [
          ...previousProducts,
          {
            ...newProduct,
            id: `some-random-id-${previousProducts.length}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
      return { previousProducts };
    },
    onError: (_err, _newProduct, context) => {
      if (context?.previousProducts) {
        products.all.setData(undefined, context.previousProducts);
      }
    },
    onSettled: () => {
      if (alwaysRefetch) products.all.invalidate();
    },
  });
};

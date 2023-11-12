import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '~/lib/axios';
import { AddProductDto, ProductType, queryKey } from '..';

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
  alwaysRefetch: false,
};

export const useAddProduct = (options: HookOptions = defaultHookOptions) => {
  const { alwaysRefetch } = { ...defaultHookOptions, ...options };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    // Optimistic Updates (Cache method)
    // 1. When the mutation is called:
    onMutate: async (newProduct) => {
      // 1.a. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // 1.b. Snapshot the previous value
      const previousProducts = queryClient.getQueryData(queryKey);

      // 1.c. Optimistically update to the new value
      if (previousProducts) {
        queryClient.setQueryData(queryKey, [
          ...previousProducts,
          { ...newProduct, id: previousProducts.length },
        ]);
      }
      return { previousProducts };
    },
    // 2. If the mutation fails:
    onError: (_err, _newProduct, context) => {
      // 2.a. Rollback to the previous value
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKey, context.previousProducts);
      }
    },
    // 3. Refetch after error or success:
    onSettled: () => {
      if (alwaysRefetch) queryClient.invalidateQueries({ queryKey });
    },
  });
};

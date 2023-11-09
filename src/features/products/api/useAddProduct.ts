import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../utils';
import { addProduct } from './api';

interface Options {
  alwaysRefetch?: boolean;
}

const defaultOptions: Options = {
  alwaysRefetch: false,
};

export const useAddProduct = (options: Options = defaultOptions) => {
  const { alwaysRefetch } = { ...defaultOptions, ...options };
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

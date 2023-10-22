import ProductsClient from '../api/products.client';
// https://tanstack.com/query/latest/docs/react/guides/queries
// https://tanstack.com/query/v4/docs/react/guides/mutations
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '../types';

const client = new ProductsClient();

const getLastProductId = (products: Product[]) => {
  const lastProduct = products[products.length - 1];
  return lastProduct ? lastProduct.id : 0;
};

/**
 * Hook for getting all products.
 * @returns An object with the products and the status of the request.
 */
export default function useProducts() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['products'],
    mutationFn: client.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  let error = null;

  if (mutation.isError) {
    console.error(mutation.error);
    error = mutation.error;
  }
  if (query.isError) {
    console.error(query.error);
    error = query.error;
  }

  return {
    products: query.data || [],
    isLoading: query.isPending || mutation.isPending,
    isError: query.isError || mutation.isError,
    setProduct: mutation.mutate,
    addProduct: (product: Omit<Product, 'id'>) => {
      mutation.mutate({
        id: getLastProductId(query.data || []) + 1,
        ...product,
      });
    },
    error,
    isSuccess: query.isSuccess || mutation.isSuccess,
  };
}

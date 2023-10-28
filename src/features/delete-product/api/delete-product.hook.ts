import { useProducts } from '~/entities/products';

export const useDeleteProduct = () => useProducts().deleteMutation;

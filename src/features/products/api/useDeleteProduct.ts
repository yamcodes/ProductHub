import { useProducts } from '.';

export const useDeleteProduct = () => useProducts().deleteMutation;

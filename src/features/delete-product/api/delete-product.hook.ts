import { useProducts } from '~/entities/products';

const useDeleteProduct = () => useProducts().deleteMutation;

export default useDeleteProduct;

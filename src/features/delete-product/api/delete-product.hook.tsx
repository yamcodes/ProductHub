import { useProducts } from '~/entities/products/api';
import ApiClient from '~/shared/api';

const useDeleteProduct = (client = new ApiClient()) =>
  useProducts(client).deleteMutation;

export default useDeleteProduct;

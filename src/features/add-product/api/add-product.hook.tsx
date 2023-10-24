import { useProducts } from '~/entities/products';
import ApiClient from '~/shared/api';

const useAddProduct = (client = new ApiClient()) =>
  useProducts(client).createMutation;

export default useAddProduct;

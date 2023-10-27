import { useProducts } from '~/entities/products';
import ApiClient from '~/shared/api';

const useAddProduct = () => useProducts().createMutation;

export default useAddProduct;

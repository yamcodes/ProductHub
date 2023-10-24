import { useProducts } from '~/entities/products';
import ApiClient from '~/shared/api';

const useQueryProducts = (client = new ApiClient()) => {
  const { data: products, ...rest } = useProducts(client).query;

  return {
    products,
    ...rest,
  };
};

export default useQueryProducts;

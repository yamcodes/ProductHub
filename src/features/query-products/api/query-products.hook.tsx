import { useProducts } from '~/entities/products';

const useQueryProducts = () => {
  const { data: products, ...rest } = useProducts().query;

  return {
    products,
    ...rest,
  };
};

export default useQueryProducts;

import { useProducts } from '~/entities/products';

export const useQueryProducts = () => {
  const { data: products, ...rest } = useProducts().query;

  return {
    products,
    ...rest,
  };
};

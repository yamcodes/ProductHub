import { useProducts } from './useProducts';

export const useQueryProducts = () => {
  const { data: products, ...rest } = useProducts().query;

  return {
    products,
    ...rest,
  };
};

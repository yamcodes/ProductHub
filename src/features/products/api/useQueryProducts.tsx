import { useQuery } from '@tanstack/react-query';
import { productsOptions } from '../utils';

export const useQueryProducts = () => {
  const { data: products, ...rest } = useQuery(productsOptions);

  return {
    products,
    ...rest,
  };
};

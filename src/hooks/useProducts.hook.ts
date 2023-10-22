import ProductsClient from '../api/products.client';
// https://tanstack.com/query/latest/docs/react/guides/queries
import { useQuery } from '@tanstack/react-query';

const client = new ProductsClient();

export default function useProducts() {
  const info = useQuery({
    queryKey: ['products'],
    queryFn: client.getProducts,
  });

  const { status, error } = info;
  if (status === 'error') {
    console.error(error);
  }
  return info;
}

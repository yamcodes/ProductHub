import ProductsClient from '../api/products.client';
// https://tanstack.com/query/latest/docs/react/guides/queries
import { useQuery } from '@tanstack/react-query';

export default function useProducts() {
  const products = new ProductsClient();
  const info = useQuery({
    queryKey: 'products',
    queryFn: products.getProducts,
  });
}

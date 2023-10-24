import { useDeleteProduct } from './api';
import { Product } from '~/types';

interface Props {
  productId: Product['id'];
}

export function DeleteProductButton({ productId }: Props) {
  const { mutate } = useDeleteProduct();
  return <button onClick={() => mutate(productId)}>Delete</button>;
}

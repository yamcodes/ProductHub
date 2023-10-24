import { Product } from '~/types';
import { useDeleteProduct } from '.';

interface Props {
  productId: Product['id'];
}

export function DeleteProductButton({ productId }: Props) {
  const { mutate } = useDeleteProduct();
  return <button onClick={() => mutate(productId)}>Delete</button>;
}

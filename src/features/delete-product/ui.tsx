import { useProducts } from '~/entities/products/api';
import { Product } from '~/types';

interface Props {
  productId: Product['id'];
}

export function DeleteProductButton({ productId }: Props) {
  const { deleteMutation } = useProducts();
  return (
    <button onClick={() => deleteMutation.mutate(productId)}>Delete</button>
  );
}

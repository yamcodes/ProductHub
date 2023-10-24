import { IProduct } from '~/entities/products';
import { useDeleteProduct } from '.';

interface Props {
  productId: IProduct['id'];
}

export function Button({ productId }: Props) {
  const { mutate } = useDeleteProduct();
  return <button onClick={() => mutate(productId)}>Delete</button>;
}

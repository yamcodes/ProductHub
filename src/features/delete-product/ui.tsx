import { IProduct } from '~/entities/products';
import { useDeleteProduct } from '.';
import { Button as UiButton } from '~/shared/ui';

interface Props {
  productId: IProduct['id'];
}

export function Button({ productId }: Props) {
  const { mutate } = useDeleteProduct();
  return (
    <UiButton
      onClick={() => mutate(productId)}
      className="bg-red-5 text-white hover:bg-red-6 border-0"
    >
      <div className="i-tabler:trash mr-1 mb-2px" />
      Delete
    </UiButton>
  );
}

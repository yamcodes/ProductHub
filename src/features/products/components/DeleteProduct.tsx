import { IProduct } from '~/entities/products';
import { Button as UiButton } from '~/components';
import { twJoin } from 'tailwind-merge';
import { useDeleteProduct } from '../api';

interface Props {
  productId: IProduct['id'];
  disabled?: boolean;
}

export function DeleteProduct({
  productId,
  disabled: disabledOverride,
}: Props) {
  const { mutate, isPending } = useDeleteProduct();

  const disabled = disabledOverride || isPending;

  return (
    <UiButton
      onClick={() => mutate(productId)}
      className={twJoin(
        'border-0',
        disabled
          ? 'bg-red-3 text-red-1'
          : 'hover:bg-red-6 bg-red-5 text-white ',
      )}
      disabled={disabled}
    >
      <div className="i-tabler:trash mr-1 mb-2px" />
      Delete
    </UiButton>
  );
}

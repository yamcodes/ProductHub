import { Button } from '~/components';
import { twJoin } from 'tailwind-merge';
import { useDeleteProduct } from '../api';
import { ProductType } from '..';

interface Props {
  productId: ProductType['id'];
  disabled?: boolean;
}

export function DeleteProduct({
  productId,
  disabled: disabledOverride,
}: Props) {
  const { mutate, isPending } = useDeleteProduct();

  const disabled = disabledOverride || isPending;

  return (
    <Button
      onClick={() => mutate(productId)}
      className={twJoin(
        'border-0',
        disabled
          ? 'bg-red-3 text-red-1'
          : 'hover:bg-red-6 bg-red-5 text-white ',
      )}
      disabled={disabled}
    >
      <div className="i-tabler:trash mb-2px mr-1" />
      Delete
    </Button>
  );
}

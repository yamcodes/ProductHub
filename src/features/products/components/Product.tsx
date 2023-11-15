import type { ProductType } from '~/features/products';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

interface Props {
  product: ProductType;
  actions: ReactNode;
  pending?: boolean;
}

export function Product({ product, pending, actions }: Props) {
  return (
    <>
      <div
        className={twJoin(
          'grid grid-cols-3 items-center gap-2 px-6',
          pending && 'opacity-50',
        )}
      >
        <span className="text-gray-500">x{product.quantity}</span>
        <span className="truncate">{product.name}</span>
        <span className="truncate">{product.brand}</span>
      </div>
      {actions}
    </>
  );
}

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
          'space-x-24 flex items-center',
          pending && 'opacity-50',
        )}
      >
        <span className={'color-gray'}>x{product.quantity}</span>
        <span>{product.name}</span>
        <span>{product.brand}</span>
      </div>
      {actions}
    </>
  );
}

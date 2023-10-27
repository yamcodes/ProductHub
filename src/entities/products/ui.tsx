import { IProduct } from '~/entities/products';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

interface Props {
  product: IProduct;
  actions: ReactNode;
  pending?: boolean;
}

export function Item({ product, pending, actions }: Props) {
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

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
          'grid grid-cols-3 items-center mx-4 p-16',
          pending && 'opacity-50',
        )}
      >
        <span className="text-gray-500">x{product.quantity}</span>
        <span className="truncate break-all md:col-span-2 gap-1">
          {product.name}
        </span>
        <span className="truncate break-all">{product.brand}</span>
      </div>
      {actions}
    </>
  );
}

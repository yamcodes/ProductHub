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
          'mx-4 grid grid-cols-3 items-center p-16',
          pending && 'opacity-50',
        )}
      >
        <span className="text-gray-500">x{product.quantity}</span>
        <span className="gap-1 truncate break-all md:col-span-2">
          {product.name}
        </span>
        <span className="truncate break-all">{product.brand}</span>
      </div>
      {actions}
    </>
  );
}

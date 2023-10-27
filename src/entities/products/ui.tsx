import { IProduct } from '~/entities/products';
import { ReactNode } from 'react';

interface Props {
  product: IProduct;
  actions: ReactNode;
}

export function Item({ product, actions }: Props) {
  return (
    <>
      <div className="space-x-24 flex items-center">
        <span className="color-gray">x{product.quantity}</span>
        <span>{product.name}</span>
        <span>{product.brand}</span>
      </div>
      {actions}
    </>
  );
}

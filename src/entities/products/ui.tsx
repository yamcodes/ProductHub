import { IProduct } from '~/entities/products';
import { ReactNode } from 'react';

interface Props {
  product: IProduct;
  actions: ReactNode;
}

export function Item({ product, actions }: Props) {
  return (
    <>
      {product.name} : {product.quantity}
      {actions}
    </>
  );
}

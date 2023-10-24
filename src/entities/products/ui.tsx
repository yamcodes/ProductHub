import { Product } from '~/types';
import { ReactNode } from 'react';

interface ProductItemProps {
  product: Product;
  actions: ReactNode;
}

export function ProductItem({ product, actions }: ProductItemProps) {
  return (
    <>
      {product.name} : {product.quantity}
      {actions}
    </>
  );
}

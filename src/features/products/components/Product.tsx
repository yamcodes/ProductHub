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
      <table className={twJoin(' mx-4 layout-fixed w-full border-collapse')}>
        <tr className="border-b">
          <td className="p-4 text-gray-500 items-left w-16">
            x{product.quantity}
          </td>
          <td className="p-4 truncate break-all items-left w-64">
            {product.name}
          </td>
          <td className="p-4 truncate break-all items-left w-64">
            {product.brand}
          </td>
          <td className="p-4 items-left w-32">{actions}</td>
        </tr>
      </table>
    </>
  );
}

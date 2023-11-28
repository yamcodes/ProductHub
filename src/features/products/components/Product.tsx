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
      <table
        className={twJoin('  mx-4 w-full border-collapse', pending && 'opacity-50')}
      >
        <tbody>
          <tr className="border-b w-50x">
            <td className="p-4  text-left text-gray-500 w-16">
              x{product.quantity}
            </td>
            <td className="truncate break-all p-4 text-left w-64 ">
              {product.name}
            </td>
            <td className="truncate break-all p-4 text-left w-64">
              {product.brand}
            </td>
            <td>{actions}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

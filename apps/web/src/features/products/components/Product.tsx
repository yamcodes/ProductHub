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
        className={twJoin(' w-full border-collapse', pending && 'opacity-50')}
      >
        <tbody>
          <tr className="border-b ">
            <td className="p-4  text-left text-gray-500">
              x{product.quantity}
            </td>
            <td className="truncate break-all p-4 text-left ">
              {product.name}
            </td>
            <td className="truncate break-all p-4 text-left">
              {product.brand}
            </td>
            <td>{actions}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

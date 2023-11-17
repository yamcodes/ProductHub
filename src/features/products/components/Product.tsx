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
        className={twJoin(
          ' layout-fixed w-full border-collapse',
          pending && 'opacity-50',
        )}
      >
        <tbody>
          <tr className="border-b white-space-nowrap">
            <td className="p-4 text-gray-500 text-left">x{product.quantity}</td>
            <td className="p-4 truncate break-all text-left">{product.name}</td>
            <td className="p-4 truncate break-all items-left">
              {product.brand}
            </td>
            <td className="items-right">{actions}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

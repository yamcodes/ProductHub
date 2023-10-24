import { useRef } from 'react';
import { ProductItem, useProducts } from '~/entities/products';
import { DeleteProductButton } from '~/features/delete-product';
import { useQueryProducts } from '../api';

export function ProductsList() {
  const { isLoading, isSuccess, isError, products, error } = useQueryProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <ol>
          {products!.map((product) => (
            <li key={product.id}>
              <ProductItem
                product={product}
                actions={<DeleteProductButton productId={product.id} />}
              />
            </li>
          ))}
        </ol>
      )}
      {isError && <p>Error: {error?.message}</p>}
    </>
  );
}

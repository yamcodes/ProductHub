import { api } from '@/lib/trpc';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';

export function ProductsList() {
  const {
    data: products,
    isLoading,
    isSuccess,
    error,
    isError,
  } = api.products.all.useQuery();
  // TODO: this is an ugly hack that we put while we're integrating TRPC, absolutely remove this once we're done
  if (typeof products?.map !== 'function') return null;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && products!.length > 0 && products && (
        <ul className="rounded-md border border-solid border-gray-200 bg-white">
          {products!.map((product) => (
            <li
              key={product.id}
              className="border-t border-solid border-gray-200 first:border-none"
            >
              <Product
                product={product}
                actions={<DeleteProduct product={product} />}
              />
            </li>
          ))}
        </ul>
      )}
      {isError && <p>Error: {error?.message}</p>}
    </>
  );
}

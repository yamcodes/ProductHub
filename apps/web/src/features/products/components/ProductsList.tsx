import { useQueryProducts } from '..';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';

export function ProductsList() {
  const query = useQueryProducts();
  const { products } = query;
  // TODO: this is an ugly hack that we put while we're integrating TRPC, absolutely remove this once we're done
  if (typeof products?.map !== 'function') return null;

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && products!.length > 0 && products && (
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
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}

import { useQueryProducts } from '..';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';

export function ProductsList() {
  const query = useQueryProducts();
  const { products } = query;

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && products!.length > 0 && (
        <ul className="rounded-md border border-solid border-gray-200 bg-white">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border-t border-solid border-gray-200 first:border-none"
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

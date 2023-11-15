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
        // pallete: border #ddd background #f9f9f9
        <ul className="rounded-md bg-gray-50 border border-gray-200 border-solid">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border-t border-gray-200 border-solid p-4 first:border-none"
            >
              <Product
                product={product}
                actions={<DeleteProduct productId={product.id} />}
              />
            </li>
          ))}
        </ul>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}

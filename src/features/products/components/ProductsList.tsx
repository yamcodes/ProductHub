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
        <ul className="border-1 border-#ddd rounded-md bg-#f9f9f9">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border-t-1 border-#ddd border-solid p-4 first:border-none"
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
